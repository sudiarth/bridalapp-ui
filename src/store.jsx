import log from 'picolog';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { link } from 'redux-apis';

let app = require('./components/App/api').app;
let data = typeof window == 'object' && window.__data || undefined;
export const store = applyMiddleware(thunk)(createStore)(app.reducer, data);
link(store, app);
if (typeof window == 'object') {window.app = app;}
export default store;

if (module.hot) {
	module.hot.accept('./components/App/api', () => {

		const msg = 'Hot-reloading \'./components/App/api\'',
			args = typeof window=='object'? [`%c${msg}`,'color:green'] : [msg];
		log.warn(...args);
		app = require('./components/App/api').app;
		log.log('Replacing store reducer...');
		store.replaceReducer(app.reducer);
		log.log('Re-linking app to store...');
		link(store, app);
		log.log('Re-exposing app to global scope...');
		if (typeof window == 'object') {window.app = app;}
		log.log('Hot-reload done.');
	});
}
