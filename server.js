#!/bin/env node
(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var _express = __webpack_require__(2);
	
	var _express2 = _interopRequireDefault(_express);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = (0, _express2.default)();
	
	console.info('process.env.PORT=' + ({"NODE_ENV":"production"}).PORT);
	
	app.set('port', ({"NODE_ENV":"production"}).PORT || 80);
	
	app.use(_express2.default.static(__dirname + '/public'));
	
	app.get('/', function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
		res.end('<!DOCTYPE html><html><head><title>Status</title></head><body><h1 style="color:green">ONLINE</h1><p>BridalApp is ONLINE</p></body></html>');
	});
	
	app.listen(app.get('port'), function () {
		console.log('Node app is running on port', app.get('port'));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ }
/******/ ])));
//# sourceMappingURL=server.js.map