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

	module.exports = __webpack_require__(50);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("picolog");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("redux-apis");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _class, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(11);
	
	var _Scroller = __webpack_require__(21);
	
	var _Scroller2 = _interopRequireDefault(_Scroller);
	
	var _FlipCard = __webpack_require__(20);
	
	var _FlipCard2 = _interopRequireDefault(_FlipCard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function select(state) {
		return { items: state.brands.results };
	}
	
	exports.default = (0, _reactRedux.connect)(select)((_temp = _class = function (_React$Component) {
		(0, _inherits3.default)(BrandBrowser, _React$Component);
	
		function BrandBrowser(props) {
			(0, _classCallCheck3.default)(this, BrandBrowser);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BrandBrowser).call(this, props));
	
			_this.state = _this.getState(props);
			return _this;
		}
	
		(0, _createClass3.default)(BrandBrowser, [{
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _class, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(11);
	
	var _Scroller = __webpack_require__(21);
	
	var _Scroller2 = _interopRequireDefault(_Scroller);
	
	var _FlipCard = __webpack_require__(20);
	
	var _FlipCard2 = _interopRequireDefault(_FlipCard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function select(state) {
		return { items: state.products.results };
	}
	
	exports.default = (0, _reactRedux.connect)(select)((_temp = _class = function (_React$Component) {
		(0, _inherits3.default)(ProductBrowser, _React$Component);
	
		function ProductBrowser(props) {
			(0, _classCallCheck3.default)(this, ProductBrowser);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProductBrowser).call(this, props));
	
			_this.state = _this.getState(props);
			return _this;
		}
	
		(0, _createClass3.default)(ProductBrowser, [{
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
/* 16 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _isomorphicFetch = __webpack_require__(16);
	
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

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(12);
	
	var _reactRedux = __webpack_require__(11);
	
	var _Layout = __webpack_require__(63);
	
	var _RightDrawer = __webpack_require__(46);
	
	var _RightDrawer2 = _interopRequireDefault(_RightDrawer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
		(0, _inherits3.default)(App, _Component);
	
		function App(props) {
			(0, _classCallCheck3.default)(this, App);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));
		}
	
		(0, _createClass3.default)(App, [{
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(13);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	var _api = __webpack_require__(45);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _api3 = __webpack_require__(40);
	
	var _api4 = _interopRequireDefault(_api3);
	
	var _api5 = __webpack_require__(30);
	
	var _api6 = _interopRequireDefault(_api5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AppApi = function (_Api) {
		(0, _inherits3.default)(AppApi, _Api);
	
		function AppApi(state) {
			(0, _classCallCheck3.default)(this, AppApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AppApi).call(this, state));
	
			_this.sub('rightDrawer', _api2.default);
			_this.sub('products', _api4.default);
			_this.sub('brands', _api6.default);
			return _this;
		}
	
		return AppApi;
	}(_reduxApis2.default);
	
	exports.default = AppApi;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Back = exports.Front = exports.CardFace = exports.default = undefined;
	
	var _CardFace2 = __webpack_require__(32);
	
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
	
	var _FlipCard = __webpack_require__(33);
	
	var _FlipCard2 = _interopRequireDefault(_FlipCard);
	
	var _CardFace3 = _interopRequireDefault(_CardFace2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _FlipCard2.default;
	exports.CardFace = _CardFace3.default;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _Scroller = __webpack_require__(47);
	
	var _Scroller2 = _interopRequireDefault(_Scroller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Scroller2.default;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(60);
	
	var buildPath = path.resolve(__dirname);
	var publicPath = path.resolve(__dirname, 'public');
	var testPath = path.resolve(publicPath, 'test');
	
	module.exports = {
		isProduction: process.env.NODE_ENV === 'production',
		publicPath: publicPath,
		buildPath: buildPath,
		client: {
			name: 'BridalApp UI Client',
			entry: './src/client',
			output: {
				filename: 'bridalapp-ui.js',
				path: path.resolve(publicPath, 'assets'),
				publicPath: '/assets/',
			},
		},
		server: {
			name: 'BridalApp UI Server',
			host: process.env.OPENSHIFT_NODEJS_IP || 'localhost',
			port: process.env.OPENSHIFT_NODEJS_PORT || 80,
			path: process.env.OPENSHIFT_NODEJS_PATH || '/',
			entry: './src/server',
			output: {
				filename: 'server.js',
				path: '',
			},
		},
		apiServer: {
			name: 'BridalApp API Server',
			host: process.env.BRIDALAPP_API_SERVER_HOST || 'localhost',
			port: process.env.BRIDALAPP_API_SERVER_PORT || 8080,
			path: process.env.BRIDALAPP_API_SERVER_PATH || '/api',
		},
		tests: {
			name: 'BridalApp UI Tests',
			entry: './src/tests',
			output: {
				filename: 'bridalapp-ui-tests.js',
				path: path.resolve(testPath, 'assets'),
				publicPath: '/test/assets/',
			},
		}
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AppApi = exports.default = undefined;
	
	var _App = __webpack_require__(18);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _api = __webpack_require__(19);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _App2.default;
	exports.AppApi = _api2.default;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BrandDetail = function (_React$Component) {
		(0, _inherits3.default)(BrandDetail, _React$Component);
	
		function BrandDetail() {
			(0, _classCallCheck3.default)(this, BrandDetail);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BrandDetail).apply(this, arguments));
		}
	
		(0, _createClass3.default)(BrandDetail, [{
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BrandBrowser = __webpack_require__(14);
	
	var _BrandBrowser2 = _interopRequireDefault(_BrandBrowser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BrandSearch = function (_React$Component) {
		(0, _inherits3.default)(BrandSearch, _React$Component);
	
		function BrandSearch() {
			(0, _classCallCheck3.default)(this, BrandSearch);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BrandSearch).apply(this, arguments));
		}
	
		(0, _createClass3.default)(BrandSearch, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(_BrandBrowser2.default, null);
			}
		}]);
		return BrandSearch;
	}(_react2.default.Component);
	
	exports.default = BrandSearch;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Brands = function (_React$Component) {
		(0, _inherits3.default)(Brands, _React$Component);
	
		function Brands() {
			(0, _classCallCheck3.default)(this, Brands);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Brands).apply(this, arguments));
		}
	
		(0, _createClass3.default)(Brands, [{
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(13);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	var _isomorphicFetch = __webpack_require__(16);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _apiClient = __webpack_require__(17);
	
	var _apiClient2 = _interopRequireDefault(_apiClient);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BrandsApi = function (_Api) {
		(0, _inherits3.default)(BrandsApi, _Api);
	
		function BrandsApi(state) {
			(0, _classCallCheck3.default)(this, BrandsApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BrandsApi).call(this, state));
	
			_this.addHandler('SEARCH', function (action) {
				return (0, _extends3.default)({}, _this.state, {
					filter: action.payload,
					loading: true
				});
			});
			_this.addHandler('SEARCH_SUCCESS', function (action) {
				return (0, _extends3.default)({}, _this.state, {
					results: action.payload,
					loading: false,
					loaded: true
				});
			});
			_this.addHandler('SEARCH_ERROR', function (action) {
				_picolog2.default.error('Error searching for brands: ', action.payload, action.payload.stack);
				return (0, _extends3.default)({}, _this.state, {
					results: [],
					loading: false,
					loaded: false,
					error: action.payload
				});
			});
			return _this;
		}
	
		(0, _createClass3.default)(BrandsApi, [{
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BrandDetail = exports.BrandBrowser = exports.BrandSearch = exports.default = undefined;
	
	var _Brands = __webpack_require__(29);
	
	var _Brands2 = _interopRequireDefault(_Brands);
	
	var _BrandSearch2 = __webpack_require__(28);
	
	var _BrandSearch3 = _interopRequireDefault(_BrandSearch2);
	
	var _BrandBrowser2 = __webpack_require__(14);
	
	var _BrandBrowser3 = _interopRequireDefault(_BrandBrowser2);
	
	var _BrandDetail2 = __webpack_require__(27);
	
	var _BrandDetail3 = _interopRequireDefault(_BrandDetail2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Brands2.default;
	exports.BrandSearch = _BrandSearch3.default;
	exports.BrandBrowser = _BrandBrowser3.default;
	exports.BrandDetail = _BrandDetail3.default;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Back = exports.Front = undefined;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(10);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CardFace = function (_React$Component) {
		(0, _inherits3.default)(CardFace, _React$Component);
	
		function CardFace() {
			(0, _classCallCheck3.default)(this, CardFace);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CardFace).apply(this, arguments));
		}
	
		(0, _createClass3.default)(CardFace, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var faceClass = _props.faceClass;
				var children = _props.children;
				var otherProps = (0, _objectWithoutProperties3.default)(_props, ['className', 'faceClass', 'children']);
	
				var classes = (0, _classnames2.default)(className, faceClass);
				return _react2.default.createElement(
					'div',
					(0, _extends3.default)({ className: classes }, otherProps),
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
		(0, _inherits3.default)(Front, _CardFace);
	
		function Front() {
			(0, _classCallCheck3.default)(this, Front);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Front).apply(this, arguments));
		}
	
		return Front;
	}(CardFace);
	
	Front.defaultProps = {
		faceClass: (0, _classnames2.default)(CardFace.defaultProps.faceClass, 'mdl-card__front')
	};
	
	var Back = exports.Back = function (_CardFace2) {
		(0, _inherits3.default)(Back, _CardFace2);
	
		function Back() {
			(0, _classCallCheck3.default)(this, Back);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Back).apply(this, arguments));
		}
	
		return Back;
	}(CardFace);
	
	Back.defaultProps = {
		faceClass: (0, _classnames2.default)(CardFace.defaultProps.faceClass, 'mdl-card__back')
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(10);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FlipCard = function (_React$Component) {
		(0, _inherits3.default)(FlipCard, _React$Component);
	
		function FlipCard() {
			(0, _classCallCheck3.default)(this, FlipCard);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(FlipCard).apply(this, arguments));
		}
	
		(0, _createClass3.default)(FlipCard, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var cardClass = _props.cardClass;
				var shadowClass = _props.shadowClass;
				var flippedClass = _props.flippedClass;
				var flipped = _props.flipped;
				var children = _props.children;
				var otherProps = (0, _objectWithoutProperties3.default)(_props, ['className', 'cardClass', 'shadowClass', 'flippedClass', 'flipped', 'children']);
	
				var classes = (0, _classnames2.default)(className, cardClass, shadowClass, { flippedClass: flipped });
				return _react2.default.createElement(
					'div',
					(0, _extends3.default)({ className: classes }, otherProps),
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Home = function (_React$Component) {
		(0, _inherits3.default)(Home, _React$Component);
	
		function Home() {
			(0, _classCallCheck3.default)(this, Home);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Home).apply(this, arguments));
		}
	
		(0, _createClass3.default)(Home, [{
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _Home = __webpack_require__(34);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Home2.default;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _stringify = __webpack_require__(22);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(23);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _reactDocumentMeta = __webpack_require__(61);
	
	var _reactDocumentMeta2 = _interopRequireDefault(_reactDocumentMeta);
	
	var _reactRouter = __webpack_require__(12);
	
	var _reactRedux = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Wrapper component containing HTML metadata and boilerplate tags.
	 * Used in server-side code only to wrap the string output of the
	 * rendered route component.
	 *
	 * The only thing this component doesn't (and can't) include is the
	 * HTML doctype declaration, which is added to the rendered output
	 * by the server.js file.
	 */
	
	var Html = function (_Component) {
		(0, _inherits3.default)(Html, _Component);
	
		function Html() {
			(0, _classCallCheck3.default)(this, Html);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Html).apply(this, arguments));
		}
	
		(0, _createClass3.default)(Html, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var lang = _props.lang;
				var store = _props.store;
				var renderProps = (0, _objectWithoutProperties3.default)(_props, ['lang', 'store']);
	
				var content = _server2.default.renderToString(_react2.default.createElement(
					_reactRedux.Provider,
					{ store: store },
					_react2.default.createElement(_reactRouter.RoutingContext, renderProps)
				));
	
				return _react2.default.createElement(
					'html',
					{ lang: this.props.lang },
					_react2.default.createElement(
						'head',
						null,
						_reactDocumentMeta2.default.renderAsReact(),
						_react2.default.createElement('link', { rel: 'shortcut icon', href: '/favicon.ico' }),
						_react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
						_react2.default.createElement('link', { rel: 'stylesheet', href: 'https://cdn.rawgit.com/tleunen/react-mdl/v1.0.4/extra/material.min.css' }),
						_react2.default.createElement('link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }),
						_react2.default.createElement('link', { rel: 'stylesheet', href: '/style.css' })
					),
					_react2.default.createElement(
						'body',
						null,
						_react2.default.createElement('div', { id: 'bridalapp', dangerouslySetInnerHTML: { __html: content } }),
						_react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: 'window.__data=' + (0, _stringify2.default)(store.getState()) + ';' }, charSet: 'UTF-8' }),
						_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react.min.js' }),
						_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.6/react-dom.min.js' }),
						_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/history/1.17.0/History.min.js' }),
						_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/1.0.3/ReactRouter.min.js' }),
						_react2.default.createElement('script', { src: 'https://cdn.rawgit.com/tleunen/react-mdl/v1.0.4/extra/material.min.js' }),
						_react2.default.createElement('script', { src: this.props.script, charSet: 'UTF-8' })
					)
				);
			}
		}]);
		return Html;
	}(_react.Component);
	//import serialize from 'serialize-javascript';
	
	Html.propTypes = {
		lang: _react.PropTypes.string,
		store: _react.PropTypes.object,
		script: _react.PropTypes.string
	};
	Html.defaultProps = {
		lang: 'en-US'
	};
	exports.default = Html;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Products = function (_React$Component) {
		(0, _inherits3.default)(Products, _React$Component);
	
		function Products() {
			(0, _classCallCheck3.default)(this, Products);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Products).apply(this, arguments));
		}
	
		(0, _createClass3.default)(Products, [{
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ProductBrowser = __webpack_require__(15);
	
	var _ProductBrowser2 = _interopRequireDefault(_ProductBrowser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ProductSearch = function (_React$Component) {
		(0, _inherits3.default)(ProductSearch, _React$Component);
	
		function ProductSearch() {
			(0, _classCallCheck3.default)(this, ProductSearch);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProductSearch).apply(this, arguments));
		}
	
		(0, _createClass3.default)(ProductSearch, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(_ProductBrowser2.default, { category: this.props.params.category });
			}
		}]);
		return ProductSearch;
	}(_react2.default.Component);
	
	exports.default = ProductSearch;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Products = function (_React$Component) {
		(0, _inherits3.default)(Products, _React$Component);
	
		function Products() {
			(0, _classCallCheck3.default)(this, Products);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Products).apply(this, arguments));
		}
	
		(0, _createClass3.default)(Products, [{
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(13);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	var _isomorphicFetch = __webpack_require__(16);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _apiClient = __webpack_require__(17);
	
	var _apiClient2 = _interopRequireDefault(_apiClient);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ProductsApi = function (_Api) {
		(0, _inherits3.default)(ProductsApi, _Api);
	
		function ProductsApi(state) {
			(0, _classCallCheck3.default)(this, ProductsApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProductsApi).call(this, state));
	
			_this.addHandler('SEARCH', function (action) {
				return (0, _extends3.default)({}, _this.state, {
					filter: action.payload,
					loading: true
				});
			});
			_this.addHandler('SEARCH_SUCCESS', function (action) {
				return (0, _extends3.default)({}, _this.state, {
					results: action.payload,
					loading: false,
					loaded: true
				});
			});
			_this.addHandler('SEARCH_ERROR', function (action) {
				_picolog2.default.error('Error searching for products: ', action.payload, action.payload.stack);
				return (0, _extends3.default)({}, _this.state, {
					results: [],
					loading: false,
					loaded: false,
					error: action.payload
				});
			});
			return _this;
		}
	
		(0, _createClass3.default)(ProductsApi, [{
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ProductDetail = exports.ProductBrowser = exports.ProductSearch = exports.default = undefined;
	
	var _Products = __webpack_require__(39);
	
	var _Products2 = _interopRequireDefault(_Products);
	
	var _ProductSearch2 = __webpack_require__(38);
	
	var _ProductSearch3 = _interopRequireDefault(_ProductSearch2);
	
	var _ProductBrowser2 = __webpack_require__(15);
	
	var _ProductBrowser3 = _interopRequireDefault(_ProductBrowser2);
	
	var _ProductDetail2 = __webpack_require__(37);
	
	var _ProductDetail3 = _interopRequireDefault(_ProductDetail2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Products2.default;
	exports.ProductSearch = _ProductSearch3.default;
	exports.ProductBrowser = _ProductBrowser3.default;
	exports.ProductDetail = _ProductDetail3.default;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(10);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LayoutObfuscator = function (_React$Component) {
		(0, _inherits3.default)(LayoutObfuscator, _React$Component);
	
		function LayoutObfuscator() {
			(0, _classCallCheck3.default)(this, LayoutObfuscator);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LayoutObfuscator).apply(this, arguments));
		}
	
		(0, _createClass3.default)(LayoutObfuscator, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var obfuscatorClassName = _props.obfuscatorClassName;
				var visibleClassName = _props.visibleClassName;
				var visible = _props.visible;
				var children = _props.children;
				var otherProps = (0, _objectWithoutProperties3.default)(_props, ['className', 'obfuscatorClassName', 'visibleClassName', 'visible', 'children']);
	
				var classes = (0, _classnames2.default)(className, obfuscatorClassName, visible && visibleClassName);
				return _react2.default.createElement('div', (0, _extends3.default)({ className: classes }, otherProps));
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(10);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DrawerTitle = function (_React$Component) {
		(0, _inherits3.default)(DrawerTitle, _React$Component);
	
		function DrawerTitle() {
			(0, _classCallCheck3.default)(this, DrawerTitle);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DrawerTitle).apply(this, arguments));
		}
	
		(0, _createClass3.default)(DrawerTitle, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var titleClassName = _props.titleClassName;
				var children = _props.children;
				var otherProps = (0, _objectWithoutProperties3.default)(_props, ['className', 'titleClassName', 'children']);
	
				var classes = (0, _classnames2.default)(className, titleClassName);
				return _react2.default.createElement(
					'span',
					(0, _extends3.default)({ className: classes }, otherProps),
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(10);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RightDrawer = function (_React$Component) {
		(0, _inherits3.default)(RightDrawer, _React$Component);
	
		function RightDrawer() {
			(0, _classCallCheck3.default)(this, RightDrawer);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RightDrawer).apply(this, arguments));
		}
	
		(0, _createClass3.default)(RightDrawer, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var drawerClassName = _props.drawerClassName;
				var visibleClassName = _props.visibleClassName;
				var open = _props.open;
				var children = _props.children;
				var otherProps = (0, _objectWithoutProperties3.default)(_props, ['className', 'drawerClassName', 'visibleClassName', 'open', 'children']);
	
				var classes = (0, _classnames2.default)(className, drawerClassName, open && visibleClassName);
				return _react2.default.createElement(
					'div',
					(0, _extends3.default)({ className: classes }, otherProps),
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(13);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_picolog2.default.debug('DrawerApi: Api=', _reduxApis2.default);
	
	var DrawerApi = function (_Api) {
		(0, _inherits3.default)(DrawerApi, _Api);
	
		function DrawerApi(state) {
			(0, _classCallCheck3.default)(this, DrawerApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DrawerApi).call(this, state));
	
			_this.addHandler('OPEN', function (action) {
				return (0, _extends3.default)({}, _this.state, { open: true });
			});
			_this.addHandler('CLOSE', function (action) {
				return (0, _extends3.default)({}, _this.state, { open: false });
			});
			return _this;
		}
	
		(0, _createClass3.default)(DrawerApi, [{
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LayoutTitle = exports.LayoutObfuscator = exports.default = undefined;
	
	var _RightDrawer = __webpack_require__(44);
	
	var _RightDrawer2 = _interopRequireDefault(_RightDrawer);
	
	var _LayoutObfuscator2 = __webpack_require__(42);
	
	var _LayoutObfuscator3 = _interopRequireDefault(_LayoutObfuscator2);
	
	var _LayoutTitle2 = __webpack_require__(43);
	
	var _LayoutTitle3 = _interopRequireDefault(_LayoutTitle2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _RightDrawer2.default;
	exports.LayoutObfuscator = _LayoutObfuscator3.default;
	exports.LayoutTitle = _LayoutTitle3.default;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(62);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Scroller = function (_React$Component) {
		(0, _inherits3.default)(Scroller, _React$Component);
	
		function Scroller(props) {
			(0, _classCallCheck3.default)(this, Scroller);
			// direction, itemCount, items, itemSize, itemsPer
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Scroller).call(this, props));
	
			_this.state = _this.getState(props);
			_this.onScroll = _this.onScroll.bind(_this);
			return _this;
		} // function(index)
	
		(0, _createClass3.default)(Scroller, [{
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.RootApi = undefined;
	
	var _getOwnPropertyNames = __webpack_require__(52);
	
	var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _defineProperty2 = __webpack_require__(55);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _extends3 = __webpack_require__(8);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _keys = __webpack_require__(53);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// stolen from https://github.com/acdlite/redux-actions/blob/v0.9.0/src/createAction.js
	function _createAction(type, actionCreator, metaCreator) {
		var finalActionCreator = typeof actionCreator === 'function' ? actionCreator : function (t) {
			return t;
		};
		return function () {
			var action = { type: type, payload: finalActionCreator.apply(undefined, arguments) };
			if (arguments.length === 1 && (arguments.length <= 0 ? undefined : arguments[0]) instanceof Error) {
				action.error = true;
			}
			if (typeof metaCreator === 'function') {
				action.meta = metaCreator.apply(undefined, arguments);
			}
			return action;
		};
	}
	
	var Api = function () {
		function Api(state) {
			(0, _classCallCheck3.default)(this, Api);
	
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
	
		(0, _createClass3.default)(Api, [{
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
				var subs = (0, _keys2.default)(this);
				var result = typeof this.__handlers[action.type] == 'function' ? this.__handlers[action.type].call(this, action) : this.state || this.initialState();
				if (result === this.state) {
					result = undefined;
				}
				for (var i = 0, key; key = subs[i]; i++) {
					if (key != 'parent' && this[key] instanceof Api) {
						var act = key !== sub ? action : (0, _extends4.default)({}, action, { type: action.type.substring(idx + 1) });
						var subState = this[key].handle(act);
						if (!this.state || this.state[key] !== subState) {
							result ? result[key] = subState : result = (0, _extends4.default)({}, this.state, (0, _defineProperty3.default)({}, key, subState));
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
	}();
	
	exports.default = Api;
	
	var RootApi = exports.RootApi = function (_Api) {
		(0, _inherits3.default)(RootApi, _Api);
	
		function RootApi(api, createStore, initialState) {
			(0, _classCallCheck3.default)(this, RootApi);
	
			var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RootApi).call(this));
	
			_this2.bind(api);
			var reducer = function reducer(state, action) {
				return !_this2.store && state ? state : _this2.__api.handle(action);
			};
			_this2.store = createStore(reducer, initialState);
			return _this2;
		}
	
		(0, _createClass3.default)(RootApi, [{
			key: 'bind',
			value: function bind(api) {
				var _this3 = this;
	
				if (this.__api) {
					apiKeys(this.__api).forEach(function (key) {
						return delete _this3[key];
					});
					(0, _keys2.default)(api).forEach(function (key) {
						return delete RootApi[key];
					});
				}
				this.__api = new api();
				apiKeys(this.__api).forEach(function (key) {
					_this3[key] = typeof _this3.__api[key] == 'function' ? _this3.__api[key].bind(_this3.__api) : _this3.__api[key];
				});
				(0, _keys2.default)(api).forEach(function (key) {
					return RootApi[key] = api[key];
				});
				this.__api.parent = this;
			}
		}]);
		return RootApi;
	}(Api);
	
	var RESERVED = (0, _getOwnPropertyNames2.default)((0, _getPrototypeOf2.default)(new Api())).concat(['parent', 'bind']);
	
	function childName(parent, child) {
		if (parent && !(parent instanceof RootApi)) {
			var siblings = (0, _keys2.default)(parent);
			for (var i = 0, name; name = siblings[i]; i++) {
				if (parent[name] === child) {
					return name;
				}
			}
		}
	}
	
	function apiKeys(obj) {
		return (0, _getOwnPropertyNames2.default)((0, _getPrototypeOf2.default)(obj)).concat((0, _keys2.default)(obj)).filter(function (key) {
			return RESERVED.indexOf(key) === -1;
		});
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Use require so we can hot-reload individual components
	var App = __webpack_require__(26).default;
	var Home = __webpack_require__(35).default;
	var Products = __webpack_require__(41).default;
	var ProductBrowser = __webpack_require__(15).default;
	var Brands = __webpack_require__(31).default;
	var BrandBrowser = __webpack_require__(14).default;
	
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _promise = __webpack_require__(54);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _stringify = __webpack_require__(22);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(51);
	var chalk = __webpack_require__(56);
	var Express = __webpack_require__(57);
	var http = __webpack_require__(58);
	var httpProxy = __webpack_require__(59);
	var log = __webpack_require__(7);
	var React = __webpack_require__(6);
	var ReactDOM = __webpack_require__(23);
	var match = __webpack_require__(12).match;
	var createStore = __webpack_require__(24).createStore;
	var applyMiddleware = __webpack_require__(24).applyMiddleware;
	var thunk = __webpack_require__(64);
	var RootApi = __webpack_require__(48).RootApi;
	
	var cfg = __webpack_require__(25);
	
	var express = new Express();
	var httpServer = new http.Server(express);
	
	var g = chalk.green,
	    gb = chalk.green.bold,
	    y = chalk,
	    yellow,
	    yb = chalk.yellow.bold,
	    w = chalk.white,
	    wb = chalk.white.bold,
	    gr = chalk.grey,
	    grb = chalk.grey.bold,
	    r = chalk.red,
	    rb = chalk.red.bold;
	
	// if the server is started in hot mode, we include webpack-dev-middleware
	// and webpack-hot-middleware to serve a hot bundle to the client. In
	// production mode, we serve up a static pre-compiled client bundle
	if (false) {
		var webpack = require('webpack');
		var devMiddleware = require('webpack-dev-middleware');
		var hotMiddleware = require('webpack-hot-middleware');
	
		var stats = { colors: true, chunks: false, hash: false, version: false };
	
		var clientCfg = require('../webpack/development.client.config');
		var clientCompiler = webpack(clientCfg);
		express.use(devMiddleware(clientCompiler, { stats: stats, publicPath: clientCfg.output.publicPath }));
		express.use(hotMiddleware(clientCompiler));
		/*
	 	var testCfg = require('../webpack/test.config');
	 	var testCompiler = webpack(testCfg);
	 	express.use(devMiddleware(testCompiler, {stats, publicPath:testCfg.output.publicPath}));
	 	express.use(hotMiddleware(testCompiler));
	 */
	}
	
	// We point to our static assets
	express.use(Express.static(cfg.publicPath));
	
	// Proxy to BridalApp API server
	log.log(chalk.grey('Proxying requests incoming at ') + chalk.white('http://%s:%s%s'), cfg.server.host, cfg.server.port, cfg.apiServer.path);
	log.log(chalk.grey('   to ') + chalk.white('%s') + chalk.grey(' at ') + chalk.white('http://%s:%s%s'), cfg.apiServer.name, cfg.apiServer.host, cfg.apiServer.port, cfg.apiServer.path);
	var apiProxy = httpProxy.createProxyServer({
		target: { host: cfg.apiServer.host, port: cfg.apiServer.port, path: cfg.apiServer.path }
	});
	express.use(cfg.apiServer.path, function (req, res) {
		log.debug('Received API request.');
		apiProxy.web(req, res);
	});
	// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
	apiProxy.on('error', function (error, req, res) {
		if (error.code !== 'ECONNRESET') {
			log.error('proxy error', error);
		}
		if (!res.headersSent) {
			res.writeHead(500, { 'content-type': 'application/json' });
		}
		var json = { error: 'proxy_error', reason: error.message };
		res.end((0, _stringify2.default)(json));
	});
	
	express.get('/status', function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		var html = '<html><head><title>Status</title></head><body><h1 style="color:green">ONLINE</h1><p>' + cfg.server.name + ' is ONLINE</p></body></html>';
		res.end('<!DOCTYPE html>\r\n' + html);
	});
	
	express.get(/\/.*/, function (req, res) {
		// require again on each request, to enable hot-reload in development mode.
		// In production, this will just grab the module from require.cache.
		var routes = __webpack_require__(49).default;
		match({ routes: routes, location: req.originalUrl }, function (error, redirectLocation, renderProps) {
			if (redirectLocation) {
				res.redirect(redirectLocation.pathname + redirectLocation.search);
				res.end();
			} else if (error) {
				log.warn(chalk.red.bold('ROUTER ERROR:'), pretty.render(error));
				res.status(500);
				res.send('Server error.');
				res.end();
			} else if (!renderProps) {
				res.status(404);
				res.end();
			} else {
				var Html;
				var App;
				var AppApi;
	
				(function () {
					log.log(chalk.styles.gray.open, 'Rendering using props: ', renderProps, chalk.styles.gray.close);
	
					// require again on each request, to enable hot-reload in development mode.
					// In production, this will just grab the module from require.cache.
					Html = __webpack_require__(36).default;
					App = __webpack_require__(18).default;
					AppApi = __webpack_require__(19).default;
	
					var storeCreator = applyMiddleware(thunk)(createStore);
					var app = new RootApi(AppApi, storeCreator);
	
					// omg global state?
					// yes, but remember, a redux app only needs one variable,
					// the store that maintains the application state tree.
					// If you inspect RootApi closer, you'll see that it's actually
					// a convenience wrapper around the redux store.
					global.app = app;
	
					var fetchingComponents = renderProps.components.map(function (component) {
						return component.WrappedComponent ? component.WrappedComponent : component;
					}).filter(function (component) {
						return component.fetchData;
					});
					log.info('fetchingComponents=', fetchingComponents);
					var fetchPromises = fetchingComponents.map(function (component) {
						return component.fetchData(renderProps);
					});
	
					// From the components from the matched route, get the fetchData functions
					_promise2.default.all(fetchPromises)
					// Promise.all combines all the promises into one
					.then(function () {
						// now fetchData() has been run on every component in my route, and the
						// promises resolved, so we know the redux state is populated
						res.status(200);
						res.send('<!DOCTYPE html>\n' + ReactDOM.renderToString(React.createElement(Html, (0, _extends3.default)({ lang: 'en-US', store: app.store }, renderProps, { script: '/assets/bridalapp-ui.js' }))));
						res.end();
					}).catch(function (error) {
						log.error('Error fetching data.', error, error.stack);
						res.status(500);
						res.send('Server error.');
						res.end();
					});
				})();
			}
		});
	});
	
	var server = httpServer.listen(cfg.server.port, cfg.server.host, function (error) {
		if (error) {
			throw error;
		}
		var addr = httpServer.address();
		log.warn();
		if (false) {
			log.warn(yb(' !  ') + g('Running in ') + gb('development') + g(' mode. ') + (module.hot ? yb('Hot Module Replacement') + g(' is enabled.') : ''));
		} else {
			log.warn(gb(' √  ') + g('Running in ') + gb('production') + g(' mode. ') + gb('gzip compression') + g(' is enabled.'));
		}
		log.warn(gb(' √  ') + g('Talking to ') + gb('%s') + g(' at ') + gb('%s:%s'), cfg.apiServer.name, cfg.apiServer.host, cfg.apiServer.port);
		log.warn(gb(' √  ') + g('Listening for connections at ') + gb('http://%s:%s'), addr.address, addr.port);
		log.warn(gb(' √  %s started succesfully on %s.'), cfg.server.name, Date(Date.now()));
		log.warn('');
	});
	
	var msg;
	var SIGNALS = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'];
	SIGNALS.forEach(function (signal) {
		process.on(signal, function () {
			log.warn(msg = rb(' ×  ') + g('Stopping ') + gb(cfg.server.name) + g(' after receiving ') + yb(signal) + g('.'));
			server.close();
			process.exit();
		});
	});
	process.on('uncaughtException', function (error) {
		log.warn(msg = rb(' ×  ') + g('Stopping ') + gb(cfg.server.name) + g(' due to uncaught exception ') + yb(error) + g('.'));
		server.close();
		process.exit();
	});
	process.on('exit', function () {
		log.warn(msg = gb(' √  ') + g('Stopped ') + gb(cfg.server.name) + g(' on ' + Date(Date.now()) + '.\r\n'));
	});
	
	if (false) {
		module.hot.accept('./routes', function () {
			log.warn(yb('Hot reloading ') + g('\'./routes\'...'));
		});
		module.hot.accept('./components/Html/Html', function () {
			log.warn(yb('Hot reloading ') + g('\'./components/Html/Html\'...'));
		});
		module.hot.accept('./components/App/App', function () {
			log.warn(yb('Hot reloading ') + g('\'./components/App/App\'...'));
		});
		module.hot.accept('./components/App/api', function () {
			log.warn(yb('Hot reloading ') + g('\'./components/App/api\'...'));
		});
	
		// self-accept. This allows hot-reload of this very file. We cleanup in the
		// dispose handler and then the server will be restarted.
		module.hot.accept();
		// dispose handler
		module.hot.dispose(function () {
			server.close(function () {
				log.warn(g('Closed HTTP server listening on port ') + g(cfg.server.port));
			});
		});
	}

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/get-own-property-names");

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = require("chalk");

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = require("http-proxy");

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = require("react-document-meta");

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = require("react-mdl/lib/Layout");

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ }
/******/ ])));
//# sourceMappingURL=server.js.map