import log from 'picolog';
log.info('Starting BridalApp UI');
import { Api, link } from 'redux-apis';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import store from './store';

var routes = require('./routes').routes;

var jsx = (
	<Provider store={store}>
		<Router history={browserHistory}>
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
}
