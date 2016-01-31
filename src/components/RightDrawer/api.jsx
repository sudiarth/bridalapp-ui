import log from 'picolog';
import Api from 'redux-apis';

export default class DrawerApi extends Api {
	static INITIAL_STATE = { open: false };

	constructor(state = DrawerApi.INITIAL_STATE) {
		super(state);
		this.setHandler('OPEN', (state, action) => ({...state, open:true}));
		this.setHandler('CLOSE', (state, action) => ({...state, open:false}));
	}

	open() {
		this.dispatch(this.createAction('OPEN')());
	}

	close() {
		this.dispatch(this.createAction('CLOSE')());
	}

	isOpen() {
		return this.getState().open;
	}
}

