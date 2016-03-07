import log from 'picolog';
import Api, { link } from 'redux-apis';
import Async from 'redux-async-api';
import { remote } from 'redux-fetch-api';

import { TextfieldApi } from '../Mdl/api';
import { fromJSON } from '../Entity/Entity';

import Suid from '../../suid';
import PasswordCredential from './PasswordCredential';
import Account from './Account';

export class LoginDialogApi extends Api {
	constructor(...args) {
		super(...args);
		this.username = link(this, new TextfieldApi());
		this.username.type = 'text';
//		this.username.pattern = '\s*\S.{1,}\S\s*';
		this.password = link(this, new TextfieldApi());
		this.password.type = 'password';
//		this.password.pattern = '\s*\S.{5,}\S\s*';
	}

}

export class RegisterDialogApi extends Api {
	constructor(...args) {
		super(...args);
		this.username = link(this, new TextfieldApi());
		this.username.type = 'text';
//		this.username.pattern = '\s*\S.{1,}\S\s*';
		this.password = link(this, new TextfieldApi());
		this.password.type = 'password';
//		this.password.pattern = '\s*\S.{5,}\S\s*';
		this.confirm = link(this, new TextfieldApi());
		this.confirm.type = 'password';
//		this.confirm.pattern = '\s*\S.{5,}\S\s*';
	}
}

@remote
export class Auth extends Async {
	static CHALLENGE = 'AUTH_CHALLENGE';
	static LOGGED_IN = 'LOGGED_IN';
	static LOGGED_OUT = 'LOGGED_OUT';
	static CANCEL = 'CANCEL_AUTH';

	static INITIAL_STATE = {
		...Async.INITIAL_STATE,
		user: null,
		challenge: null,
	};

	constructor(state = Auth.INITIAL_STATE) {
		super(state);
		this.setHandler(Auth.CHALLENGE, (state, {payload}) => ({...state, challenge:payload}));
		this.setHandler(Auth.LOGGED_IN,	(state, {payload}) => ({...state, user:payload, challenge:null}));
		this.setHandler(Auth.LOGGED_OUT, (state, action) => ({...state, user:null, challenge:null}));
		this.setHandler(Auth.CANCEL, (state, action) => ({...state, challenge:null}));
		Object.defineProperty(this, 'loggedIn', {enumerable:true, get: () => !!this.user});
		Object.defineProperty(this, 'challenged', {enumerable:true, get: () => !!(this.challenge() && this.challenge().url && !this.challenge().accepted)});
		Object.defineProperty(this, 'user', {enumerable:true, get: () => this.getState().user});
		Object.defineProperty(this, 'onProvoke', {enumerable:true, value: () => this.provoke()});
		Object.defineProperty(this, 'onCancel', {enumerable:true, value: () => this.cancel()});
		Object.defineProperty(this, 'onLogin', {enumerable:true, value: () => this.login()});
		Object.defineProperty(this, 'onLogout', {enumerable:true, value: () => this.logout()});
		Object.defineProperty(this, 'onRegister', {enumerable:true, value: () => this.register()});
		this.loginDialog = link(this, new LoginDialogApi())
		this.registerDialog = link(this, new RegisterDialogApi())
	}

	loadUser() {
		log.log('loadUser()');
		this.setBusy();
		return fetchUser(this).catch().then(user => {
			this.setDone();
			return user;
		});
	}

	login(username, password) {
		if (username === undefined) {return this.login(this.loginDialog.username.value, this.loginDialog.password.value);}

		function remoteLogin(auth, challenge) {
			log.debug('remoteLogin', auth, challenge);
			return auth.fetch(challenge.url, {
				method: challenge.method,
				headers: {
					'Content-Type': challenge.contentType,
				},
				body: encode(challenge, username, password),
			})
			.then(response => {
				log.debug('remoteLogin => ', response);
				return fetchUser(auth).then(() => {
					auth.setDone();
					challenge.resolve(response);
				});
			})
			.catch(error => {
				auth.setError(error);
				challenge.reject(error);
			})
		}

		if (this.loggedIn) {
			log.log('Already logged in as `' + this.user.name + '`: ', this.user);
			return
		}

		this.setBusy();
		return this.dispatch(() => {
			return new Promise((resolve,reject)=>{
				if (! this.challenge()) {
					log.debug('Provoking login challenge');
					return this.provoke()
						.then(challenge => challenge.accepted = true)
						.then(() => {
							log.debug('Server issued a login challenge');
							return remoteLogin(this, this.challenge()).then(resolve).catch(reject);
						});
				}
				return remoteLogin(this, this.challenge()).then(resolve).catch(reject);
			}).then((results) => {log.info('Login', this.user); return results;});
			log.debug('Posting credentials to ', challenge.url);
		});
	}

	logout() {
		log.info('logout', this.user);
		return this.dispatch(() => {
			this.setBusy();
			this.cancel();
			return this.fetch('/logout').catch().then(() => {
				this.setDone();
				this.dispatch(this.createAction(Auth.LOGGED_OUT)());
			})
		});
	}

	register(username, password, confirm) {
		if (username === undefined) {return this.register(this.registerDialog.username.value, this.registerDialog.password.value, this.registerDialog.confirm.value);}

		log.log('register', username, password, confirm);
		this.setBusy();
		return this.dispatch(() => {
			return new Promise((resolve,reject)=>{
				const account = new Account(
					Suid.next(),
					username,
					[new PasswordCredential(Suid.next(), password)]
				);

				log.log('register: creating account', account);
				return this.fetch('/accounts', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(account),
				})
				.then(response => response.text())
				.then(text => fromJSON(text))
				.then(account => {
					log.log('register: created account', account);
					this.login(username, password).then(result => {
						this.setDone();
						resolve(result);
					})
					.catch(error => {
						this.setError(error);
					})
				})
				.catch(error => {
					this.setError(error);
				})
			})
			.catch(error => {
				this.setError(error);
			})
		})
	}

	cancel() {
		log.debug('cancel');
		return this.dispatch(() => {
			if (this.challenge()) {
			const { reject } = this.challenge();
				const error = Error('Login/registration cancelled');
				this.setError(error);
				this.dispatch(this.createAction(Auth.CANCEL)());
				if (reject) {reject(error);}
			}
		});
	}

	provoke() {
		// provoke a login challenge, async
		// provoke a challenge by fetching url
		log.debug('Provoking a login challenge by fetching protected resource.');
		return this.dispatch(()=>{
			return new Promise((accept, deny) => {
				// set up intermediate challenge to make accept and deny survive the round-trip
				this.challenge({}, accept, deny);
				// this fetch will result in 401 and be intercepted, after which
				// challenge will be called again with the actual server challenge
				this.fetch('/challenge')
					.catch(error => log.log('Provoking login challenge failed.', error))
					.catch(deny);
			});
		});
	}

	challenge(challenge, resolve, reject) {
		log.debug('challenge', challenge, resolve, reject);
		// paramless invocation is sync
		if (!challenge) {return this.getState().challenge}
		// only accept challenges on the client side
		if (typeof window != 'object') {reject(new Error('Unauthorized'));}

		// reject any old login challenge
		const c = this.getState().challenge;
		if (c && c.url) {c.reject(new Error("Login challenge cancelled"));}

		// dispatch the challenge
		challenge.resolve = resolve;
		challenge.reject = reject;
		log.debug('dispatching challenge', challenge);
		this.dispatch(this.createAction(Auth.CHALLENGE)(challenge));

		// If there is an old, forced challenge
		if (c && !c.url) {
			// save whether it was manually provoked
			challenge.provoked = c.provoked;
			// if new challenge is login challenge (does have url), forcing challenge is now resolved
			if (challenge.url) {c.resolve && c.resolve(challenge);}
		}
	}
}
export default Auth;

function encode(challenge, username, password) {
	if (challenge.contentType === 'application/x-www-form-urlencoded') {
		return urlEncode(challenge, username, password);
	}
	else {
		error = Error(`Unable to encode the given credentials. Unsupported content type '${challenge.contentType}'.`);
	}
}

function fetchUser(auth) {
	log.debug('fetchUser');
	return auth.fetch('/logged-in-account')
		.then(response => {
			log.log('fetchUser => response=', response);
			return response.status == 200 && response.json();
		})
		.then(user => {
			log.debug('fetchUser => user=', user);
			if (user && !auth.loggedIn) {
				log.debug('Dispatching LOGGED_IN action', user);
				auth.dispatch(auth.createAction(Auth.LOGGED_IN)(user));
			}
			else if (!user && auth.loggedIn) {
				log.debug('Dispatching LOGGED_OUT action');
				auth.dispatch(auth.createAction(Auth.LOGGED_OUT)());
			}
			return user;
		})
		.catch(error => log.error('fetchUser aborted due to error.', error));
}

function urlEncode(challenge, username, password) {
	const uf = encodeURIComponent(challenge.usernameField);
	const u = encodeURIComponent(username);
	const pf = encodeURIComponent(challenge.passwordField);
	const p = encodeURIComponent(password);
	return `${uf}=${u}&${pf}=${p}`;
}