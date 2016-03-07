import log from 'picolog';
log.info('Starting BridalApp UI');
import { Api, link } from 'redux-apis';
import { CALCULATE_RESPONSIVE_STATE } from 'redux-responsive';
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

function updateResponsiveState() {
	const {innerWidth, innerHeight, matchMedia} = window;
	store.dispatch({
        type: CALCULATE_RESPONSIVE_STATE,
        innerWidth,
        innerHeight,
        matchMedia
	});
}

const interval = setInterval(updateResponsiveState, 25);

window.addEventListener('load', () => {
	clearInterval(interval);
	updateResponsiveState();
});


if (module.hot) {
    module.hot.accept('./routes', function(){
		const msg = 'Hot-reloading \'./routes\'',
			args = typeof window=='object'? [`%c${msg}`,'color:green'] : [msg];
		routes = require('./routes').default;
    });
}
