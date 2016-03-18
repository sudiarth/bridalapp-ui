import log from 'picolog';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
// import { createResponsiveStateReducer, responsiveStoreEnhancer } from 'redux-responsive';
import { link, namedLink } from 'redux-apis';

import { fromJSON } from './components/Entity/Entity';

function createReducer(app) {
	const rootReducer = combineReducers({
		/*
		browser: createResponsiveStateReducer({
			// Breakpoints for responsive layout. Chosen to group similar devices.
			// Note that these are *CSS pixels* we are talking about, not *physical pixels*.
			// Read more here: http://www.quirksmode.org/blog/archives/2010/04/a_pixel_is_not.html
			// E.G. the iPhone 4 screen has a resolution of 640x960 physical pixels, but only 320x480
			// CSS pixels; manufacturers choose a `devicePixelRatio` suitable for their device, because
			// if we render text at the normal size on these device's high DPI screens, it would become
			// illegibly small. As such, these numbers are unlikely to radically change, even if
			// physical resolutions keep improving, because they are more related to the dimensions of
			// the screen in centimeters than to the resolution in pixels.
			// SEE: http://www.mydevice.io/devices/
						// < 320: unsupported
			xxs: 320,	// < 360: small phones, portrait (e.g. iPhone 4)
			xs: 360,	// < 480: large phones/phablets, portrait (e.g. Samsung Galaxy S5, iPhone 6 Plus)
			sm: 480,	// < 720: small tablets, portrait
			md: 720,	// < 1025: large tablets, portrait
			lg: 1025,	// < 1600: small monitor, landscape (cutoff at 1025 i.s.o 1024 to exclude tablets with 1024x1440 resolution)
			xl: 1600,	// < 2560: HD monitor
			xxl: 2560,	// Projection screens, VR devices?
		}),
		*/
		app: app.reducer,
	});

	return function(state, action) {
		const currentState = action.type === '@@bridalapp/RESET' ? undefined : state;
		return rootReducer(currentState, action);
	}
}

const storeEnhancer = typeof window == 'object'
		? compose(applyMiddleware(thunk, createLogger({logger: log})))
		: compose(applyMiddleware(thunk));


let AppApi = require('./components/App/api').AppApi;
let app = new AppApi();
export const store = createStore(
	createReducer(app),
	typeof window == 'object' && window.__data && fromJSON(window.__data) || undefined,
	storeEnhancer
);
store.app = link(store, app);
export default store;


if (typeof window == 'object') {
	window.bridalapp = store.app;
}

if (module.hot) {
	module.hot.accept('./components/App/api', () => {

		const msg = 'Hot-reloading \'./components/App/api\'',
			args = typeof window=='object'? [`%c${msg}`,'color:green'] : [msg];

		AppApi = require('./components/App/api').AppApi;
		app = new AppApi();
		store.replaceReducer(createReducer(app));
		store.app = link(store, app);
		if (typeof window == 'object') {window.bridalapp = app;}
	});
}
