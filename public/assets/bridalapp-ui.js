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

	module.exports = __webpack_require__(31);


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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// stolen from https://github.com/acdlite/redux-actions/blob/v0.9.0/src/createAction.js
	function _createAction(type, actionCreator, metaCreator) {
		var finalActionCreator = typeof actionCreator === 'function' ? actionCreator : function (t) {
			return t;
		};
		return function () {
			var action = { type: type, payload: finalActionCreator.apply(undefined, arguments) };
			if (arguments.length === 1 && arguments[0] instanceof Error) {
				action.error = true;
			}
			if (typeof metaCreator === 'function') {
				action.meta = metaCreator.apply(undefined, arguments);
			}
			return action;
		};
	}

	var Api = (function () {
		function Api(state) {
			_classCallCheck(this, Api);

			Object.defineProperty(this, 'state', {
				get: function get() {
					if (this.parent) {
						var name = childName(this.parent, this);
						return name ? this.parent.state && this.parent.state[name] : this.parent.state;
					}
					if (this.store) {
						var result = this.store.getState();
						return result;
					}
					return state;
				},
				set: function set(value) {
					if (!this.parent && !this.store) {
						state = value;
					}
				}
			});

			this.__handlers = {};
		}

		_createClass(Api, [{
			key: 'init',
			value: function init() {
				this.dispatch(this.createAction('@@redux-apis/INIT')());
				return this;
			}
		}, {
			key: 'sub',
			value: function sub(name, api) {
				this[name] = new api();
				this[name].parent = this;
			}
		}, {
			key: 'createAction',
			value: function createAction(actionType, actionCreator, metaCreator) {
				var name = childName(this.parent, this);
				if (name) {
					return this.parent.createAction(name + '/' + actionType, actionCreator, metaCreator);
				}
				return _createAction(actionType, actionCreator, metaCreator);
			}
		}, {
			key: 'dispatch',
			value: function dispatch(action) {
				var _this = this;

				if (this.parent) {
					return this.parent.dispatch(action);
				}
				if (this.store) {
					return this.store.dispatch(action);
				}
				if (typeof action == 'function') {
					return action(this.dispatch.bind(this), function () {
						return _this.state;
					});
				}
				this.state = this.handle(action);
				return action;
			}
		}, {
			key: 'initialState',
			value: function initialState() {
				return {};
			}
		}, {
			key: 'handle',
			value: function handle(action) {
				var idx = action.type.indexOf('/');
				var sub = idx !== -1 && action.type.substring(0, idx);
				var subs = Object.keys(this);
				var result = typeof this.__handlers[action.type] == 'function' ? this.__handlers[action.type].call(this, action) : this.state || this.initialState();
				if (result === this.state) {
					result = undefined;
				}
				for (var i = 0, key; key = subs[i]; i++) {
					if (key != 'parent' && this[key] instanceof Api) {
						var act = key !== sub ? action : _extends({}, action, { type: action.type.substring(idx + 1) });
						var subState = this[key].handle(act);
						if (!this.state || this.state[key] !== subState) {
							result ? result[key] = subState : result = _extends({}, this.state, _defineProperty({}, key, subState));
						}
					}
				}
				return result || this.state;
			}
		}, {
			key: 'addHandler',
			value: function addHandler(actionType, handler) {
				this.__handlers[actionType] = handler;
			}
		}]);

		return Api;
	})();

	exports.default = Api;

	var RootApi = exports.RootApi = (function (_Api) {
		_inherits(RootApi, _Api);

		function RootApi(api, createStore, initialState) {
			_classCallCheck(this, RootApi);

			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(RootApi).call(this));

			_this2.bind(api);
			var reducer = function reducer(state, action) {
				return !_this2.store && state ? state : _this2.__api.handle(action);
			};
			_this2.store = createStore(reducer, initialState);
			return _this2;
		}

		_createClass(RootApi, [{
			key: 'bind',
			value: function bind(api) {
				var _this3 = this;

				if (this.__api) {
					apiKeys(this.__api).forEach(function (key) {
						return delete _this3[key];
					});
					Object.keys(api).forEach(function (key) {
						return delete RootApi[key];
					});
				}
				this.__api = new api();
				apiKeys(this.__api).forEach(function (key) {
					_this3[key] = typeof _this3.__api[key] == 'function' ? _this3.__api[key].bind(_this3.__api) : _this3.__api[key];
				});
				Object.keys(api).forEach(function (key) {
					return RootApi[key] = api[key];
				});
				this.__api.parent = this;
			}
		}]);

		return RootApi;
	})(Api);

	var RESERVED = Object.getOwnPropertyNames(Object.getPrototypeOf(new Api())).concat(['parent', 'bind']);

	function childName(parent, child) {
		if (parent && !(parent instanceof RootApi)) {
			var siblings = Object.keys(parent);
			for (var i = 0, name; name = siblings[i]; i++) {
				if (parent[name] === child) {
					return name;
				}
			}
		}
	}

	function apiKeys(obj) {
		return Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).concat(Object.keys(obj)).filter(function (key) {
			return RESERVED.indexOf(key) === -1;
		});
	}
	//# sourceMappingURL=redux-apis.js.map


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Provider = __webpack_require__(81);
	var connect = __webpack_require__(82);

	module.exports = { Provider: Provider, connect: connect };

/***/ },
/* 7 */
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

	var _Scroller = __webpack_require__(20);

	var _Scroller2 = _interopRequireDefault(_Scroller);

	var _FlipCard = __webpack_require__(19);

	var _FlipCard2 = _interopRequireDefault(_FlipCard);

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
							_FlipCard2.default,
							{ className: 'Brand', key: item.id },
							_react2.default.createElement(
								_FlipCard.Front,
								{ className: 'Test' },
								_react2.default.createElement(
									'div',
									{ className: 'content' },
									_react2.default.createElement('img', { src: 'https://cdn.rawgit.com/download/bridalapp-static/0.10.0/brands/' + item.id + '/logo-brand-name.png' })
								)
							),
							_react2.default.createElement(
								_FlipCard.Back,
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
/* 8 */
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

	var _Scroller = __webpack_require__(20);

	var _Scroller2 = _interopRequireDefault(_Scroller);

	var _FlipCard = __webpack_require__(19);

	var _FlipCard2 = _interopRequireDefault(_FlipCard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function select(state) {
		return { items: state.products.results };
	}

	exports.default = (0, _reactRedux.connect)(select)((_temp = _class = function (_React$Component) {
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
					className: 'ProductBrowser ' + this.props.category,
					direction: 'vertical',
					bufferBefore: 2,
					items: this.state.items,
					bufferAfter: 4,
					itemCount: this.state.itemCount,
					itemSize: 480,
					itemsPer: 1,
					renderItem: function renderItem(item, idx) {
						return _react2.default.createElement(
							_FlipCard2.default,
							{ className: 'Product', key: item.id },
							_react2.default.createElement(
								_FlipCard.Front,
								{ className: 'Test' },
								_react2.default.createElement(
									'div',
									{ className: 'content' },
									_react2.default.createElement('img', { src: 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==',
										style: { backgroundImage: 'url(https://cdn.rawgit.com/download/bridalapp-static/0.9.13/products/' + item.brandId + '/' + encodeURIComponent(item.name) + '/thumbs.jpg)' } })
								)
							),
							_react2.default.createElement(
								_FlipCard.Back,
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

		return ProductBrowser;
	}(_react2.default.Component), _class.propTypes = {
		category: _react.PropTypes.string
	}, _class.defaultProps = {
		category: 'Wedding Dresses'
	}, _class.fetchData = function (props) {
		var filter = {
			category: props.params.category
		};
		return app.products.search(filter);
	}, _temp));

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';

	exports.__esModule = true;
	var PUSH = 'PUSH';

	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';

	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';

	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(14);

	var _warning2 = _interopRequireDefault(_warning);

	var _extractPath = __webpack_require__(65);

	var _extractPath2 = _interopRequireDefault(_extractPath);

	function parsePath(path) {
	  var pathname = _extractPath2['default'](path);
	  var search = '';
	  var hash = '';

	  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }

	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }

	  if (pathname === '') pathname = '/';

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}

	exports['default'] = parsePath;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 11 */
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(68);
	module.exports = self.fetch.bind(self);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _basicClassCreator = __webpack_require__(78);

	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _basicClassCreator2.default)('Spacer', 'mdl-layout-spacer');

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = ReactRouter;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _isomorphicFetch = __webpack_require__(12);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var API_URL = '/api';
	if (typeof process != 'undefined') {
		var host = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
		var port = process.env.OPENSHIFT_NODEJS_PORT || '80';
		var path = process.env.BRIDALAPP_API_SERVER_PATH || '/api';
		API_URL = 'http://' + host + (port === '80' ? '' : ':' + port) + path;
	}

	var ApiClient = {
		url: API_URL,
		fetch: function fetch(url) {
			return (0, _isomorphicFetch2.default)(API_URL + url);
		}
	};

	exports.default = ApiClient;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _reduxApis = __webpack_require__(5);

	var _reduxApis2 = _interopRequireDefault(_reduxApis);

	var _api = __webpack_require__(51);

	var _api2 = _interopRequireDefault(_api);

	var _api3 = __webpack_require__(46);

	var _api4 = _interopRequireDefault(_api3);

	var _api5 = __webpack_require__(37);

	var _api6 = _interopRequireDefault(_api5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AppApi = function (_Api) {
		_inherits(AppApi, _Api);

		function AppApi(state) {
			_classCallCheck(this, AppApi);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppApi).call(this, state));

			_this.sub('rightDrawer', _api2.default);
			_this.sub('products', _api4.default);
			_this.sub('brands', _api6.default);
			return _this;
		}

		return AppApi;
	}(_reduxApis2.default);

	exports.default = AppApi;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Back = exports.Front = exports.CardFace = exports.default = undefined;

	var _CardFace2 = __webpack_require__(39);

	Object.defineProperty(exports, 'Front', {
	  enumerable: true,
	  get: function get() {
	    return _CardFace2.Front;
	  }
	});
	Object.defineProperty(exports, 'Back', {
	  enumerable: true,
	  get: function get() {
	    return _CardFace2.Back;
	  }
	});

	var _FlipCard = __webpack_require__(40);

	var _FlipCard2 = _interopRequireDefault(_FlipCard);

	var _CardFace3 = _interopRequireDefault(_CardFace2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _FlipCard2.default;
	exports.CardFace = _CardFace3.default;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _Scroller = __webpack_require__(53);

	var _Scroller2 = _interopRequireDefault(_Scroller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Scroller2.default;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}

	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}

	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}

	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}

	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}

	function go(n) {
	  if (n) window.history.go(n);
	}

	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}

	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */

	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  // FIXME: Work around our browser history not working correctly on Chrome
	  // iOS: https://github.com/rackt/react-router/issues/2565
	  if (ua.indexOf('CriOS') !== -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}

	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */

	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 23 */
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

	var _Spacer = __webpack_require__(13);

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
/* 24 */
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

	var _Tab = __webpack_require__(75);

	var _Tab2 = _interopRequireDefault(_Tab);

	var _TabBar = __webpack_require__(76);

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
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(29);

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
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */

	function createStore(reducer, initialState) {
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(26);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _utilsCombineReducers = __webpack_require__(89);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(88);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(87);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsCompose = __webpack_require__(28);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 28 */
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

	  return function (arg) {
	    return funcs.reduceRight(function (composed, f) {
	      return f(composed);
	    }, arg);
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 29 */
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
/* 30 */
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _redux = __webpack_require__(27);

	var _reduxThunk = __webpack_require__(86);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxApis = __webpack_require__(5);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(15);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(6);

	var _reactRouter = __webpack_require__(16);

	var _createBrowserHistory = __webpack_require__(60);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_picolog2.default.info('Starting BridalApp UI');

	var storeCreator = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore);

	var routes = __webpack_require__(54).default;
	var AppApi = __webpack_require__(18).default;

	var app = new _reduxApis.RootApi(AppApi, storeCreator, window.__data);

	(typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' ? window.app = app : global.app = app;

	var jsx = _react2.default.createElement(
	  _reactRedux.Provider,
	  { store: app.store },
	  _react2.default.createElement(
	    _reactRouter.Router,
	    { history: (0, _createBrowserHistory2.default)() },
	    routes
	  )
	);

	_reactDom2.default.render(jsx, document.getElementById('bridalapp'));

	if (false) {
	  module.hot.accept('./routes', function () {
	    _picolog2.default.warn('%c Hot reloading \'./routes\'', { color: 'green' });
	    routes = require('./routes').default;
	  });
	  module.hot.accept('./components/App/api', function () {
	    _picolog2.default.warn('%c Hot reloading \'./components/App/api\'', { color: 'green' });
	    AppApi = require('./components/App/api').default;
	    app.bind(AppApi);
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(16);

	var _reactRedux = __webpack_require__(6);

	var _Layout = __webpack_require__(74);

	var _RightDrawer = __webpack_require__(52);

	var _RightDrawer2 = _interopRequireDefault(_RightDrawer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	_picolog2.default.assert(_reactRedux.connect !== undefined, 'connect is undefined');

	_picolog2.default.assert(_Layout.Layout !== undefined, 'Layout is undefined');
	_picolog2.default.assert(_Layout.Header !== undefined, 'Header is undefined');
	_picolog2.default.assert(_Layout.Navigation !== undefined, 'Navigation is undefined');
	_picolog2.default.assert(_Layout.Drawer !== undefined, 'Drawer is undefined');
	_picolog2.default.assert(_Layout.Content !== undefined, 'Content is undefined');

	_picolog2.default.assert(_RightDrawer2.default !== undefined, 'RightDrawer is undefined');
	_picolog2.default.assert(_RightDrawer.LayoutTitle !== undefined, 'LayoutTitle is undefined');
	_picolog2.default.assert(_RightDrawer.LayoutObfuscator !== undefined, 'LayoutObfuscator is undefined');

	var App = function (_Component) {
		_inherits(App, _Component);

		function App(props) {
			_classCallCheck(this, App);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));
		}

		_createClass(App, [{
			key: 'render',
			value: function render() {
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
								{ onClick: function onClick() {
										alert('WTF');
									} },
								'this.props.appbar'
							)
						),
						_react2.default.createElement(
							_Layout.Navigation,
							null,
							!this.props.rightDrawer.open ? _react2.default.createElement(
								'i',
								{ className: 'material-icons', onClick: function onClick() {
										return _picolog2.default.info('click!');
									} },
								'account_circle'
							) : _react2.default.createElement('span', null)
						)
					),
					_react2.default.createElement(
						_RightDrawer2.default,
						{ open: this.props.rightDrawer.open },
						_react2.default.createElement(
							_RightDrawer.LayoutTitle,
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
					_react2.default.createElement(_RightDrawer.LayoutObfuscator, { visible: this.props.rightDrawer.open, onClick: function onClick() {
							return app.rightDrawer.close();
						} })
				);
			}
		}]);

		return App;
	}(_react.Component);

	// Which props do we want to inject, given the global state?
	// Note: use https://github.com/faassen/reselect for better performance.

	App.propTypes = {
		dispatch: _react.PropTypes.func.isRequired,
		rightDrawer: _react.PropTypes.shape({
			open: _react.PropTypes.bool.isRequired
		})
	};
	function select(state) {
		return state;
	}

	// Wrap the component to inject dispatch and state into it
	exports.default = (0, _reactRedux.connect)(select)(App);

	//export default App;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AppApi = exports.default = undefined;

	var _App = __webpack_require__(32);

	var _App2 = _interopRequireDefault(_App);

	var _api = __webpack_require__(18);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _App2.default;
	exports.AppApi = _api2.default;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BrandDetail = function (_React$Component) {
		_inherits(BrandDetail, _React$Component);

		function BrandDetail() {
			_classCallCheck(this, BrandDetail);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(BrandDetail).apply(this, arguments));
		}

		_createClass(BrandDetail, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					{ className: "BrandDetail" },
					this.props.children
				);
			}
		}]);

		return BrandDetail;
	}(_react2.default.Component);

	exports.default = BrandDetail;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _BrandBrowser = __webpack_require__(7);

	var _BrandBrowser2 = _interopRequireDefault(_BrandBrowser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BrandSearch = function (_React$Component) {
		_inherits(BrandSearch, _React$Component);

		function BrandSearch() {
			_classCallCheck(this, BrandSearch);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(BrandSearch).apply(this, arguments));
		}

		_createClass(BrandSearch, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(_BrandBrowser2.default, null);
			}
		}]);

		return BrandSearch;
	}(_react2.default.Component);

	exports.default = BrandSearch;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _reduxApis = __webpack_require__(5);

	var _reduxApis2 = _interopRequireDefault(_reduxApis);

	var _isomorphicFetch = __webpack_require__(12);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	var _apiClient = __webpack_require__(17);

	var _apiClient2 = _interopRequireDefault(_apiClient);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BrandsApi = function (_Api) {
		_inherits(BrandsApi, _Api);

		function BrandsApi(state) {
			_classCallCheck(this, BrandsApi);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BrandsApi).call(this, state));

			_this.addHandler('SEARCH', function (action) {
				return _extends({}, _this.state, {
					filter: action.payload,
					loading: true
				});
			});
			_this.addHandler('SEARCH_SUCCESS', function (action) {
				return _extends({}, _this.state, {
					results: action.payload,
					loading: false,
					loaded: true
				});
			});
			_this.addHandler('SEARCH_ERROR', function (action) {
				_picolog2.default.error('Error searching for brands: ', action.payload, action.payload.stack);
				return _extends({}, _this.state, {
					results: [],
					loading: false,
					loaded: false,
					error: action.payload
				});
			});
			return _this;
		}

		_createClass(BrandsApi, [{
			key: 'initialState',
			value: function initialState() {
				return {
					loading: false,
					loaded: false,
					filter: {},
					results: []
				};
			}
		}, {
			key: 'search',
			value: function search(filter) {
				var _this2 = this;

				// dispatch a function... redux-thunk will execute the function
				var dispatchResult = this.dispatch(function (dispatch, getState) {
					_this2.dispatch(_this2.createAction('SEARCH')(filter));
					return _apiClient2.default.fetch('/brands/search').then(function (response) {
						if (response.status === 200) {
							return response.json();
						} else throw new Error('Not Found.');
					}).then(function (json) {
						return _this2.dispatch(_this2.createAction('SEARCH_SUCCESS')(json));
					}).catch(function (error) {
						return _this2.dispatch(_this2.createAction('SEARCH_ERROR')(error));
					});
				});
				return dispatchResult;
			}
		}, {
			key: 'results',
			value: function results() {
				return this.state.results;
			}
		}]);

		return BrandsApi;
	}(_reduxApis2.default);

	exports.default = BrandsApi;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BrandDetail = exports.BrandBrowser = exports.BrandSearch = exports.default = undefined;

	var _Brands = __webpack_require__(36);

	var _Brands2 = _interopRequireDefault(_Brands);

	var _BrandSearch2 = __webpack_require__(35);

	var _BrandSearch3 = _interopRequireDefault(_BrandSearch2);

	var _BrandBrowser2 = __webpack_require__(7);

	var _BrandBrowser3 = _interopRequireDefault(_BrandBrowser2);

	var _BrandDetail2 = __webpack_require__(34);

	var _BrandDetail3 = _interopRequireDefault(_BrandDetail2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Brands2.default;
	exports.BrandSearch = _BrandSearch3.default;
	exports.BrandBrowser = _BrandBrowser3.default;
	exports.BrandDetail = _BrandDetail3.default;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Back = exports.Front = undefined;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CardFace = function (_React$Component) {
		_inherits(CardFace, _React$Component);

		function CardFace() {
			_classCallCheck(this, CardFace);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(CardFace).apply(this, arguments));
		}

		_createClass(CardFace, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var faceClass = _props.faceClass;
				var children = _props.children;

				var otherProps = _objectWithoutProperties(_props, ['className', 'faceClass', 'children']);

				var classes = (0, _classnames2.default)(className, faceClass);
				return _react2.default.createElement(
					'div',
					_extends({ className: classes }, otherProps),
					children
				);
			}
		}]);

		return CardFace;
	}(_react2.default.Component);

	CardFace.propTypes = {
		className: _react.PropTypes.string,
		faceClass: _react.PropTypes.string,
		children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
	};
	CardFace.defaultProps = {
		faceClass: 'mdl-card__face'
	};
	exports.default = CardFace;

	var Front = exports.Front = function (_CardFace) {
		_inherits(Front, _CardFace);

		function Front() {
			_classCallCheck(this, Front);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Front).apply(this, arguments));
		}

		return Front;
	}(CardFace);

	Front.defaultProps = {
		faceClass: (0, _classnames2.default)(CardFace.defaultProps.faceClass, 'mdl-card__front')
	};

	var Back = exports.Back = function (_CardFace2) {
		_inherits(Back, _CardFace2);

		function Back() {
			_classCallCheck(this, Back);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Back).apply(this, arguments));
		}

		return Back;
	}(CardFace);

	Back.defaultProps = {
		faceClass: (0, _classnames2.default)(CardFace.defaultProps.faceClass, 'mdl-card__back')
	};

/***/ },
/* 40 */
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

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FlipCard = function (_React$Component) {
		_inherits(FlipCard, _React$Component);

		function FlipCard() {
			_classCallCheck(this, FlipCard);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(FlipCard).apply(this, arguments));
		}

		_createClass(FlipCard, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var cardClass = _props.cardClass;
				var shadowClass = _props.shadowClass;
				var flippedClass = _props.flippedClass;
				var flipped = _props.flipped;
				var children = _props.children;

				var otherProps = _objectWithoutProperties(_props, ['className', 'cardClass', 'shadowClass', 'flippedClass', 'flipped', 'children']);

				var classes = (0, _classnames2.default)(className, cardClass, shadowClass, { flippedClass: flipped });
				return _react2.default.createElement(
					'div',
					_extends({ className: classes }, otherProps),
					children
				);
			}
		}]);

		return FlipCard;
	}(_react2.default.Component);

	FlipCard.propTypes = {
		className: _react.PropTypes.string,
		cardClass: _react.PropTypes.string,
		shadowClass: _react.PropTypes.string,
		flippedClass: _react.PropTypes.string,
		flipped: _react.PropTypes.bool,
		children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
	};
	FlipCard.defaultProps = {
		cardClass: 'mdl-card mdl-flip-card',
		shadowClass: 'mdl-shadow--2dp',
		flippedClass: 'is-flipped',
		flipped: _react.PropTypes.bool
	};
	exports.default = FlipCard;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _Home = __webpack_require__(41);

	var _Home2 = _interopRequireDefault(_Home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Home2.default;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ProductBrowser = __webpack_require__(8);

	var _ProductBrowser2 = _interopRequireDefault(_ProductBrowser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ProductSearch = function (_React$Component) {
		_inherits(ProductSearch, _React$Component);

		function ProductSearch() {
			_classCallCheck(this, ProductSearch);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(ProductSearch).apply(this, arguments));
		}

		_createClass(ProductSearch, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(_ProductBrowser2.default, { category: this.props.params.category });
			}
		}]);

		return ProductSearch;
	}(_react2.default.Component);

	exports.default = ProductSearch;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _reduxApis = __webpack_require__(5);

	var _reduxApis2 = _interopRequireDefault(_reduxApis);

	var _isomorphicFetch = __webpack_require__(12);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	var _apiClient = __webpack_require__(17);

	var _apiClient2 = _interopRequireDefault(_apiClient);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ProductsApi = function (_Api) {
		_inherits(ProductsApi, _Api);

		function ProductsApi(state) {
			_classCallCheck(this, ProductsApi);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProductsApi).call(this, state));

			_this.addHandler('SEARCH', function (action) {
				return _extends({}, _this.state, {
					filter: action.payload,
					loading: true
				});
			});
			_this.addHandler('SEARCH_SUCCESS', function (action) {
				return _extends({}, _this.state, {
					results: action.payload,
					loading: false,
					loaded: true
				});
			});
			_this.addHandler('SEARCH_ERROR', function (action) {
				_picolog2.default.error('Error searching for products: ', action.payload, action.payload.stack);
				return _extends({}, _this.state, {
					results: [],
					loading: false,
					loaded: false,
					error: action.payload
				});
			});
			return _this;
		}

		_createClass(ProductsApi, [{
			key: 'initialState',
			value: function initialState() {
				return {
					loading: false,
					loaded: false,
					filter: {
						category: 'Wedding+Dresses'
					},
					results: []
				};
			}
		}, {
			key: 'search',
			value: function search(filter) {
				var _this2 = this;

				// dispatch a function... redux-thunk will execute the function
				var dispatchResult = this.dispatch(function (dispatch, getState) {
					_this2.dispatch(_this2.createAction('SEARCH')(filter));
					return _apiClient2.default.fetch('/products/search/' + filter.category).then(function (response) {
						if (response.status === 200) {
							return response.json();
						} else throw new Error('Not Found.');
					}).then(function (json) {
						return _this2.dispatch(_this2.createAction('SEARCH_SUCCESS')(json));
					}).catch(function (error) {
						return _this2.dispatch(_this2.createAction('SEARCH_ERROR')(error));
					});
				});
				return dispatchResult;
			}
		}, {
			key: 'results',
			value: function results() {
				return this.state.results;
			}
		}]);

		return ProductsApi;
	}(_reduxApis2.default);

	exports.default = ProductsApi;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ProductDetail = exports.ProductBrowser = exports.ProductSearch = exports.default = undefined;

	var _Products = __webpack_require__(45);

	var _Products2 = _interopRequireDefault(_Products);

	var _ProductSearch2 = __webpack_require__(44);

	var _ProductSearch3 = _interopRequireDefault(_ProductSearch2);

	var _ProductBrowser2 = __webpack_require__(8);

	var _ProductBrowser3 = _interopRequireDefault(_ProductBrowser2);

	var _ProductDetail2 = __webpack_require__(43);

	var _ProductDetail3 = _interopRequireDefault(_ProductDetail2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Products2.default;
	exports.ProductSearch = _ProductSearch3.default;
	exports.ProductBrowser = _ProductBrowser3.default;
	exports.ProductDetail = _ProductDetail3.default;

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

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LayoutObfuscator = function (_React$Component) {
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
	}(_react2.default.Component);

	LayoutObfuscator.propTypes = {
		className: _react.PropTypes.string,
		obfuscatorClassName: _react.PropTypes.string,
		visibleClassName: _react.PropTypes.string,
		visible: _react.PropTypes.bool,
		children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
	};
	LayoutObfuscator.defaultProps = {
		obfuscatorClassName: 'mdl-layout__obfuscator',
		visibleClassName: 'is-visible',
		visible: false
	};
	exports.default = LayoutObfuscator;

/***/ },
/* 49 */
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

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DrawerTitle = function (_React$Component) {
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
	}(_react2.default.Component);

	DrawerTitle.propTypes = {
		className: _react.PropTypes.string,
		titleClassName: _react.PropTypes.string,
		children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
	};
	DrawerTitle.defaultProps = {
		titleClassName: 'mdl-layout-title',
		open: false
	};
	exports.default = DrawerTitle;

/***/ },
/* 50 */
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

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RightDrawer = function (_React$Component) {
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
	}(_react2.default.Component);

	RightDrawer.propTypes = {
		className: _react.PropTypes.string,
		drawerClassName: _react.PropTypes.string,
		visibleClassName: _react.PropTypes.string,
		open: _react.PropTypes.bool,
		children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array, _react.PropTypes.string])
	};
	RightDrawer.defaultProps = {
		drawerClassName: 'mdl-layout__drawer mdl-layout__drawer-right',
		visibleClassName: 'is-visible',
		open: false
	};
	exports.default = RightDrawer;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _reduxApis = __webpack_require__(5);

	var _reduxApis2 = _interopRequireDefault(_reduxApis);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	_picolog2.default.debug('DrawerApi: Api=', _reduxApis2.default);

	var DrawerApi = function (_Api) {
		_inherits(DrawerApi, _Api);

		function DrawerApi(state) {
			_classCallCheck(this, DrawerApi);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DrawerApi).call(this, state));

			_this.addHandler('OPEN', function (action) {
				return _extends({}, _this.state, { open: true });
			});
			_this.addHandler('CLOSE', function (action) {
				return _extends({}, _this.state, { open: false });
			});
			return _this;
		}

		_createClass(DrawerApi, [{
			key: 'initialState',
			value: function initialState() {
				return { open: false };
			}
		}, {
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
				return this.state.open;
			}
		}]);

		return DrawerApi;
	}(_reduxApis2.default);

	exports.default = DrawerApi;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LayoutTitle = exports.LayoutObfuscator = exports.default = undefined;

	var _RightDrawer = __webpack_require__(50);

	var _RightDrawer2 = _interopRequireDefault(_RightDrawer);

	var _LayoutObfuscator2 = __webpack_require__(48);

	var _LayoutObfuscator3 = _interopRequireDefault(_LayoutObfuscator2);

	var _LayoutTitle2 = __webpack_require__(49);

	var _LayoutTitle3 = _interopRequireDefault(_LayoutTitle2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _RightDrawer2.default;
	exports.LayoutObfuscator = _LayoutObfuscator3.default;
	exports.LayoutTitle = _LayoutTitle3.default;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(15);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Scroller = function (_React$Component) {
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
	}(_react2.default.Component);

	Scroller.propTypes = {
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
		renderLoadingItem: _react2.default.PropTypes.func };
	Scroller.defaultProps = {
		items: { 0: [] },
		itemSize: 300,
		initialItemsInView: 100,
		itemsPer: 1,
		bufferBefore: 1,
		bufferAfter: 1,
		scrollDebounce: 10,
		direction: 'vertical',
		snap: false
	};
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _picolog = __webpack_require__(3);

	var _picolog2 = _interopRequireDefault(_picolog);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Use require so we can hot-reload individual components
	var App = __webpack_require__(33).default;
	var Home = __webpack_require__(42).default;
	var Products = __webpack_require__(47).default;
	var ProductBrowser = __webpack_require__(8).default;
	var Brands = __webpack_require__(38).default;
	var BrandBrowser = __webpack_require__(7).default;

	_picolog2.default.assert(typeof App == 'function', 'App should be a function');
	_picolog2.default.assert(typeof Home == 'function', 'Home should be a function');
	_picolog2.default.assert(typeof Products == 'function', 'Product should be a function');
	_picolog2.default.assert(typeof ProductBrowser == 'function', 'ProductBrowser should be a function');
	_picolog2.default.assert(typeof Brands == 'function', 'Brands should be a function');
	_picolog2.default.assert(typeof BrandBrowser == 'function', 'BrandBrowser should be a function');

	var routes = _react2.default.createElement(
		_reactRouter.Route,
		{ component: App },
		_react2.default.createElement(_reactRouter.Route, { path: '/', component: Home }),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: '/products', component: Products },
			_react2.default.createElement(_reactRouter.IndexRedirect, { to: '/products/Wedding+Dresses' }),
			_react2.default.createElement(_reactRouter.Route, { path: ':category', component: ProductBrowser })
		),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: '/brands', component: Brands },
			_react2.default.createElement(_reactRouter.IndexRedirect, { to: '/brands/all' }),
			_react2.default.createElement(_reactRouter.Route, { path: 'all', component: BrandBrowser })
		)
	);

	exports.default = routes;

	if (false) {
		module.hot.accept('./components/App', function () {
			_picolog2.default.info('Hot-reloading \'./components/App\'...');
		});
		module.hot.accept('./components/Home', function () {
			_picolog2.default.info('Hot-reloading \'./components/Home\'...');
		});
		module.hot.accept('./components/Products', function () {
			_picolog2.default.info('Hot-reloading \'./components/Products\'...');
		});
		module.hot.accept('./components/Products/ProductBrowser', function () {
			_picolog2.default.info('Hot-reloading \'./components/Products/ProductBrowser\'...');
		});
		module.hot.accept('./components/Brands', function () {
			_picolog2.default.info('Hot-reloading \'./components/Brands\'...');
		});
		module.hot.accept('./components/Brands/BrandBrowser', function () {
			_picolog2.default.info('Hot-reloading \'./components/Brands/BrandBrowser\'...');
		});
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(57);
	var isArguments = __webpack_require__(56);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 56 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 57 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.loopAsync = loopAsync;

	function loopAsync(turns, work, callback) {
	  var currentTurn = 0;
	  var isDone = false;

	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) return;

	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }

	  next();
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*eslint-disable no-empty */
	'use strict';

	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(14);

	var _warning2 = _interopRequireDefault(_warning);

	var KeyPrefix = '@@History/';
	var QuotaExceededError = 'QuotaExceededError';
	var SecurityError = 'SecurityError';

	function createKey(key) {
	  return KeyPrefix + key;
	}

	function saveState(key, state) {
	  try {
	    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

	      return;
	    }

	    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

	      return;
	    }

	    throw error;
	  }
	}

	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

	      return null;
	    }
	  }

	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }

	  return null;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(11);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(9);

	var _ExecutionEnvironment = __webpack_require__(22);

	var _DOMUtils = __webpack_require__(21);

	var _DOMStateStorage = __webpack_require__(59);

	var _createDOMHistory = __webpack_require__(61);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	var _parsePath = __webpack_require__(10);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

	  var forceRefresh = options.forceRefresh;

	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;

	  function getCurrentLocation(historyState) {
	    historyState = historyState || window.history.state || {};

	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;

	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();

	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
	    }

	    var location = _parsePath2['default'](path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

	      transitionTo(getCurrentLocation(event.state));
	    }

	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    _DOMStateStorage.saveState(key, state);

	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };

	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopPopStateListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopPopStateListener();
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}

	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(11);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ExecutionEnvironment = __webpack_require__(22);

	var _DOMUtils = __webpack_require__(21);

	var _createHistory = __webpack_require__(62);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));

	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

	    return history.listen(listener);
	  }

	  return _extends({}, history, {
	    listen: listen
	  });
	}

	exports['default'] = createDOMHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	//import warning from 'warning'
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _deepEqual = __webpack_require__(55);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _AsyncUtils = __webpack_require__(58);

	var _Actions = __webpack_require__(9);

	var _createLocation2 = __webpack_require__(63);

	var _createLocation3 = _interopRequireDefault(_createLocation2);

	var _runTransitionHook = __webpack_require__(66);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _parsePath = __webpack_require__(10);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	var _deprecate = __webpack_require__(64);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}

	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}

	var DefaultKeyLength = 6;

	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var keyLength = options.keyLength;
	  var getUserConfirmation = options.getUserConfirmation;

	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

	  var transitionHooks = [];

	  function listenBefore(hook) {
	    transitionHooks.push(hook);

	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }

	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;

	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }

	  function updateLocation(newLocation) {
	    var current = getCurrent();

	    location = newLocation;

	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }

	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }

	  function listen(listener) {
	    changeListeners.push(listener);

	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }

	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }

	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }

	  var pendingLocation = undefined;

	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

	    pendingLocation = nextLocation;

	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);

	          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
	        }

	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);

	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }

	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }

	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }

	  function goBack() {
	    go(-1);
	  }

	  function goForward() {
	    go(1);
	  }

	  function createKey() {
	    return createRandomKey(keyLength);
	  }

	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;

	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;

	    var result = pathname;

	    if (search) result += search;

	    if (hash) result += hash;

	    return result;
	  }

	  function createHref(location) {
	    return createPath(location);
	  }

	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

	    if (typeof action === 'object') {
	      //warning(
	      //  false,
	      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
	      //  'location descriptor instead'
	      //)

	      if (typeof location === 'string') location = _parsePath2['default'](location);

	      location = _extends({}, location, { state: action });

	      action = key;
	      key = arguments[3] || createKey();
	    }

	    return _createLocation3['default'](location, action, key);
	  }

	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }

	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }

	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);

	    push(_extends({ state: state }, path));
	  }

	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);

	    replace(_extends({ state: state }, path));
	  }

	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,

	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}

	exports['default'] = createHistory;
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	//import warning from 'warning'
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Actions = __webpack_require__(9);

	var _parsePath = __webpack_require__(10);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	  if (typeof location === 'string') location = _parsePath2['default'](location);

	  if (typeof action === 'object') {
	    //warning(
	    //  false,
	    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
	    //  'location descriptor instead'
	    //)

	    location = _extends({}, location, { state: action });

	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }

	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}

	exports['default'] = createLocation;
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports) {

	//import warning from 'warning'

	"use strict";

	exports.__esModule = true;
	function deprecate(fn) {
	  return fn;
	  //return function () {
	  //  warning(false, '[history] ' + message)
	  //  return fn.apply(this, arguments)
	  //}
	}

	exports["default"] = deprecate;
	module.exports = exports["default"];

/***/ },
/* 65 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);

	  if (match == null) return string;

	  return string.substring(match[0].length);
	}

	exports["default"] = extractPath;
	module.exports = exports["default"];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(14);

	var _warning2 = _interopRequireDefault(_warning);

	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);

	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}

	exports['default'] = runTransitionHook;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 67 */
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
/* 68 */
/***/ function(module, exports) {

	(function() {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  function Body() {
	    this.bodyUsed = false


	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this._initBody(bodyInit)
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }

	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return;
	      }

	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})();


/***/ },
/* 69 */
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
/* 70 */
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
/* 71 */
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

	var _HeaderRow = __webpack_require__(23);

	var _HeaderRow2 = _interopRequireDefault(_HeaderRow);

	var _HeaderTabs = __webpack_require__(24);

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
/* 72 */
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

	var _mdlUpgrade = __webpack_require__(80);

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
/* 73 */
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

	var _cloneChildren = __webpack_require__(79);

	var _cloneChildren2 = _interopRequireDefault(_cloneChildren);

	var _Spacer = __webpack_require__(13);

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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Spacer = exports.Navigation = exports.HeaderTabs = exports.HeaderRow = exports.Header = exports.Drawer = exports.Content = exports.Layout = undefined;

	var _Layout2 = __webpack_require__(72);

	var _Layout3 = _interopRequireDefault(_Layout2);

	var _Content2 = __webpack_require__(69);

	var _Content3 = _interopRequireDefault(_Content2);

	var _Drawer2 = __webpack_require__(70);

	var _Drawer3 = _interopRequireDefault(_Drawer2);

	var _Header2 = __webpack_require__(71);

	var _Header3 = _interopRequireDefault(_Header2);

	var _HeaderRow2 = __webpack_require__(23);

	var _HeaderRow3 = _interopRequireDefault(_HeaderRow2);

	var _HeaderTabs2 = __webpack_require__(24);

	var _HeaderTabs3 = _interopRequireDefault(_HeaderTabs2);

	var _Navigation2 = __webpack_require__(73);

	var _Navigation3 = _interopRequireDefault(_Navigation2);

	var _Spacer2 = __webpack_require__(13);

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
/* 75 */
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
/* 76 */
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _reactDom = __webpack_require__(15);

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
/* 78 */
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
/* 79 */
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _MDLComponent = __webpack_require__(77);

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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(1);

	var Component = _require.Component;
	var PropTypes = _require.PropTypes;
	var Children = _require.Children;

	var storeShape = __webpack_require__(25);

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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(1);

	var Component = _require.Component;
	var createElement = _require.createElement;

	var storeShape = __webpack_require__(25);
	var shallowEqual = __webpack_require__(84);
	var isPlainObject = __webpack_require__(83);
	var wrapActionCreators = __webpack_require__(85);
	var hoistStatics = __webpack_require__(67);
	var invariant = __webpack_require__(11);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 83 */
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
/* 84 */
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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _redux = __webpack_require__(27);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

	module.exports = wrapActionCreators;

/***/ },
/* 86 */
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(28);

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

	  return function (next) {
	    return function (reducer, initialState) {
	      var store = next(reducer, initialState);
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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mapValues = __webpack_require__(30);

	var _mapValues2 = _interopRequireDefault(_mapValues);

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

	  return _mapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(26);

	var _isPlainObject = __webpack_require__(29);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _mapValues = __webpack_require__(30);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _pick = __webpack_require__(90);

	var _pick2 = _interopRequireDefault(_pick);

	/* eslint-disable no-console */

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
	  var reducerKeys = Object.keys(outputState);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!_isPlainObject2['default'](inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return reducerKeys.indexOf(key) < 0;
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
	  var finalReducers = _pick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;

	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  var defaultState = _mapValues2['default'](finalReducers, function () {
	    return undefined;
	  });

	  return function combination(state, action) {
	    if (state === undefined) state = defaultState;

	    if (sanityError) {
	      throw sanityError;
	    }

	    var hasChanged = false;
	    var finalState = _mapValues2['default'](finalReducers, function (reducer, key) {
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	      return nextStateForKey;
	    });

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }

	    return hasChanged ? finalState : state;
	  };
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 90 */
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