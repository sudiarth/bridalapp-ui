// Polyfill ES6 Promises etc
import 'babel-polyfill';

import log from 'picolog';
log.info('Starting BridalApp UI');

import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { createReducer, bind } from 'redux-apis';
//import thunkMiddleware from 'redux-thunk'
//import createLogger from 'redux-logger'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import AppApi from './components/App/api';

//const loggerMiddleware = createLogger({logger:log});
const createStore = applyMiddleware(
	// thunkMiddleware,
	// loggerMiddleware
)(reduxCreateStore);
const app = new AppApi();
const reducer = createReducer(app);
const store = createStore(reducer);
bind(app, store);

// typeof window == 'object' ? window.app = app : global.app = app;

/*
var jsx = (
	<Provider store={store}>
		<Router history={createBrowserHistory()}>
			{routes}
		</Router>
	</Provider>
);
*/

// var appContainer = document.getElementById('bridalapp');

// log.info('ReactDOM=', ReactDOM);

//ReactDOM.render(jsx, appContainer);

//var log = require('picolog');

//module.exports = function handler() {
//	log.info('It\'s boiling HOT!');
//};