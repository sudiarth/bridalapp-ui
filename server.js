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

	module.exports = __webpack_require__(58);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/get-prototype-of");

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

	module.exports = require("picolog");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react");

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

	module.exports = require("redux-apis");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/typeof");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("react-mdl");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("redux-fetch-api");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.app = exports.AppApi = undefined;
	
	var _typeof2 = __webpack_require__(11);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _promise = __webpack_require__(24);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _dec2, _class;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(10);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	var _reduxFetchApi = __webpack_require__(14);
	
	var _api = __webpack_require__(40);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _api3 = __webpack_require__(44);
	
	var _api4 = _interopRequireDefault(_api3);
	
	var _api5 = __webpack_require__(52);
	
	var _api6 = _interopRequireDefault(_api5);
	
	var _api7 = __webpack_require__(56);
	
	var _api8 = _interopRequireDefault(_api7);
	
	var _api9 = __webpack_require__(27);
	
	var _suid = __webpack_require__(18);
	
	var _suid2 = _interopRequireDefault(_suid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var API_URL = apiUrl();
	_picolog2.default.info('Using BridalApp API Server url: ', API_URL);
	var idx = undefined,
	    lastSlash = 0;
	while ((idx = API_URL.indexOf('/', lastSlash + 1)) !== -1) {
		lastSlash = idx;
	}
	var SUID_URL = API_URL.substring(0, lastSlash) + '/suid/suid.json';
	_picolog2.default.info('Using Suid Server url: ', SUID_URL);
	_suid2.default.config({ server: SUID_URL });
	
	// override the default fetcher with one that does a cross-origin (CORS) request and has a timeout
	var AppApi = exports.AppApi = (_dec = (0, _reduxFetchApi.fetcher)(authenticatedCrossOriginFetchWithTimeout), _dec2 = (0, _reduxFetchApi.remote)(API_URL), _dec(_class = _dec2(_class = function (_Api) {
		(0, _inherits3.default)(AppApi, _Api);
	
		function AppApi(state) {
			(0, _classCallCheck3.default)(this, AppApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AppApi).call(this, state));
	
			_this.auth = (0, _reduxFetchApi.remote)('/auth')((0, _reduxApis.link)(_this, new _api2.default()));
	
			_this.brands = (0, _reduxFetchApi.remote)('/brands')((0, _reduxApis.link)(_this, new _api4.default()));
	
			_this.products = (0, _reduxFetchApi.remote)('/products')((0, _reduxApis.link)(_this, new _api6.default()));
	
			_this.stores = (0, _reduxFetchApi.remote)('/stores')((0, _reduxApis.link)(_this, new _api8.default()));
	
			_this.leftDrawer = (0, _reduxApis.link)(_this, new _api9.DrawerApi());
			_this.rightDrawer = (0, _reduxApis.link)(_this, new _api9.DrawerApi());
			_this.lightbox = (0, _reduxApis.link)(_this, new _api9.LightboxApi());
			return _this;
		}
	
		return AppApi;
	}(_reduxApis2.default)) || _class) || _class);
	var app = exports.app = new AppApi();
	exports.default = app;
	
	// A version of fetch that sets cors headers and intercepts 401 Unauthorized responses.
	// J2EE servers will, after a succesful login, send a 302 redirect with the original url.
	// This function capitalizes on that to do transparent interception
	
	function authenticatedCrossOriginFetchWithTimeout(url, opts) {
		_picolog2.default.log('authenticatedCrossOriginFetchWithTimeout', url);
		opts = (0, _extends3.default)({ credentials: 'include', mode: 'cors' }, opts);
		return new _promise2.default(function (resolve, reject) {
			var timeout = setTimeout(function () {
				reject(Error('timed out after 30s.'));
			}, 30000);
			fetch(url, opts).then(function (response) {
				clearTimeout(timeout);
				if (response.status && response.status === 401) {
					// auth needed
					if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object') {
						// client, allow user to login
						return response.json().then(function (json) {
							return app.auth.challenge(json.challenge, resolve, reject);
						}).catch(reject);
					}
					// server, reject with error
					return response.text().then(function (text) {
						var error = Error(text);
						error.status = response.status;
						error.statusText = response.statusText;
						reject(error);
					});
				}
				resolve(response);
			}).catch(reject);
		});
	}
	
	function apiUrl() {
		if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object') {
			return window.__bridalapp_api_server || 'http://api.bridalapp.net/api';
		}
		var protocol = ({"NODE_ENV":"production"}).BRIDALAPP_API_SERVER_PROTOCOL || 'http://';
		var host = ({"NODE_ENV":"production"}).BRIDALAPP_API_SERVER_HOST || 'localhost';
		var port = ({"NODE_ENV":"production"}).BRIDALAPP_API_SERVER_PORT || '8080';
		var path = ({"NODE_ENV":"production"}).BRIDALAPP_API_SERVER_PATH || '/api';
		return protocol + host + (port == '80' ? '' : ':' + port) + path;
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _create = __webpack_require__(64);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(11);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	exports.Entity = Entity;
	exports.fromJSON = fromJSON;
	exports.toJSON = toJSON;
	exports.revive = revive;
	exports.equals = equals;
	exports.register = register;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _suid = __webpack_require__(18);
	
	var _suid2 = _interopRequireDefault(_suid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Entity(target) {
		return register(target.name, target);
	}
	exports.default = Entity;
	function fromJSON(json) {
		if (typeof json == 'string') return JSON.parse(json, revive);
	
		var result = typeof this == 'function' ? new this() : this;
		for (var key in json) {
			if (key !== 'type') {
				result[key] = json[key];
			}
		}
		return result;
	}
	
	function toJSON(entity) {
		if (!entity || typeof entity == 'string') entity = this;
		return (0, _extends3.default)({}, entity, { toJSON: entity.toJSON, type: entity.constructor.name });
	}
	
	function revive(key, value) {
		var t = value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) == 'object' && typeof value.type == 'string' && value.type;
		var type = t && registry[t];
		return type ? type.fromJSON(value) : _suid2.default.revive(key, value);
	}
	
	function equals(one, other) {
		if (arguments.length == 1) {
			return one && (one.id instanceof _suid2.default && one.id.equals(this.id) || one instanceof _suid2.default && one.equals(this.id) || this.id && this.id.value == one);
		}
	
		if (one === other) return true;
		if (one && !(one instanceof _suid2.default) && typeof one.equals == 'function') return one.equals(other);
		if (other && !(other instanceof _suid2.default) && typeof other.equals == 'function') return other.equals(one);
		if (one instanceof _suid2.default) return one.equals(other);
		if (other instanceof _suid2.default) return other.equals(one);
		return false;
	}
	
	function register(name, type) {
		function enhance(entity) {
			Object.defineProperty(entity, 'id', { enumerable: true,
				get: function get() {
					return entity.__id;
				},
				set: function set(id) {
					Object.defineProperty(this, '__id', { value: new _suid2.default(id) });
				}
			});
			entity.version = null;
		}
		var wrapped = undefined;
		eval('\n\t\twrapped = function ' + name + '(){\n\t\t\tenhance(this);\n\t\t\ttype.apply(this, arguments);\n\t\t};\n\t');
		wrapped.prototype = (0, _create2.default)(type.prototype);
		registry[name] = wrapped;
		if (!wrapped.prototype.toJSON) {
			Object.defineProperty(wrapped.prototype, 'toJSON', { value: toJSON });
		}
		if (!wrapped.prototype.equals) {
			Object.defineProperty(wrapped.prototype, 'equals', { value: equals });
		}
		if (!wrapped.fromJSON) {
			Object.defineProperty(wrapped, 'fromJSON', { value: fromJSON });
		}
		return wrapped;
	}
	
	var registry = {};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Lightbox = exports.Drawer = exports.Dialog = exports.Modal = exports.SimpleDialog = exports.StatefulFlipCard = exports.FlipCard = exports.BackFace = exports.FrontFace = exports.StatefulTextfield = exports.Textfield = exports.LayoutObfuscator = exports.LayoutTitle = undefined;
	
	var _typeof2 = __webpack_require__(11);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _defineProperty2 = __webpack_require__(29);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _keys = __webpack_require__(28);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _class, _temp, _class2, _temp2, _class3, _temp3, _class4, _temp4;
	
	exports.component = component;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(30);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactMdl = __webpack_require__(13);
	
	var _classnames = __webpack_require__(12);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_picolog2.default.assert(_reactMdl.Drawer, 'MdlDrawer is not defined');
	_picolog2.default.assert(_reactMdl.Textfield, 'MdlTextfield is not defined');
	var bool = _react.PropTypes.bool;
	var number = _react.PropTypes.number;
	var string = _react.PropTypes.string;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var array = _react.PropTypes.array;
	var node = _react.PropTypes.node;
	var shape = _react.PropTypes.shape;
	var oneOfType = _react.PropTypes.oneOfType;
	var arrayOf = _react.PropTypes.arrayOf;
	function component(displayName, defaultClass) {
		var conditionals = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
		var elem = arguments.length <= 3 || arguments[3] === undefined ? 'div' : arguments[3];
		var propTypes = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
		var defaultProps = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];
		var createElement = arguments.length <= 6 || arguments[6] === undefined ? _react2.default.createElement : arguments[6];
	
		function render(props) {
			_picolog2.default.debug('render', props);
			var className = props.className;
			var defaultClass = props.defaultClass;
			var children = props.children;
			var others = (0, _objectWithoutProperties3.default)(props, ['className', 'defaultClass', 'children']);
	
			var extraClasses = (0, _keys2.default)(conditionals).map(function (x) {
				return (0, _defineProperty3.default)({}, others[x + 'Class'], others[x]);
			});
			return createElement(elem, (0, _extends3.default)({ className: (0, _classnames2.default)(className, defaultClass, extraClasses) }, others), children);
		}
		render.displayName = displayName;
		render.propTypes = (0, _extends3.default)({
			defaultClass: string,
			className: string,
			children: node
		}, propTypes);
		render.defaultProps = (0, _extends3.default)({
			defaultClass: defaultClass
		}, defaultProps);
		for (var key in conditionals) {
			render.propTypes[key + 'Class'] = string;
			render.propTypes[key] = oneOfType([bool, string, object, number, node]);
			render.defaultProps[key + 'Class'] = conditionals[key];
		}
		return render;
	}
	
	var LayoutTitle = exports.LayoutTitle = component('LayoutTitle', 'mdl-layout__title');
	var LayoutObfuscator = exports.LayoutObfuscator = component('LayoutObfuscator', 'mdl-layout__obfuscator', { open: 'is-visible' }, 'div', { onCancel: func.isRequired }, {}, function (elem, props, children) {
		var onCancel = props.onCancel;
		var others = (0, _objectWithoutProperties3.default)(props, ['onCancel']);
	
		return _react2.default.createElement('div', (0, _extends3.default)({ onClick: onCancel, onTouchEnd: onCancel }, others));
	});
	
	/**
	 * Controlled version of the MDL TextField component that adds a property `value`.
	 */
	var Textfield = exports.Textfield = (_temp = _class = function (_Component) {
		(0, _inherits3.default)(Textfield, _Component);
	
		function Textfield() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, Textfield);
	
			for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
				props[_key] = arguments[_key];
			}
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Textfield)).call.apply(_Object$getPrototypeO, [this].concat(props)));
	
			_this.onChange = _this.onChange.bind(_this);
			Object.defineProperty(_this, 'value', { get: function get() {
					return _this.props.value;
				} });
			return _this;
		}
	
		(0, _createClass3.default)(Textfield, [{
			key: 'onChange',
			value: function onChange(evt) {
				_picolog2.default.debug('onChange', evt, evt.target.value);
				var onChange = this.props.onChange;
	
				for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					params[_key2 - 1] = arguments[_key2];
				}
	
				return onChange && onChange.apply(undefined, [evt.target.value, evt].concat(params));
			}
		}, {
			key: 'render',
			value: function render() {
				_picolog2.default.debug('render', this.props);
				var _props = this.props;
				var onChange = _props.onChange;
				var children = _props.children;
				var props = (0, _objectWithoutProperties3.default)(_props, ['onChange', 'children']);
	
				return _react2.default.createElement(_reactMdl.Textfield, (0, _extends3.default)({ onChange: this.onChange }, props));
			}
		}]);
		return Textfield;
	}(_react.Component), _class.propTypes = (0, _extends3.default)({}, _reactMdl.Textfield.propTypes), _class.defaultProps = (0, _extends3.default)({}, _reactMdl.Textfield.defaultProps), _temp);
	
	/**
	 * Stateful version of the MDL TextField component that adds a property `value`.
	 *
	 * This component is stateful; it uses `this.state` to keep track of the underlying
	 * input's value. It basically does the work for you that is mentioned here:
	 * https://facebook.github.io/react/docs/forms.html#controlled-components
	 */
	
	var StatefulTextfield = exports.StatefulTextfield = (_temp2 = _class2 = function (_Component2) {
		(0, _inherits3.default)(StatefulTextfield, _Component2);
	
		function StatefulTextfield() {
			var _Object$getPrototypeO2;
	
			(0, _classCallCheck3.default)(this, StatefulTextfield);
	
			for (var _len3 = arguments.length, props = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				props[_key3] = arguments[_key3];
			}
	
			var _this2 = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO2 = (0, _getPrototypeOf2.default)(StatefulTextfield)).call.apply(_Object$getPrototypeO2, [this].concat(props)));
	
			_this2.onChange = _this2.onChange.bind(_this2);
			_this2.state = { value: _this2.props.value };
			Object.defineProperty(_this2, 'value', { get: function get() {
					return _this2.state.value;
				} });
			return _this2;
		}
	
		(0, _createClass3.default)(StatefulTextfield, [{
			key: 'onChange',
			value: function onChange(evt) {
				_picolog2.default.debug('onChange', evt, evt.target.value);
				this.setState({ value: evt.target.value });
				var onChange = this.props.onChange;
	
				for (var _len4 = arguments.length, params = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
					params[_key4 - 1] = arguments[_key4];
				}
	
				return onChange && onChange.apply(undefined, [evt].concat(params));
			}
		}, {
			key: 'render',
			value: function render() {
				var value = this.state.value;
	
				_picolog2.default.debug('render', value);
				var _props2 = this.props;
				var children = _props2.children;
				var onChange = _props2.onChange;
				var props = (0, _objectWithoutProperties3.default)(_props2, ['children', 'onChange']);
	
				return _react2.default.createElement(_reactMdl.Textfield, (0, _extends3.default)({ value: value, onChange: this.onChange }, props));
			}
		}]);
		return StatefulTextfield;
	}(_react.Component), _class2.propTypes = (0, _extends3.default)({}, _reactMdl.Textfield.propTypes), _class2.defaultProps = (0, _extends3.default)({}, _reactMdl.Textfield.defaultProps), _temp2);
	
	/** The front face of a flippable Card */
	
	var FrontFace = exports.FrontFace = component('FrontFace', 'mdl-card__face mdl-card__front');
	/** The back face of a flippable Card */
	var BackFace = exports.BackFace = component('BackFace', 'mdl-card__face mdl-card__back');
	
	var FlipCard = exports.FlipCard = component('FlipCard', 'mdl-card is-flippable', { flipped: 'is-flipped' });
	
	/**
	 * A base class to create a MDL Card that is flippable.
	 *
	 * This class is stateful; it manages the flip state in `this.state`.
	 * If you extend from it, you need to implement `render()` and use
	 * the methods `isFlipped()` and `flip()` to inspect/update the
	 * flip state in response to e.g. clicks etc.
	 */
	var StatefulFlipCard = exports.StatefulFlipCard = (_temp3 = _class3 = function (_Component3) {
		(0, _inherits3.default)(StatefulFlipCard, _Component3);
	
		function StatefulFlipCard() {
			var _Object$getPrototypeO3;
	
			(0, _classCallCheck3.default)(this, StatefulFlipCard);
	
			for (var _len5 = arguments.length, props = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
				props[_key5] = arguments[_key5];
			}
	
			var _this3 = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO3 = (0, _getPrototypeOf2.default)(StatefulFlipCard)).call.apply(_Object$getPrototypeO3, [this].concat(props)));
	
			_this3.state = { flipped: _this3.props.flipped, loaded: false };
			_this3.flip = _this3.flip.bind(_this3);
			return _this3;
		}
	
		(0, _createClass3.default)(StatefulFlipCard, [{
			key: 'isFlipped',
			value: function isFlipped() {
				return this.state.flipped;
			}
		}, {
			key: 'flip',
			value: function flip(event) {
				if (event && event.defaultPrevented) {
					return;
				}
				this.setState((0, _extends3.default)({}, this.state, { flipped: !this.state.flipped, loaded: true }));
			}
		}, {
			key: 'render',
			value: function render() {
				var _props3 = this.props;
				var flipped = _props3.flipped;
				var className = _props3.className;
				var children = _props3.children;
				var others = (0, _objectWithoutProperties3.default)(_props3, ['flipped', 'className', 'children']);
	
				var front = undefined,
				    back = undefined,
				    backProps = undefined,
				    backChilds = undefined;
				var childs = [];
				for (var i = 0, elem; elem = children[i]; i++) {
					if (elem.type === FrontFace) {
						front = elem;
					} else if (elem.type === BackFace) {
						back = elem;
						var _back$props = back.props;
						var _children = _back$props.children;
						var others = (0, _objectWithoutProperties3.default)(_back$props, ['children']);
	
						backProps = others;
						backChilds = _children;
					} else childs.push(elem);
				}
	
				return _react2.default.createElement(
					FlipCard,
					{ className: className, flipped: this.isFlipped(), onClick: this.flip },
					front,
					_react2.default.createElement(
						BackFace,
						backProps,
						this.state.loaded || this.isFlipped() ? backChilds : ''
					)
				);
			}
		}]);
		return StatefulFlipCard;
	}(_react.Component), _class3.propTypes = {
		flipped: bool,
		className: string
	}, _class3.defaultProps = {
		flipped: false
	}, _temp3);
	var SimpleDialog = exports.SimpleDialog = component('SimpleDialog', 'mdl-dialog', { visible: 'is-visible' }, 'div');
	var Modal = exports.Modal = component('Modal', 'mdl-modal', {}, 'div', { open: bool.isRequired, onCancel: func.isRequired }, {}, function (elem, props, children) {
		var open = props.open;
		var onCancel = props.onCancel;
		var others = (0, _objectWithoutProperties3.default)(props, ['open', 'onCancel']);
	
		return _react2.default.createElement(
			'div',
			others,
			children,
			_react2.default.createElement(LayoutObfuscator, { open: open, onCancel: onCancel })
		);
	});
	
	var Dialog = exports.Dialog = component('Dialog', '', {}, 'div', {
		open: bool,
		modal: bool,
		onCancel: func
	}, {
		open: false,
		modal: false
	}, function (elem, props, children) {
		var open = props.open;
		var modal = props.modal;
		var onCancel = props.onCancel;
		var others = (0, _objectWithoutProperties3.default)(props, ['open', 'modal', 'onCancel']);
	
		return modal ? _react2.default.createElement(
			Modal,
			{ open: open, onCancel: onCancel },
			_react2.default.createElement(
				SimpleDialog,
				(0, _extends3.default)({ visible: open }, others),
				children
			)
		) : _react2.default.createElement(
			SimpleDialog,
			(0, _extends3.default)({ visible: open }, others),
			children
		);
	});
	
	var Drawer = exports.Drawer = component('Drawer', '', { right: 'mdl-layout__drawer-right', open: 'is-visible' }, 'div', {
		modal: bool,
		autoClose: bool,
		onCancel: func
	}, {
		modal: false,
		autoClose: false
	}, function (elem, props, children) {
		_picolog2.default.debug('render', props);
		var open = props.open;
		var modal = props.modal;
		var autoClose = props.autoClose;
		var onCancel = props.onCancel;
		var _onClick = props.onClick;
		var others = (0, _objectWithoutProperties3.default)(props, ['open', 'modal', 'autoClose', 'onCancel', 'onClick']);
	
		return modal ? _react2.default.createElement(
			Modal,
			{ open: open, onCancel: onCancel },
			_react2.default.createElement(
				_reactMdl.Drawer,
				(0, _extends3.default)({ visible: open, onClick: function onClick(e) {
						return _onClick ? _onClick(e) : autoClose ? onCancel(e) : undefined;
					} }, others),
				children
			)
		) : _react2.default.createElement(
			_reactMdl.Drawer,
			others,
			children
		);
	});
	
	var Lightbox = exports.Lightbox = (_temp4 = _class4 = function (_Component4) {
		(0, _inherits3.default)(Lightbox, _Component4);
	
		function Lightbox() {
			(0, _classCallCheck3.default)(this, Lightbox);
	
			var _this4 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Lightbox).call(this));
	
			_this4.state = { loaded: [] };
			_this4.cancel = _this4.cancel.bind(_this4);
			_this4.next = _this4.next.bind(_this4);
			_this4.prev = _this4.prev.bind(_this4);
			_this4.nav = _this4.nav.bind(_this4);
			_this4.imageClicked = _this4.imageClicked.bind(_this4);
			_this4.keyPressed = _this4.keyPressed.bind(_this4);
			return _this4;
		}
	
		(0, _createClass3.default)(Lightbox, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var noKeyboardInput = this.props.noKeyboardInput;
	
				if (!noKeyboardInput && (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object') {
					window.addEventListener('keydown', this.keyPressed);
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				var noKeyboardInput = this.props.noKeyboardInput;
	
				if (!noKeyboardInput && (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object') {
					window.removeEventListener('keydown', this.keyPressed);
				}
			}
		}, {
			key: 'cancel',
			value: function cancel(event) {
				_picolog2.default.log('cancel', event);
				var _props4 = this.props;
				var noBackdropCancel = _props4.noBackdropCancel;
				var onCancel = _props4.onCancel;
	
				if (noBackdropCancel) return;
				this.setState({ loaded: [] });
				if (onCancel) {
					onCancel(event);
				}
				if (event) {
					event.preventDefault();event.stopPropagation();
				}
			}
		}, {
			key: 'next',
			value: function next(event) {
				_picolog2.default.log('next', event);
				var _props5 = this.props;
				var images = _props5.images;
				var index = _props5.index;
				var onNext = _props5.onNext;
				var onNav = _props5.onNav;
				var noRotate = _props5.noRotate;
	
				if (index === images.length - 1) {
					if (noRotate) {
						return;
					}
					if (onNav) {
						onNav(0, event);
					}
				} else {
					if (onNext) {
						onNext(event);
					}
				}
				if (event) {
					event.preventDefault();event.stopPropagation();
				}
			}
		}, {
			key: 'prev',
			value: function prev(event) {
				_picolog2.default.log('prev', event);
				var _props6 = this.props;
				var images = _props6.images;
				var index = _props6.index;
				var onPrev = _props6.onPrev;
				var onNav = _props6.onNav;
				var noRotate = _props6.noRotate;
	
				if (index === 0) {
					if (noRotate) {
						return;
					}
					if (onNav) {
						onNav(images.length - 1, event);
					}
				} else {
					if (onPrev) {
						onPrev(event);
					}
				}
				if (event) {
					event.preventDefault();event.stopPropagation();
				}
			}
		}, {
			key: 'nav',
			value: function nav(idx, event) {
				_picolog2.default.log('nav', event);
				var onNav = this.props.onNav;
	
				if (onNav) {
					onNav(idx, event);
				}
				if (event) {
					event.preventDefault();event.stopPropagation();
				}
			}
		}, {
			key: 'imageClicked',
			value: function imageClicked(event) {
				_picolog2.default.log('imageClicked', event);
				if (this.props.noNextOnClick) return;
				this.next(event);
			}
		}, {
			key: 'imageLoaded',
			value: function imageLoaded(event, index) {
				_picolog2.default.log('imageLoaded', event, index);
				var loaded = this.state.loaded.concat();
				loaded[index] = true;
				this.setState({ loaded: loaded });
			}
		}, {
			key: 'keyPressed',
			value: function keyPressed(event) {
				if (event.keyCode === 37) {
					this.prev(event);
				} else if (event.keyCode === 39) {
					this.next(event);
				} else if (event.keyCode === 27) {
					this.cancel(event);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this5 = this;
	
				var _props7 = this.props;
				var open = _props7.open;
				var index = _props7.index;
				var images = _props7.images;
				var noCloseButton = _props7.noCloseButton;
				var noImageCount = _props7.noImageCount;
				var noPositionIndicators = _props7.noPositionIndicators;
				var noPreload = _props7.noPreload;
				var noSpinner = _props7.noSpinner;
				var noRotate = _props7.noRotate;
	
				var noImages = !images || !images.length;
				var caption = !noImages && images[index].caption;
				var style = { cursor: this.props.noNextOnClick ? 'auto' : 'pointer', opacity: this.state.loaded[index] ? 1 : 0 };
				var alt = !noImages && images[index].alt;
				var imgStyle = !this.state.loaded[index] ? { position: 'absolute', width: 0, height: 0 } : {};
				var positionIndicators = noPositionIndicators ? undefined : _react2.default.createElement(
					'div',
					{ className: 'mdl-lightbox__position-indicators' },
					images.map(function (img, i) {
						return _react2.default.createElement(
							'a',
							{ key: i, href: '#', className: 'mdl-lightbox__position-indicator' + (i === index ? ' is-active' : ''),
								onClick: function onClick(evt) {
									return _this5.nav(i, evt);
								}, onTouchEnd: function onTouchEnd(evt) {
									return _this5.nav(i, evt);
								} },
							_react2.default.createElement('b', null)
						);
					})
				);
				var imageCount = noImageCount ? undefined : _react2.default.createElement(
					'div',
					{ className: 'mdl-lightbox__image-count' },
					index + 1,
					' / ',
					images.length
				);
				var figcaption = !caption ? undefined : _react2.default.createElement(
					'figcaption',
					{ className: 'mdl-lightbox__caption' },
					caption
				);
				var noFooter = !caption && !positionIndicators && !imageCount;
				return _react2.default.createElement(
					Modal,
					{ open: open, onCancel: this.cancel },
					_react2.default.createElement(
						'div',
						{ className: 'mdl-lightbox' + (open ? ' is-visible' : '') },
						_react2.default.createElement(
							'div',
							{ className: 'mdl-lightbox__content' },
							noCloseButton ? undefined : _react2.default.createElement(
								_reactMdl.FABButton,
								{ className: 'mdl-lightbox__close-button', onClick: this.cancel, onTouchEnd: this.cancel },
								_react2.default.createElement(_reactMdl.Icon, { name: 'close' })
							),
							noImages ? undefined : _react2.default.createElement(
								'figure',
								null,
								!this.state.loaded[index] ? _react2.default.createElement(_reactMdl.Spinner, null) : '',
								!this.state.loaded[index] && alt ? _react2.default.createElement('img', { src: alt.src, style: alt.style }) : '',
								_react2.default.createElement('img', {
									onClick: this.imageClicked,
									onLoad: function onLoad(e) {
										return _this5.imageLoaded(e, index);
									},
									onTouchEnd: this.imageClicked,
									src: images[index].src,
									style: (0, _extends3.default)({}, style, imgStyle)
								}),
								noFooter ? undefined : _react2.default.createElement(
									'div',
									{ className: 'mdl-lightbox__footer' },
									positionIndicators,
									imageCount,
									figcaption
								)
							),
							noPreload || !this.state.loaded[index] ? undefined : _react2.default.createElement(
								'div',
								{ className: 'mdl-lightbox__preload', style: { width: 0, height: 0, overflow: 'hidden', opacity: 0 } },
								images.map(function (_ref2, i) {
									var src = _ref2.src;
									return i === index ? undefined : _react2.default.createElement('img', { key: i, src: src, onLoad: function onLoad(e) {
											return _this5.imageLoaded(e, i);
										} });
								})
							)
						),
						_react2.default.createElement(
							_reactMdl.FABButton,
							{ className: 'mdl-lightbox__prev-button', disabled: noRotate && index === 0, onClick: this.prev, onTouchEnd: this.prev },
							_react2.default.createElement(_reactMdl.Icon, { name: 'navigate_before' })
						),
						_react2.default.createElement(
							_reactMdl.FABButton,
							{ className: 'mdl-lightbox__next-button', disabled: noRotate && index === images.length - 1, onClick: this.next, onTouchEnd: this.next },
							_react2.default.createElement(_reactMdl.Icon, { name: 'navigate_next' })
						)
					)
				);
			}
		}]);
		return Lightbox;
	}(_react.Component), _class4.displayName = 'Lightbox', _class4.propTypes = {
		open: bool,
		images: arrayOf(shape({
			src: string.isRequired,
			srcset: array,
			caption: string
		})),
		index: number,
		onCancel: func,
		onNext: func,
		onPrev: func,
		onNav: func,
	
		noKeyboardInput: bool,
		noBackdropCancel: bool,
		noNextOnClick: bool,
		noCloseButton: bool,
		noImageCount: bool,
		noPositionIndicators: bool,
		noPreload: bool,
		noSpinner: bool,
		noRotate: bool,
		width: number
	}, _class4.defaultProps = {
		open: false,
		images: [],
		index: 0,
	
		noKeyboardInput: false,
		noBackdropCancel: false,
		noNextOnClick: false,
		noCloseButton: false,
		noImageCount: false,
		noPositionIndicators: false,
		noPreload: false,
		noSpinner: false,
		noRotate: false,
		width: 900
	}, _temp4);
	;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**!
	 * Distributed Service-Unique IDs that are short and sweet.
	 *
	 * http://download.github.io/suid
	 *
	 * @Author Stijn de Witt (http://StijnDeWitt.com)
	 * @Copyright (c) 2015. Some rights reserved.
	 * @License CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
	 */
	/** @namespace ws.suid */
	(function(u,m,d) {var p='picolog',l; if(this.log&&this.log.INFO){l=this.log;}
		if(true){try{/*require.resolve*/(5);l=__webpack_require__(5);}catch(e){}module.exports=d(l);}
		else if(typeof define == 'function' && define.amd){define(u, ['require'], function(r){
			return d((r.defined && r.defined('picolog')) || (r.c && r.c['picolog']) ? r('picolog') : l);
		})}
		else{this[m] = d(l);}
	}('suid','Suid',function(log){'use strict';
	var
	SHARDSIZE = 2,
	IDSIZE = 64,
	THROTTLE = 5000,
	POOL = 'suidpool',
	DETECT = 'suiddetect',
	ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz',
	localStorageSupported = (function(ls){
		try{
			ls.setItem(DETECT, DETECT);
			ls.removeItem(DETECT);
			return true;
		}
		catch(e){
			return false;
		}
	})(typeof window == 'object' && window.localStorage),
	currentBlock,
	currentId,
	readyListeners = [],
	win = typeof window != 'undefined' ? window : typeof global != 'undefined' ? global : {},
	config = getConfig(win.Suid, {server:'/suid/suid.json', min:3, max:4});
	
	/**
	 * Distributed Service-Unique IDs that are short and sweet.
	 *
	 * <p>When called without arguments, defaults to <tt>Suid(0)</tt>.</p>
	 *
	 * <p>When called with an argument, constructs a new Suid based
	 * on the given value, which may be either a:</p>
	 *
	 * <ul>
	 *   <li>Number</li>
	 *   <li>Base-36 String</li>
	 *   <li>Other Suid</li>
	 * </ul>
	 *
	 * <p>This constructor function may be called without the <tt>new</tt> keyword.</p>
	 *
	 * <p><b>Examples</b></p>
	 *
	 * <big><pre>
	 * // Call without arguments
	 * var NOP = new Suid();
	 *
	 * // call with a Number argument
	 * var ZERO = new Suid(0);
	 * var ONE = new Suid(1);
	 * NOP.equals(ZERO); // true
	 *
	 * // New-less invocation
	 * var TWO = Suid(2);
	 *
	 * // call with a base-36 string argument
	 * var suid1 = Suid('14she');
	 *
	 * // call with another suid as argument
	 * var suid2 = Suid(suid1);
	 * </pre></big>
	 *
	 * @param value The value for the new Suid.
	 *
	 * @class Suid
	 * @memberof! ws.suid
	 */
	var Suid = (function() {
		function Suid(value) {
			if (! (this instanceof Suid)) {return new Suid(value);}
			if (value === undefined) {value = 0;}
			if (typeof value === 'string') {value = parseInt(value, 36);}
			this.value = value instanceof Suid ? value.value : value;
			Number.call(this, this.value);
		}
	
		Suid.prototype = Object.create(Number.prototype);
		Suid.prototype.constructor = Suid;
	
		/**
		 * Converts this suid to a string.
		 *
		 * The returned String will be in base-36 format.
		 * For example: <tt>'14she'</tt>.
		 *
		 * @return The base-36 string.
		 *
		 * @memberof! ws.suid.Suid#
		 */
		Suid.prototype.toString = function Suid_toString() {
			return this.value.toString(36);
		};
	
		/**
		 * Converts this suid to a JSON string.
		 *
		 * The returned String will be in base-36 format.
		 * For example: <tt>'14she'</tt>. This method
		 * is called by <tt>JSON.stringify</tt>.
		 *
		 * @return The JSON string.
		 *
		 * @memberof! ws.suid.Suid#
		 *
		 * @see {@link ws.suid.Suid.revive}
		 */
		Suid.prototype.toJSON = function Suid_toJSON() {
			return this.toString();
		};
	
		/**
		 * Returns the underlying value of this suid.
		 *
		 * @return The underlying primitive Number value.
		 *
		 * @memberof! ws.suid.Suid#
		 */
		Suid.prototype.valueOf = function Suid_valueOf() {
			return this.value;
		};
	
		/**
		 * Compares this suid with <tt>that</tt>.
		 *
		 * @return <tt>-1</tt> when this suid is less than,
		 *         <tt>0</tt> when it is equal to and
		 *         <tt>+1</tt> when it is greater than <tt>that</tt>.
		 *
		 * @memberof! ws.suid.Suid#
		 */
		Suid.prototype.compare = function Suid_compare(that) {
			that = Suid(that);
			return this.value < that.value ? -1 : this.value > that.value ? 1 : 0;
		};
	
		/**
		 * Indicates whether this suid and <tt>that</tt> are equal.
		 *
		 * @return <tt>true</tt> when the values are equal, <tt>false</tt> otherwise.
		 *
		 * @memberof! ws.suid.Suid#
		 */
		Suid.prototype.equals = function Suid_equals(that) {
			return this.value === Suid(that).value;
		};
	
		/**
		 * Indicates whether the given string value looks like a valid suid.
		 *
		 * If this method returns true, this only indicates that it's
		 * *probably* valid. There are no guarantees.
		 *
		 * @param str The string to test.
		 * @return <tt>true</tt> if it looks valid, <tt>false</tt> otherwise.
		 *
		 * @memberof! ws.suid.Suid
		 */
		Suid.looksValid = function Suid_looksValid(value) {
			if (!value) {return false;}
			var len = value.length;
			if ((!len) || (len > 11)) {return false;}
			if ((len === 11) && (ALPHABET.indexOf(value.charAt(0)) > 2)) {return false;}
			for (var i=0; i<len; i++) {
				if (ALPHABET.indexOf(value.charAt(i)) === -1) {return false;}
			}
			return true;
		};
	
		/**
		 * Creates a reviver function to be used i.c.w. JSON.parse.
		 *
		 * Example:
		 *
		 * <big><pre>
		 * var object = {
		 *   id: Suid(),
		 *   name: 'Example'
		 * };
		 * var obj, json = JSON.stringify(object);
		 * // json === '{"id":"19b","name":"Example"}'
		 * obj = JSON.parse(json, Suid.revive('id'));   // OR
		 * obj = JSON.parse(json, Suid.revive(['id'])); // OR
		 * obj = JSON.parse(json, Suid.revive(function(key,val){return key === 'id';}));
		 * // obj.id instanceof Suid === true
		 * </pre></big>
		 *
		 * @param prop The (array of) name(s) of properties to be revived, or an evaluator function.
		 * @returns A reviver function
		 *
		 * @memberof! ws.suid.Suid
		 */
		Suid.revive = function Suid_revive(prop) {
			var mayRevive = typeof prop === undefined ? function(){return true;} : function(key){return prop.indexOf(key) !== -1;};
			if (typeof prop == 'string') {prop = [prop];}
			if (typeof prop == 'function') {mayRevive = prop;}
			return function reviver(key, value) {
				return mayRevive(key, value) && Suid.looksValid(value) ? new Suid(value) : value;
			};
		};
	
		/**
		 * Generates the next suid.
		 *
		 * @return The next new suid.
		 *
		 * @memberof! ws.suid.Suid
		 */
		Suid.next = function Suid_next() {
			var pool = Pool.get();
			if ((pool.length < config.min) || ((!currentBlock && pool.length === config.min))) {
				if (config.server) {Server.fetch();}
				else {log && log.warn('No suid server configured. Please add the data-suid-server attribute to the script tag or call Suid.config before generating IDs.');}
			}
			if (! currentBlock) {
				if (pool.length === 0) {
					throw new Error('Unable to generate IDs. Suid block pool exhausted.');
				}
				currentId = 0;
				currentBlock = pool.splice(0, 1)[0];
				Pool.set(pool);
			}
	
			var result = currentBlock + currentId * SHARDSIZE;
			currentId++;
			if (currentId >= IDSIZE) {
				currentBlock = null;
			}
			return new Suid(result);
		};
	
		/**
		 * Configures the suid generator or gets the current config.
		 *
		 * <p>This method can be used as an alternative for, or in addition to, specifying
		 * the configuration in the <tt>data-suid-server</tt> and <tt>data-suid-options</tt>
		 * script attributes.</p>
		 *
		 * <p><b>Examples:</b></p>
		 *
		 * <code><pre>
		 * // Assuming no config was set yet... (defaults)
		 * var config = Suid.config();       // config => {server:'/suid/suid.json', min:3, max:4}
		 *
		 * Suid.config({
		 *     server: '/suid.json',
		 *     min: 2,
		 *     max: 6,
		 *     seed: ['14she', '14sky']
		 * });
		 *
		 * // The seed is used to fill the pool and then discarded:
		 * var config = Suid.config();       // config => {server:'/suid.json', min:2, max:6}
		 *
		 * // Config does a merge:
		 * config = Suid.config({max: 8});   // config => {server:'/suid.json', min:2, max:8}
		 * </pre></code>
		 *
		 * @return The current config after the given <tt>cfg</tt> object has been processed, if any.
		 *
		 * @memberof! ws.suid.Suid
		 */
		Suid.config = function Suid_config(cfg) {
			if (cfg) {
				config = merge(config, cfg);
				if (cfg.seed) {
					var pool = Pool.get();
					pool.push(cfg.seed);
					Pool.set(pool);
					delete config.seed;
				}
				Suid.ready();
			}
			return config;
		};
	
		/**
		 * Indicates if Suid is ready to generate IDs, attaches the given callback listener.
		 *
		 * <p>This method can be used to find out whether Suid is ready to generate ID's, or
		 * to attach an event listener to the ready event. The given <tt>callback</tt> function
		 * is guaranteed to fire asynchronously, meaning this method will always return before
		 * the callback is fired. Due to this, this method may already return <tt>true</tt> even
		 * though the ready event hasn't fired yet.</p>
		 *
		 * <p><b>Examples:</b></p>
		 *
		 * <code><pre>
		 * if (Suid.ready()) {
		 *   // Suid is ready!
		 * } else {
		 *   // Suid is not ready yet...
		 * }
		 *
		 * Suid.ready(function(){
		 *   // Suid is ready!
		 * });
		 * </pre></code>
		 *
		 * @param callback The optional callback function that will be called once Suid is ready.
		 * @return <tt>true</tt> if Suid is ready, <tt>false</tt> otherwise.
		 */
		Suid.ready = function Suid_ready(callback) {
			var ready = Pool.get().length > 0;
			if (callback) {readyListeners.push(callback);}
			if (ready) {setTimeout(function(){for (var l; l=readyListeners.shift();) {l();}}, 0);}
			// give client 100ms to configure the server using Suid.configure
			else {setTimeout(function(){Server.fetch();}, 100);}
			return ready;
		};
	
		return Suid;
	})();
	
	var Pool = (function(){
		var pool = [];
		return {
			get: function() {
				if (localStorageSupported) {
					pool = Pool.from(localStorage.getItem(POOL));
				}
				return pool;
			},
			set: function(values){
				pool = values;
				if (localStorageSupported) {
					localStorage.setItem(POOL, Pool.to(pool));
				}
				return Pool;
			},
			from: function(str){
				var results = [];
				if (str) {
					var strings = str.split(',');
					for (var i=0, s; s=strings[i]; i++) {
						results.push(new Suid(s));
					}
				}
				return results;
			},
			to: function(obj){
				return obj.join(',');
			}
		};
	})();
	
	var Server = (function(){
		var retries = 0,
			started = 0;
	
		function handleSuccess(text) {
			retries = 0;
			var pool = Pool.get();
			pool.push(JSON.parse(text));
			Pool.set(pool);
			Suid.ready();
		}
	
		function handleError(status, request) {
			// status code 5xx ? possibly recoverable.
			switch(status) {
				case 500: // Internal server error
				case 502: // Bad Gateway
				case 503: // Service unavailable
				case 504: // Gateway Timeout
					retry(request);
					break;
				default: // unrecoverable? give up
					log && log.error('Unable to fetch suid data from server. ', request, status);
					retries = 0;
			}
		}
	
		function retry(request) {
			if (retries === 0) {
				log && log.error('Giving up fetching suid data from server: ' + config.server);
				return;
			}
	
			retries--;
			var after = 300000; // 5 minutes
			var retryAfter = request.getResponseHeader('Retry-After');
			if (retryAfter) {
				after = parseInt(retryAfter, 10);
				if (! isNaN(after)) {
					after = after * 1000; // seconds to ms.
				}
			}
			// Is this urgent?
			if (! Pool.get().length) { // Pool is out of blocks
				if (after > 60000) {
					after = 60000; // 1 min
				}
			}
			if (currentId > (IDSIZE/2)) { // less than half of current block left
				if (after > 30000) {
					after = 30000; // 30 sec
				}
			}
			if (! currentBlock) { // completely out
				if (after > 2000) {
					after = 2000; // 2 sec
				}
			}
	
			setTimeout(function(){
				ajax(config.server, {blocks: config.max - Pool.get().length}, handleSuccess, handleError);
			}, after);
		}
	
		function ajax(url, data, success, error, sync) {
			var xhr = new XMLHttpRequest(), query = [], params, key;
			for (key in data) {
				if (data.hasOwnProperty(key)) {
					query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
				}
			}
			params = query.join('&');
			xhr.open('get', url + (params ? (url.indexOf('?') !== -1 ? '&' : '?') + params : ''), !sync);
			xhr.addEventListener('readystatechange', function(){
				if (this.readyState === 4) {
					this.status === 200 ? success(this.responseText, this) : error(this.status, this);
				}
			});
			xhr.addEventListener('error', function () {
				error(this, this.status);
			});
			xhr.send();
		}
	
		return {
			fetch: function Server_fetch() {
				if (typeof window != 'object') {return;}
				if (retries && ((new Date().getTime() - started < THROTTLE) ||
								(currentId && (currentId < (IDSIZE/2))))) {
					return; // already fetching and still recent or not urgent
				}
				var pool = Pool.get();
				if (pool.length < config.min) {
					retries = 3;
					started = Date.now();
					ajax(config.server, {blocks: config.max - pool.length}, handleSuccess, handleError);
				}
			}
		};
	})();
	
	function merge() {
		var res={}, i, arg, key;
		for (i=0; arg=arguments[i++];) {
			for (key in arg) {res[key] = arg[key];}
		}
		return res;
	}
	
	function getConfig(cfg, def) {
		var options = {},
			config = merge(def, cfg);
		var script = typeof document == 'object' && document.querySelector('script[data-suid-server]');
		if (!script) {script = typeof document == 'object' && document.querySelector('script[data-suid-options]');}
		if (script) {
			var attr = script.getAttribute('data-suid-options');
			if (attr) {
				try {
					options = JSON.parse(attr.split('\'').join('"'));
				}
				catch(error) {
					log && log.error('Unable to parse suid options as JSON: \'' + attr + '\'. Error was: ', error);
				}
			}
			options.url = script.getAttribute('data-suid-server');
			config = merge(config, options);
		}
		config.configured = cfg || script;
		return config;
	}
	
	if (config.configured) {Suid.configure(config);}
	else {Suid.ready();}
	
	log && log.info('Suid.js started.');
	
	// EXPOSE
	return Suid;
	
	}));


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("redux-load-api");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _typeof2 = __webpack_require__(11);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(30);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Scroller = (_temp = _class = function (_React$Component) {
		(0, _inherits3.default)(Scroller, _React$Component);
	
		function Scroller(props) {
			(0, _classCallCheck3.default)(this, Scroller);
	
			_picolog2.default.debug('Scroller', props);
			// direction, itemCount, items, itemSize, itemsPer
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Scroller).call(this, props));
	
			_this.state = _this.getState(props);
			_this.onScroll = _this.onScroll.bind(_this);
			return _this;
		} // function(index)
	
		(0, _createClass3.default)(Scroller, [{
			key: 'getState',
			value: function getState(props) {
				// let dir = props.direction;
				var win = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object' && window;
				var w = win && window.innerWidth || 767;
				var horizontal = win && w < 480;
				var scroller = this.mounted ? _reactDom2.default.findDOMNode(this) : undefined;
				var scrollPos = scroller ? getScrollPos(horizontal, scroller) : 0;
	
				var initialItemsInView = this.props.initialItemsInView;
				var items = props.items instanceof Array ? { 0: props.items } : props.items;
				var itemCount = props.itemCount !== undefined ? props.itemCount : items && items[0] && items[0].length || 0;
				var itemSize = horizontal ? w : props.itemSize;
				var itemsPer = !win ? 1 : w > 1024 ? 3 : w > 767 ? 2 : 1;
				var bufferBefore = props.bufferBefore;
				var bufferAfter = props.bufferAfter;
				var containerCount = ~ ~(itemCount / itemsPer) + (~ ~(itemCount % itemsPer) ? 1 : 0);
	
				var scrollerSize = scroller ? getSize(horizontal, scroller) : Math.min(initialItemsInView, containerCount) * itemSize;
				var slider = this.refs.slider;
				var sliderOffset = scroller ? posDifference(horizontal, slider, scroller) : 0;
				var renderedItems = [];
	
				var containersBefore = ~ ~(scrollPos / itemSize);
				var bufBefore = Math.min(containersBefore, bufferBefore);
				var skippedContainers = containersBefore - bufBefore;
				var skippedItems = skippedContainers * itemsPer;
				var firstIdx = skippedItems;
				var containersInView = ~ ~(scrollerSize / itemSize) + (~ ~(scrollerSize % itemSize) ? 2 : 1);
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
					horizontal: horizontal,
					renderedItems: renderedItems,
					sizeBefore: sizeBefore,
					sizeItems: sizeItems,
					sizeAfter: sizeAfter,
					itemSize: itemSize,
					// scrollPos,
					firstRenderedItemIndex: firstIdx,
					lastRenderedItemIndex: lastIdx,
					size: scrollerSize
				};
			}
		}, {
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {
				_picolog2.default.debug('shouldComponentUpdate', nextProps, nextState);
				if (this.state.size !== nextState.size) return true;
				if (this.state.sizeBefore !== nextState.sizeBefore) return true;
				if (this.state.sizeAfter !== nextState.sizeAfter) return true;
				if (this.props.items.length !== nextProps.items.length) return true;
				if (!arraysEqual(this.state.renderedItems, nextState.renderedItems)) return true;
				if (!arraysEqual(this.props.items, nextProps.items)) return true;
				return false;
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				_picolog2.default.debug('componentWillReceiveProps', nextProps);
				this.setState(this.getState(nextProps));
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				_picolog2.default.debug('componentDidMount');
				this.mounted = true;
				this.onScrollDebounced = window.innerWidth < 480 ? debounce(this.onScroll, this.props.scrollDebounce, false) : this.onScroll;
				this.setState(this.getState(this.props));
				_reactDom2.default.findDOMNode(this).addEventListener('scroll', this.onScrollDebounced);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				_picolog2.default.debug('componentWillUnmount');
				_reactDom2.default.findDOMNode(this).removeEventListener('scroll', this.onScrollDebounced);
				this.mounted = false;
			}
		}, {
			key: 'onScroll',
			value: function onScroll() {
				_picolog2.default.trace('onscroll');
				this.setState(this.getState(this.props));
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				_picolog2.default.debug('render', this.props, this.state);
				var slider = {},
				    before = {},
				    after = {},
				    itm = {};
				var dim = this.state.horizontal ? 'width' : 'height';
				slider[dim] = this.state.sizeBefore + this.state.sizeItems + this.state.sizeAfter;
				before[dim] = this.state.sizeBefore;
				itm[dim] = this.state.itemSize;
				after[dim] = this.state.sizeAfter;
				return _react2.default.createElement(
					'div',
					{ className: 'Scroller' },
					_react2.default.createElement(
						'div',
						{ className: 'ScrollSlider', ref: 'slider', style: slider
						},
						_react2.default.createElement('div', { className: 'ScrollSpacer ScrollSpacerBefore', ref: 'spacerBefore', style: before }),
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
	
							// style={itm}
							return _react2.default.createElement(
								'div',
								{ className: 'ScrollItem', key: key, style: itm },
								renderItem(item, idx)
							);
						}),
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
		//		direction: React.PropTypes.oneOf(['vertical','horizontal']),
	
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
	  * Default size of an item in the scroll direction, in pixels.
	  * Defaults to 300.
	  *
	  * For a vertical scroller, set this to the height of each
	  * item, for a horizontal scroller, the screen width is used.
	  */
		itemSize: _react2.default.PropTypes.number.isRequired,
	
		/**
	  * Number of items to be rendered initially, before the component
	  * is mounted.
	  * Defaults to 12.
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
		//		itemsPer: React.PropTypes.number,
	
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
	  * should return a Promise that yields an array with the results
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
		itemSize: 580,
		initialItemsInView: 20,
		//		itemsPer: 1,
		bufferBefore: 1,
		bufferAfter: 1,
		scrollDebounce: 250,
		//		direction: 'vertical',
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
	
	function posFromWindow(horizontal, element) {
		var dir = horizontal ? 'Left' : 'Top';
		if (!element || element === window) return 0;
		return element['offset' + dir] + posFromWindow(horizontal, element.offsetParent);
	}
	
	function posDifference(horizontal, element, container) {
		return posFromWindow(horizontal, element) - posFromWindow(horizontal, container);
	}
	
	function getSize(horizontal, element) {
		var dir = horizontal ? 'Width' : 'Height';
		return typeof element['inner' + dir] != 'undefined' ? element['inner' + dir] : element['client' + dir];
	}
	
	function getScrollPos(horizontal, element) {
		var res = undefined;
	
		var _ref = horizontal ? { axis: 'X', dir: 'Left' } : { axis: 'Y', dir: 'Top' };
	
		var axis = _ref.axis;
		var dir = _ref.dir;
	
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SearchApi = undefined;
	
	var _promise = __webpack_require__(24);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _getIterator2 = __webpack_require__(62);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _keys = __webpack_require__(28);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _class2, _temp;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(10);
	
	var _reduxAsyncApi = __webpack_require__(32);
	
	var _reduxAsyncApi2 = _interopRequireDefault(_reduxAsyncApi);
	
	var _reduxFetchApi = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SearchApi = exports.SearchApi = (0, _reduxFetchApi.remote)(_class = (_temp = _class2 = function (_Async) {
		(0, _inherits3.default)(SearchApi, _Async);
	
		function SearchApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? SearchApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, SearchApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SearchApi).call(this, state));
	
			_this.setHandler(SearchApi.SET_FILTER, function (state, action) {
				return (0, _extends3.default)({}, state, { filter: action.payload });
			});
			_this.setHandler(SearchApi.SET_RESULTS, function (state, action) {
				return (0, _extends3.default)({}, state, { results: action.payload });
			});
			Object.defineProperty(_this, 'filter', { enumerable: true, get: function get() {
					return _this.getState().filter;
				} });
			Object.defineProperty(_this, 'results', { enumerable: true, get: function get() {
					return _this.getState().results;
				} });
			return _this;
		}
	
		(0, _createClass3.default)(SearchApi, [{
			key: 'setFilter',
			value: function setFilter(filter) {
				return this.dispatch(this.createAction(SearchApi.SET_FILTER)(filter));
			}
		}, {
			key: 'setResults',
			value: function setResults(results) {
				this.dispatch(this.createAction(SearchApi.SET_RESULTS)(results));
			}
		}, {
			key: 'url',
			value: function url(filter) {
				var keys = (0, _keys2.default)(filter);
				var result = '';
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = (0, _getIterator3.default)(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
	
				_picolog2.default.debug('search');
				// dispatch a function... redux-thunk will execute the function
				return this.dispatch(function () {
					var url = _this2.url(_this2.filter);
					_this2.setBusy();
					_picolog2.default.log('search: fetching ', url);
					return _this2.fetch(url).then(function (response) {
						_picolog2.default.log('search: got response with status ', response.status);
						if (response && response.status === 200) {
							return response.json();
						} else {
							_picolog2.default.log('search: Got an error response ', response.status, response.statusText);
							return new _promise2.default(function (resolve, reject) {
								response.text().then(function (text) {
									_picolog2.default.log('search: ', response.status, text);
									var error = Error(text);
									error.status = response.status;
									error.statusText = response.statusText;
									reject(error);
								});
							});
						}
					}).then(function (json) {
						_picolog2.default.log('search: OK got ' + json.length + ' results');
						_this2.setDone();
						_this2.setResults(json);
						return json;
					}).catch(function (error) {
						_picolog2.default.info('search: error=', error);
						return _this2.setError(error);
					});
				});
			}
		}]);
		return SearchApi;
	}(_reduxAsyncApi2.default), _class2.INITIAL_STATE = (0, _extends3.default)({}, _reduxAsyncApi2.default.INITIAL_STATE, {
		filter: {},
		results: []
	}), _class2.SET_FILTER = 'SET_FILTER', _class2.SET_RESULTS = 'SET_RESULTS', _temp)) || _class;
	
	exports.default = SearchApi;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.PasswordCredential = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class;
	
	var _Entity = __webpack_require__(16);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _Credential2 = __webpack_require__(37);
	
	var _Credential3 = _interopRequireDefault(_Credential2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PasswordCredential = exports.PasswordCredential = (0, _Entity2.default)(_class = function (_Credential) {
		(0, _inherits3.default)(PasswordCredential, _Credential);
	
		function PasswordCredential(id, password) {
			(0, _classCallCheck3.default)(this, PasswordCredential);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PasswordCredential).call(this, id));
	
			_this.password = password;
			return _this;
		}
	
		return PasswordCredential;
	}(_Credential3.default)) || _class;
	
	exports.default = PasswordCredential;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.FlipCard = exports.Card = exports.Back = exports.Front = exports.CardFace = exports.CardActions = exports.SupportingText = exports.CardMedia = exports.SubtitleText = exports.CardTitle = undefined;
	
	var _defineProperty2 = __webpack_require__(29);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _class, _temp, _class2, _temp2;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(12);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var string = _react.PropTypes.string;
	var node = _react.PropTypes.node;
	var bool = _react.PropTypes.bool;
	
	function simpleComponent(defaultClass) {
		var result = function result(props) {
			var className = props.className;
			var defaultClass = props.defaultClass;
			var children = props.children;
			var otherProps = (0, _objectWithoutProperties3.default)(props, ['className', 'defaultClass', 'children']);
	
			var classes = (0, _classnames2.default)(className, defaultClass);
			return _react2.default.createElement(
				'div',
				(0, _extends3.default)({ className: classes }, otherProps),
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
	
	var Card = exports.Card = (_temp = _class = function (_Component) {
		(0, _inherits3.default)(Card, _Component);
	
		function Card() {
			(0, _classCallCheck3.default)(this, Card);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Card).apply(this, arguments));
		}
	
		(0, _createClass3.default)(Card, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var className = _props.className;
				var cardClass = _props.cardClass;
				var shadowClass = _props.shadowClass;
				var flippedClass = _props.flippedClass;
				var flipped = _props.flipped;
				var children = _props.children;
				var others = (0, _objectWithoutProperties3.default)(_props, ['className', 'cardClass', 'shadowClass', 'flippedClass', 'flipped', 'children']);
	
				var classes = (0, _classnames2.default)(className, cardClass, shadowClass, (0, _defineProperty3.default)({}, flippedClass, flipped));
				return _react2.default.createElement(
					'div',
					(0, _extends3.default)({ className: classes }, others),
					children
				);
			}
		}]);
		return Card;
	}(_react.Component), _class.propTypes = {
		className: string,
		cardClass: string,
		shadowClass: string,
		flippedClass: string,
		flipped: bool,
		children: node
	}, _class.defaultProps = {
		cardClass: 'mdl-card',
		shadowClass: 'mdl-shadow--2dp',
		flippedClass: 'is-flipped',
		flipped: false
	}, _temp);
	exports.default = Card;
	var FlipCard = exports.FlipCard = (_temp2 = _class2 = function (_Component2) {
		(0, _inherits3.default)(FlipCard, _Component2);
	
		function FlipCard(props) {
			(0, _classCallCheck3.default)(this, FlipCard);
	
			var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(FlipCard).call(this, props));
	
			_this2.state = _this2.getState(props);
			_this2.flip = _this2.flip.bind(_this2);
			return _this2;
		}
	
		(0, _createClass3.default)(FlipCard, [{
			key: 'getState',
			value: function getState(props) {
				return { flipped: this.state && this.state.flipped || props && props.flipped };
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
			key: 'isFlipped',
			value: function isFlipped() {
				return this.state && this.state.flipped;
			}
		}, {
			key: 'flip',
			value: function flip() {
				_picolog2.default.debug('Card.flip():', !this.getState().flipped);
				this.setState((0, _extends3.default)({}, this.state, { flipped: !this.isFlipped() }));
			}
		}]);
		return FlipCard;
	}(_react.Component), _class2.propTypes = {
		flipped: bool.isRequired,
		trigger: string.isRequired
	}, _class2.defaultProps = {
		flipped: false,
		trigger: 'onClick'
	}, _temp2);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.LightboxApi = exports.DrawerApi = exports.TextfieldApi = undefined;
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp, _class2, _temp2, _class3, _temp3;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(10);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TextfieldApi = exports.TextfieldApi = (_temp = _class = function (_Api) {
		(0, _inherits3.default)(TextfieldApi, _Api);
	
		function TextfieldApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? TextfieldApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, TextfieldApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TextfieldApi).call(this, state));
	
			_this.setHandler(TextfieldApi.SET_VALUE, function (state, _ref) {
				var payload = _ref.payload;
				return (0, _extends3.default)({}, state, { value: payload });
			});
			Object.defineProperty(_this, 'value', { enumerable: true, get: function get() {
					return _this.getState().value;
				} });
			Object.defineProperty(_this, 'onChange', { enumerable: true, value: _this.setValue.bind(_this) });
			return _this;
		}
	
		(0, _createClass3.default)(TextfieldApi, [{
			key: 'setValue',
			value: function setValue(value) {
				return this.dispatch(this.createAction(TextfieldApi.SET_VALUE)(value));
			}
		}]);
		return TextfieldApi;
	}(_reduxApis2.default), _class.INITIAL_STATE = { value: '' }, _class.SET_VALUE = 'SET_VALUE', _temp);
	var DrawerApi = exports.DrawerApi = (_temp2 = _class2 = function (_Api2) {
		(0, _inherits3.default)(DrawerApi, _Api2);
	
		function DrawerApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? DrawerApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, DrawerApi);
	
			var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DrawerApi).call(this, state));
	
			_this2.setHandler(DrawerApi.OPEN, function (state, action) {
				return (0, _extends3.default)({}, state, { open: true });
			});
			_this2.setHandler(DrawerApi.CLOSE, function (state, action) {
				return (0, _extends3.default)({}, state, { open: false });
			});
			Object.defineProperty(_this2, 'open', { enumerable: true, get: function get() {
					return _this2.getState().open;
				} });
			Object.defineProperty(_this2, 'onCancel', { enumerable: true, value: _this2.closeDrawer.bind(_this2) });
			Object.defineProperty(_this2, 'onActivate', { enumerable: true, value: _this2.openDrawer.bind(_this2) });
			return _this2;
		}
	
		(0, _createClass3.default)(DrawerApi, [{
			key: 'openDrawer',
			value: function openDrawer() {
				_picolog2.default.debug('openDrawer');
				return this.dispatch(this.createAction(DrawerApi.OPEN)());
			}
		}, {
			key: 'closeDrawer',
			value: function closeDrawer() {
				_picolog2.default.debug('closeDrawer');
				return this.dispatch(this.createAction(DrawerApi.CLOSE)());
			}
		}]);
		return DrawerApi;
	}(_reduxApis2.default), _class2.INITIAL_STATE = { open: false }, _class2.OPEN = 'OPEN', _class2.CLOSE = 'CLOSE', _temp2);
	var LightboxApi = exports.LightboxApi = (_temp3 = _class3 = function (_Api3) {
		(0, _inherits3.default)(LightboxApi, _Api3);
	
		function LightboxApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? LightboxApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, LightboxApi);
	
			var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LightboxApi).call(this, state));
	
			_this3.setHandler(LightboxApi.OPEN, function (state, _ref2) {
				var _ref2$payload = _ref2.payload;
				var images = _ref2$payload.images;
				var index = _ref2$payload.index;
				return (0, _extends3.default)({}, state, { open: true, images: images, index: index });
			});
			_this3.setHandler(LightboxApi.NEXT, function (_ref3) {
				var images = _ref3.images;
				var index = _ref3.index;
				var state = (0, _objectWithoutProperties3.default)(_ref3, ['images', 'index']);
				return (0, _extends3.default)({}, state, { images: images, index: index < images.length - 1 ? index + 1 : index });
			});
			_this3.setHandler(LightboxApi.PREV, function (_ref4) {
				var index = _ref4.index;
				var state = (0, _objectWithoutProperties3.default)(_ref4, ['index']);
				return (0, _extends3.default)({}, state, { index: index > 0 ? index - 1 : index });
			});
			_this3.setHandler(LightboxApi.NAV, function (_ref5, _ref6) {
				var index = _ref5.index;
				var state = (0, _objectWithoutProperties3.default)(_ref5, ['index']);
				var payload = _ref6.payload;
				return (0, _extends3.default)({}, state, { index: payload });
			});
			_this3.setHandler(LightboxApi.CANCEL, function (state, action) {
				return (0, _extends3.default)({}, state, { open: false, images: [], index: 0 });
			});
	
			Object.defineProperty(_this3, 'open', { enumerable: true, get: function get() {
					return _this3.getState() && _this3.getState().open;
				} });
			Object.defineProperty(_this3, 'index', { enumerable: true, get: function get() {
					return _this3.getState() && _this3.getState().index;
				} });
			Object.defineProperty(_this3, 'images', { enumerable: true, get: function get() {
					return _this3.getState() && _this3.getState().images;
				} });
			Object.defineProperty(_this3, 'onOpenLightbox', { enumerable: true, value: _this3.openLightbox.bind(_this3) });
			Object.defineProperty(_this3, 'onCancel', { enumerable: true, value: _this3.cancel.bind(_this3) });
			Object.defineProperty(_this3, 'onNext', { enumerable: true, value: _this3.next.bind(_this3) });
			Object.defineProperty(_this3, 'onPrev', { enumerable: true, value: _this3.prev.bind(_this3) });
			Object.defineProperty(_this3, 'onNav', { enumerable: true, value: _this3.nav.bind(_this3) });
			return _this3;
		}
	
		(0, _createClass3.default)(LightboxApi, [{
			key: 'openLightbox',
			value: function openLightbox() {
				var images = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
				var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
				_picolog2.default.log('openLightbox', images, index);
				return this.dispatch(this.createAction(LightboxApi.OPEN)({ images: images, index: index }));
			}
		}, {
			key: 'next',
			value: function next() {
				_picolog2.default.log('next');
				this.dispatch(this.createAction(LightboxApi.NEXT)());
			}
		}, {
			key: 'prev',
			value: function prev() {
				_picolog2.default.log('prev');
				this.dispatch(this.createAction(LightboxApi.PREV)());
			}
		}, {
			key: 'nav',
			value: function nav(idx) {
				_picolog2.default.log('nav', idx);
				this.dispatch(this.createAction(LightboxApi.NAV)(idx));
			}
		}, {
			key: 'cancel',
			value: function cancel() {
				_picolog2.default.log('cancel');
				this.dispatch(this.createAction(LightboxApi.CANCEL)());
			}
		}]);
		return LightboxApi;
	}(_reduxApis2.default), _class3.INITIAL_STATE = { open: false, images: [], index: 0 }, _class3.OPEN = 'OPEN', _class3.NEXT = 'NEXT', _class3.PREV = 'PREV', _class3.NAV = 'NAV', _class3.CANCEL = 'CANCEL', _temp3);

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("redux-async-api");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(72);
	
	var buildPath = path.resolve(__dirname);
	var publicPath = path.resolve(__dirname, 'public');
	var testPath = path.resolve(publicPath, 'test');
	var pkg = __webpack_require__(60);
	
	var cfg = {
		version: pkg.version,
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
			protocol: 'http://',
			protocol: ({"NODE_ENV":"production"}).OPENSHIFT_NODEJS_PROTOCOL || 'http://',
			host: ({"NODE_ENV":"production"}).OPENSHIFT_NODEJS_IP || '0.0.0.0',
			port: ({"NODE_ENV":"production"}).OPENSHIFT_NODEJS_PORT || 80,
			path: ({"NODE_ENV":"production"}).OPENSHIFT_NODEJS_PATH || '/',
			entry: './src/server',
			output: {
				filename: 'server.js',
				path: '',
			},
		},
		apiServer: {
			name: 'BridalApp API Server',
			protocol: ({"NODE_ENV":"production"}).BRIDALAPP_API_SERVER_PROTOCOL || 'http://',
			host: ({"NODE_ENV":"production"}).BRIDALAPP_API_SERVER_HOST || 'localhost',
			port: ({"NODE_ENV":"production"}).BRIDALAPP_API_SERVER_PORT || 8080,
			path: ({"NODE_ENV":"production"}).BRIDALAPP_API_SERVER_PATH || '/api',
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
	
	cfg.server.url = url(cfg.server);
	cfg.apiServer.url = url(cfg.apiServer);
	
	module.exports = cfg;
	
	function url(srv) {
		return srv.protocol + srv.host + (srv.port == '80' ? '' : ':' + srv.port) + srv.path;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.App = undefined;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _class, _class2, _temp;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(21);
	
	var _reduxLoadApi = __webpack_require__(20);
	
	var _reactRedux = __webpack_require__(19);
	
	var _reactMdl = __webpack_require__(13);
	
	var _mdlExtras = __webpack_require__(17);
	
	var _AuthDialog = __webpack_require__(36);
	
	var _AuthDialog2 = _interopRequireDefault(_AuthDialog);
	
	var _api = __webpack_require__(15);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bool = _react.PropTypes.bool;
	var number = _react.PropTypes.number;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var array = _react.PropTypes.array;
	var shape = _react.PropTypes.shape;
	var any = _react.PropTypes.any;
	//import { Lightbox } from '../Gallery/Lightbox';
	
	var App = exports.App = (_dec = (0, _reactRedux.connect)(_api2.default.connector), _dec(_class = (_temp = _class2 = function (_Component) {
		(0, _inherits3.default)(App, _Component);
	
		function App(props) {
			(0, _classCallCheck3.default)(this, App);
	
			_picolog2.default.debug('constructor', props);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));
		}
	
		(0, _createClass3.default)(App, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				_picolog2.default.debug('componentDidMount');
				_api2.default.auth.loadUser();
			}
		}, {
			key: 'render',
			value: function render() {
				_picolog2.default.debug('render', this.props);
				var _props = this.props;
				var auth = _props.auth;
				var leftDrawer = _props.leftDrawer;
				var rightDrawer = _props.rightDrawer;
				var lightbox = _props.lightbox;
				var children = _props.children;
	
				return _react2.default.createElement(
					'div',
					{ className: 'mdl-layout mdl-layout--fixed-header' },
					_react2.default.createElement(
						'div',
						{ className: 'mdl-layout__inner-container' },
						_react2.default.createElement(
							'header',
							{ className: 'AppBar mdl-layout__header is-casting-shadow' },
							_react2.default.createElement(
								'div',
								{ tabIndex: '0', className: 'mdl-layout__drawer-button', onClick: leftDrawer.onActivate },
								_react2.default.createElement(
									'i',
									{ className: 'material-icons' },
									'menu'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'mdl-layout__header-row' },
								_react2.default.createElement('img', { className: 'logo', src: 'https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png' }),
								_react2.default.createElement('div', { className: 'mdl-layout-spacer' }),
								false ? _react2.default.createElement(
									_reactMdl.Navigation,
									{ className: 'ActionBar' },
									_react2.default.createElement(
										'p',
										{ style: { color: 'black' }, onClick: function onClick() {} },
										auth.loggedIn && auth.user.name || 'anon'
									)
								) : undefined,
								false ? _react2.default.createElement(
									_reactMdl.Navigation,
									{ className: 'RightDrawer' },
									!rightDrawer.open ? _react2.default.createElement(
										'i',
										{ className: 'material-icons', onClick: rightDrawer.onActivate },
										'account_circle'
									) : _react2.default.createElement('span', null)
								) : undefined
							)
						),
						_react2.default.createElement(
							_mdlExtras.Drawer,
							(0, _extends3.default)({ modal: true, autoClose: true }, leftDrawer),
							_react2.default.createElement(
								_mdlExtras.LayoutTitle,
								null,
								_react2.default.createElement('img', { className: 'logo', src: 'https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png' })
							),
							_react2.default.createElement(
								_reactMdl.Navigation,
								null,
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/products' },
									'Wedding Dresses'
								),
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/stores' },
									'Bridal Stores'
								),
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/brands' },
									'Bridal Brands'
								)
							)
						),
						_react2.default.createElement(
							_mdlExtras.Drawer,
							(0, _extends3.default)({ right: true, modal: true, autoClose: true }, rightDrawer),
							_react2.default.createElement(
								_mdlExtras.LayoutTitle,
								null,
								auth.user ? _react2.default.createElement(
									'h4',
									null,
									auth.user.name,
									' ',
									_react2.default.createElement(
										_reactMdl.Button,
										{ onClick: auth.onLogout },
										'Logout'
									)
								) : _react2.default.createElement(
									_reactMdl.Button,
									{ onClick: auth.onProvoke },
									'Login'
								)
							),
							_react2.default.createElement(
								_reactMdl.Navigation,
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
							_reactMdl.Content,
							{ className: 'main' },
							children
						),
						_react2.default.createElement(_AuthDialog2.default, auth),
						_react2.default.createElement(_mdlExtras.Lightbox, (0, _extends3.default)({ noNextOnClick: true, noImageCount: true }, lightbox))
					)
				);
				/*			<Layout fixedHeader>
	   				<LoginDialog open={!!auth.challenge} api={api.auth}/>
	   				<Header className="AppBar" title="Title">
	   					<img className="logo" src="https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png" />
	   					<Navigation className="ActionBar">
	   						<p>this.props.appbar</p>
	   					</Navigation>
	   					<Navigation className="RightDrawer">
	   						{!rightDrawer.open ? (
	   							<i className="material-icons" onClick={()=>api.rightDrawer.open()}>account_circle</i>
	   						) : (
	   							<span></span>
	   						)}
	   					</Navigation>
	   				</Header>
	   				<Drawer api={api.leftDrawer} onClose={()=>api.leftDrawer.close()} open={leftDrawer.open}>
	   					<LayoutTitle><h2>Title</h2></LayoutTitle>
	   					<Navigation>
	   						<Link to="/">Home</Link>
	   						<Link to="/products">Products</Link>
	   						<Link to="/stores">Stores</Link>
	   						<Link to="/brands">Brands</Link>
	   					</Navigation>
	   				</Drawer>
	   				<Drawer align="right" onClose={()=>api.rightDrawer.close()} open={rightDrawer.open}>
	   					<LayoutTitle>{auth.user ?
	   						<h2>{auth.user.name}</h2>
	   						:
	   						<Button onClick={() => {
	   							api.rightDrawer.close();
	   							api.auth.challenge('/challenge')
	   						}}>Login</Button>
	   					}</LayoutTitle>
	   					<Navigation>
	   						<Link to="/">Home</Link>
	   						<Link to="/products">Products</Link>
	   						<Link to="/stores">Stores</Link>
	   						<Link to="/brands">Brands</Link>
	   					</Navigation>
	   				</Drawer>
	   				<Content className="main">
	   					<div>{children}</div>
	   				</Content>
	   			</Layout>
	   
	   		);
	   */
			}
		}]);
		return App;
	}(_react.Component), _class2.propTypes = {
		auth: shape({
			loggedIn: bool,
			user: object,
			challenged: bool,
			load: func
		}),
		leftDrawer: object,
		rightDrawer: object,
		lightbox: object
	}, _temp)) || _class);
	
	/*
					{auth.challenge ? <div className="LoginDialog">LOGIN DIALOG</div>:''}
					{auth.challenge ? <LayoutObfuscator className="is-visible" onClick={() => {
						log.debug('login dialog obfuscator clicked');
						api.auth.cancel();
					}} /> :''}
	*/
	
	exports.default = App;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Account = undefined;
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _class;
	
	var _Entity = __webpack_require__(16);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _Role = __webpack_require__(39);
	
	var _Role2 = _interopRequireDefault(_Role);
	
	var _Group = __webpack_require__(38);
	
	var _Group2 = _interopRequireDefault(_Group);
	
	var _PasswordCredential = __webpack_require__(25);
	
	var _PasswordCredential2 = _interopRequireDefault(_PasswordCredential);
	
	var _suid = __webpack_require__(18);
	
	var _suid2 = _interopRequireDefault(_suid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Account = exports.Account = (0, _Entity2.default)(_class = function Account(id, name) {
		var credentials = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
		var roles = arguments.length <= 3 || arguments[3] === undefined ? [_Role2.default.USER] : arguments[3];
		var groups = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
		(0, _classCallCheck3.default)(this, Account);
	
		this.id = id && new _suid2.default(id) || new _suid2.default(0);
		this.version = null;
		this.name = name;
		this.credentials = credentials;
		this.roles = roles;
		this.groups = groups;
	}) || _class;
	
	exports.default = Account;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AuthDialog = undefined;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactMdl = __webpack_require__(13);
	
	var _classnames = __webpack_require__(12);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlExtras = __webpack_require__(17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var string = _react.PropTypes.string;
	var bool = _react.PropTypes.bool;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var array = _react.PropTypes.array;
	var shape = _react.PropTypes.shape;
	
	_picolog2.default.assert(_reactMdl.Button && _reactMdl.DialogTitle && _reactMdl.DialogContent && _reactMdl.DialogActions, 'Not all react-mdl components are defined.');
	
	_picolog2.default.assert(_mdlExtras.Dialog && _mdlExtras.Textfield, 'Not all react-mdl-extras components are defined.');
	
	var AuthDialog = exports.AuthDialog = (_temp = _class = function (_Component) {
		(0, _inherits3.default)(AuthDialog, _Component);
	
		function AuthDialog(props) {
			(0, _classCallCheck3.default)(this, AuthDialog);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AuthDialog).call(this, props));
	
			_this.state = { activeTab: 0 };
			return _this;
		}
	
		(0, _createClass3.default)(AuthDialog, [{
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				_picolog2.default.log('render', this.props);
				var _props = this.props;
				var className = _props.className;
				var defaultClass = _props.defaultClass;
				var challenged = _props.challenged;
				var onCancel = _props.onCancel;
				var onLogin = _props.onLogin;
				var onRegister = _props.onRegister;
				var loginDialog = _props.loginDialog;
				var registerDialog = _props.registerDialog;
				var props = (0, _objectWithoutProperties3.default)(_props, ['className', 'defaultClass', 'challenged', 'onCancel', 'onLogin', 'onRegister', 'loginDialog', 'registerDialog']);
	
				var classes = (0, _classnames2.default)(className, defaultClass);
				return _react2.default.createElement(
					_mdlExtras.Dialog,
					(0, _extends3.default)({ modal: true, className: classes, open: challenged, onCancel: onCancel }, props),
					_react2.default.createElement(
						_reactMdl.Tabs,
						{ activeTab: this.state.activeTab,
							onChange: function onChange(activeTab) {
								_this2.setState((0, _extends3.default)({}, _this2.state, { activeTab: activeTab }));
							}, ripple: true },
						_react2.default.createElement(
							_reactMdl.Tab,
							null,
							'  Login  '
						),
						_react2.default.createElement(
							_reactMdl.Tab,
							null,
							'Register'
						)
					),
					!this.state.activeTab ? _react2.default.createElement(
						_reactMdl.DialogContent,
						null,
						_react2.default.createElement(
							'p',
							null,
							_react2.default.createElement(
								'b',
								null,
								'Login'
							),
							' or ',
							_react2.default.createElement(
								'a',
								{ href: '#', onClick: function onClick() {
										return _this2.setState((0, _extends3.default)({}, _this2.state, { activeTab: 1 }));
									} },
								'create an account'
							),
							'.'
						),
						_react2.default.createElement(
							'form',
							{ className: 'LoginForm' },
							_react2.default.createElement(_mdlExtras.Textfield, (0, _extends3.default)({ name: 'username', label: 'Username', floatingLabel: true }, loginDialog.username)),
							_react2.default.createElement(_mdlExtras.Textfield, (0, _extends3.default)({ name: 'password', label: 'Password', floatingLabel: true }, loginDialog.password))
						)
					) : _react2.default.createElement(
						_reactMdl.DialogContent,
						null,
						_react2.default.createElement(
							'p',
							null,
							_react2.default.createElement(
								'b',
								null,
								'Create an account'
							),
							' or ',
							_react2.default.createElement(
								'a',
								{ href: '#', onClick: function onClick() {
										return _this2.setState((0, _extends3.default)({}, _this2.state, { activeTab: 0 }));
									} },
								'Login'
							),
							'.'
						),
						_react2.default.createElement(
							'form',
							{ className: 'RegistrationForm' },
							_react2.default.createElement(_mdlExtras.Textfield, (0, _extends3.default)({ name: 'username', label: 'Username', floatingLabel: true }, registerDialog.username)),
							_react2.default.createElement(_mdlExtras.Textfield, (0, _extends3.default)({ name: 'password', label: 'Password', floatingLabel: true }, registerDialog.password)),
							_react2.default.createElement(_mdlExtras.Textfield, (0, _extends3.default)({ name: 'passwordConfirm', label: 'Password (confirm)', floatingLabel: true }, registerDialog.confirm))
						)
					),
					!this.state.activeTab ? _react2.default.createElement(
						_reactMdl.DialogActions,
						null,
						_react2.default.createElement(
							_reactMdl.Button,
							{ raised: true, colored: true, onClick: onLogin },
							'   Login   '
						),
						_react2.default.createElement(
							_reactMdl.Button,
							{ onClick: onCancel },
							'Cancel'
						)
					) : _react2.default.createElement(
						_reactMdl.DialogActions,
						null,
						_react2.default.createElement(
							_reactMdl.Button,
							{ raised: true, colored: true, onClick: onRegister },
							'Register'
						),
						_react2.default.createElement(
							_reactMdl.Button,
							{ onClick: onCancel },
							'Cancel'
						)
					)
				);
			}
		}]);
		return AuthDialog;
	}(_react.Component), _class.propTypes = {
		defaultClass: string.isRequired,
		className: string,
		challenged: bool,
		loginDialog: object,
		registerDialog: object
	}, _class.defaultProps = {
		defaultClass: 'AuthDialog'
	}, _temp);
	exports.default = AuthDialog;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Credential = undefined;
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Credential = exports.Credential = function Credential(id) {
		(0, _classCallCheck3.default)(this, Credential);
	
		this.id = id;
	};
	
	exports.default = Credential;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Group = undefined;
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _class;
	
	var _Entity = __webpack_require__(16);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Group = exports.Group = (0, _Entity2.default)(_class = function Group(id, name) {
		(0, _classCallCheck3.default)(this, Group);
	
		this.id = id;
		this.name = name;
	}) || _class;
	
	exports.default = Group;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Role = undefined;
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _class;
	
	var _Entity = __webpack_require__(16);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _suid = __webpack_require__(18);
	
	var _suid2 = _interopRequireDefault(_suid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Role = exports.Role = (0, _Entity2.default)(_class = function Role(id, name) {
		(0, _classCallCheck3.default)(this, Role);
	
		this.id = new _suid2.default(id);
		this.name = name;
	}) || _class;
	
	Role.GUEST = new Role(1, 'Guest');
	Role.USER = new Role(2, 'User');
	Role.STORE_USER = new Role(3, 'Store-User');
	Role.STORE_MANAGER = new Role(4, 'Store-Manager');
	Role.BRAND_USER = new Role(5, 'Brand-User');
	Role.BRAND_MANAGER = new Role(6, 'Brand-Manager');
	Role.BRAUTSCHLOSS_USER = new Role(7, 'Brautschloss-User');
	Role.BRAUTSCHLOSS_MANAGER = new Role(8, 'Brautschloss-Manager');
	Role.ADMINISTRATOR = new Role(9, 'Administrator');
	exports.default = Role;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Auth = exports.RegisterDialogApi = exports.LoginDialogApi = undefined;
	
	var _typeof2 = __webpack_require__(11);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _stringify = __webpack_require__(63);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _promise = __webpack_require__(24);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _class2, _temp;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(10);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	var _reduxAsyncApi = __webpack_require__(32);
	
	var _reduxAsyncApi2 = _interopRequireDefault(_reduxAsyncApi);
	
	var _reduxFetchApi = __webpack_require__(14);
	
	var _api = __webpack_require__(27);
	
	var _Entity = __webpack_require__(16);
	
	var _suid = __webpack_require__(18);
	
	var _suid2 = _interopRequireDefault(_suid);
	
	var _PasswordCredential = __webpack_require__(25);
	
	var _PasswordCredential2 = _interopRequireDefault(_PasswordCredential);
	
	var _Account = __webpack_require__(35);
	
	var _Account2 = _interopRequireDefault(_Account);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LoginDialogApi = exports.LoginDialogApi = function (_Api) {
		(0, _inherits3.default)(LoginDialogApi, _Api);
	
		function LoginDialogApi() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, LoginDialogApi);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(LoginDialogApi)).call.apply(_Object$getPrototypeO, [this].concat(args)));
	
			_this.username = (0, _reduxApis.link)(_this, new _api.TextfieldApi());
			_this.username.type = 'text';
			//		this.username.pattern = '\s*\S.{1,}\S\s*';
			_this.password = (0, _reduxApis.link)(_this, new _api.TextfieldApi());
			_this.password.type = 'password';
			//		this.password.pattern = '\s*\S.{5,}\S\s*';
			return _this;
		}
	
		return LoginDialogApi;
	}(_reduxApis2.default);
	
	var RegisterDialogApi = exports.RegisterDialogApi = function (_Api2) {
		(0, _inherits3.default)(RegisterDialogApi, _Api2);
	
		function RegisterDialogApi() {
			var _Object$getPrototypeO2;
	
			(0, _classCallCheck3.default)(this, RegisterDialogApi);
	
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}
	
			var _this2 = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO2 = (0, _getPrototypeOf2.default)(RegisterDialogApi)).call.apply(_Object$getPrototypeO2, [this].concat(args)));
	
			_this2.username = (0, _reduxApis.link)(_this2, new _api.TextfieldApi());
			_this2.username.type = 'text';
			//		this.username.pattern = '\s*\S.{1,}\S\s*';
			_this2.password = (0, _reduxApis.link)(_this2, new _api.TextfieldApi());
			_this2.password.type = 'password';
			//		this.password.pattern = '\s*\S.{5,}\S\s*';
			_this2.confirm = (0, _reduxApis.link)(_this2, new _api.TextfieldApi());
			_this2.confirm.type = 'password';
			//		this.confirm.pattern = '\s*\S.{5,}\S\s*';
			return _this2;
		}
	
		return RegisterDialogApi;
	}(_reduxApis2.default);
	
	var Auth = exports.Auth = (0, _reduxFetchApi.remote)(_class = (_temp = _class2 = function (_Async) {
		(0, _inherits3.default)(Auth, _Async);
	
		function Auth() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? Auth.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, Auth);
	
			var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Auth).call(this, state));
	
			_this3.setHandler(Auth.CHALLENGE, function (state, _ref) {
				var payload = _ref.payload;
				return (0, _extends3.default)({}, state, { challenge: payload });
			});
			_this3.setHandler(Auth.LOGGED_IN, function (state, _ref2) {
				var payload = _ref2.payload;
				return (0, _extends3.default)({}, state, { user: payload, challenge: null });
			});
			_this3.setHandler(Auth.LOGGED_OUT, function (state, action) {
				return (0, _extends3.default)({}, state, { user: null, challenge: null });
			});
			_this3.setHandler(Auth.CANCEL, function (state, action) {
				return (0, _extends3.default)({}, state, { challenge: null });
			});
			Object.defineProperty(_this3, 'loggedIn', { enumerable: true, get: function get() {
					return !!_this3.user;
				} });
			Object.defineProperty(_this3, 'challenged', { enumerable: true, get: function get() {
					return !!(_this3.challenge() && _this3.challenge().url && !_this3.challenge().accepted);
				} });
			Object.defineProperty(_this3, 'user', { enumerable: true, get: function get() {
					return _this3.getState().user;
				} });
			Object.defineProperty(_this3, 'onProvoke', { enumerable: true, value: function value() {
					return _this3.provoke();
				} });
			Object.defineProperty(_this3, 'onCancel', { enumerable: true, value: function value() {
					return _this3.cancel();
				} });
			Object.defineProperty(_this3, 'onLogin', { enumerable: true, value: function value() {
					return _this3.login();
				} });
			Object.defineProperty(_this3, 'onLogout', { enumerable: true, value: function value() {
					return _this3.logout();
				} });
			Object.defineProperty(_this3, 'onRegister', { enumerable: true, value: function value() {
					return _this3.register();
				} });
			_this3.loginDialog = (0, _reduxApis.link)(_this3, new LoginDialogApi());
			_this3.registerDialog = (0, _reduxApis.link)(_this3, new RegisterDialogApi());
			return _this3;
		}
	
		(0, _createClass3.default)(Auth, [{
			key: 'loadUser',
			value: function loadUser() {
				var _this4 = this;
	
				_picolog2.default.log('loadUser()');
				this.setBusy();
				return fetchUser(this).catch().then(function (user) {
					_this4.setDone();
					return user;
				});
			}
		}, {
			key: 'login',
			value: function login(username, password) {
				var _this5 = this;
	
				if (username === undefined) {
					return this.login(this.loginDialog.username.value, this.loginDialog.password.value);
				}
	
				function remoteLogin(auth, challenge) {
					_picolog2.default.debug('remoteLogin', auth, challenge);
					return auth.fetch(challenge.url, {
						method: challenge.method,
						headers: {
							'Content-Type': challenge.contentType
						},
						body: encode(challenge, username, password)
					}).then(function (response) {
						_picolog2.default.debug('remoteLogin => ', response);
						return fetchUser(auth).then(function () {
							auth.setDone();
							challenge.resolve(response);
						});
					}).catch(function (error) {
						auth.setError(error);
						challenge.reject(error);
					});
				}
	
				if (this.loggedIn) {
					_picolog2.default.log('Already logged in as `' + this.user.name + '`: ', this.user);
					return;
				}
	
				this.setBusy();
				return this.dispatch(function () {
					return new _promise2.default(function (resolve, reject) {
						if (!_this5.challenge()) {
							_picolog2.default.debug('Provoking login challenge');
							return _this5.provoke().then(function (challenge) {
								return challenge.accepted = true;
							}).then(function () {
								_picolog2.default.debug('Server issued a login challenge');
								return remoteLogin(_this5, _this5.challenge()).then(resolve).catch(reject);
							});
						}
						return remoteLogin(_this5, _this5.challenge()).then(resolve).catch(reject);
					}).then(function (results) {
						_picolog2.default.info('Login', _this5.user);return results;
					});
					_picolog2.default.debug('Posting credentials to ', challenge.url);
				});
			}
		}, {
			key: 'logout',
			value: function logout() {
				var _this6 = this;
	
				_picolog2.default.info('logout', this.user);
				return this.dispatch(function () {
					_this6.setBusy();
					_this6.cancel();
					return _this6.fetch('/logout').catch().then(function () {
						_this6.setDone();
						_this6.dispatch(_this6.createAction(Auth.LOGGED_OUT)());
					});
				});
			}
		}, {
			key: 'register',
			value: function register(username, password, confirm) {
				var _this7 = this;
	
				if (username === undefined) {
					return this.register(this.registerDialog.username.value, this.registerDialog.password.value, this.registerDialog.confirm.value);
				}
	
				_picolog2.default.log('register', username, password, confirm);
				this.setBusy();
				return this.dispatch(function () {
					return new _promise2.default(function (resolve, reject) {
						var account = new _Account2.default(_suid2.default.next(), username, [new _PasswordCredential2.default(_suid2.default.next(), password)]);
	
						_picolog2.default.log('register: creating account', account);
						return _this7.fetch('/accounts', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: (0, _stringify2.default)(account)
						}).then(function (response) {
							return response.text();
						}).then(function (text) {
							return (0, _Entity.fromJSON)(text);
						}).then(function (account) {
							_picolog2.default.log('register: created account', account);
							_this7.login(username, password).then(function (result) {
								_this7.setDone();
								resolve(result);
							}).catch(function (error) {
								_this7.setError(error);
							});
						}).catch(function (error) {
							_this7.setError(error);
						});
					}).catch(function (error) {
						_this7.setError(error);
					});
				});
			}
		}, {
			key: 'cancel',
			value: function cancel() {
				var _this8 = this;
	
				_picolog2.default.debug('cancel');
				return this.dispatch(function () {
					if (_this8.challenge()) {
						var _challenge2 = _this8.challenge();
	
						var reject = _challenge2.reject;
	
						var _error = Error('Login/registration cancelled');
						_this8.setError(_error);
						_this8.dispatch(_this8.createAction(Auth.CANCEL)());
						if (reject) {
							reject(_error);
						}
					}
				});
			}
		}, {
			key: 'provoke',
			value: function provoke() {
				var _this9 = this;
	
				// provoke a login challenge, async
				// provoke a challenge by fetching url
				_picolog2.default.debug('Provoking a login challenge by fetching protected resource.');
				return this.dispatch(function () {
					return new _promise2.default(function (accept, deny) {
						// set up intermediate challenge to make accept and deny survive the round-trip
						_this9.challenge({}, accept, deny);
						// this fetch will result in 401 and be intercepted, after which
						// challenge will be called again with the actual server challenge
						_this9.fetch('/challenge').catch(function (error) {
							return _picolog2.default.log('Provoking login challenge failed.', error);
						}).catch(deny);
					});
				});
			}
		}, {
			key: 'challenge',
			value: function (_challenge) {
				function challenge(_x, _x2, _x3) {
					return _challenge.apply(this, arguments);
				}
	
				challenge.toString = function () {
					return _challenge.toString();
				};
	
				return challenge;
			}(function (challenge, resolve, reject) {
				_picolog2.default.debug('challenge', challenge, resolve, reject);
				// paramless invocation is sync
				if (!challenge) {
					return this.getState().challenge;
				}
				// only accept challenges on the client side
				if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) != 'object') {
					reject(new Error('Unauthorized'));
				}
	
				// reject any old login challenge
				var c = this.getState().challenge;
				if (c && c.url) {
					c.reject(new Error("Login challenge cancelled"));
				}
	
				// dispatch the challenge
				challenge.resolve = resolve;
				challenge.reject = reject;
				_picolog2.default.debug('dispatching challenge', challenge);
				this.dispatch(this.createAction(Auth.CHALLENGE)(challenge));
	
				// If there is an old, forced challenge
				if (c && !c.url) {
					// save whether it was manually provoked
					challenge.provoked = c.provoked;
					// if new challenge is login challenge (does have url), forcing challenge is now resolved
					if (challenge.url) {
						c.resolve && c.resolve(challenge);
					}
				}
			})
		}]);
		return Auth;
	}(_reduxAsyncApi2.default), _class2.CHALLENGE = 'AUTH_CHALLENGE', _class2.LOGGED_IN = 'LOGGED_IN', _class2.LOGGED_OUT = 'LOGGED_OUT', _class2.CANCEL = 'CANCEL_AUTH', _class2.INITIAL_STATE = (0, _extends3.default)({}, _reduxAsyncApi2.default.INITIAL_STATE, {
		user: null,
		challenge: null
	}), _temp)) || _class;
	
	exports.default = Auth;
	
	function encode(challenge, username, password) {
		if (challenge.contentType === 'application/x-www-form-urlencoded') {
			return urlEncode(challenge, username, password);
		} else {
			error = Error('Unable to encode the given credentials. Unsupported content type \'' + challenge.contentType + '\'.');
		}
	}
	
	function fetchUser(auth) {
		_picolog2.default.debug('fetchUser');
		return auth.fetch('/logged-in-account').then(function (response) {
			_picolog2.default.log('fetchUser => response=', response);
			return response.status == 200 && response.json();
		}).then(function (user) {
			_picolog2.default.debug('fetchUser => user=', user);
			if (user && !auth.loggedIn) {
				_picolog2.default.debug('Dispatching LOGGED_IN action', user);
				auth.dispatch(auth.createAction(Auth.LOGGED_IN)(user));
			} else if (!user && auth.loggedIn) {
				_picolog2.default.debug('Dispatching LOGGED_OUT action');
				auth.dispatch(auth.createAction(Auth.LOGGED_OUT)());
			}
			return user;
		}).catch(function (error) {
			return _picolog2.default.error('fetchUser aborted due to error.', error);
		});
	}
	
	function urlEncode(challenge, username, password) {
		var uf = encodeURIComponent(challenge.usernameField);
		var u = encodeURIComponent(username);
		var pf = encodeURIComponent(challenge.passwordField);
		var p = encodeURIComponent(password);
		return uf + '=' + u + '&' + pf + '=' + p;
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _dec, _dec2, _class, _class2, _temp;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(19);
	
	var _reduxLoadApi = __webpack_require__(20);
	
	var _api = __webpack_require__(15);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _Scroller = __webpack_require__(22);
	
	var _Scroller2 = _interopRequireDefault(_Scroller);
	
	var _Card = __webpack_require__(26);
	
	var _Card2 = _interopRequireDefault(_Card);
	
	var _BrandCard = __webpack_require__(42);
	
	var _BrandCard2 = _interopRequireDefault(_BrandCard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bool = _react.PropTypes.bool;
	var object = _react.PropTypes.object;
	var array = _react.PropTypes.array;
	var any = _react.PropTypes.any;
	
	function load(filter) {
		filter && _api2.default.brands.search.setFilter(filter);
		return _api2.default.brands.search.search().catch(function (error) {
			_picolog2.default.error('Searching stores failed.', error);
		});
	}
	
	var BrandBrowser = (_dec = (0, _reduxLoadApi.onload)(function (params) {
		return load(params);
	}), _dec2 = (0, _reactRedux.connect)(function (state, props) {
		return (0, _extends3.default)({}, props, { lightbox: _api2.default.lightbox }, _api2.default.brands.search);
	}), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
		(0, _inherits3.default)(BrandBrowser, _React$Component);
	
		function BrandBrowser() {
			(0, _classCallCheck3.default)(this, BrandBrowser);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BrandBrowser).apply(this, arguments));
		}
	
		(0, _createClass3.default)(BrandBrowser, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				_picolog2.default.log('componentDidMount()');
				var _props = this.props;
				var pending = _props.pending;
				var error = _props.error;
				var params = _props.params;
	
				if (pending || error) {
					load(params);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _props2 = this.props;
				var results = _props2.results;
				var lightbox = _props2.lightbox;
	
				return _react2.default.createElement(_Scroller2.default, {
					className: 'BrandBrowser ',
					bufferBefore: 2,
					items: results,
					bufferAfter: 4,
					renderItem: function renderItem(item, idx) {
						return _react2.default.createElement(_BrandCard2.default, (0, _extends3.default)({ brand: item }, lightbox));
					}
				});
			}
		}]);
		return BrandBrowser;
	}(_react2.default.Component), _class2.propTypes = {
		params: object.isRequired,
		lightbox: object.isRequired,
		filter: object.isRequired,
		results: array.isRequired,
		pending: bool,
		error: any
	}, _temp)) || _class) || _class);
	exports.default = BrandBrowser;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BrandCard = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(12);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactMdl = __webpack_require__(13);
	
	var _mdlExtras = __webpack_require__(17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var any = _react.PropTypes.any;
	var bool = _react.PropTypes.bool;
	var string = _react.PropTypes.string;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var shape = _react.PropTypes.shape;
	var BrandCard = exports.BrandCard = (_temp = _class = function (_Component) {
		(0, _inherits3.default)(BrandCard, _Component);
	
		function BrandCard() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, BrandCard);
	
			for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
				props[_key] = arguments[_key];
			}
	
			return (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(BrandCard)).call.apply(_Object$getPrototypeO, [this].concat(props)));
		}
	
		(0, _createClass3.default)(BrandCard, [{
			key: 'thumbnailClicked',
			value: function thumbnailClicked(images, index, event) {
				var onOpenLightbox = this.props.onOpenLightbox;
	
				if (onOpenLightbox) {
					onOpenLightbox(images, index, event);
				}
				if (event) {
					event.preventDefault();event.stopPropagation();
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				var _props$brand = this.props.brand;
				var id = _props$brand.id;
				var name = _props$brand.name;
	
				var img = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
				var prdUrl = 'https://cdn.rawgit.com/Download/bridalapp-static/1.0.0/products/' + id + '/Brand';
				var brandUrl = 'https://cdn.rawgit.com/Download/bridalapp-static/1.0.0/brands/' + id + '/logo-brand-name.png';
				var thumbs = prdUrl + '/thumbs.jpg';
				var thumbnail = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
				var images = [{ src: prdUrl + '/back-large.jpg', className: 'back' }, { src: prdUrl + '/front-large.jpg', className: 'front' }, { src: prdUrl + '/detail-1-large.jpg', className: 'detail-1' }, { src: prdUrl + '/detail-2-large.jpg', className: 'detail-2' }, { src: prdUrl + '/detail-3-large.jpg', className: 'detail-3' }];
	
				return _react2.default.createElement(
					_mdlExtras.StatefulFlipCard,
					{ className: 'Product', key: id },
					_react2.default.createElement(
						_mdlExtras.FrontFace,
						null,
						_react2.default.createElement(
							'div',
							{ className: 'content' },
							_react2.default.createElement('img', { className: 'ProductImage', src: img, style: { backgroundImage: 'url(' + thumbs + ')', height: '100%' } })
						)
					),
					_react2.default.createElement(
						_mdlExtras.BackFace,
						null,
						_react2.default.createElement(
							_reactMdl.CardTitle,
							null,
							_react2.default.createElement('img', { className: 'BrandLogo', src: brandUrl }),
							_react2.default.createElement(
								'h3',
								{ className: 'ProductName' },
								name
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'ProductGallery' },
							_react2.default.createElement(
								'div',
								{ className: 'thumbs' },
								images.map(function (_ref, i) {
									var src = _ref.src;
									var className = _ref.className;
									return _react2.default.createElement('img', { key: i, className: (0, _classnames2.default)(className, 'thumb'),
										src: thumbnail, onClick: _this2.thumbnailClicked.bind(_this2, images, i),
										style: { backgroundImage: 'url(' + thumbs + ')' }
									});
								})
							)
						)
					)
				);
			}
		}]);
		return BrandCard;
	}(_react.Component), _class.propTypes = {
		brand: shape({
			id: any,
			name: string
		}).isRequired,
		onOpenLightbox: func.isRequired
	}, _temp);
	exports.default = BrandCard;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Brands = function (_Component) {
		(0, _inherits3.default)(Brands, _Component);
	
		function Brands() {
			(0, _classCallCheck3.default)(this, Brands);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Brands).apply(this, arguments));
		}
	
		(0, _createClass3.default)(Brands, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var children = _props.children;
				var others = (0, _objectWithoutProperties3.default)(_props, ["children"]);
	
				return _react2.default.createElement(
					"div",
					(0, _extends3.default)({ className: "Brands" }, others),
					children
				);
			}
		}]);
		return Brands;
	}(_react.Component);

	exports.default = Brands;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BrandsApi = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(10);
	
	var _reduxFetchApi = __webpack_require__(14);
	
	var _api = __webpack_require__(23);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BrandsApi = exports.BrandsApi = (0, _reduxFetchApi.remote)(_class = function (_Api) {
		(0, _inherits3.default)(BrandsApi, _Api);
	
		function BrandsApi(state) {
			(0, _classCallCheck3.default)(this, BrandsApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BrandsApi).call(this, state));
	
			_this.search = (0, _reduxFetchApi.remote)('/search')((0, _reduxApis.link)(_this, new _api2.default()));
			return _this;
		}
	
		return BrandsApi;
	}(_reduxApis.Api)) || _class;
	
	exports.default = BrandsApi;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(7);
	
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Html = undefined;
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(31);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _serializeJavascript = __webpack_require__(78);
	
	var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);
	
	var _reactDocumentMeta = __webpack_require__(73);
	
	var _reactDocumentMeta2 = _interopRequireDefault(_reactDocumentMeta);
	
	var _reactRouter = __webpack_require__(21);
	
	var _reactRedux = __webpack_require__(19);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var string = _react.PropTypes.string;
	var object = _react.PropTypes.object;
	
	/**
	 * Wrapper component containing HTML metadata and boilerplate tags.
	 * Used in server-side code only to wrap the string output of the
	 * rendered route component.
	 *
	 * The only thing this component doesn't (and can't) include is the
	 * HTML doctype declaration, which is added to the rendered output
	 * by the server.jsx file.
	 */
	var Html = exports.Html = (_temp = _class = function (_Component) {
		(0, _inherits3.default)(Html, _Component);
	
		function Html() {
			(0, _classCallCheck3.default)(this, Html);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Html).apply(this, arguments));
		}
	
		(0, _createClass3.default)(Html, [{
			key: 'render',
			value: function render() {
				var _props = this.props;
				var store = _props.store;
				var lang = _props.lang;
				var version = _props.version;
				var apiUrl = _props.apiUrl;
				var renderProps = (0, _objectWithoutProperties3.default)(_props, ['store', 'lang', 'version', 'apiUrl']);
	
				var content = _server2.default.renderToString(_react2.default.createElement(
					_reactRedux.Provider,
					{ store: store },
					_react2.default.createElement(_reactRouter.RouterContext, renderProps)
				));
				var html = (apiUrl ? 'window.__bridalapp_api_server=\'' + apiUrl + '\';' : '') + ('window.__data=' + (0, _serializeJavascript2.default)(store.getState()) + ';');
	
				return _react2.default.createElement(
					'html',
					{ lang: this.props.lang },
					_react2.default.createElement(
						'head',
						null,
						_react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
						_reactDocumentMeta2.default.renderAsReact(),
						_react2.default.createElement('link', { rel: 'shortcut icon', href: '/favicon.ico' }),
						_react2.default.createElement('link', { rel: 'stylesheet', href: 'https://cdn.rawgit.com/tleunen/react-mdl/v1.4.0/extra/material.min.css' }),
						_react2.default.createElement('link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }),
						_react2.default.createElement('link', { rel: 'stylesheet', href: '/style.css?v' + version })
					),
					_react2.default.createElement(
						'body',
						null,
						_react2.default.createElement('div', { id: 'bridalapp', dangerouslySetInnerHTML: { __html: content } }),
						 true ? _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/fetch/0.11.0/fetch.min.js' }),
							_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react.min.js' }),
							_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.min.js' }),
							_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0-rc5/ReactRouter.min.js' }),
							_react2.default.createElement('script', { src: 'https://cdn.rawgit.com/tleunen/react-mdl/v1.4.2/extra/material.min.js' }),
							_react2.default.createElement('script', { src: 'https://npmcdn.com/react-mdl@1.4.2/out/ReactMDL.min.js' })
						) : _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/fetch/0.11.0/fetch.js' }),
							_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react.js' }),
							_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.js' }),
							_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0-rc5/ReactRouter.js' }),
							_react2.default.createElement('script', { src: 'https://cdn.rawgit.com/tleunen/react-mdl/v1.4.2/extra/material.min.js' }),
							_react2.default.createElement('script', { src: 'https://npmcdn.com/react-mdl@1.4.2/out/ReactMDL.min.js' })
						),
						_react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: html }, charSet: 'UTF-8' }),
						this.props.children,
						_react2.default.createElement('script', { src: '/assets/bridalapp-ui.js?v' + version, charSet: 'UTF-8' })
					)
				);
			}
		}]);
		return Html;
	}(_react.Component), _class.propTypes = {
		store: object.isRequired,
		lang: string,
		version: string,
		apiUrl: string
	}, _class.defaultProps = {
		lang: 'en-US',
		version: '1.0.0',
		apiUrl: ''
	}, _temp);
	exports.default = Html;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _dec, _dec2, _class, _class2, _temp;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(19);
	
	var _reduxLoadApi = __webpack_require__(20);
	
	var _api = __webpack_require__(15);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _Scroller = __webpack_require__(22);
	
	var _Scroller2 = _interopRequireDefault(_Scroller);
	
	var _ProductCard = __webpack_require__(48);
	
	var _ProductCard2 = _interopRequireDefault(_ProductCard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bool = _react.PropTypes.bool;
	var array = _react.PropTypes.array;
	var object = _react.PropTypes.object;
	var any = _react.PropTypes.any;
	
	function load(params) {
		_picolog2.default.log('load', params);
		var category = params.category;
	
		if (category) {
			_api2.default.products.search.setFilter((0, _extends3.default)({}, _api2.default.products.search.filter, { category: category }));
		}
		return _api2.default.products.search.search().catch(function (error) {
			_picolog2.default.error('Searching products failed:', error);
		});
	}
	
	var ProductBrowser = (_dec = (0, _reduxLoadApi.onload)(function (params) {
		return load(params);
	}), _dec2 = (0, _reactRedux.connect)(function (state, props) {
		return (0, _extends3.default)({}, props, { lightbox: _api2.default.lightbox }, _api2.default.products.search);
	}), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
		(0, _inherits3.default)(ProductBrowser, _React$Component);
	
		function ProductBrowser() {
			(0, _classCallCheck3.default)(this, ProductBrowser);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProductBrowser).apply(this, arguments));
		}
	
		(0, _createClass3.default)(ProductBrowser, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				_picolog2.default.debug('componentDidMount()');
				var _props = this.props;
				var pending = _props.pending;
				var error = _props.error;
				var params = _props.params;
	
				if (pending || error) {
					load(params);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				_picolog2.default.debug('render', this.props);
				var _props2 = this.props;
				var lightbox = _props2.lightbox;
				var filter = _props2.filter;
				var results = _props2.results;
	
				return _react2.default.createElement(_Scroller2.default, {
					className: 'ProductBrowser ' + filter.category,
					bufferBefore: 8,
					items: results,
					itemSize: 580,
					bufferAfter: 12,
					renderItem: function renderItem(item, idx) {
						return _react2.default.createElement(_ProductCard2.default, (0, _extends3.default)({ product: item }, lightbox));
					}
				});
			}
		}]);
		return ProductBrowser;
	}(_react2.default.Component), _class2.propTypes = {
		params: object.isRequired,
		lightbox: object.isRequired,
		filter: object.isRequired,
		results: array.isRequired,
		pending: bool,
		error: any
	}, _temp)) || _class) || _class);
	exports.default = ProductBrowser;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ProductCard = undefined;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _typeof2 = __webpack_require__(11);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(12);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactMdl = __webpack_require__(13);
	
	var _mdlExtras = __webpack_require__(17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var any = _react.PropTypes.any;
	var bool = _react.PropTypes.bool;
	var string = _react.PropTypes.string;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var shape = _react.PropTypes.shape;
	var ProductCard = exports.ProductCard = (_temp = _class = function (_Component) {
		(0, _inherits3.default)(ProductCard, _Component);
	
		function ProductCard() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, ProductCard);
	
			for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
				props[_key] = arguments[_key];
			}
	
			return (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(ProductCard)).call.apply(_Object$getPrototypeO, [this].concat(props)));
		}
	
		(0, _createClass3.default)(ProductCard, [{
			key: 'thumbnailClicked',
			value: function thumbnailClicked(images, index, event) {
				var onOpenLightbox = this.props.onOpenLightbox;
	
				if (onOpenLightbox) {
					onOpenLightbox(images, index, event);
				}
				if (event) {
					event.preventDefault();event.stopPropagation();
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				var _props$product = this.props.product;
				var id = _props$product.id;
				var brandId = _props$product.brandId;
				var name = _props$product.name;
				var description = _props$product.description;
				var flipCard = this.refs.flipCard;
	
				var img = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
				var prdUrl = 'https://cdn.rawgit.com/Download/bridalapp-static/1.0.0/products/' + brandId + '/' + encodeURIComponent(name);
				var brandUrl = 'https://cdn.rawgit.com/Download/bridalapp-static/1.0.0/brands/' + brandId + '/logo-brand-name.png';
				var thumbs = prdUrl + '/thumbs.jpg';
				var thumbnail = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
				var size = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object' && window.innerWidth < 480 ? { width: '100%' } : { height: '100%' };
				var images = [{ src: prdUrl + '/back-large.jpg', className: 'back', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '300%', backgroundPosition: '100% 0' }) } }, { src: prdUrl + '/front-large.jpg', className: 'front', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '150%', backgroundPosition: '0 0' }) } }, { src: prdUrl + '/detail-1-large.jpg', className: 'detail-1', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '600%', backgroundPosition: '200% 200%' }) } }, { src: prdUrl + '/detail-2-large.jpg', className: 'detail-2', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '600%', backgroundPosition: '100% 200%' }) } }, { src: prdUrl + '/detail-3-large.jpg', className: 'detail-3', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '600%', backgroundPosition: '200% 100%' }) } }];
	
				return _react2.default.createElement(
					_mdlExtras.StatefulFlipCard,
					{ className: 'Product', key: id },
					_react2.default.createElement(
						_mdlExtras.FrontFace,
						null,
						_react2.default.createElement(
							'div',
							{ className: 'content' },
							_react2.default.createElement('img', { className: 'ProductImage', src: img, style: { backgroundImage: 'url(' + thumbs + ')', height: '100%' } })
						)
					),
					_react2.default.createElement(
						_mdlExtras.BackFace,
						null,
						_react2.default.createElement(
							_reactMdl.CardTitle,
							null,
							_react2.default.createElement('img', { className: 'BrandLogo', src: brandUrl }),
							_react2.default.createElement(
								'h3',
								{ className: 'ProductName' },
								name || 'Loading...'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'ProductGallery' },
							_react2.default.createElement(
								'div',
								{ className: 'thumbs' },
								images.map(function (_ref, i) {
									var src = _ref.src;
									var className = _ref.className;
									return _react2.default.createElement('img', { key: i, className: (0, _classnames2.default)(className, 'thumb'),
										src: thumbnail, onClick: _this2.thumbnailClicked.bind(_this2, images, i),
										style: { backgroundImage: 'url(' + thumbs + ')' }
									});
								})
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'ProductDescription' },
							description || ''
						)
					)
				);
			}
		}]);
		return ProductCard;
	}(_react.Component), _class.propTypes = {
		product: shape({
			id: any,
			brandId: any,
			name: string,
			description: string
		}).isRequired,
		onOpenLightbox: func.isRequired
	}, _temp);
	exports.default = ProductCard;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ProductDetails = function (_React$Component) {
		(0, _inherits3.default)(ProductDetails, _React$Component);
	
		function ProductDetails() {
			(0, _classCallCheck3.default)(this, ProductDetails);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProductDetails).apply(this, arguments));
		}
	
		(0, _createClass3.default)(ProductDetails, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					{ className: "ProductDetails" },
					this.props.children
				);
			}
		}]);
		return ProductDetails;
	}(_react2.default.Component);
	
	exports.default = ProductDetails;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ProductEdit = function (_React$Component) {
		(0, _inherits3.default)(ProductEdit, _React$Component);
	
		function ProductEdit() {
			(0, _classCallCheck3.default)(this, ProductEdit);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProductEdit).apply(this, arguments));
		}
	
		(0, _createClass3.default)(ProductEdit, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'ProductEdit', style: { height: '100%', width: '100%', boxSizing: 'border-box' } },
					this.props.children
				);
			}
		}]);
		return ProductEdit;
	}(_react2.default.Component);
	
	exports.default = ProductEdit;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Products = function (_Component) {
		(0, _inherits3.default)(Products, _Component);
	
		function Products() {
			(0, _classCallCheck3.default)(this, Products);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Products).apply(this, arguments));
		}
	
		(0, _createClass3.default)(Products, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var children = _props.children;
				var others = (0, _objectWithoutProperties3.default)(_props, ["children"]);
	
				return _react2.default.createElement(
					"div",
					(0, _extends3.default)({ className: "Products" }, others),
					children
				);
			}
		}]);
		return Products;
	}(_react.Component);

	exports.default = Products;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ProductsApi = exports.ProductSearch = undefined;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _get2 = __webpack_require__(65);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class;
	
	var _reduxApis = __webpack_require__(10);
	
	var _reduxFetchApi = __webpack_require__(14);
	
	var _api = __webpack_require__(23);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ProductSearch = exports.ProductSearch = function (_SearchApi) {
		(0, _inherits3.default)(ProductSearch, _SearchApi);
	
		function ProductSearch() {
			(0, _classCallCheck3.default)(this, ProductSearch);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProductSearch).apply(this, arguments));
		}
	
		(0, _createClass3.default)(ProductSearch, [{
			key: 'url',
			value: function url(filter) {
				var clone = (0, _extends3.default)({}, filter);
				var result = filter.category ? '/' + filter.category : '';
				delete clone.category;
				return result + (0, _get3.default)((0, _getPrototypeOf2.default)(ProductSearch.prototype), 'url', this).call(this, clone);
			}
		}]);
		return ProductSearch;
	}(_api2.default);
	
	var ProductsApi = exports.ProductsApi = (0, _reduxFetchApi.remote)(_class = function (_Api) {
		(0, _inherits3.default)(ProductsApi, _Api);
	
		function ProductsApi(state) {
			(0, _classCallCheck3.default)(this, ProductsApi);
	
			var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProductsApi).call(this, state));
	
			_this2.search = (0, _reduxFetchApi.remote)('/search')((0, _reduxApis.link)(_this2, new ProductSearch()));
			return _this2;
		}
	
		return ProductsApi;
	}(_reduxApis.Api)) || _class;
	
	exports.default = ProductsApi;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _dec2, _class, _class2, _temp;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(19);
	
	var _reduxLoadApi = __webpack_require__(20);
	
	var _api = __webpack_require__(15);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _Scroller = __webpack_require__(22);
	
	var _Scroller2 = _interopRequireDefault(_Scroller);
	
	var _Card = __webpack_require__(26);
	
	var _Card2 = _interopRequireDefault(_Card);
	
	var _StoreCard = __webpack_require__(54);
	
	var _StoreCard2 = _interopRequireDefault(_StoreCard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bool = _react.PropTypes.bool;
	var object = _react.PropTypes.object;
	var array = _react.PropTypes.array;
	var any = _react.PropTypes.any;
	
	function load(params) {
		_picolog2.default.log('StoreBrowser.load', params);
		return _api2.default.stores.search.search().catch(function (error) {
			_picolog2.default.error('Searching stores failed.', error);
		});
	}
	
	var StoreBrowser = (_dec = (0, _reduxLoadApi.onload)(load), _dec2 = (0, _reactRedux.connect)(_api2.default.stores.search.connector), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
		(0, _inherits3.default)(StoreBrowser, _React$Component);
	
		function StoreBrowser() {
			(0, _classCallCheck3.default)(this, StoreBrowser);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(StoreBrowser).apply(this, arguments));
		}
	
		(0, _createClass3.default)(StoreBrowser, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				_picolog2.default.debug('componentDidMount()');
				var _props = this.props;
				var pending = _props.pending;
				var error = _props.error;
				var params = _props.params;
	
				if (pending || error) {
					load(params);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				_picolog2.default.debug('render', this.props);
				var results = this.props.results;
	
				return _react2.default.createElement(_Scroller2.default, {
					className: 'StoreBrowser',
					bufferBefore: 4,
					items: results,
					bufferAfter: 8,
					renderItem: function renderItem(item, idx) {
						return _react2.default.createElement(_StoreCard2.default, { store: item });
					}
				});
			}
		}]);
		return StoreBrowser;
	}(_react2.default.Component), _class2.propTypes = {
		pending: bool,
		busy: bool,
		done: bool,
		error: any,
		filter: object.isRequired,
		results: array.isRequired
	}, _temp)) || _class) || _class);
	exports.default = StoreBrowser;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.StoreCard = undefined;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(12);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactMdl = __webpack_require__(13);
	
	var _mdlExtras = __webpack_require__(17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var any = _react.PropTypes.any;
	var bool = _react.PropTypes.bool;
	var string = _react.PropTypes.string;
	var object = _react.PropTypes.object;
	var shape = _react.PropTypes.shape;
	var StoreCard = exports.StoreCard = (_temp = _class = function (_Component) {
		(0, _inherits3.default)(StoreCard, _Component);
	
		function StoreCard() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, StoreCard);
	
			for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
				props[_key] = arguments[_key];
			}
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(StoreCard)).call.apply(_Object$getPrototypeO, [this].concat(props)));
	
			_this.state = { logoMissing: false, thumbMissing: false };
			return _this;
		}
	
		(0, _createClass3.default)(StoreCard, [{
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				var _props$store = this.props.store;
				var id = _props$store.id;
				var name = _props$store.name;
				var description = _props$store.description;
				var address1 = _props$store.address1;
				var address2 = _props$store.address2;
				var postalCode = _props$store.postalCode;
				var city = _props$store.city;
				var state = _props$store.state;
				var countryCode = _props$store.countryCode;
				var telephone = _props$store.telephone;
				var website = _props$store.website;
				var premium = _props$store.premium;
	
				var logo = 'https://cdn.rawgit.com/Download/bridalapp-static/1.0.0/stores/' + id + '/logo.png';
				var thumb = 'https://cdn.rawgit.com/Download/bridalapp-static/1.0.0/stores/' + id + '/thumb.jpg';
				var style = true ? {} : { '-webkit-filter': 'grayscale(1)', filter: 'grayscale(1)' };
				// src="data:image/gif;base64,R0lGODlhAwABAIAAAP///////yH5BAEKAAEALAAAAAADAAEAAAICjAsAOw=="
				return _react2.default.createElement(
					_mdlExtras.StatefulFlipCard,
					{ className: 'Store', key: id },
					_react2.default.createElement(
						_mdlExtras.FrontFace,
						null,
						_react2.default.createElement(
							_reactMdl.CardTitle,
							null,
							this.state.logoMissing ? _react2.default.createElement(
								'h3',
								{ className: 'StoreLogoAlt' },
								name
							) : _react2.default.createElement('img', { style: style, className: 'StoreLogo', src: logo,
								onError: function onError() {
									return _this2.setState((0, _extends3.default)({}, _this2.state, { logoMissing: true }));
								} })
						),
						_react2.default.createElement(
							'div',
							{ className: 'mdl-card__content' },
							!this.state.thumbMissing ? _react2.default.createElement('img', { style: style, className: 'StoreThumb', src: thumb,
								onError: function onError() {
									return _this2.setState((0, _extends3.default)({}, _this2.state, { thumbMissing: true }));
								} }) : _react2.default.createElement('div', { style: { height: 150 } }),
							_react2.default.createElement(
								_reactMdl.CardText,
								{ className: 'StoreDescription' },
								description
							)
						)
					),
					_react2.default.createElement(
						_mdlExtras.BackFace,
						null,
						_react2.default.createElement(
							_reactMdl.CardTitle,
							null,
							this.state.logoMissing ? _react2.default.createElement(
								'h3',
								{ className: 'StoreLogoAlt' },
								name
							) : _react2.default.createElement('img', { style: { filter: 'grayscale(1)' }, className: 'StoreLogo', src: logo, onError: function onError() {
									return _this2.setState((0, _extends3.default)({}, _this2.state, { logoMissing: true }));
								} })
						),
						_react2.default.createElement(
							'p',
							null,
							description
						),
						_react2.default.createElement(
							'address',
							null,
							address1,
							_react2.default.createElement('br', null),
							address2,
							_react2.default.createElement('br', null),
							city
						)
					)
				);
			}
		}]);
		return StoreCard;
	}(_react.Component), _class.propTypes = {
		store: shape({
			id: any,
			name: string,
			description: string,
			address1: string,
			address2: string,
			postalCode: string,
			city: string,
			state: string,
			countryCode: string,
			telephone: string,
			website: string,
			email: string,
			premium: bool.isRequired
		}).isRequired
	}, _temp);
	exports.default = StoreCard;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(9);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Stores = function (_Component) {
		(0, _inherits3.default)(Stores, _Component);
	
		function Stores() {
			(0, _classCallCheck3.default)(this, Stores);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Stores).apply(this, arguments));
		}
	
		(0, _createClass3.default)(Stores, [{
			key: "render",
			value: function render() {
				var _props = this.props;
				var children = _props.children;
				var others = (0, _objectWithoutProperties3.default)(_props, ["children"]);
	
				return _react2.default.createElement(
					"div",
					(0, _extends3.default)({ className: "Stores" }, others),
					children
				);
			}
		}]);
		return Stores;
	}(_react.Component);

	exports.default = Stores;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.StoresApi = undefined;
	
	var _getPrototypeOf = __webpack_require__(2);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(10);
	
	var _reduxFetchApi = __webpack_require__(14);
	
	var _api = __webpack_require__(23);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var StoresApi = exports.StoresApi = (0, _reduxFetchApi.remote)(_class = function (_Api) {
		(0, _inherits3.default)(StoresApi, _Api);
	
		function StoresApi(state) {
			(0, _classCallCheck3.default)(this, StoresApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(StoresApi).call(this, state));
	
			_this.search = (0, _reduxApis.link)(_this, new _api2.default());
			return _this;
		}
	
		return StoresApi;
	}(_reduxApis.Api)) || _class;
	
	exports.default = StoresApi;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.routes = undefined;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(21);
	
	var _App = __webpack_require__(34);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _Home = __webpack_require__(45);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _Products = __webpack_require__(51);
	
	var _Products2 = _interopRequireDefault(_Products);
	
	var _ProductBrowser = __webpack_require__(47);
	
	var _ProductBrowser2 = _interopRequireDefault(_ProductBrowser);
	
	var _ProductEdit = __webpack_require__(50);
	
	var _ProductEdit2 = _interopRequireDefault(_ProductEdit);
	
	var _ProductDetails = __webpack_require__(49);
	
	var _ProductDetails2 = _interopRequireDefault(_ProductDetails);
	
	var _Brands = __webpack_require__(43);
	
	var _Brands2 = _interopRequireDefault(_Brands);
	
	var _BrandBrowser = __webpack_require__(41);
	
	var _BrandBrowser2 = _interopRequireDefault(_BrandBrowser);
	
	var _Stores = __webpack_require__(55);
	
	var _Stores2 = _interopRequireDefault(_Stores);
	
	var _StoreBrowser = __webpack_require__(53);
	
	var _StoreBrowser2 = _interopRequireDefault(_StoreBrowser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var routes = exports.routes = _react2.default.createElement(
		_reactRouter.Route,
		{ path: '/', component: _App2.default },
		_react2.default.createElement(_reactRouter.IndexRedirect, { to: '/products/Wedding+Dresses' }),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: '/products', component: _Products2.default },
			_react2.default.createElement(_reactRouter.IndexRedirect, { to: '/products/Wedding+Dresses' }),
			_react2.default.createElement(_reactRouter.Route, { path: 'edit/:productId', component: _ProductEdit2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: 'details/:productId', component: _ProductDetails2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: 'details/:brandName/:productName', component: _ProductDetails2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: '/products/:category', component: _ProductBrowser2.default })
		),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: '/brands', component: _Brands2.default },
			_react2.default.createElement(_reactRouter.IndexRoute, { component: _BrandBrowser2.default })
		),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: '/stores', component: _Stores2.default },
			_react2.default.createElement(_reactRouter.IndexRoute, { component: _StoreBrowser2.default })
		)
	);
	
	exports.default = routes;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _chalk = __webpack_require__(66);
	
	var _chalk2 = _interopRequireDefault(_chalk);
	
	var _express = __webpack_require__(68);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(67);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _http = __webpack_require__(69);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _httpProxy = __webpack_require__(70);
	
	var _httpProxy2 = _interopRequireDefault(_httpProxy);
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(31);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _reactRouter = __webpack_require__(21);
	
	var _reduxLoadApi = __webpack_require__(20);
	
	var _config = __webpack_require__(33);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(61);
	global.fetch = __webpack_require__(71);
	
	var express = new _express2.default();
	var httpServer = new _http2.default.Server(express);
	
	var g = _chalk2.default.green,
	    gb = _chalk2.default.green.bold,
	    y = _chalk2.default.yellow,
	    yb = _chalk2.default.yellow.bold,
	    w = _chalk2.default.white,
	    wb = _chalk2.default.white.bold,
	    gr = _chalk2.default.grey,
	    grb = _chalk2.default.grey.bold,
	    r = _chalk2.default.red,
	    rb = _chalk2.default.red.bold;
	
	express.use((0, _compression2.default)());
	
	// if the server is started in hot mode, we include webpack-dev-middleware
	// and webpack-hot-middleware to serve a hot bundle to the client. In
	// production mode, we serve up a static pre-compiled client bundle
	if (false) {
		// use require because it will be optimized out if !module.hot
		var webpack = require('webpack');
		var devMiddleware = require('webpack-dev-middleware');
		var hotMiddleware = require('webpack-hot-middleware');
		var stats = { colors: true, chunks: false, hash: false, version: false };
		var clientCfg = require('../webpack/development.client.config');
		var clientCompiler = webpack(clientCfg);
		express.use(devMiddleware(clientCompiler, { stats: stats, publicPath: clientCfg.output.publicPath }));
		express.use(hotMiddleware(clientCompiler));
	} else {}
	
	// We point to our static assets
	express.use(_express2.default.static(_config2.default.publicPath));
	
	// polled by OpenShift haproxy load balancer to test server availability
	express.get('/status', function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
		res.end('<!DOCTYPE html>\n<html>\n<head>\n\t<title>Status</title>\n</head>\n<body>\n\t<h1 style="color:green">ONLINE</h1>\n\t<p>' + _config2.default.server.name + ' is ONLINE</p>\n</body>\n</html>');
	});
	
	express.get(/\/.*/, function (req, res) {
		// require again on each request, to enable hot-reload in development mode.
		// In production, this will just grab the module from require.cache.
		var store = __webpack_require__(59).createStore();
		var routes = __webpack_require__(57).routes;
		var Html = __webpack_require__(46).Html;
	
		(0, _reactRouter.match)({ routes: routes, location: req.originalUrl }, function (error, redirectLocation, renderProps) {
			if (redirectLocation) {
				res.redirect(redirectLocation.pathname + redirectLocation.search);
				res.end();
			} else if (error) {
				_picolog2.default.warn(rb('ROUTER ERROR:'), pretty.render(error));
				res.status(500);
				res.send('Server error.');
				res.end();
			} else if (!renderProps) {
				res.status(404);
				res.send('Not Found.');
				res.end();
			} else {
				_picolog2.default.debug(_chalk2.default.styles.gray.open, 'Rendering using props: ', renderProps, _chalk2.default.styles.gray.close);
	
				// pre-load onload actions
				var components = renderProps.routes.map(function (x) {
					return x.component;
				});
				_picolog2.default.log('########################### components: ', components);
				(0, _reduxLoadApi.load)(renderProps.routes.map(function (x) {
					return x.component;
				}), renderProps.params).then(function () {
					// do awesome stuff knowing all promises (if any) are resolved
					res.status(200);
					res.send('<!DOCTYPE html>\n' + _server2.default.renderToString(_react2.default.createElement(Html, (0, _extends3.default)({ store: store, apiUrl: _config2.default.apiServer.url, version: _config2.default.version }, renderProps))));
					res.end();
				}).catch(function (error) {
					_picolog2.default.error('Error loading data for route ', req.url, ': ', error, error.stack);
					res.status(500);
					res.send('Server error.');
					res.end();
				});
			}
		});
	});
	
	var server = httpServer.listen(_config2.default.server.port, _config2.default.server.host, function (error) {
		if (error) {
			throw error;
		}
		var addr = httpServer.address();
		_picolog2.default.warn();
		if (false) {
			_picolog2.default.warn(yb(' !  ') + g('Running in ') + gb('development') + g(' mode. ') + (module.hot ? yb('Hot Module Replacement') + g(' is enabled.') : ''));
		} else {
			_picolog2.default.warn(gb(' √  ') + g('Running in ') + gb('production') + g(' mode. ') + gb('gzip compression') + g(' is enabled.'));
		}
		_picolog2.default.warn(gb(' √  ') + g('Talking to ') + gb(_config2.default.apiServer.name) + g(' at ') + gb(_config2.default.apiServer.url));
		_picolog2.default.warn(gb(' √  ') + g('Listening for connections at ') + gb(_config2.default.server.protocol + addr.address + (addr.port == 80 ? '' : ':' + addr.port)));
		_picolog2.default.warn(gb(' √  %s started succesfully ') + g('on %s.'), _config2.default.server.name, Date(Date.now()));
		_picolog2.default.warn('');
	});
	
	var msg;
	var SIGNALS = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'];
	SIGNALS.forEach(function (signal) {
		process.on(signal, function () {
			_picolog2.default.warn(msg = rb(' ×  ') + g('Stopping ') + gb(_config2.default.server.name) + g(' after receiving ') + yb(signal) + g('.'));
			server.close();
			process.exit();
		});
	});
	process.on('uncaughtException', function (error) {
		_picolog2.default.warn(msg = rb(' ×  ') + g('Uncaught exception ') + yb(error) + g('.'));
	});
	process.on('exit', function () {
		_picolog2.default.warn(msg = gb(' √  ') + g('Stopped ') + gb(_config2.default.server.name) + g(' on ' + Date(Date.now()) + '.\r\n'));
	});
	
	if (false) {
		module.hot.accept('./store', function () {
			_picolog2.default.warn(yb('Hot reloading ') + g('\'./store\'...'));
		});
		module.hot.accept('./routes', function () {
			_picolog2.default.warn(yb('Hot reloading ') + g('\'./routes\'...'));
		});
		module.hot.accept('./components/Html/Html', function () {
			_picolog2.default.warn(yb('Hot reloading ') + g('\'./components/Html/Html\'...'));
		});
	
		/*  SHOULD BE POSSIBLE BUT CAN'T GET IT TO WORK RELIABLY
	 	// self-accept. This allows hot-reload of this very file. We cleanup in the
	 	// dispose handler and then the server will be restarted.
	 	module.hot.accept();
	 	// dispose handler
	     module.hot.dispose(function() {
	 		server.close(function(){
	 			log.warn(g('Closed HTTP server listening on port ') + g(cfg.server.port));
	 		});
	     });
	 */
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.store = undefined;
	
	var _typeof2 = __webpack_require__(11);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	exports.createStore = createStore;
	
	var _picolog = __webpack_require__(5);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _redux = __webpack_require__(74);
	
	var _reduxThunk = __webpack_require__(77);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reduxLogger = __webpack_require__(75);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	var _reduxResponsive = __webpack_require__(76);
	
	var _reduxApis = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = __webpack_require__(15).app;
	
	var data = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object' && window.__data || undefined;
	
	function createReducer() {
		return (0, _redux.combineReducers)({
			browser: (0, _reduxResponsive.createResponsiveStateReducer)({
				// Breakpoints for responsive layout. Chosen to group similar devices.
				// Note that these are *CSS pixels* we are talking about, not *physical pixels*.
				// Read more here: http://www.quirksmode.org/blog/archives/2010/04/a_pixel_is_not.html
				// E.G. the iPhone 4 screen has a resolution of 640x960 physical pixels, but only 320x480
				// CSS pixels; manufacturers choose a `devicePixelRatio` suitable for their device, because
				// if we render text at the normal size on these device's high DPI screens, it would become
				// illegibly small. As such, these numbers are unlikely to radically change, even if
				// physical resolutions keep improving, because they are more related to the dimensions of
				// the screen in centimeters than to the resolution in pixels.
				// SEE: http://www.mydevice.io/devices/
				// < 320: unsupported
				xxs: 320, // < 360: small phones, portrait (e.g. iPhone 4)
				xs: 360, // < 480: large phones/phablets, portrait (e.g. Samsung Galaxy S5, iPhone 6 Plus)
				sm: 480, // < 720: small tablets, portrait
				md: 720, // < 1025: large tablets, portrait
				lg: 1025, // < 1600: small monitor, landscape (cutoff at 1025 i.s.o 1024 to exclude tablets with 1024x1440 resolution)
				xl: 1600, // < 2560: HD monitor
				xxl: 2560 }),
			// Projection screens, VR devices?
			app: app.reducer
		});
	}
	
	var storeEnhancer = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object' ? (0, _redux.compose)(_reduxResponsive.responsiveStoreEnhancer, (0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reduxLogger2.default)({ logger: _picolog2.default }))) : (0, _redux.compose)(_reduxResponsive.responsiveStoreEnhancer, (0, _redux.applyMiddleware)(_reduxThunk2.default));
	
	function createStore() {
		var store = (0, _redux.createStore)(createReducer(), data, storeEnhancer);
		(0, _reduxApis.link)(store, app, (0, _reduxApis.namedLink)('app'));
		return store;
	}
	
	var store = exports.store = createStore();
	
	// link the store to the app
	
	if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object') {
		window.store = store;
		window.app = app;
	}
	exports.default = store;
	
	if (false) {
		module.hot.accept('./components/App/api', function () {
	
			var msg = 'Hot-reloading \'./components/App/api\'',
			    args = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object' ? ['%c' + msg, 'color:green'] : [msg];
			app = require('./components/App/api').app;
			store.replaceReducer(createReducer());
			(0, _reduxApis.link)(store, app, (0, _reduxApis.namedLink)('app'));
			if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object') {
				window.app = app;
			}
		});
	}

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = {
		"name": "bridalapp-ui",
		"version": "1.0.0",
		"description": "User Interface for BridalApp",
		"keywords": [
			"OpenShift",
			"Node.js",
			"BridalApp"
		],
		"main": "server.js",
		"babel": {
			"presets": [
				"es2015",
				"stage-0",
				"react"
			],
			"plugins": [
				"transform-decorators-legacy",
				"transform-class-properties"
			]
		},
		"homepage": "http://www.bridalapp.net/",
		"repository": {
			"type": "git",
			"url": "https://github.com/download/bridalapp-ui"
		},
		"scripts": {
			"clean-server": "rimraf hmr && rimraf server.js",
			"clean-client": "rimraf public/assets/bridalapp-ui.js",
			"clean": "npm run clean-server && npm run clean-client",
			"start": "node server.js",
			"start-dev": "just-wait -p \"server.js\" && npm run start",
			"build-server": "webpack --config webpack/server.config.js",
			"build-client": "webpack -p --config webpack/client.config.js",
			"build": "npm run build-server && npm run build-client",
			"release-server": "npm run clean-server && npm run build-server",
			"release-client": "npm run clean-client && npm run build-client",
			"release": "npm run clean && npm run build",
			"watch": "webpack --inline --watch --hide-modules --config webpack/development.server.config.js",
			"dev": "npm run -s clean && parallelshell \"npm run -s watch\" \"npm run -s start-dev\"",
			"test": "mocha --watch --require babel-register \"src/**/*.spec.jsx\"",
			"--test-dev": "webpack-dev-server --inline --hot --config webpack/test.config.js --port 8081",
			"test-dev": "webpack-dev-server --output-path test --output-filename bridalapp-ui.spec.js \"mocha!./bridalapp-ui.spec.jsx\" --content-base test --port 8888 --config webpack/test.config.js"
		},
		"engines": {
			"node": ">= 0.6.0",
			"npm": ">= 1.0.0"
		},
		"dependencies": {
			"babel": "^6.5.2",
			"babel-polyfill": "^6.3.14",
			"babel-preset-es2015": "^6.5.0",
			"babel-preset-react": "^6.5.0",
			"babel-preset-stage-0": "^6.5.0",
			"babel-runtime": "^6.3.19",
			"babylon": "^6.5.2",
			"chalk": "^1.1.1",
			"classnames": "^2.2.3",
			"compression": "^1.6.1",
			"express": "^4.0.0",
			"fs": "0.0.2",
			"http-proxy": "^1.12.0",
			"node-fetch": "^1.3.3",
			"picolog": "^1.0.3",
			"react": "^0.14.7",
			"react-document-meta": "^2.0.1",
			"react-dom": "^0.14.7",
			"react-mdl": "^1.4.0",
			"react-redux": "^4.0.6",
			"react-router": "^2.0.0",
			"redux": "^3.0.5",
			"redux-apis": "^1.1.1",
			"redux-async-api": "^2.0.0",
			"redux-fetch-api": "^1.0.0",
			"redux-load-api": "^1.0.0",
			"redux-logger": "^2.5.2",
			"redux-responsive": "^1.1.0",
			"redux-thunk": "^1.0.3",
			"serialize-javascript": "^1.1.2"
		},
		"devDependencies": {
			"app-root-path": "^1.0.0",
			"babel": "^6.5.2",
			"babel-core": "^6.4.0",
			"babel-loader": "^6.2.1",
			"babel-plugin-react-transform": "^2.0.0",
			"babel-plugin-transform-class-properties": "^6.4.0",
			"babel-plugin-transform-decorators-legacy": "^1.3.4",
			"babel-plugin-transform-runtime": "^6.4.0",
			"babel-preset-es2015": "^6.5.0",
			"babel-preset-react": "^6.3.13",
			"babel-preset-stage-0": "^6.3.13",
			"chai": "^3.4.1",
			"eventsource-polyfill": "^0.9.6",
			"json-loader": "^0.5.4",
			"just-wait": "^1.0.4",
			"mocha": "^2.3.4",
			"mocha-loader": "^0.7.1",
			"parallelshell": "^2.0.0",
			"picolog": "^1.0.0",
			"react-addons-test-utils": "^0.14.6",
			"react-mdl": "^1.0.4",
			"react-shallow-testutils": "^1.0.0",
			"react-transform-hmr": "^1.0.1",
			"rimraf": "^2.5.0",
			"source-map-support": "^0.4.0",
			"webpack": "^1.12.10",
			"webpack-dev-middleware": "^1.4.0",
			"webpack-dev-server": "^1.14.1",
			"webpack-hot-middleware": "^2.6.0"
		},
		"author": {
			"name": "Stijn de Witt",
			"email": "StijnDeWitt@hotmail.com",
			"url": "http://www.StijnDeWitt.com/"
		},
		"copyright": "2016 by Stijn de Witt, some rights reserved.",
		"license": "CC-BY-4.0",
		"licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/create");

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/get");

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = require("chalk");

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = require("http-proxy");

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = require("node-fetch");

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = require("react-document-meta");

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = require("redux-logger");

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = require("redux-responsive");

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = require("serialize-javascript");

/***/ }
/******/ ])));
//# sourceMappingURL=server.js.map