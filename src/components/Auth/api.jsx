import log from 'picolog';
import Api, { link } from 'redux-apis';
import Async from 'redux-async-api';
import { remote } from 'redux-fetch-api';

import { TextfieldApi } from '../Mdl/api';
import { fromJSON, toJSON, indexOf } from '../Entity/Entity';

import Suid from 'ws.suid';
import PasswordCredential from './PasswordCredential';
import Account from './Account';
import Role from './Role';

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

const NULL_SESSION = {sessionId:null, user:null};

@remote
export class AuthApi extends Async {
	static CHALLENGE = 'AUTH_CHALLENGE';
	static LOGGED_IN = 'LOGGED_IN';
	static LOGGED_OUT = 'LOGGED_OUT';
	static CANCEL = 'CANCEL_AUTH';

	static INITIAL_STATE = {
		...Async.INITIAL_STATE,
		session: NULL_SESSION,
		challenge: null,
	};

	constructor(state = AuthApi.INITIAL_STATE) {
		super(state);
		this.setHandler(AuthApi.CHALLENGE, (state, {payload}) => ({...state, challenge:payload}));
		this.setHandler(AuthApi.LOGGED_IN,	(state, {payload}) => ({...state, session:payload, challenge:null}));
		this.setHandler(AuthApi.LOGGED_OUT, (state, {payload}) => ({...state, session:payload, challenge:null}));
		this.setHandler(AuthApi.CANCEL, (state, action) => ({...state, challenge:null}));
		Object.defineProperty(this, 'loggedIn', {enumerable:true, get: () => !!(this.session && this.session.user)});
		Object.defineProperty(this, 'challenged', {enumerable:true, get: () => !!(this.challenge() && this.challenge().url && !this.challenge().accepted)});
		Object.defineProperty(this, 'session', {enumerable:true, get: () => this.getState().session});
		Object.defineProperty(this, 'onProvoke', {enumerable:true, value: () => this.provoke()});
		Object.defineProperty(this, 'onCancel', {enumerable:true, value: () => this.cancel()});
		Object.defineProperty(this, 'onLogin', {enumerable:true, value: () => this.login()});
		Object.defineProperty(this, 'onLogout', {enumerable:true, value: () => this.logout()});
		Object.defineProperty(this, 'onRegister', {enumerable:true, value: () => this.register()});
		this.loginDialog = link(this, new LoginDialogApi())
		this.registerDialog = link(this, new RegisterDialogApi())
	}

	loadSession() {
		log.debug('loadSession');
		this.setBusy();
		return fetchSessionInfo(this)
			.then(session => {
				log.log('loadSession => ', session);
				this.setDone();
				return session;
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
				return fetchSessionInfo(auth)
					.then(session => {
						auth.setDone();
						challenge.resolve(response);
						return session;
					});
			})
			.catch(error => {
				auth.setError(error);
				challenge.reject(error);
			})
		}

		if (this.loggedIn) {
			log.log('Already logged in as `' + this.session.user.name + '`: ', this.session.user);
			return
		}

		this.setBusy();
		return this.dispatch(() => {
			return new Promise((resolve,reject)=>{
				if (! this.challenge()) {
					log.debug('Provoking login challenge');
					return this.provoke()
						.then(challenge => {
							log.debug('Server issued a login challenge');
							return remoteLogin(this, challenge).then(resolve).catch(reject);
						});
				}
				return remoteLogin(this, this.challenge()).then(resolve).catch(reject);
			}).then((results) => {log.debug('Login', username); return results;});
			log.debug('Posting credentials to ', challenge.url);
		});
	}

	logout() {
		log.debug('logout', this.session.user);
		return this.dispatch(() => {
			this.setBusy();
			this.cancel();
			return this.fetch('/logout').catch().then(() => {
				this.setDone();
				this.dispatch(this.createAction(AuthApi.LOGGED_OUT)(NULL_SESSION));
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
					body: toJSON(account),
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
						log.error(error);
						this.setError(error);
					})
				})
				.catch(error => {
					log.error(error);
					this.setError(error);
				})
			})
			.catch(error => {
				log.error(error);
				this.setError(error);
			})
		})
	}

	cancel() {
		log.log('cancel');
		return this.dispatch(() => {
			const c = this.challenge();
			if (c) {
				const error = Error('Login/registration cancelled');
				this.setError(error);
				this.dispatch(this.createAction(AuthApi.CANCEL)());
				if (c.reject) {c.reject(error);}
			}
		});
	}

	authenticated() {
		log.log('authenticated');
		const auth = this;
		return new Promise((resolve, reject) => {
			if (auth.loggedIn) {resolve(auth.session);}
			else auth.provoke(resolve, reject);
		});
	}

	provoke(resolve, reject) {
		log.log('provoke', resolve, reject);
		// provoke a login challenge, async
		// provoke a challenge by fetching url
		return new Promise((accept, deny) => {
			// set up intermediate challenge to make accept and deny survive the round-trip
			this.challenge({}, accept, deny);
			// this fetch will result in 401 and be intercepted, after which
			// challenge will be called again with the actual server challenge
			this.fetch('/challenge')
				.then(response => {
					if (response && response.status == 200) {
						return response.text();
					}
					return response.text().then(text => {
						const error = new Error(text);
						error.status = response.status;
						error.statusText = response.statusText;
						throw error;
					});
				})
				.then(text => fromJSON(text))
				.then(session => processSession(this, session))
				.then(session => {
					if (resolve) {resolve(session);}
					return session;
				})
				.catch(error => {
					log.log('Provoking login challenge failed.', error);
					if (reject) {reject(error);}
				})
		});
	}

	challenge(challenge, resolve, reject) {
		// paramless invocation is sync
		if (!challenge) {return this.getState().challenge}
		// only accept challenges on the client side
		if (typeof window != 'object') {reject(new Error('Unauthorized'));}

		log.log('challenge', challenge, resolve, reject);

		// reject any old login challenge
		const c = this.getState().challenge;
		if (c && c.url) {c.reject(new Error("Login challenge cancelled"));}

		// dispatch the challenge
		challenge.resolve = resolve;
		challenge.reject = reject;
		log.debug('dispatching challenge', challenge);
		this.dispatch(this.createAction(AuthApi.CHALLENGE)(challenge));

		// If there is an old, forced challenge and new challenge is login challenge
		if (c && !c.url && c.resolve && challenge.url) {
			// if new challenge is login challenge (does have url), forcing challenge is now resolved
			c.resolve(challenge);
		}
	}

	is(role) {
		log.debug('is', role);
		const roles = this.session.user && this.session.user.roles || [];
		return indexOf(roles, role) !== -1;
	}

	isAny(roles) {
		log.debug('isAny');
		for (let i=0, role; role=roles[i]; i++) {
			if (this.is(role)) {
				return true;
			}
		}
		return false;
	}

	isAll(roles) {
		log.debug('isAll');
		for (let i=0, role; role=roles[i]; i++) {
			if (!this.is(role)) {
				return false;
			}
		}
		return true;
	}
}
export default AuthApi;

export function authenticated(target) {
	function enhance(target) {
		log.debug('authenticated', target);
		Object.defineProperties(target.prototype, {
			authenticated: {value:function() {
				let p = this;
				while (p = p.__parent) {
					if (p.authenticated) {
						return p.authenticated();
					}
				}
				return Promise.reject(new Error('No authentication method'));
			}},

			getSession: {value:function() {
				let p = this;
				while (p = p.__parent) {
					if (p.getSession) {
						return p.getSession();
					}
				}
				return null;
			}},

			auth: {get: function() {
				let p = this;
				while (p = p.__parent) {
					if (p.auth) {
						return p.auth;
					}
				}
			}}
		});
		log.trace('authenticated => ', target);
		return target;
	}
	return target ? enhance(target) : enhance;
}

function fetchSessionInfo(auth) {
	log.debug('fetchSessionInfo');
	return auth.fetch('/session')
		.then(response => {
			log.debug('fetchSessionInfo => response.status=', response.status);
			return response.status == 200 && response.text();
		})
		.then(text => {
			log.log('fetchSessionInfo => text=', text);
			return fromJSON(text);
		})
		.then(session => processSession(auth, session))
}

function processSession(auth, session) {
	log.debug('processSession', session);
	const { user, sessionId } = session;
	log.log('processSession => sessionId=', sessionId);
	log.log('processSession => user=', user);
	if (typeof document == 'object') {
		const maxAge = sessionId ? 10 * 24 * 60 * 60 : 0;
		document.cookie = `BASESSION=${sessionId}; Max-Age=${maxAge}; path=/`;
		log.debug('processSession => cookie ' + (maxAge ? 'set' : 'cleared'));
	}
	if (user && !auth.loggedIn) {
		log.debug('fetchSessionInfo => Dispatching LOGGED_IN action', session);
		auth.dispatch(auth.createAction(AuthApi.LOGGED_IN)(session));
	}
	else if (!user && auth.loggedIn) {
		log.debug('fetchSessionInfo => Dispatching LOGGED_OUT action');
		auth.dispatch(auth.createAction(AuthApi.LOGGED_OUT)(session));
	}
	return session;
}


function encode(challenge, username, password) {
	if (challenge.contentType === 'application/x-www-form-urlencoded') {
		return urlEncode(challenge, username, password);
	}
	else {
		error = Error(`Unable to encode the given credentials. Unsupported content type '${challenge.contentType}'.`);
	}
}

function urlEncode(challenge, username, password) {
	const uf = encodeURIComponent(challenge.usernameField);
	const u = encodeURIComponent(username);
	const pf = encodeURIComponent(challenge.passwordField);
	const p = encodeURIComponent(password);
	return `${uf}=${u}&${pf}=${p}`;
}