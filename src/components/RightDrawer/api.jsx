import log from 'picolog';
import Api from 'redux-apis';

log.debug('DrawerApi: Api=', Api);

export default class DrawerApi extends Api {
	static OPEN = 'OPEN';
	static CLOSE = 'CLOSE';

	open() {
		this.dispatch(this.createAction(DrawerApi.OPEN));
	}

	close() {
		this.dispatch(this.createAction(DrawerApi.CLOSE));
	}

	isOpen() {
		return this.state.open;
	}

	handle(action) {
		switch(action.type) {
			case DrawerApi.OPEN: return this.state.open ? this.state : {open:true};
			case DrawerApi.CLOSE: return this.state.open ? {open:false} : this.state;
			default: return this.state || {open:false};
		}
	}
}

