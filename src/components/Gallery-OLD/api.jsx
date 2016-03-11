import log from 'picolog';
import Api from 'redux-apis';

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

		Object.defineProperty(this, 'open', {enumerable:true, get:() => this.getState() && this.getState().open});
		Object.defineProperty(this, 'index', {enumerable:true, get:() => this.getState() && this.getState().index});
		Object.defineProperty(this, 'images', {enumerable:true, get:() => this.getState() && this.getState().images});
		Object.defineProperty(this, 'onOpenLightbox', {enumerable:true, value:this.openLightbox.bind(this)});
		Object.defineProperty(this, 'onCancel', {enumerable:true, value:this.cancel.bind(this)});
		Object.defineProperty(this, 'onNext', {enumerable:true, value:this.next.bind(this)});
		Object.defineProperty(this, 'onPrev', {enumerable:true, value:this.prev.bind(this)});
		Object.defineProperty(this, 'onNav', {enumerable:true, value:this.nav.bind(this)});
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
export default LightboxApi;
