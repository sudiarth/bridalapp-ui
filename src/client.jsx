import log from 'picolog';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

var handler = require('./client-handler');

document.addEventListener('DOMContentLoaded', function(evt) {
	handler();
});

if (module.hot) {
    module.hot.accept('./request-handler', function(){
        log.warn('%c Hot reloading ./request-handler', {color:'green'});
        RequestHandler = require('./request-handler');
    });
}
