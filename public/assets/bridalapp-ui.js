/* bridalapp-ui */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {(function (u, m, d) {
		if (true) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (d), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}
		else if (typeof exports == 'object') {module.exports = d();} 
		else {u[m] = d();}
	}(this, 'log', function() {

	var log = {NONE:0, ERROR:1, WARN:2, INFO:3, LOG:4, DEBUG:5, TRACE:6},
		p=typeof process=='object' && process, prod = p && p.env.NODE_ENV === 'production',
		level = typeof window=='object' && qry() || env() || log.WARN,
		names = (function(){
			return Object.keys(log).slice(1, Object.keys(log).length).map(function(x){return x.toLowerCase();});
		})();

	Object.defineProperty(log, 'picolog', {configurable:false, enumerable:false, value:{version:'1.0.0'}});

	Object.defineProperty(log, 'level', {
		get: function(){return level;},
		set: function(lvl) {if (lvl >= 0 && lvl <= 6) {patch(level = lvl);}}
	});

	patch(level);

	function patch(lvl) {
		for (var i=0,name; name=names[i]; i++) {log[name] = lvl < i+1 ? nop : logger(name, lvl);}
	}

	function logger(name, lvl) {
		return typeof console == 'object' ? (console[name] ? console[name] : console.log).bind(console) : (
			typeof print == 'function' ? print : function() {
				if (typeof console == 'object') {patch(lvl); log[name].apply(log, arguments);}
			}
		);
	}

	log.dir = log.time = log.timeEnd = nop;
	log.assert = prod ? nop : function(){var a=[].concat.apply([], arguments), ok=a.shift(); if (!ok) {log.error.apply(log, a);}};
	function nop(){}
	function lvl(n) {return log[n.toUpperCase()] || Number(n);}
	function env() {return p && p.env.PICOLOG_LEVEL && lvl(p.env.PICOLOG_LEVEL);}
	function qry() {
		var qs = window.location.search.substring(1);
		for (var m; m = qs && /([^&=]+)=?([^&]*)/g.exec(qs); ) {
			if (m[1] == 'log') {return lvl(m[2]);}
		}
	}

	return log;
	}));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){var n=arguments.length<=2||void 0===arguments[2]?o:arguments[2];return e.__parent=t,t instanceof l&&(e.__link=n.bind(e)),e}function o(t,e){return void 0===e?"object"==("undefined"==typeof t?"undefined":s(t))&&this.__parent?t[a(this.__parent,this)]:t:"object"==("undefined"==typeof t?"undefined":s(t))&&this.__parent?t[a(this.__parent,this)]=e:e}function a(t,e){for(var n,r=Object.keys(t),i=0;n=r[i];i++)if(t[n]===e)return n}function u(t,e,n){var r="function"==typeof e?e:function(t){return t};return function(){var e={type:t,payload:r.apply(void 0,arguments)};return 1===arguments.length&&(arguments.length<=0?void 0:arguments[0])instanceof Error&&(e.error=!0),"function"==typeof n&&(e.meta=n.apply(void 0,arguments)),e}}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();Object.defineProperty(e,"__esModule",{value:!0}),e.link=i;var l=e.Api=function(){function t(){var e=this,n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];r(this,t),Object.defineProperties(this,{__actionHandlers:{value:{}},__state:{value:n,writable:!0},__dispatch:{value:function(t){return"function"==typeof t?t(e.dispatch.bind(e),e.getState.bind(e)):(n=e.reducer(n,t),t)}},__parent:{value:void 0,writable:!0},__link:{value:void 0,writable:!0},connector:{value:this.connector.bind(this)},reducer:{value:this.reducer.bind(this)}})}return f(t,[{key:"init",value:function(){return this.dispatch(this.createAction("@@redux/INIT")()),this}},{key:"dispatch",value:function(t){return this.__parent?this.__parent.dispatch(t):this.__dispatch(t)}},{key:"getState",value:function(){return this.__parent?this.__link?this.__link(this.__parent.getState()):this.__parent.getState():this.__state}},{key:"createAction",value:function(e,n,r){return this.__parent instanceof t?this.__parent.createAction(a(this.__parent,this)+"/"+e,n,r):u(e,n,r)}},{key:"setHandler",value:function(t,e){this.__actionHandlers[t]=e}},{key:"clearHandler",value:function(t){delete this.__actionHandlers[t]}},{key:"connector",value:function(t,e){return c({},this.getState(),e,{api:this})}},{key:"reducer",value:function(e,r){var i=this,o=r.type.indexOf("/"),a=-1!==o&&r.type.substring(0,o),u=this.__actionHandlers[r.type]?this.__actionHandlers[r.type].call(this,e,r):void 0===e?this.__state:void 0,s=Object.keys(this).filter(function(e){return i[e]instanceof t});return s.forEach(function(t){var s=t!==a?r:c({},r,{type:r.type.substring(o+1)}),f=i[t].reducer(i[t].__link(e),s);(void 0===e||i[t].__link&&void 0===i[t].__link(e)||i[t].getState()!==f)&&(void 0===u&&(u=e instanceof Array?[].concat(n(e)):c({},e)),i[t].__link(u,f))}),this.__state=u||e}}]),t}();e["default"]=l}])});
	//# sourceMappingURL=redux-apis.min.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Provider = __webpack_require__(53);
	var connect = __webpack_require__(54);

	module.exports = { Provider: Provider, connect: connect };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var o in n)("object"==typeof exports?exports:t)[o]=n[o]}}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e){(function(t){"use strict";function n(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0];return"string"!=typeof t?n()(t):function(e){return"function"==typeof e?e.prototype.fetch=u(t):e.fetch=u(t).bind(e),e}}function o(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0],e=arguments.length<=1||void 0===arguments[1]?null:arguments[1],n=arguments.length<=2||void 0===arguments[2]?i():arguments[2];return"string"!=typeof t?o()(t):function(o){var r="function"==typeof o?o.prototype:o;return r.__endpoint=n&&e||t,o}}function r(t){return function(e){var n="function"==typeof e?e.prototype:e;return n.__fetch=t,e}}function u(t){return function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],n=arguments.length<=1||void 0===arguments[1]?void 0:arguments[1],o=arguments.length<=2||void 0===arguments[2]?!1:arguments[2];if(this.__endpoint)e=o&&e||this.__endpoint+t+e;else{e=!o&&t?t+e:e;for(var r=this;r=r.__parent;)if(r.fetch)return r.fetch(e,n,o)}return this.__fetch?this.__fetch(e,n):s(e,n)}}function i(){return"object"==("undefined"==typeof window?"undefined":f(window))&&"undefined"==typeof t}var f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};Object.defineProperty(e,"__esModule",{value:!0}),e.remote=n,e.endpoint=o,e.fetcher=r;var s="object"==("undefined"==typeof window?"undefined":f(window))&&window.fetch||t.fetch;e["default"]=n}).call(e,function(){return this}())}])});
	//# sourceMappingURL=redux-fetch-api.min.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _dec, _class;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.app = exports.AppApi = undefined;

	var _reduxApis = __webpack_require__(4);

	var _reduxApis2 = _interopRequireDefault(_reduxApis);

	var _reduxFetchApi = __webpack_require__(7);

	var _api = __webpack_require__(36);

	var _api2 = _interopRequireDefault(_api);

	var _api3 = __webpack_require__(27);

	var _api4 = _interopRequireDefault(_api3);

	var _api5 = __webpack_require__(32);

	var _api6 = _interopRequireDefault(_api5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var API_URL = '/api';
	if (typeof process != 'undefined') {
		var host = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
		var port = process.env.OPENSHIFT_NODEJS_PORT || '80';
		var path = process.env.BRIDALAPP_API_SERVER_PATH || '/api';
		API_URL = 'http://' + host + (port === '80' ? '' : ':' + port) + path;
	}

	var AppApi = exports.AppApi = (_dec = (0, _reduxFetchApi.remote)(API_URL), _dec(_class = function (_Api) {
		_inherits(AppApi, _Api);

		function AppApi(state) {
			_classCallCheck(this, AppApi);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppApi).call(this, state));

			_this.rightDrawer = (0, _reduxApis.link)(_this, new _api2.default());
			_this.brands = (0, _reduxApis.link)(_this, new _api4.default());
			_this.products = (0, _reduxApis.link)(_this, new _api6.default());
			return _this;
		}

		_createClass(AppApi, [{
			key: 'reducer',
			value: function reducer(state, action) {
				return _get(Object.getPrototypeOf(AppApi.prototype), 'reducer', this).call(this, state, action);
			}
		}]);

		return AppApi;
	}(_reduxApis2.default)) || _class);
	var app = exports.app = new AppApi();
	exports.default = app;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _basicClassCreator = __webpack_require__(50);

	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _basicClassCreator2.default)('Spacer', 'mdl-layout-spacer');

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = ReactRouter;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Back = exports.Front = exports.CardFace = exports.CardActions = exports.SupportingText = exports.CardMedia = exports.SubtitleText = exports.CardTitle = undefined;
	exports.Card = Card;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var string = _react.PropTypes.string;
	var node = _react.PropTypes.node;
	var bool = _react.PropTypes.bool;

	function simpleComponent(defaultClass) {
		var result = function result(props) {
			var className = props.className;
			var defaultClass = props.defaultClass;
			var children = props.children;

			var otherProps = _objectWithoutProperties(props, ['className', 'defaultClass', 'children']);

			var classes = (0, _classnames2.default)(className, defaultClass);
			return _react2.default.createElement(
				'div',
				_extends({ className: classes }, otherProps),
				children
			);
		};
		result.propTypes = {
			className: string,
			defaultClass: string.isRequired,
			children: node
		};

		result.defaultProps = {
			defaultClass: defaultClass
		};

		return result;
	}

	var CardTitle = exports.CardTitle = simpleComponent('mdl-card__title');
	var SubtitleText = exports.SubtitleText = simpleComponent('mdl-card__subtitle-text');
	var CardMedia = exports.CardMedia = simpleComponent('mdl-card__media');
	var SupportingText = exports.SupportingText = simpleComponent('mdl-card__supporting-text');
	var CardActions = exports.CardActions = simpleComponent('mdl-card__actions');
	var CardFace = exports.CardFace = simpleComponent('mdl-card__face');
	var Front = exports.Front = simpleComponent(CardFace.defaultProps.defaultClass + ' mdl-card__front');
	var Back = exports.Back = simpleComponent(CardFace.defaultProps.defaultClass + ' mdl-card__back');

	function Card(props) {
		var className = props.className;
		var cardClass = props.cardClass;
		var shadowClass = props.shadowClass;
		var flippedClass = props.flippedClass;
		var flipped = props.flipped;
		var children = props.children;

		var otherProps = _objectWithoutProperties(props, ['className', 'cardClass', 'shadowClass', 'flippedClass', 'flipped', 'children']);

		var classes = (0, _classnames2.default)(className, cardClass, shadowClass, { flippedClass: flipped });
		return _react2.default.createElement(
			'div',
			_extends({ className: classes }, otherProps),
			children
		);
	}

	Card.propTypes = {
		className: string,
		cardClass: string,
		shadowClass: string,
		flippedClass: string,
		flipped: bool,
		children: node
	};

	Card.defaultProps = {
		cardClass: 'mdl-card mdl-flip-card',
		shadowClass: 'mdl-shadow--2dp',
		flippedClass: 'is-flipped',
		flipped: false
	};

	exports.default = Card;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Scroller = (_temp = _class = function (_React$Component) {
		_inherits(Scroller, _React$Component);

		function Scroller(props) {
			_classCallCheck(this, Scroller);

			// direction, itemCount, items, itemSize, itemsPer

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Scroller).call(this, props));

			_this.state = _this.getState(props);
			_this.onScroll = _this.onScroll.bind(_this);
			return _this;
		} // function(index)

		_createClass(Scroller, [{
			key: 'getState',
			value: function getState(props) {
				var dir = props.direction;
				var initialItemsInView = this.props.initialItemsInView;
				var items = props.items instanceof Array ? { 0: props.items } : props.items;
				var itemCount = props.itemCount !== undefined ? props.itemCount : items && items[0] && items[0].length || 0;
				var itemSize = props.itemSize;
				var itemsPer = props.itemsPer;
				var bufferBefore = props.bufferBefore;
				var bufferAfter = props.bufferAfter;
				var containerCount = ~ ~(itemCount / itemsPer) + (~ ~(itemCount % itemsPer) ? 1 : 0);

				var scroller = this.mounted ? _reactDom2.default.findDOMNode(this) : undefined;
				var scrollerSize = scroller ? getSize(dir, scroller) : Math.min(initialItemsInView, containerCount) * itemSize;
				var slider = this.refs.slider;
				var sliderOffset = scroller ? posDifference(dir, slider, scroller) : 0;
				var sliderScroll = scroller ? getScrollPos(dir, scroller) : 0;
				var renderedItems = [];

				var containersBefore = ~ ~(sliderScroll / itemSize);
				var bufBefore = Math.min(containersBefore, bufferBefore);
				var skippedContainers = containersBefore - bufBefore;
				var skippedItems = skippedContainers * itemsPer;
				var firstIdx = skippedItems;
				var containersInView = ~ ~(scrollerSize / itemSize) + (~ ~(scrollerSize % itemSize) ? 1 : 0);
				var lastIdx = Math.min(firstIdx + containersInView * itemsPer + bufferAfter * itemsPer, itemCount - 1);
				for (var i = firstIdx; i <= lastIdx; i++) {
					var item = items[0][i] || null;
					renderedItems.push(item);
				}
				var renderedContainerCount = ~ ~(renderedItems.length / itemsPer) + (~ ~(renderedItems.length % itemsPer) ? 1 : 0);
				var sizeBefore = ~ ~(firstIdx / itemsPer) * itemSize;
				var sizeItems = renderedContainerCount * itemSize;
				var sizeAfter = containerCount * itemSize - sizeBefore - sizeItems;

				return {
					renderedItems: renderedItems,
					firstRenderedItemIndex: firstIdx,
					lastRenderedItemIndex: lastIdx,
					size: scrollerSize,
					sizeBefore: sizeBefore,
					sizeItems: sizeItems,
					sizeAfter: sizeAfter
				};
			}
		}, {
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {
				if (this.state.size !== nextState.size) return true;
				if (this.state.sizeBefore !== nextState.sizeBefore) return true;
				if (this.state.sizeAfter !== nextState.sizeAfter) return true;
				if (!arraysEqual(this.state.renderedItems, nextState.renderedItems)) return true;
				return false;
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				this.setState(this.getState(nextProps));
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.onScrollDebounced = debounce(this.onScroll, this.props.scrollDebounce, false);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.mounted = true;
				this.setState(this.getState(this.props));
				_reactDom2.default.findDOMNode(this).addEventListener('scroll', this.onScrollDebounced);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				_reactDom2.default.findDOMNode(this).removeEventListener('scroll', this.onScrollDebounced);
				this.mounted = false;
			}
		}, {
			key: 'onScroll',
			value: function onScroll() {
				this.setState(this.getState(this.props));
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var slider = {},
				    before = {},
				    items = {},
				    after = {},
				    itm = {},
				    dir = this.props.direction;
				var dim = dir == 'horizontal' ? 'width' : 'height';
				slider[dim] = this.state.sizeBefore + this.state.sizeItems + this.state.sizeAfter;
				before[dim] = this.state.sizeBefore;
				items[dim] = this.state.sizeItems;
				itm[dim] = this.props.itemSize;
				after[dim] = this.state.sizeAfter;
				return _react2.default.createElement(
					'div',
					{ className: 'Scroller ' + dir + ' per' + this.props.itemsPer },
					_react2.default.createElement(
						'div',
						{ className: 'ScrollSlider', ref: 'slider', style: slider
						},
						_react2.default.createElement('div', { className: 'ScrollSpacer ScrollSpacerBefore', ref: 'spacerBefore', style: before }),
						_react2.default.createElement(
							'div',
							{ className: 'ScrollItems', style: items },
							this.state.renderedItems.map(function (item, idx) {
								idx = idx + _this2.state.firstRenderedItemIndex;
								var key = _this2.props.keyForItem ? _this2.props.keyForItem(item, idx) : 'item' + idx;
								var renderItem = _this2.props.renderItem;
								if (item === null) {
									if (_this2.props.renderLoadingItem) {
										renderItem = _this2.props.renderLoadingItem;
									} else {
										item = {};
									}
								}
								return _react2.default.createElement(
									'div',
									{ className: 'ScrollItem', key: key, style: itm },
									renderItem(item, idx)
								);
							})
						),
						_react2.default.createElement('div', { className: 'ScrollSpacer ScrollSpacerAfter', ref: 'spacerAfter', style: after })
					)
				);
			}
		}]);

		return Scroller;
	}(_react2.default.Component), _class.propTypes = {
		/**
	  * The direction to scroll in, either 'vertical' or 'horizontal'.
	  * Defaults to 'vertical'.
	  */
		direction: _react2.default.PropTypes.oneOf(['vertical', 'horizontal']),

		/**
	  * The items to be scrolled over.
	  * Defaults to `{0:[]}`.
	  *
	  * An object mapping page indexes to arrays of items for those pages
	  * that will be used as the initial data to load into the page buffer.
	  * When paging is not used or only a single page is provided as initial
	  * data, one can supply an array as shorthand for assigning an object
	  * with only page 0 set:
	  *
	  * items = {[{..}, {..}, ..]}
	  *
	  * is equivalent to
	  *
	  * items = {{0: [{..}, {..}, ..]}}
	  */
		items: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.array]),

		/**
	  * Size of an item in the scroll direction, in pixels.
	  * Defaults to 300.
	  *
	  * For a vertical scroller, set this to the height of each
	  * item, for a horizontal scroller, use the width.
	  */
		itemSize: _react2.default.PropTypes.number.isRequired,

		/**
	  * Number of items to be renderer initially, before the component
	  * is mounted.
	  * Defaults to 100.
	  *
	  * This will determine how many items are rendered
	  * during server-side rendering and hence how many items googlebot
	  * will see when visiting the page.
	  */
		initialItemsInView: _react2.default.PropTypes.number,

		/**
	  * Number of items shown per row/column.
	  * Defaults to 1.
	  *
	  * For a vertical scroller, set this if there are multiple items per row,
	  * for a horizontal scroller, if there are multiple items per column. You
	  * must ensure that this setting corresponds with the actual situation.
	  * If this setting differs from what is really happening, the scroll
	  * calculations will be off and the behavior will break down.
	  */
		itemsPer: _react2.default.PropTypes.number,

		/**
	  * Size of buffer before the first visible item, defaults to 1.
	  * Enables smoother scrolling by pre-rendering some items into a buffer area
	  * just outside the visible viewport, causing images to be pre-loaded.
	  * The number of items rendered before the first visible item will be
	  * the value of this property, multiplied by `itemsPer`.
	  */
		bufferBefore: _react2.default.PropTypes.number,

		/**
	  * Size of buffer after the last visible item, defaults to 1.
	  * Enables smoother scrolling by pre-rendering some items into a buffer area
	  * just outside the visible viewport, causing images to be pre-loaded.
	  * The number of items rendered after the last visible item will be
	  * the value of this property, multiplied by `itemsPer`.
	  */
		bufferAfter: _react2.default.PropTypes.number,

		/**
	  * Whether to snap items to grid when scrolling comes to an end.
	  *
	  * NOT IMPLEMENTED YET. IMPLEMENTATION SHOULD BE BASED ON CSS Scroll Snap Points
	  * http://www.w3.org/TR/css-snappoints-1/
	  * Backed by a polyfill for non-compliant browsers (many still unfortunately)
	  *
	  * Reason: We want fluid native scrolling on iPhone.
	  */
		snap: _react2.default.PropTypes.bool,

		/**
	  * Render function accepting an item and it's index and returning
	  * the markup for that item. This function should accept empty
	  * objects for it's item parameter and return valid markup either way.
	  */
		renderItem: _react2.default.PropTypes.func.isRequired, // function(item, index)

		/**
	  * Function accepting an item and it's index and returning
	  * an identifying key for that item. The key is used for technical
	  * purposes. This function should accept null for it's item parameter
	  * and return a valid key either way. If this function is not provided,
	  * the key will default to `'item' + index`.
	  */
		keyForItem: _react2.default.PropTypes.func, // function(item, index)

		/**
	  * Function accepting an item and it's index and returning
	  * an identifying slug for that item. The slug is used for
	  * bookmarking etc, so should preferably be human-friendly.
	  * This function should accept null for it's item parameter
	  * and return a valid slug either way. If this function is
	  * not provided, the slug will default to `'item' + index`.
	  */
		slugForItem: _react2.default.PropTypes.func, // function(item, index)

		/**
	  * Time, in ms, to capture scroll events before processing them.
	  * Defaults to 10.
	  */
		scrollDebounce: _react2.default.PropTypes.number,

		/* PROPERTIES RELATED TO PAGING */

		/**
	  * Total number of items available in the virtual scroller.
	  * Defaults to `items[0].length`;
	  *
	  * When paging is enabled, set this to the total number of
	  * items in the resultset. E.g. for a query with 9,287 results,
	  * set this to 9287.
	  */
		itemCount: _react2.default.PropTypes.number,

		/**
	  * The number of items per page.
	  * Defaults to `items[0].length` (just one page with all items).
	  *
	  * When paging is enabled, set this to the number of items per
	  * page. It will be used i.c.w. `itemCount` to determine the
	  * number of pages in the resultset. You can supply more than
	  * one page of data initially by setting `items` to an object
	  * with the data for multiple pages.
	  */
		pageSize: _react2.default.PropTypes.number,

		/**
	  * The number of pages to buffer.
	  * Defaults to 5 when `pageSize` is set, otherwise to 1.
	  *
	  * When the user scrolls to pages that are not in the buffer,
	  * `pageFetch` will be called and it's results will be added
	  * to the buffer. When the number of pages exceeds the number
	  * of pages specified by this setting, those pages furthest
	  * away from the user's current scroll position will be removed
	  * from the buffer until this number is no longer exceeded.
	  */
		pageBufferSize: _react2.default.PropTypes.number,

		/**
	  * Function that fetches a page of results.
	  *
	  * When paging is enabled, the scroller will call `pageFetch`,
	  * passing it the index of the page to fetch, whenever it needs
	  * the data for a certain page but does not have it. This function
	  * should return a `Promise` that yields an array with the results
	  * for the given page index.
	  *
	  * The scroller will call `renderLoadingItem` when it needs to
	  * render results from a page that has not been fetched yet.
	  */
		pageFetch: _react2.default.PropTypes.func, // function(pageIndex)

		/**
	  * Render function accepting an item index and returning markup
	  * indicating that the item is still loading.
	  *
	  * This function is called when paging is enabled and the item to
	  * be rendered is not (yet) available. If this function is not
	  * provided, the system will fall back to calling `renderItem`
	  * and providing an empty object as item parameter.
	  */
		renderLoadingItem: _react2.default.PropTypes.func }, _class.defaultProps = {
		items: { 0: [] },
		itemSize: 300,
		initialItemsInView: 100,
		itemsPer: 1,
		bufferBefore: 1,
		bufferAfter: 1,
		scrollDebounce: 10,
		direction: 'vertical',
		snap: false
	}, _temp);
	exports.default = Scroller;

	function arraysEqual(a, b) {
		if (!a || !b) return false;
		if (a.length != b.length) return false;
		for (var i = 0, length = a.length; i < length; i++) {
			if (a[i] != b[i]) return false;
		}
		return true;
	}

	function posFromWindow(direction, element) {
		var dir = direction === 'horizontal' ? 'Left' : 'Top';
		if (!element || element === window) return 0;
		return element['offset' + dir] + posFromWindow(direction, element.offsetParent);
	}

	function posDifference(direction, element, container) {
		return posFromWindow(direction, element) - posFromWindow(direction, container);
	}

	function getSize(direction, element) {
		var dir = direction === 'horizontal' ? 'Width' : 'Height';
		return typeof element['inner' + dir] != 'undefined' ? element['inner' + dir] : element['client' + dir];
	}

	function getScrollPos(direction, element) {
		var res,
		    axis = 'Y',
		    dir = 'Top';
		if (direction === 'horizontal') {
			axis = 'X';dir = 'Left';
		}
		if (element === window) {
			res = window['page' + axis + 'Offset'];
			if (res == null) res = document.documentElement['scroll' + dir];
			if (res == null) res = document.body['scroll' + dir];
		} else {
			res = element['scroll' + axis];
			if (res == null) res = element['scroll' + dir];
		}
		return res == null ? 0 : res;
	}

	function debounce(func, wait, immediate) {
		if (!wait) return func;
		var timeout;
		return function () {
			var context = this,
			    args = arguments;
			var later = function later() {
				timeout = null;

				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _class2, _temp;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SearchApi = undefined;

	var _reduxApis = __webpack_require__(4);

	var _reduxAsyncApi = __webpack_require__(58);

	var _reduxAsyncApi2 = _interopRequireDefault(_reduxAsyncApi);

	var _reduxFetchApi = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SearchApi = exports.SearchApi = (0, _reduxFetchApi.remote)(_class = (_temp = _class2 = function (_Async) {
		_inherits(SearchApi, _Async);

		function SearchApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? SearchApi.INITIAL_STATE : arguments[0];

			_classCallCheck(this, SearchApi);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SearchApi).call(this, state));

			_this.setHandler('SET_FILTER', function (state, action) {
				return _extends({}, state, { filter: action.payload });
			});
			_this.setHandler('SET_RESULTS', function (state, action) {
				return _extends({}, state, { results: action.payload });
			});
			return _this;
		}

		_createClass(SearchApi, [{
			key: 'filter',
			value: function filter() {
				return this.getState().filter;
			}
		}, {
			key: 'setFilter',
			value: function setFilter(filter) {
				return this.dispatch(this.createAction('SET_FILTER')(filter));
			}
		}, {
			key: 'results',
			value: function results() {
				return this.getState().results;
			}
		}, {
			key: 'setResults',
			value: function setResults(results) {
				return this.dispatch(this.createAction('SET_RESULTS')(results));
			}
		}, {
			key: 'url',
			value: function url(filter) {
				var keys = Object.keys(filter);
				var result = '';
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var key = _step.value;

						result += result ? '&' : '?';
						result += encodeURIComponent(key) + '=' + encodeURIComponent(filter[key]);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				return result;
			}
		}, {
			key: 'search',
			value: function search() {
				var _this2 = this;

				// dispatch a function... redux-thunk will execute the function
				return this.dispatch(function () {
					_this2.setBusy();
					return _this2.fetch(_this2.url(_this2.filter())).then(function (response) {
						if (response.status === 200) {
							return response.json();
						} else {
							return new Promise(function (resolve, reject) {
								response.text().then(function (text) {
									var error = Error(text);
									error.status = response.status;
									error.statusText = response.statusText;
									reject(error);
								});
							});
						}
					}).then(function (json) {
						_this2.setDone();
						return _this2.setResults(json);
					}).catch(function (error) {
						return _this2.setError(error);
					});
				});
			}
		}]);

		return SearchApi;
	}(_reduxAsyncApi2.default), _class2.INITIAL_STATE = _extends({}, _reduxAsyncApi2.default.INITIAL_STATE, {
		filter: {},
		results: []
	}), _temp)) || _class;

	exports.default = SearchApi;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Spacer = __webpack_require__(9);

	var _Spacer2 = _interopRequireDefault(_Spacer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var HeaderRow = function HeaderRow(props) {
	    var className = props.className;
	    var title = props.title;
	    var children = props.children;

	    var otherProps = _objectWithoutProperties(props, ['className', 'title', 'children']);

	    var classes = (0, _classnames2.default)('mdl-layout__header-row', className);

	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        title && _react2.default.createElement(
	            'span',
	            { className: 'mdl-layout-title' },
	            title
	        ),
	        _react2.default.createElement(_Spacer2.default, null),
	        children
	    );
	};
	HeaderRow.propTypes = {
	    className: _react.PropTypes.string,
	    title: _react.PropTypes.node
	};

	exports.default = HeaderRow;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Tab = __webpack_require__(47);

	var _Tab2 = _interopRequireDefault(_Tab);

	var _TabBar = __webpack_require__(48);

	var _TabBar2 = _interopRequireDefault(_TabBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var HeaderTabs = function HeaderTabs(props) {
	    var className = props.className;
	    var ripple = props.ripple;
	    var children = props.children;

	    var otherProps = _objectWithoutProperties(props, ['className', 'ripple', 'children']);

	    var classes = (0, _classnames2.default)({
	        'mdl-js-ripple-effect': ripple
	    }, className);

	    return _react2.default.createElement(
	        _TabBar2.default,
	        _extends({ cssPrefix: 'mdl-layout', className: classes }, otherProps),
	        children
	    );
	};
	HeaderTabs.propTypes = {
	    activeTab: _react.PropTypes.number,
	    children: _react.PropTypes.arrayOf(function (props, propName, componentName) {
	        var prop = props[propName];
	        if (prop.type !== _Tab2.default) {
	            return new Error('`' + componentName + '` only accepts `Tab` as children.');
	        }
	    }),
	    className: _react.PropTypes.string,
	    onChange: _react.PropTypes.func,
	    ripple: _react.PropTypes.bool
	};

	exports.default = HeaderTabs;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var PropTypes = _require.PropTypes;

	var storeShape = PropTypes.shape({
	  subscribe: PropTypes.func.isRequired,
	  dispatch: PropTypes.func.isRequired,
	  getState: PropTypes.func.isRequired
	});

	module.exports = storeShape;

/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Composes single-argument functions from right to left.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing functions from right to
	 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return function () {
	    if (funcs.length === 0) {
	      return arguments[0];
	    }

	    var last = funcs[funcs.length - 1];
	    var rest = funcs.slice(0, -1);

	    return rest.reduceRight(function (composed, f) {
	      return f(composed);
	    }, last.apply(undefined, arguments));
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(21);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	exports.ActionTypes = ActionTypes;
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */

	function createStore(reducer, initialState, enhancer) {
	  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = initialState;
	    initialState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, initialState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var listeners = [];
	  var isDispatching = false;

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   * Note, the listener should not expect to see all states changes, as the
	   * state might have been updated multiple times before the listener is
	   * notified.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    listeners.push(listener);
	    var isSubscribed = true;

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!_utilsIsPlainObject2['default'](action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    listeners.slice().forEach(function (listener) {
	      return listener();
	    });
	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  };
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(19);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(63);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(62);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(61);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(18);

	var _compose2 = _interopRequireDefault(_compose);

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (isCrushed.name !== 'isCrushed' && process.env.NODE_ENV !== 'production') {
	  /*eslint-disable no-console */
	  console.error('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	  /*eslint-enable */
	}

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _combineReducers2['default'];
	exports.bindActionCreators = _bindActionCreators2['default'];
	exports.applyMiddleware = _applyMiddleware2['default'];
	exports.compose = _compose2['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};
	var objStringValue = fnToString(Object);

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */

	function isPlainObject(obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }

	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

	  if (proto === null) {
	    return true;
	  }

	  var constructor = proto.constructor;

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === objStringValue;
	}

	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Applies a function to every key-value pair inside an object.
	 *
	 * @param {Object} obj The source object.
	 * @param {Function} fn The mapper function that receives the value and the key.
	 * @returns {Object} A new object that contains the mapped values for the keys.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = mapValues;

	function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _reduxApis = __webpack_require__(4);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(10);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(6);

	var _reactRouter = __webpack_require__(11);

	var _store = __webpack_require__(38);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_picolog2.default.info('Starting BridalApp UI');

	var routes = __webpack_require__(37).routes;

	var jsx = _react2.default.createElement(
		_reactRedux.Provider,
		{ store: _store2.default },
		_react2.default.createElement(
			_reactRouter.Router,
			{ history: _reactRouter.browserHistory },
			routes
		)
	);

	_reactDom2.default.render(jsx, document.getElementById('bridalapp'));

	if (false) {
		module.hot.accept('./routes', function () {
			_picolog2.default.warn('%c Hot reloading \'./routes\'', { color: 'green' });
			routes = require('./routes').default;
		});
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dec, _class, _class2, _temp;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.App = undefined;

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(11);

	var _reactRedux = __webpack_require__(6);

	var _Layout = __webpack_require__(46);

	var _RightDrawer = __webpack_require__(35);

	var _RightDrawer2 = _interopRequireDefault(_RightDrawer);

	var _LayoutTitle = __webpack_require__(34);

	var _LayoutTitle2 = _interopRequireDefault(_LayoutTitle);

	var _LayoutObfuscator = __webpack_require__(33);

	var _LayoutObfuscator2 = _interopRequireDefault(_LayoutObfuscator);

	var _api = __webpack_require__(8);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = exports.App = (_dec = (0, _reactRedux.connect)(_api2.default.connector), _dec(_class = (_temp = _class2 = function (_Component) {
		_inherits(App, _Component);

		function App(props) {
			_classCallCheck(this, App);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));
		}

		_createClass(App, [{
			key: 'render',
			value: function render() {
				var _this2 = this;

				return _react2.default.createElement(
					_Layout.Layout,
					{ fixedHeader: true, fixedDrawer: true },
					_react2.default.createElement(
						_Layout.Header,
						{ title: 'Title' },
						_react2.default.createElement('img', { className: 'logo', src: 'https://cdn.rawgit.com/download/bridalapp-static/0.9.14/bridalapp/logo-bridalapp.png' }),
						_react2.default.createElement(
							_Layout.Navigation,
							{ className: 'ActionBar' },
							_react2.default.createElement(
								'p',
								null,
								'this.props.appbar'
							)
						),
						_react2.default.createElement(
							_Layout.Navigation,
							null,
							!this.props.rightDrawer.open ? _react2.default.createElement(
								'i',
								{ className: 'material-icons', onClick: function onClick() {
										_this2.props.api.rightDrawer.open();
									} },
								'account_circle'
							) : _react2.default.createElement('span', null)
						)
					),
					_react2.default.createElement(
						_RightDrawer2.default,
						{ open: this.props.rightDrawer.open },
						_react2.default.createElement(
							_LayoutTitle2.default,
							null,
							'Right!'
						),
						_react2.default.createElement(
							_Layout.Navigation,
							null,
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/' },
								'Home'
							),
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/products' },
								'Products'
							),
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/stores' },
								'Stores'
							),
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/brands' },
								'Brands'
							)
						)
					),
					_react2.default.createElement(
						_Layout.Drawer,
						{ title: 'Title' },
						_react2.default.createElement(
							_Layout.Navigation,
							null,
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/' },
								'Home'
							),
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/products' },
								'Products'
							),
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/stores' },
								'Stores'
							),
							_react2.default.createElement(
								_reactRouter.Link,
								{ to: '/brands' },
								'Brands'
							)
						)
					),
					_react2.default.createElement(
						_Layout.Content,
						{ className: 'main' },
						_react2.default.createElement(
							'div',
							null,
							this.props.children
						)
					),
					_react2.default.createElement(_LayoutObfuscator2.default, { visible: this.props.rightDrawer.open, onClick: function onClick() {
							return _api2.default.rightDrawer.close();
						} })
				);
			}
		}]);

		return App;
	}(_react.Component), _class2.propTypes = {
		dispatch: _react.PropTypes.func.isRequired,
		rightDrawer: _react.PropTypes.shape({
			open: _react.PropTypes.bool.isRequired
		})
	}, _temp)) || _class);
	exports.default = App;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(6);

	var _Scroller = __webpack_require__(13);

	var _Scroller2 = _interopRequireDefault(_Scroller);

	var _Card = __webpack_require__(12);

	var _Card2 = _interopRequireDefault(_Card);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function select(state) {
		return { items: state.brands.results };
	}

	exports.default = (0, _reactRedux.connect)(select)((_temp = _class = function (_React$Component) {
		_inherits(BrandBrowser, _React$Component);

		function BrandBrowser(props) {
			_classCallCheck(this, BrandBrowser);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BrandBrowser).call(this, props));

			_this.state = _this.getState(props);
			return _this;
		}

		_createClass(BrandBrowser, [{
			key: 'getState',
			value: function getState(props) {
				var items = this.state && this.state.items || props.items;
				var itemCount = this.state && this.state.itemCount || props.itemCount || props.items && props.items.length;
				return {
					items: items || [],
					itemCount: itemCount || items && items.length || 0
				};
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				this.setState(this.getState(nextProps));
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.mounted = true;
				this.setState(this.getState(this.props));
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.mounted = false;
			}
		}, {
			key: 'render',
			value: function render() {
				_picolog2.default.debug("items=" + this.state.items);
				return _react2.default.createElement(_Scroller2.default, {
					className: 'BrandBrowser ' + this.props.category,
					direction: 'vertical',
					bufferBefore: 2,
					items: this.state.items,
					bufferAfter: 4,
					itemCount: this.state.itemCount,
					itemSize: 480,
					itemsPer: 1,
					renderItem: function renderItem(item, idx) {
						return _react2.default.createElement(
							_Card2.default,
							{ className: 'Brand', key: item.id },
							_react2.default.createElement(
								_Card.Front,
								{ className: 'Test' },
								_react2.default.createElement(
									'div',
									{ className: 'content' },
									_react2.default.createElement('img', { src: 'https://cdn.rawgit.com/download/bridalapp-static/0.10.0/brands/' + item.id + '/logo-brand-name.png' })
								)
							),
							_react2.default.createElement(
								_Card.Back,
								null,
								_react2.default.createElement(
									'h3',
									null,
									item.name || 'Loading'
								),
								_react2.default.createElement(
									'p',
									null,
									item.description || 'Loading item ' + idx
								)
							)
						);
					}
				});
			}
		}]);

		return BrandBrowser;
	}(_react2.default.Component), _class.propTypes = {
		category: _react.PropTypes.string
	}, _class.defaultProps = {
		category: 'Wedding Dresses'
	}, _class.fetchData = function (props) {
		var filter = {
			category: props.params.category
		};
		return app.brands.search(filter);
	}, _temp));

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Brands = function (_React$Component) {
		_inherits(Brands, _React$Component);

		function Brands() {
			_classCallCheck(this, Brands);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Brands).apply(this, arguments));
		}

		_createClass(Brands, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					{ className: "Brands" },
					this.props.children
				);
			}
		}]);

		return Brands;
	}(_react2.default.Component);

	exports.default = Brands;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _class;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BrandsApi = undefined;

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _reduxApis = __webpack_require__(4);

	var _reduxFetchApi = __webpack_require__(7);

	var _api = __webpack_require__(14);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BrandsApi = exports.BrandsApi = (0, _reduxFetchApi.remote)(_class = function (_Api) {
		_inherits(BrandsApi, _Api);

		function BrandsApi(state) {
			_classCallCheck(this, BrandsApi);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BrandsApi).call(this, state));

			_this.search = (0, _reduxApis.link)(_this, new _api2.default());
			return _this;
		}

		return BrandsApi;
	}(_reduxApis.Api)) || _class;

	exports.default = BrandsApi;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Home = function (_React$Component) {
		_inherits(Home, _React$Component);

		function Home() {
			_classCallCheck(this, Home);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
		}

		_createClass(Home, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					{ className: "Home" },
					_react2.default.createElement(
						"h1",
						null,
						"BRIDAL APP"
					),
					"Allrighty :) thenn"
				);
			}
		}]);

		return Home;
	}(_react2.default.Component);

	exports.default = Home;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _dec, _dec2, _class, _class2, _temp;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(6);

	var _reduxLoadApi = __webpack_require__(59);

	var _api = __webpack_require__(8);

	var _api2 = _interopRequireDefault(_api);

	var _Scroller = __webpack_require__(13);

	var _Scroller2 = _interopRequireDefault(_Scroller);

	var _ProductCard = __webpack_require__(30);

	var _ProductCard2 = _interopRequireDefault(_ProductCard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ProductBrowser = (_dec = (0, _reduxLoadApi.onload)(function (params) {
		var filter = _api2.default.products.search.filter();
		_api2.default.products.search.setFilter(_extends({}, filter, { category: params.category }));
		return _api2.default.products.search.search().catch(function (error) {
			_picolog2.default.error('ProductBrowser@onload: Searching products failed:', error);
		});
	}), _dec2 = (0, _reactRedux.connect)(_api2.default.products.search.connector), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
		_inherits(ProductBrowser, _React$Component);

		function ProductBrowser(props) {
			_classCallCheck(this, ProductBrowser);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProductBrowser).call(this, props));

			_this.state = _this.getState(props);
			return _this;
		}

		_createClass(ProductBrowser, [{
			key: 'getState',
			value: function getState(props) {
				var items = this.state && this.state.items || props.results;
				var itemCount = this.state && this.state.itemCount || props.itemCount || props.results && props.results.length;
				return {
					items: items || [],
					itemCount: itemCount || items && items.length || 0
				};
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				this.setState(this.getState(nextProps));
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.mounted = true;
				this.setState(this.getState(this.props));
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.mounted = false;
			}
		}, {
			key: 'flipCard',
			value: function flipCard(component, event) {}
		}, {
			key: 'render',
			value: function render() {
				_picolog2.default.debug("items=" + this.state.items);
				return _react2.default.createElement(_Scroller2.default, {
					className: 'ProductBrowser ' + this.props.category,
					direction: 'vertical',
					bufferBefore: 2,
					items: this.state.items,
					bufferAfter: 4,
					itemCount: this.state.itemCount,
					itemSize: 480,
					itemsPer: 1,
					renderItem: function renderItem(item, idx) {
						return _react2.default.createElement(_ProductCard2.default, { product: item });
					}
				});
			}
		}]);

		return ProductBrowser;
	}(_react2.default.Component), _class2.propTypes = {
		async: _react.PropTypes.any.isRequired,
		filter: _react.PropTypes.object.isRequired,
		results: _react.PropTypes.array.isRequired
	}, _temp)) || _class) || _class);
	exports.default = ProductBrowser;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ProductCard = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Card = __webpack_require__(12);

	var _Card2 = _interopRequireDefault(_Card);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var bool = _react.PropTypes.bool;
	var string = _react.PropTypes.string;
	var object = _react.PropTypes.object;
	var shape = _react.PropTypes.shape;
	var ProductCard = exports.ProductCard = (_temp = _class = function (_Component) {
		_inherits(ProductCard, _Component);

		function ProductCard(props) {
			_classCallCheck(this, ProductCard);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProductCard).call(this, props));

			_this.state = _this.getState(props);
			return _this;
		}

		_createClass(ProductCard, [{
			key: 'getState',
			value: function getState(props) {
				return { flipped: this.state && this.state.flipped || props.flipped };
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				this.setState(this.getState(nextProps));
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.setState(this.getState(this.props));
			}
		}, {
			key: 'render',
			value: function render() {
				var _props$product = this.props.product;
				var id = _props$product.id;
				var brandId = _props$product.brandId;
				var name = _props$product.name;
				var description = _props$product.description;

				return _react2.default.createElement(
					_Card2.default,
					{ className: 'Product', key: id },
					_react2.default.createElement(
						_Card.Front,
						null,
						_react2.default.createElement(
							'div',
							{ className: 'content' },
							_react2.default.createElement('img', { src: 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==',
								style: { backgroundImage: 'url(https://cdn.rawgit.com/download/bridalapp-static/0.9.13/products/' + brandId + '/' + encodeURIComponent(name) + '/thumbs.jpg)' } })
						)
					),
					_react2.default.createElement(
						_Card.Back,
						null,
						_react2.default.createElement(
							'h3',
							null,
							name || 'Loading...'
						),
						_react2.default.createElement(
							'p',
							null,
							description || 'Loading...'
						)
					)
				);
			}
		}]);

		return ProductCard;
	}(_react.Component), _class.propTypes = {
		//		product: PropTypes.object.isRequired,

		product: shape({
			id: object,
			brandId: object,
			name: string,
			description: string
		}).isRequired,

		flipped: bool.isRequired
	}, _class.defaultProps = {
		flipped: false
	}, _temp);
	exports.default = ProductCard;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Products = function (_React$Component) {
		_inherits(Products, _React$Component);

		function Products() {
			_classCallCheck(this, Products);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Products).apply(this, arguments));
		}

		_createClass(Products, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					{ className: "Products" },
					this.props.children
				);
			}
		}]);

		return Products;
	}(_react2.default.Component);

	exports.default = Products;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _dec, _class;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ProductsApi = exports.ProductSearch = undefined;

	var _reduxApis = __webpack_require__(4);

	var _reduxFetchApi = __webpack_require__(7);

	var _api = __webpack_require__(14);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ProductSearch = exports.ProductSearch = function (_SearchApi) {
		_inherits(ProductSearch, _SearchApi);

		function ProductSearch() {
			_classCallCheck(this, ProductSearch);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(ProductSearch).apply(this, arguments));
		}

		_createClass(ProductSearch, [{
			key: 'url',
			value: function url(filter) {
				var clone = _extends({}, filter);
				var result = filter.category ? '/' + filter.category : '';
				delete clone.category;
				return result + _get(Object.getPrototypeOf(ProductSearch.prototype), 'url', this).call(this, clone);
			}
		}]);

		return ProductSearch;
	}(_api2.default);

	var ProductsApi = exports.ProductsApi = (_dec = (0, _reduxFetchApi.remote)('/products'), _dec(_class = function (_Api) {
		_inherits(ProductsApi, _Api);

		function ProductsApi(state) {
			_classCallCheck(this, ProductsApi);

			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ProductsApi).call(this, state));

			_this2.search = (0, _reduxFetchApi.remote)('/search')((0, _reduxApis.link)(_this2, new ProductSearch({})));
			return _this2;
		}

		return ProductsApi;
	}(_reduxApis.Api)) || _class);
	exports.default = ProductsApi;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LayoutObfuscator = (_temp = _class = function (_React$Component) {
		_inherits(LayoutObfuscator, _React$Component);

		function LayoutObfuscator() {
			_classCallCheck(this, LayoutObfuscator);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(LayoutObfuscator).apply(this, arguments));
		}

		_createClass(LayoutObfuscator, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var obfuscatorClassName = _props.obfuscatorClassName;
				var visibleClassName = _props.visibleClassName;
				var visible = _props.visible;
				var children = _props.children;

				var otherProps = _objectWithoutProperties(_props, ['className', 'obfuscatorClassName', 'visibleClassName', 'visible', 'children']);

				var classes = (0, _classnames2.default)(className, obfuscatorClassName, visible && visibleClassName);
				return _react2.default.createElement('div', _extends({ className: classes }, otherProps));
			}
		}]);

		return LayoutObfuscator;
	}(_react2.default.Component), _class.propTypes = {
		className: _react.PropTypes.string,
		obfuscatorClassName: _react.PropTypes.string,
		visibleClassName: _react.PropTypes.string,
		visible: _react.PropTypes.bool,
		children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
	}, _class.defaultProps = {
		obfuscatorClassName: 'mdl-layout__obfuscator',
		visibleClassName: 'is-visible',
		visible: false
	}, _temp);
	exports.default = LayoutObfuscator;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DrawerTitle = (_temp = _class = function (_React$Component) {
		_inherits(DrawerTitle, _React$Component);

		function DrawerTitle() {
			_classCallCheck(this, DrawerTitle);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(DrawerTitle).apply(this, arguments));
		}

		_createClass(DrawerTitle, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var titleClassName = _props.titleClassName;
				var children = _props.children;

				var otherProps = _objectWithoutProperties(_props, ['className', 'titleClassName', 'children']);

				var classes = (0, _classnames2.default)(className, titleClassName);
				return _react2.default.createElement(
					'span',
					_extends({ className: classes }, otherProps),
					children
				);
			}
		}]);

		return DrawerTitle;
	}(_react2.default.Component), _class.propTypes = {
		className: _react.PropTypes.string,
		titleClassName: _react.PropTypes.string,
		children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
	}, _class.defaultProps = {
		titleClassName: 'mdl-layout-title',
		open: false
	}, _temp);
	exports.default = DrawerTitle;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RightDrawer = (_temp = _class = function (_React$Component) {
		_inherits(RightDrawer, _React$Component);

		function RightDrawer() {
			_classCallCheck(this, RightDrawer);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(RightDrawer).apply(this, arguments));
		}

		_createClass(RightDrawer, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var drawerClassName = _props.drawerClassName;
				var visibleClassName = _props.visibleClassName;
				var open = _props.open;
				var children = _props.children;

				var otherProps = _objectWithoutProperties(_props, ['className', 'drawerClassName', 'visibleClassName', 'open', 'children']);

				var classes = (0, _classnames2.default)(className, drawerClassName, open && visibleClassName);
				return _react2.default.createElement(
					'div',
					_extends({ className: classes }, otherProps),
					children
				);
			}
		}]);

		return RightDrawer;
	}(_react2.default.Component), _class.propTypes = {
		className: _react.PropTypes.string,
		drawerClassName: _react.PropTypes.string,
		visibleClassName: _react.PropTypes.string,
		open: _react.PropTypes.bool,
		children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array, _react.PropTypes.string])
	}, _class.defaultProps = {
		drawerClassName: 'mdl-layout__drawer mdl-layout__drawer-right',
		visibleClassName: 'is-visible',
		open: false
	}, _temp);
	exports.default = RightDrawer;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _reduxApis = __webpack_require__(4);

	var _reduxApis2 = _interopRequireDefault(_reduxApis);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DrawerApi = (_temp = _class = function (_Api) {
		_inherits(DrawerApi, _Api);

		function DrawerApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? DrawerApi.INITIAL_STATE : arguments[0];

			_classCallCheck(this, DrawerApi);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DrawerApi).call(this, state));

			_this.setHandler('OPEN', function (state, action) {
				return _extends({}, state, { open: true });
			});
			_this.setHandler('CLOSE', function (state, action) {
				return _extends({}, state, { open: false });
			});
			return _this;
		}

		_createClass(DrawerApi, [{
			key: 'open',
			value: function open() {
				this.dispatch(this.createAction('OPEN')());
			}
		}, {
			key: 'close',
			value: function close() {
				this.dispatch(this.createAction('CLOSE')());
			}
		}, {
			key: 'isOpen',
			value: function isOpen() {
				return this.getState().open;
			}
		}]);

		return DrawerApi;
	}(_reduxApis2.default), _class.INITIAL_STATE = { open: false }, _temp);
	exports.default = DrawerApi;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.routes = undefined;

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(11);

	var _App = __webpack_require__(24);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(28);

	var _Home2 = _interopRequireDefault(_Home);

	var _Products = __webpack_require__(31);

	var _Products2 = _interopRequireDefault(_Products);

	var _ProductBrowser = __webpack_require__(29);

	var _ProductBrowser2 = _interopRequireDefault(_ProductBrowser);

	var _Brands = __webpack_require__(26);

	var _Brands2 = _interopRequireDefault(_Brands);

	var _BrandBrowser = __webpack_require__(25);

	var _BrandBrowser2 = _interopRequireDefault(_BrandBrowser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var routes = exports.routes = _react2.default.createElement(
		_reactRouter.Route,
		{ component: _App2.default },
		_react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: '/products', component: _Products2.default },
			_react2.default.createElement(_reactRouter.IndexRedirect, { to: '/products/Wedding+Dresses' }),
			_react2.default.createElement(_reactRouter.Route, { path: ':category', component: _ProductBrowser2.default })
		),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: '/brands', component: _Brands2.default },
			_react2.default.createElement(_reactRouter.IndexRedirect, { to: '/brands/all' }),
			_react2.default.createElement(_reactRouter.Route, { path: 'all', component: _BrandBrowser2.default })
		)
	);

	exports.default = routes;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.store = undefined;

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _redux = __webpack_require__(20);

	var _reduxThunk = __webpack_require__(60);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxApis = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = __webpack_require__(8).app;
	var data = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window.__data || undefined;
	var store = exports.store = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore)(app.reducer, data);
	(0, _reduxApis.link)(store, app);
	if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object') {
		window.app = app;
	}
	exports.default = store;

	if (false) {
		module.hot.accept('./components/App/api', function () {

			var msg = 'Hot-reloading \'./components/App/api\'',
			    args = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' ? ['%c' + msg, 'color:green'] : [msg];
			_picolog2.default.warn.apply(_picolog2.default, args);
			app = require('./components/App/api').app;
			_picolog2.default.log('Replacing store reducer...');
			store.replaceReducer(app.reducer);
			_picolog2.default.log('Re-linking app to store...');
			(0, _reduxApis.link)(store, app);
			_picolog2.default.log('Re-exposing app to global scope...');
			if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object') {
				window.app = app;
			}
			_picolog2.default.log('Hot-reload done.');
		});
	}

/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent) {
	    var keys = Object.getOwnPropertyNames(sourceComponent);
	    for (var i=0; i<keys.length; ++i) {
	        if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
	            targetComponent[keys[i]] = sourceComponent[keys[i]];
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var Content = function Content(props) {
	    var children = props.children;
	    var className = props.className;

	    var otherProps = _objectWithoutProperties(props, ['children', 'className']);

	    var classes = (0, _classnames2.default)('mdl-layout__content', className);

	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        children,
	        _react2.default.createElement('div', { className: 'react-mdl-header-tabs-hack', id: 'undefined' })
	    );
	};

	Content.propTypes = {
	    className: _react.PropTypes.string
	};

	exports.default = Content;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var Drawer = function Drawer(props) {
	    var className = props.className;
	    var title = props.title;
	    var children = props.children;

	    var otherProps = _objectWithoutProperties(props, ['className', 'title', 'children']);

	    var classes = (0, _classnames2.default)('mdl-layout__drawer', className);

	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        title ? _react2.default.createElement(
	            'span',
	            { className: 'mdl-layout-title' },
	            title
	        ) : null,
	        children
	    );
	};
	Drawer.propTypes = {
	    className: _react.PropTypes.string,
	    title: _react.PropTypes.node
	};

	exports.default = Drawer;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _HeaderRow = __webpack_require__(15);

	var _HeaderRow2 = _interopRequireDefault(_HeaderRow);

	var _HeaderTabs = __webpack_require__(16);

	var _HeaderTabs2 = _interopRequireDefault(_HeaderTabs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var Header = function Header(props) {
	    var className = props.className;
	    var scroll = props.scroll;
	    var seamed = props.seamed;
	    var title = props.title;
	    var transparent = props.transparent;
	    var waterfall = props.waterfall;
	    var children = props.children;

	    var otherProps = _objectWithoutProperties(props, ['className', 'scroll', 'seamed', 'title', 'transparent', 'waterfall', 'children']);

	    var classes = (0, _classnames2.default)('mdl-layout__header', {
	        'mdl-layout__header--scroll': scroll,
	        'mdl-layout__header--seamed': seamed,
	        'mdl-layout__header--transparent': transparent,
	        'mdl-layout__header--waterfall': waterfall
	    }, className);

	    var isRowOrTab = false;
	    _react2.default.Children.forEach(children, function (child) {
	        if (child && (child.type === _HeaderRow2.default || child.type === _HeaderTabs2.default)) {
	            isRowOrTab = true;
	        }
	    });

	    return _react2.default.createElement(
	        'header',
	        _extends({ className: classes }, otherProps),
	        isRowOrTab ? children : _react2.default.createElement(
	            _HeaderRow2.default,
	            { title: title },
	            children
	        )
	    );
	};
	Header.propTypes = {
	    className: _react.PropTypes.string,
	    scroll: _react.PropTypes.bool,
	    seamed: _react.PropTypes.bool,
	    title: _react.PropTypes.node,
	    transparent: _react.PropTypes.bool,
	    waterfall: _react.PropTypes.bool
	};

	exports.default = Header;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _mdlUpgrade = __webpack_require__(52);

	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Layout = function (_React$Component) {
	    _inherits(Layout, _React$Component);

	    function Layout() {
	        _classCallCheck(this, Layout);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Layout).apply(this, arguments));
	    }

	    _createClass(Layout, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var fixedDrawer = _props.fixedDrawer;
	            var fixedHeader = _props.fixedHeader;
	            var fixedTabs = _props.fixedTabs;

	            var otherProps = _objectWithoutProperties(_props, ['className', 'fixedDrawer', 'fixedHeader', 'fixedTabs']);

	            var classes = (0, _classnames2.default)('mdl-layout mdl-js-layout', {
	                'mdl-layout--fixed-drawer': fixedDrawer,
	                'mdl-layout--fixed-header': fixedHeader,
	                'mdl-layout--fixed-tabs': fixedTabs
	            }, className);

	            return _react2.default.createElement(
	                'div',
	                _extends({ className: classes }, otherProps),
	                this.props.children
	            );
	        }
	    }]);

	    return Layout;
	}(_react2.default.Component);

	Layout.propTypes = {
	    className: _react.PropTypes.string,
	    fixedDrawer: _react.PropTypes.bool,
	    fixedHeader: _react.PropTypes.bool,
	    fixedTabs: _react.PropTypes.bool
	};
	exports.default = (0, _mdlUpgrade2.default)(Layout);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _cloneChildren = __webpack_require__(51);

	var _cloneChildren2 = _interopRequireDefault(_cloneChildren);

	var _Spacer = __webpack_require__(9);

	var _Spacer2 = _interopRequireDefault(_Spacer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var Navigation = function Navigation(props) {
	    var className = props.className;
	    var children = props.children;

	    var otherProps = _objectWithoutProperties(props, ['className', 'children']);

	    var classes = (0, _classnames2.default)('mdl-navigation', className);

	    return _react2.default.createElement(
	        'nav',
	        _extends({ className: classes }, otherProps),
	        (0, _cloneChildren2.default)(children, function (child) {
	            return {
	                className: (0, _classnames2.default)({ 'mdl-navigation__link': child.type !== _Spacer2.default }, child.props.className)
	            };
	        })
	    );
	};
	Navigation.propTypes = {
	    className: _react.PropTypes.string
	};

	exports.default = Navigation;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Spacer = exports.Navigation = exports.HeaderTabs = exports.HeaderRow = exports.Header = exports.Drawer = exports.Content = exports.Layout = undefined;

	var _Layout2 = __webpack_require__(44);

	var _Layout3 = _interopRequireDefault(_Layout2);

	var _Content2 = __webpack_require__(41);

	var _Content3 = _interopRequireDefault(_Content2);

	var _Drawer2 = __webpack_require__(42);

	var _Drawer3 = _interopRequireDefault(_Drawer2);

	var _Header2 = __webpack_require__(43);

	var _Header3 = _interopRequireDefault(_Header2);

	var _HeaderRow2 = __webpack_require__(15);

	var _HeaderRow3 = _interopRequireDefault(_HeaderRow2);

	var _HeaderTabs2 = __webpack_require__(16);

	var _HeaderTabs3 = _interopRequireDefault(_HeaderTabs2);

	var _Navigation2 = __webpack_require__(45);

	var _Navigation3 = _interopRequireDefault(_Navigation2);

	var _Spacer2 = __webpack_require__(9);

	var _Spacer3 = _interopRequireDefault(_Spacer2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Layout = _Layout3.default;
	exports.Content = _Content3.default;
	exports.Drawer = _Drawer3.default;
	exports.Header = _Header3.default;
	exports.HeaderRow = _HeaderRow3.default;
	exports.HeaderTabs = _HeaderTabs3.default;
	exports.Navigation = _Navigation3.default;
	exports.Spacer = _Spacer3.default;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tab = function (_React$Component) {
	    _inherits(Tab, _React$Component);

	    function Tab(props) {
	        _classCallCheck(this, Tab);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tab).call(this, props));

	        _this._handleClick = _this._handleClick.bind(_this);
	        return _this;
	    }

	    _createClass(Tab, [{
	        key: '_handleClick',
	        value: function _handleClick() {
	            this.props.onTabClick(this.props.tabId);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _classNames;

	            var _props = this.props;
	            var active = _props.active;
	            var className = _props.className;
	            var cssPrefix = _props.cssPrefix;
	            var tabId = _props.tabId;
	            var onTabClick = _props.onTabClick;
	            var style = _props.style;

	            var otherProps = _objectWithoutProperties(_props, ['active', 'className', 'cssPrefix', 'tabId', 'onTabClick', 'style']);

	            var classes = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, cssPrefix + '__tab', true), _defineProperty(_classNames, 'is-active', active), _classNames), className);

	            style.cursor = 'pointer';

	            return _react2.default.createElement(
	                'a',
	                _extends({ className: classes, onClick: this._handleClick, style: style }, otherProps),
	                this.props.children
	            );
	        }
	    }]);

	    return Tab;
	}(_react2.default.Component);

	Tab.propTypes = {
	    active: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    cssPrefix: _react.PropTypes.string,
	    onTabClick: _react.PropTypes.func,
	    style: _react.PropTypes.object,
	    tabId: _react.PropTypes.number
	};
	Tab.defaultProps = {
	    style: {}
	};
	exports.default = Tab;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TabBar = function (_React$Component) {
	    _inherits(TabBar, _React$Component);

	    function TabBar(props) {
	        _classCallCheck(this, TabBar);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TabBar).call(this, props));

	        _this._handleClickTab = _this._handleClickTab.bind(_this);
	        return _this;
	    }

	    _createClass(TabBar, [{
	        key: '_handleClickTab',
	        value: function _handleClickTab(tabId) {
	            if (this.props.onChange) {
	                this.props.onChange(tabId);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var _props = this.props;
	            var activeTab = _props.activeTab;
	            var className = _props.className;
	            var cssPrefix = _props.cssPrefix;
	            var children = _props.children;

	            var otherProps = _objectWithoutProperties(_props, ['activeTab', 'className', 'cssPrefix', 'children']);

	            var classes = (0, _classnames2.default)(_defineProperty({}, cssPrefix + '__tab-bar', true), className);

	            return _react2.default.createElement(
	                'div',
	                _extends({ className: classes }, otherProps),
	                _react2.default.Children.map(this.props.children, function (child, tabId) {
	                    return _react2.default.cloneElement(child, {
	                        cssPrefix: cssPrefix,
	                        tabId: tabId,
	                        active: tabId === activeTab,
	                        onTabClick: _this2._handleClickTab
	                    });
	                })
	            );
	        }
	    }]);

	    return TabBar;
	}(_react2.default.Component);

	TabBar.propTypes = {
	    activeTab: _react.PropTypes.number,
	    className: _react.PropTypes.string,
	    cssPrefix: _react.PropTypes.string.isRequired,
	    onChange: _react.PropTypes.func
	};
	TabBar.defaultProps = {
	    activeTab: 0
	};
	exports.default = TabBar;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _reactDom = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MDLComponent = function (_Component) {
	    _inherits(MDLComponent, _Component);

	    function MDLComponent() {
	        _classCallCheck(this, MDLComponent);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MDLComponent).apply(this, arguments));
	    }

	    _createClass(MDLComponent, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            window.componentHandler.upgradeElement((0, _reactDom.findDOMNode)(this));
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.componentHandler.downgradeElements((0, _reactDom.findDOMNode)(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react.Children.only(this.props.children);
	        }
	    }]);

	    return MDLComponent;
	}(_react.Component);

	exports.default = MDLComponent;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	exports.default = function (displayName, defaultClassName) {
	    var element = arguments.length <= 2 || arguments[2] === undefined ? 'div' : arguments[2];

	    var fn = function fn(props) {
	        var className = props.className;
	        var children = props.children;

	        var otherProps = _objectWithoutProperties(props, ['className', 'children']);

	        return _react2.default.createElement(element, _extends({
	            className: (0, _classnames2.default)(defaultClassName, className)
	        }, otherProps), children);
	    };

	    fn.displayName = displayName;
	    fn.propTypes = {
	        className: _react.PropTypes.string
	    };

	    return fn;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (children, props) {
	    return _react2.default.Children.map(children, function (child) {
	        var newProps = typeof props === 'function' ? props(child) : props;
	        return _react2.default.cloneElement(child, newProps);
	    });
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _MDLComponent = __webpack_require__(49);

	var _MDLComponent2 = _interopRequireDefault(_MDLComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (Component) {
	    var render = Component.prototype.render;

	    Component.prototype.render = function rendr() {
	        // eslint-disable-line no-param-reassign
	        return _react2.default.createElement(
	            _MDLComponent2.default,
	            null,
	            render.call(this)
	        );
	    };

	    return Component;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(1);

	var Component = _require.Component;
	var PropTypes = _require.PropTypes;
	var Children = _require.Children;

	var storeShape = __webpack_require__(17);

	var didWarnAboutReceivingStore = false;
	function warnAboutReceivingStore() {
	  if (didWarnAboutReceivingStore) {
	    return;
	  }

	  didWarnAboutReceivingStore = true;
	  console.error( // eslint-disable-line no-console
	  '<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/rackt/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	}

	var Provider = (function (_Component) {
	  _inherits(Provider, _Component);

	  Provider.prototype.getChildContext = function getChildContext() {
	    return { store: this.store };
	  };

	  function Provider(props, context) {
	    _classCallCheck(this, Provider);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	    _this.store = props.store;
	    return _this;
	  }

	  Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var store = this.store;
	    var nextStore = nextProps.store;

	    if (store !== nextStore) {
	      warnAboutReceivingStore();
	    }
	  };

	  Provider.prototype.render = function render() {
	    var children = this.props.children;

	    return Children.only(children);
	  };

	  return Provider;
	})(Component);

	Provider.propTypes = {
	  store: storeShape.isRequired,
	  children: PropTypes.element.isRequired
	};
	Provider.childContextTypes = {
	  store: storeShape.isRequired
	};

	module.exports = Provider;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(1);

	var Component = _require.Component;
	var createElement = _require.createElement;

	var storeShape = __webpack_require__(17);
	var shallowEqual = __webpack_require__(56);
	var isPlainObject = __webpack_require__(55);
	var wrapActionCreators = __webpack_require__(57);
	var hoistStatics = __webpack_require__(39);
	var invariant = __webpack_require__(40);

	var defaultMapStateToProps = function defaultMapStateToProps(state) {
	  return {};
	}; // eslint-disable-line no-unused-vars
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	  return _extends({}, parentProps, stateProps, dispatchProps);
	};

	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}

	// Helps track hot reloading.
	var nextVersion = 0;

	function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	  var shouldSubscribe = Boolean(mapStateToProps);
	  var finalMapStateToProps = mapStateToProps || defaultMapStateToProps;
	  var finalMapDispatchToProps = isPlainObject(mapDispatchToProps) ? wrapActionCreators(mapDispatchToProps) : mapDispatchToProps || defaultMapDispatchToProps;
	  var finalMergeProps = mergeProps || defaultMergeProps;
	  var doStatePropsDependOnOwnProps = finalMapStateToProps.length !== 1;
	  var doDispatchPropsDependOnOwnProps = finalMapDispatchToProps.length !== 1;
	  var _options$pure = options.pure;
	  var pure = _options$pure === undefined ? true : _options$pure;
	  var _options$withRef = options.withRef;
	  var withRef = _options$withRef === undefined ? false : _options$withRef;

	  // Helps track hot reloading.

	  var version = nextVersion++;

	  function computeStateProps(store, props) {
	    var state = store.getState();
	    var stateProps = doStatePropsDependOnOwnProps ? finalMapStateToProps(state, props) : finalMapStateToProps(state);

	    invariant(isPlainObject(stateProps), '`mapStateToProps` must return an object. Instead received %s.', stateProps);
	    return stateProps;
	  }

	  function computeDispatchProps(store, props) {
	    var dispatch = store.dispatch;

	    var dispatchProps = doDispatchPropsDependOnOwnProps ? finalMapDispatchToProps(dispatch, props) : finalMapDispatchToProps(dispatch);

	    invariant(isPlainObject(dispatchProps), '`mapDispatchToProps` must return an object. Instead received %s.', dispatchProps);
	    return dispatchProps;
	  }

	  function computeMergedProps(stateProps, dispatchProps, parentProps) {
	    var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
	    invariant(isPlainObject(mergedProps), '`mergeProps` must return an object. Instead received %s.', mergedProps);
	    return mergedProps;
	  }

	  return function wrapWithConnect(WrappedComponent) {
	    var Connect = (function (_Component) {
	      _inherits(Connect, _Component);

	      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
	      };

	      function Connect(props, context) {
	        _classCallCheck(this, Connect);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	        _this.version = version;
	        _this.store = props.store || context.store;

	        invariant(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + _this.constructor.displayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + _this.constructor.displayName + '".'));

	        var storeState = _this.store.getState();
	        _this.state = { storeState: storeState };
	        _this.clearCache();
	        return _this;
	      }

	      Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
	        var nextStateProps = computeStateProps(this.store, this.props);
	        if (this.stateProps && shallowEqual(nextStateProps, this.stateProps)) {
	          return false;
	        }

	        this.stateProps = nextStateProps;
	        return true;
	      };

	      Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
	        var nextDispatchProps = computeDispatchProps(this.store, this.props);
	        if (this.dispatchProps && shallowEqual(nextDispatchProps, this.dispatchProps)) {
	          return false;
	        }

	        this.dispatchProps = nextDispatchProps;
	        return true;
	      };

	      Connect.prototype.updateMergedProps = function updateMergedProps() {
	        this.mergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
	      };

	      Connect.prototype.isSubscribed = function isSubscribed() {
	        return typeof this.unsubscribe === 'function';
	      };

	      Connect.prototype.trySubscribe = function trySubscribe() {
	        if (shouldSubscribe && !this.unsubscribe) {
	          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
	          this.handleChange();
	        }
	      };

	      Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
	        if (this.unsubscribe) {
	          this.unsubscribe();
	          this.unsubscribe = null;
	        }
	      };

	      Connect.prototype.componentDidMount = function componentDidMount() {
	        this.trySubscribe();
	      };

	      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!pure || !shallowEqual(nextProps, this.props)) {
	          this.haveOwnPropsChanged = true;
	        }
	      };

	      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.tryUnsubscribe();
	        this.clearCache();
	      };

	      Connect.prototype.clearCache = function clearCache() {
	        this.dispatchProps = null;
	        this.stateProps = null;
	        this.mergedProps = null;
	        this.haveOwnPropsChanged = true;
	        this.hasStoreStateChanged = true;
	        this.renderedElement = null;
	      };

	      Connect.prototype.handleChange = function handleChange() {
	        if (!this.unsubscribe) {
	          return;
	        }

	        var prevStoreState = this.state.storeState;
	        var storeState = this.store.getState();

	        if (!pure || prevStoreState !== storeState) {
	          this.hasStoreStateChanged = true;
	          this.setState({ storeState: storeState });
	        }
	      };

	      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	        invariant(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');

	        return this.refs.wrappedInstance;
	      };

	      Connect.prototype.render = function render() {
	        var haveOwnPropsChanged = this.haveOwnPropsChanged;
	        var hasStoreStateChanged = this.hasStoreStateChanged;
	        var renderedElement = this.renderedElement;

	        this.haveOwnPropsChanged = false;
	        this.hasStoreStateChanged = false;

	        var shouldUpdateStateProps = true;
	        var shouldUpdateDispatchProps = true;
	        if (pure && renderedElement) {
	          shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && doStatePropsDependOnOwnProps;
	          shouldUpdateDispatchProps = haveOwnPropsChanged && doDispatchPropsDependOnOwnProps;
	        }

	        var haveStatePropsChanged = false;
	        var haveDispatchPropsChanged = false;
	        if (shouldUpdateStateProps) {
	          haveStatePropsChanged = this.updateStatePropsIfNeeded();
	        }
	        if (shouldUpdateDispatchProps) {
	          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
	        }

	        var haveMergedPropsChanged = true;
	        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
	          this.updateMergedProps();
	        } else {
	          haveMergedPropsChanged = false;
	        }

	        if (!haveMergedPropsChanged && renderedElement) {
	          return renderedElement;
	        }

	        if (withRef) {
	          this.renderedElement = createElement(WrappedComponent, _extends({}, this.mergedProps, {
	            ref: 'wrappedInstance'
	          }));
	        } else {
	          this.renderedElement = createElement(WrappedComponent, this.mergedProps);
	        }

	        return this.renderedElement;
	      };

	      return Connect;
	    })(Component);

	    Connect.displayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.contextTypes = {
	      store: storeShape
	    };
	    Connect.propTypes = {
	      store: storeShape
	    };

	    if (process.env.NODE_ENV !== 'production') {
	      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	        if (this.version === version) {
	          return;
	        }

	        // We are hot reloading!
	        this.version = version;
	        this.trySubscribe();
	        this.clearCache();
	      };
	    }

	    return hoistStatics(Connect, WrappedComponent);
	  };
	}

	module.exports = connect;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */
	function isPlainObject(obj) {
	  if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
	    return false;
	  }

	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

	  if (proto === null) {
	    return true;
	  }

	  var constructor = proto.constructor;

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}

	module.exports = isPlainObject;

/***/ },
/* 56 */
/***/ function(module, exports) {

	"use strict";

	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _redux = __webpack_require__(20);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

	module.exports = wrapActionCreators;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){if(true)module.exports=t(__webpack_require__(4));else if("function"==typeof define&&define.amd)define(["redux-apis"],t);else{var n=t("object"==typeof exports?require("redux-apis"):e["redux-apis"]);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0}),t.Async=void 0;var c=n(1),f=r(c),l=t.Async=function(e){function t(){var e=arguments.length<=0||void 0===arguments[0]?t.INITIAL_STATE:arguments[0];o(this,t);var n=u(this,Object.getPrototypeOf(t).call(this,e));return n.setHandler(t.BUSY,function(e,n){return a({},e,{async:t.BUSY})}),n.setHandler(t.DONE,function(e,n){return a({},e,{async:t.DONE})}),n.setHandler(t.ERROR,function(e,t){return a({},e,{async:t.payload})}),n.setHandler(t.PENDING,function(e,n){return a({},e,{async:t.PENDING})}),n}return i(t,e),s(t,[{key:"pending",value:function(){return this.getState().async===t.PENDING}},{key:"busy",value:function(){return this.getState().async===t.BUSY}},{key:"done",value:function(){return this.getState().async===t.DONE}},{key:"error",value:function(){return this.getState().async instanceof Error&&this.getState().async}},{key:"setBusy",value:function(){return this.dispatch(this.createAction(t.BUSY)())}},{key:"setDone",value:function(){return this.dispatch(this.createAction(t.DONE)())}},{key:"setError",value:function(e){return this.dispatch(this.createAction(t.ERROR)(e))}},{key:"setPending",value:function(){return this.dispatch(this.createAction(t.PENDING)())}}]),t}(f["default"]);l.PENDING="PENDING",l.BUSY="BUSY",l.DONE="DONE",l.ERROR="ERROR",l.INITIAL_STATE={async:"PENDING"},t["default"]=l},function(e,t){e.exports=__webpack_require__(4)}])});
	//# sourceMappingURL=redux-async-api.min.js.map

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,o){if(true)module.exports=o();else if("function"==typeof define&&define.amd)define([],o);else{var t=o();for(var n in t)("object"==typeof exports?exports:e)[n]=t[n]}}(this,function(){return function(e){function o(n){if(t[n])return t[n].exports;var r=t[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,o),r.loaded=!0,r.exports}var t={};return o.m=e,o.c=t,o.p="",o(0)}([function(e,o){"use strict";function t(e){return function(o){return o.onload=e,o}}function n(e,o){return Promise.all(e.filter(function(e){return e.onload}).map(function(e){return e.onload(o)}).filter(function(e){return e instanceof Promise}))}Object.defineProperty(o,"__esModule",{value:!0}),o.onload=t,o.load=n}])});
	//# sourceMappingURL=redux-load-api.min.js.map

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';

	function thunkMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;

	  return function (next) {
	    return function (action) {
	      return typeof action === 'function' ? action(dispatch, getState) : next(action);
	    };
	  };
	}

	module.exports = thunkMiddleware;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(18);

	var _compose2 = _interopRequireDefault(_compose);

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */

	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {
	      var store = createStore(reducer, initialState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(22);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */

	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null || actionCreators === undefined) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(19);

	var _utilsIsPlainObject = __webpack_require__(21);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _utilsMapValues = __webpack_require__(22);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	var _utilsPick = __webpack_require__(64);

	var _utilsPick2 = _interopRequireDefault(_utilsPick);

	/* eslint-disable no-console */

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!_utilsIsPlainObject2['default'](inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key);
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */

	function combineReducers(reducers) {
	  var finalReducers = _utilsPick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;

	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination(state, action) {
	    if (state === undefined) state = {};

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var finalState = _utilsMapValues2['default'](finalReducers, function (reducer, key) {
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	      return nextStateForKey;
	    });

	    return hasChanged ? finalState : state;
	  };
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * Picks key-value pairs from an object where values satisfy a predicate.
	 *
	 * @param {Object} obj The object to pick from.
	 * @param {Function} fn The predicate the values must satisfy to be copied.
	 * @returns {Object} The object with the values that satisfied the predicate.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = pick;

	function pick(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    if (fn(obj[key])) {
	      result[key] = obj[key];
	    }
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ }
/******/ ]);