import log from 'picolog';
import Api from 'redux-apis';

export class TextfieldApi extends Api {
	static INITIAL_STATE = { value: '' };

	static SET_VALUE = 'SET_VALUE';

	constructor(state = TextfieldApi.INITIAL_STATE) {
		super(state);
		this.setHandler(TextfieldApi.SET_VALUE, (state, {payload}) => ({...state, value:payload}));
		Object.defineProperties(this, {
			value: {enumerable:true, get: () => this.getState().value},
			onChange: {enumerable:true, value:this.setValue.bind(this)}
		})
	}

	setValue(value) {
		return this.dispatch(this.createAction(TextfieldApi.SET_VALUE)(value));
	}
}

export class DrawerApi extends Api {
	static INITIAL_STATE = { open: false };

	static OPEN = 'OPEN';
	static CLOSE = 'CLOSE';

	constructor(state = DrawerApi.INITIAL_STATE) {
		super(state);
		this.setHandler(DrawerApi.OPEN, (state, action) => ({...state, open:true}));
		this.setHandler(DrawerApi.CLOSE, (state, action) => ({...state, open:false}));
		Object.defineProperties(this, {
			open: {enumerable:true, get:() => this.getState().open},
			onCancel: {enumerable:true, value:this.closeDrawer.bind(this)},
			onActivate: {enumerable:true, value:this.openDrawer.bind(this)}
		})
	}

	openDrawer() {
		log.debug('openDrawer');
		return this.dispatch(this.createAction(DrawerApi.OPEN)());
	}

	closeDrawer() {
		log.debug('closeDrawer');
		return this.dispatch(this.createAction(DrawerApi.CLOSE)());
	}
}

export class LightboxApi extends Api {
	static INITIAL_STATE = {open:false, images:[], index:0};

	static OPEN = 'OPEN';
	static NEXT = 'NEXT';
	static PREV = 'PREV';
	static NAV = 'NAV';
	static CANCEL = 'CANCEL';

	constructor(state = LightboxApi.INITIAL_STATE) {
		super(state);
		this.setHandler(LightboxApi.OPEN, (state, { payload:{images, index } }) => ({ ...state, open:true, images, index }));
		this.setHandler(LightboxApi.NEXT, ({ images, index, ...state }) => ({ ...state, images, index: index < images.length - 1 ? index + 1 : index }));
		this.setHandler(LightboxApi.PREV, ({ index, ...state }) => ({ ...state, index: index > 0 ? index - 1 : index }));
		this.setHandler(LightboxApi.NAV, ({ index, ...state }, {payload}) => ({ ...state, index:payload }));
		this.setHandler(LightboxApi.CANCEL, (state, action) => ({ ...state, open:false, images:[], index:0 }));
		Object.defineProperties(this, {
			open: {enumerable:true, get:() => this.getState() && this.getState().open},
			index: {enumerable:true, get:() => this.getState() && this.getState().index},
			images: {enumerable:true, get:() => this.getState() && this.getState().images},
			onOpenLightbox: {enumerable:true, value:this.openLightbox.bind(this)},
			onCancel: {enumerable:true, value:this.cancel.bind(this)},
			onNext: {enumerable:true, value:this.next.bind(this)},
			onPrev: {enumerable:true, value:this.prev.bind(this)},
			onNav: {enumerable:true, value:this.nav.bind(this)}
		})
	}

	openLightbox(images = [], index = 0) {
		log.log('openLightbox', images, index);
		return this.dispatch(this.createAction(LightboxApi.OPEN)({images, index}));
	}

	next() {
		log.log('next');
		this.dispatch(this.createAction(LightboxApi.NEXT)());
	}

	prev() {
		log.log('prev');
		this.dispatch(this.createAction(LightboxApi.PREV)());
	}

	nav(idx) {
		log.log('nav', idx);
		this.dispatch(this.createAction(LightboxApi.NAV)(idx));
	}

	cancel() {
		log.log('cancel');
		this.dispatch(this.createAction(LightboxApi.CANCEL)());
	}
}

