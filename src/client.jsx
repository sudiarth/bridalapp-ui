import log from 'picolog';
log.info('Starting BridalApp UI');

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { RootApi } from 'redux-apis';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const storeCreator = applyMiddleware(thunk)(createStore);


var routes = require('./routes').default;
var AppApi = require('./components/App/api').default;

const app = new RootApi(AppApi, storeCreator, window.__data);

typeof window == 'object' ? window.app = app : global.app = app;


var jsx = (
	<Provider store={app.store}>
		<Router history={createBrowserHistory()}>
			{routes}
		</Router>
	</Provider>
);

ReactDOM.render(jsx, document.getElementById('bridalapp'));


if (module.hot) {
    module.hot.accept('./routes', function(){
        log.warn('%c Hot reloading \'./routes\'', {color:'green'});
		routes = require('./routes').default;
    });
    module.hot.accept('./components/App/api', function(){
        log.warn('%c Hot reloading \'./components/App/api\'', {color:'green'});
        AppApi = require('./components/App/api').default;
		app.bind(AppApi);
    });
}
