import log from 'picolog';
import Api from 'redux-apis';

log.debug('DrawerApi: Api=', Api);

export default class DrawerApi extends Api {
	constructor(state) {
		super(state);
		this.addHandler('OPEN', (action) => ({...this.state, open:true}));
		this.addHandler('CLOSE', (action) => ({...this.state, open:false}));
	}

	open() {
		this.dispatch(this.createAction('OPEN')());
	}

	close() {
		this.dispatch(this.createAction('CLOSE')());
	}

	isOpen() {
		return this.state.open;
	}
}

