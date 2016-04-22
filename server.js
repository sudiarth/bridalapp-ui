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

	module.exports = __webpack_require__(67);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("picolog");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _promise = __webpack_require__(15);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _typeof2 = __webpack_require__(16);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _stringify = __webpack_require__(44);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _keys = __webpack_require__(24);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _create = __webpack_require__(70);
	
	var _create2 = _interopRequireDefault(_create);
	
	exports.Entity = Entity;
	exports.fromJSON = fromJSON;
	exports.toJSON = toJSON;
	exports.toError = toError;
	exports.equals = equals;
	exports.indexOf = indexOf;
	exports.clone = clone;
	exports.copy = copy;
	exports.revive = revive;
	exports.register = register;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Entity(target) {
		return register(target.name, target);
	}
	exports.default = Entity;
	function fromJSON(json) {
		if (typeof json == 'string') {
			var result = JSON.parse(json, revive);
			_picolog2.default.trace('fromJSON => ', result);
			return result;
		}
		_picolog2.default.debug('fromJSON', json, this);
		if (this) {
			var _result = (0, _create2.default)(this.prototype);
			var keys = (0, _keys2.default)(json);
			_picolog2.default.trace('fromJSON: keys=', keys);
			for (var i = 0, key; key = keys[i]; i++) {
				_result[key] = json[key];
			}
			_picolog2.default.trace('fromJSON => ', _result);
			return _result;
		}
		return fromJSON((0, _stringify2.default)(json));
	}
	
	function toJSON(entity) {
		// if toJSON is called with an entity object as argument, it returns the JSON for that entity
		if ((typeof entity === 'undefined' ? 'undefined' : (0, _typeof3.default)(entity)) == 'object') return (0, _stringify2.default)(entity);
		// otherwise, it creates a result object with an extra `type` field and `toJSON` method
		var result = (0, _extends3.default)({}, this, { type: this.constructor.name });
		Object.defineProperty(result, 'toJSON', { value: toJSON });
		return result;
	}
	
	function toError(response) {
		return (response ? response.text() : _promise2.default.resolve('unknown error')).then(function (text) {
			var error = Error(text);
			error.message = text;
			error.status = response && response.status || 500;
			error.statusText = response && response.statusText || text;
			error.toJSON = toJSON;
			throw error;
		});
	}
	
	function equals(one, other) {
		if (arguments.length === 1) {
			return equals(this, one);
		}
		return(
			// comparison of entity with itself
			one === other ||
			// comparison of entity with some id
			one && one.id === other || one && hasEquals(one.id) && one.id.equals(other) || other && other.id === one || other && hasEquals(other.id) && other.id.equals(one) ||
			// comparison of two entities of same type
			one && other && one.constructor === other.constructor && (one.id === other.id || hasEquals(one.id) && one.id.equals(other.id) || hasEquals(other.id) && other.id.equals(one.id))
		);
	}
	
	function indexOf(list, entity) {
		for (var i = 0; i < list.length; i++) {
			if (equals(list[i], entity)) {
				return i;
			}
		}
		return -1;
	}
	
	/**
	 * Creates a new object that has all of the properties of `entity`, including it's id.
	 * A clone is a different instance of *the same* entity. Any sub-entities will also be
	 * cloned, unless you set `shallow` to `true`.
	 */
	function clone(entity) {
		var shallow = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
		if (!entity) {
			entity = this;
		}
		var result = (0, _create2.default)(entity.constructor.prototype);
		var keys = (0, _keys2.default)(entity);
		for (var i = 0, key; key = keys[i]; i++) {
			var val = entity[key];
			result[key] = val && val.clone && !shallow ? val.clone() : val;
		}
		return result;
	}
	
	/**
	 * Creates a new object that has all of the properties of `entity`, except for it's id.
	 * A copy is a new instance of *a new* entity. The copy will not have any id set, allowing
	 * (requiring) you to set it yourself. By default, sub-entities will not be copied, unless
	 * you set `recurse` to `true`.
	 */
	function copy(entity) {
		var recurse = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
		if (!entity) {
			entity = this;
		}
		var result = (0, _create2.default)(entity.constructor.prototype);
		var keys = (0, _keys2.default)(entity).filter(function (val) {
			return val !== 'id';
		});
		for (var i = 0, key; key = keys[i]; i++) {
			var val = entity[key];
			result[key] = val && val.copy && recurse ? val.copy() : val;
		}
		return result;
	}
	
	function revive(key, value) {
		_picolog2.default.trace('revive', key, value);
		var t = value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) == 'object' && typeof value.type == 'string' && value.type;
		var type = t && registry[t];
		var result = type ? type.fromJSON(value) : _ws2.default.revive(function (k) {
			return idKey(k);
		})(key, value);
		_picolog2.default.trace('revive => ', result);
		return result;
	}
	
	function register(name, type) {
		function enhance(entity, obj) {
			Object.defineProperty(entity, 'id', { enumerable: true,
				get: function get() {
					return this.__id;
				},
				set: function set(id) {
					Object.defineProperty(this, '__id', { value: id });
				}
			});
			Object.defineProperty(entity, 'version', { enumerable: true,
				get: function get() {
					return this.__version;
				},
				set: function set(version) {
					Object.defineProperty(this, '__version', { value: version });
				}
			});
			var keys = obj && (0, _keys2.default)(obj) || [];
			for (var i = 0, key; key = keys[i]; i++) {
				entity[key] = obj[key];
			}
			if (keys.indexOf('version') === -1) {
				entity.version = null;
			}
		}
		var wrapped = void 0;
		eval('\n\t\twrapped = function ' + name + '(obj){\n\t\t\tenhance(this, obj);\n\t\t\ttype.apply(this, arguments);\n\t\t};\n\t');
		wrapped.prototype = (0, _create2.default)(type.prototype);
		wrapped.toString = type.toString.bind(wrapped);
		registry[name] = wrapped;
		if (!wrapped.prototype.toJSON) {
			Object.defineProperty(wrapped.prototype, 'toJSON', { value: toJSON });
		}
		if (!wrapped.prototype.equals) {
			Object.defineProperty(wrapped.prototype, 'equals', { value: equals });
		}
		if (!wrapped.prototype.clone) {
			Object.defineProperty(wrapped.prototype, 'clone', { value: clone });
		}
		if (!wrapped.fromJSON) {
			Object.defineProperty(wrapped, 'fromJSON', { value: fromJSON });
		}
		return wrapped;
	}
	
	var registry = {};
	
	function idKey(key) {
		return key === 'id' || key.substring && key.substring(key.length - 2) === 'Id';
	}
	
	function hasEquals(obj) {
		return obj && typeof obj.equals == 'function';
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("ws.suid");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("react-mdl");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Lightbox = exports.Drawer = exports.Dialog = exports.Modal = exports.SimpleDialog = exports.StatefulFlipCard = exports.FlipCard = exports.BackFace = exports.FrontFace = exports.StatefulTextfield = exports.Textfield = exports.Switch = exports.Sprite = exports.LayoutObfuscator = exports.LayoutTitle = exports.Badge = undefined;
	
	var _typeof2 = __webpack_require__(16);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _defineProperty2 = __webpack_require__(45);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _keys = __webpack_require__(24);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _objectWithoutProperties2 = __webpack_require__(21);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _class, _temp, _class2, _temp2, _class3, _temp3, _class4, _temp4;
	
	exports.component = component;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(47);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactMdl = __webpack_require__(11);
	
	var _classnames = __webpack_require__(17);
	
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
	
	var Badge = exports.Badge = component('Badge', 'mdl-badge', { overlap: 'mld-badge--overlap' }, 'span', { text: string }, { text: '' }, function (elem, props, children) {
		var text = props.text;
		var overlap = props.overlap;
		var others = (0, _objectWithoutProperties3.default)(props, ['text', 'overlap']);
	
		return _react2.default.createElement(
			'span',
			others,
			children,
			_react2.default.createElement(
				'b',
				null,
				text
			)
		);
	});
	
	var LayoutTitle = exports.LayoutTitle = component('LayoutTitle', 'mdl-layout__title');
	var LayoutObfuscator = exports.LayoutObfuscator = component('LayoutObfuscator', 'mdl-layout__obfuscator', { open: 'is-visible' }, 'div', { onCancel: func.isRequired }, {}, function (elem, props, children) {
		var onCancel = props.onCancel;
		var others = (0, _objectWithoutProperties3.default)(props, ['onCancel']);
	
		var cancel = function cancel(event) {
			event.preventDefault();onCancel();
		};
		return _react2.default.createElement('div', (0, _extends3.default)({ onClick: cancel, onTouchEnd: cancel }, others));
	});
	
	var Sprite = exports.Sprite = component('Sprite', 'material-icons-sprite', {}, 'i', { name: string.isRequired }, {}, function (elem, props, children) {
		var name = props.name;
		var className = props.className;
		var others = (0, _objectWithoutProperties3.default)(props, ['name', 'className']);
	
		var classes = (0, _classnames2.default)(className, name);
		return _react2.default.createElement('i', (0, _extends3.default)({ className: classes }, others));
	});
	
	var Switch = exports.Switch = component('Switch', 'mdl-switch', { ripple: 'mdl-js-ripple-efect' }, 'label', {
		name: string.isRequired,
		icon: string,
		sprite: string,
		on: bool
	}, {
		on: false
	}, function (elem, props, children) {
		var name = props.name;
		var icon = props.icon;
		var sprite = props.sprite;
		var on = props.on;
		var className = props.className;
		var others = (0, _objectWithoutProperties3.default)(props, ['name', 'icon', 'sprite', 'on', 'className']);
	
		var classes = (0, _classnames2.default)(className, 'is-upgraded', { 'is-checked': on, 'icon': !!icon, 'sprite': !!sprite });
		return _react2.default.createElement(
			'label',
			(0, _extends3.default)({ className: classes, htmlFor: name }, others),
			_react2.default.createElement('input', { type: 'checkbox', id: name, className: 'mdl-switch__input', defaultChecked: on }),
			_react2.default.createElement(
				'span',
				{ className: 'mdl-switch__label' },
				icon ? _react2.default.createElement(_reactMdl.Icon, { name: icon }) : '',
				sprite ? _react2.default.createElement(Sprite, { name: sprite }) : '',
				children
			),
			_react2.default.createElement('div', { className: 'mdl-switch__track' }),
			_react2.default.createElement(
				'div',
				{ className: 'mdl-switch__thumb' },
				_react2.default.createElement('span', { className: 'mdl-switch__focus-helper' })
			)
		);
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
	}(_react.Component), _class.propTypes = (0, _extends3.default)({}, _reactMdl.Textfield.propTypes), _class.defaultProps = (0, _extends3.default)({}, _reactMdl.Textfield.defaultProps, { label: '' }), _temp);
	
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
	
			_this3.state = {
				flipped: _this3.props.flipped,
				backLoaded: !_this3.props.backLoadDelay,
				frontLoaded: !_this3.props.frontLoadDelay
			};
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
				var _state = this.state;
				var flipped = _state.flipped;
				var frontLoaded = _state.frontLoaded;
				var backLoaded = _state.backLoaded;
	
				this.setState((0, _extends3.default)({}, this.state, { flipped: !flipped, backLoaded: backLoaded || !flipped, frontLoaded: frontLoaded || flipped }));
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this4 = this;
	
				var _props3 = this.props;
				var frontLoadDelay = _props3.frontLoadDelay;
				var backLoadDelay = _props3.backLoadDelay;
	
				if (frontLoadDelay) {
					this.frontLoad = setTimeout(function () {
						_this4.setState((0, _extends3.default)({}, _this4.state, { frontLoaded: true }));
					}, frontLoadDelay);
				}
				if (backLoadDelay) {
					this.backLoad = setTimeout(function () {
						_this4.setState((0, _extends3.default)({}, _this4.state, { backLoaded: true }));
					}, backLoadDelay);
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				clearTimeout(this.frontLoad);
				clearTimeout(this.backLoad);
			}
		}, {
			key: 'render',
			value: function render() {
				var _props4 = this.props;
				var className = _props4.className;
				var flipped = _props4.flipped;
				var frontLoadDelay = _props4.frontLoadDelay;
				var backLoadDelay = _props4.backLoadDelay;
				var children = _props4.children;
				var others = (0, _objectWithoutProperties3.default)(_props4, ['className', 'flipped', 'frontLoadDelay', 'backLoadDelay', 'children']);
	
				var frontProps = void 0,
				    frontChilds = void 0,
				    backProps = void 0,
				    backChilds = void 0;
				for (var i = 0, elem; elem = children[i]; i++) {
					if (elem.type === FrontFace) {
						var _elem$props = elem.props;
						var _children = _elem$props.children;
	
						var _others = (0, _objectWithoutProperties3.default)(_elem$props, ['children']);
	
						frontProps = _others;
						frontChilds = _children;
					} else if (elem.type === BackFace) {
						var _elem$props2 = elem.props;
						var _children2 = _elem$props2.children;
	
						var _others2 = (0, _objectWithoutProperties3.default)(_elem$props2, ['children']);
	
						backProps = _others2;
						backChilds = _children2;
					}
				}
	
				return _react2.default.createElement(
					FlipCard,
					(0, _extends3.default)({ className: className, flipped: this.isFlipped(), onClick: this.flip }, others),
					_react2.default.createElement(
						FrontFace,
						frontProps,
						this.state.frontLoaded ? frontChilds : ''
					),
					_react2.default.createElement(
						BackFace,
						backProps,
						this.state.backLoaded ? backChilds : ''
					)
				);
			}
		}]);
		return StatefulFlipCard;
	}(_react.Component), _class3.propTypes = {
		flipped: bool,
		className: string,
		frontLoadDelay: number,
		backLoadDelay: number
	}, _class3.defaultProps = {
		flipped: false,
		frontLoadDelay: 0,
		backLoadDelay: 0
	}, _temp3);
	var SimpleDialog = exports.SimpleDialog = component('SimpleDialog', 'mdl-dialog', { visible: 'is-visible' }, 'div', {}, {}, function (elem, props, children) {
		var visible = props.visible;
		var others = (0, _objectWithoutProperties3.default)(props, ['visible']);
	
		return _react2.default.createElement(
			'div',
			(0, _extends3.default)({ className: props.className }, others),
			visible ? children : undefined
		);
	});
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
	
			var _this5 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Lightbox).call(this));
	
			_this5.state = { loaded: [] };
			_this5.cancel = _this5.cancel.bind(_this5);
			_this5.next = _this5.next.bind(_this5);
			_this5.prev = _this5.prev.bind(_this5);
			_this5.nav = _this5.nav.bind(_this5);
			_this5.imageClicked = _this5.imageClicked.bind(_this5);
			_this5.keyPressed = _this5.keyPressed.bind(_this5);
			return _this5;
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
				var _props5 = this.props;
				var noBackdropCancel = _props5.noBackdropCancel;
				var onCancel = _props5.onCancel;
	
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
				var _props6 = this.props;
				var images = _props6.images;
				var index = _props6.index;
				var onNext = _props6.onNext;
				var onNav = _props6.onNav;
				var noRotate = _props6.noRotate;
	
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
				var _props7 = this.props;
				var images = _props7.images;
				var index = _props7.index;
				var onPrev = _props7.onPrev;
				var onNav = _props7.onNav;
				var noRotate = _props7.noRotate;
	
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
				var _this6 = this;
	
				var _props8 = this.props;
				var open = _props8.open;
				var index = _props8.index;
				var images = _props8.images;
				var noCloseButton = _props8.noCloseButton;
				var noImageCount = _props8.noImageCount;
				var noPositionIndicators = _props8.noPositionIndicators;
				var noPreload = _props8.noPreload;
				var noSpinner = _props8.noSpinner;
				var noRotate = _props8.noRotate;
	
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
									return _this6.nav(i, evt);
								}, onTouchEnd: function onTouchEnd(evt) {
									return _this6.nav(i, evt);
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
										return _this6.imageLoaded(e, index);
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
											return _this6.imageLoaded(e, i);
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
/* 13 */
/***/ function(module, exports) {

	module.exports = require("redux-apis");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/define-properties");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/typeof");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("redux-fetch-api");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AppApi = undefined;
	
	var _promise = __webpack_require__(15);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _typeof2 = __webpack_require__(16);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _defineProperties = __webpack_require__(14);
	
	var _defineProperties2 = _interopRequireDefault(_defineProperties);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _dec2, _class, _class2, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(13);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	var _reduxFetchApi = __webpack_require__(18);
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	var _Role = __webpack_require__(20);
	
	var _Group = __webpack_require__(36);
	
	var _Account = __webpack_require__(35);
	
	var _api = __webpack_require__(28);
	
	var _Brand = __webpack_require__(38);
	
	var _api2 = __webpack_require__(55);
	
	var _Product = __webpack_require__(39);
	
	var _Rating = __webpack_require__(40);
	
	var _StockItem = __webpack_require__(41);
	
	var _api3 = __webpack_require__(61);
	
	var _Store = __webpack_require__(42);
	
	var _api4 = __webpack_require__(64);
	
	var _api5 = __webpack_require__(30);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var API_URL = apiUrl();
	_picolog2.default.info('Using BridalApp API Server url: ', API_URL);
	var idx = void 0,
	    lastSlash = 0;
	while ((idx = API_URL.indexOf('/', lastSlash + 1)) !== -1) {
		lastSlash = idx;
	}
	var SUID_URL = API_URL.substring(0, lastSlash) + '/suid/suid.json';
	_picolog2.default.info('Using Suid Server url: ', SUID_URL);
	_ws2.default.config({ server: SUID_URL });
	
	// override the default fetcher with one that does a cross-origin (CORS) request and has a timeout
	var AppApi = exports.AppApi = (_dec = (0, _reduxFetchApi.fetcher)(authenticatedCrossOriginFetchWithTimeout), _dec2 = (0, _reduxFetchApi.remote)(API_URL), _dec(_class = _dec2(_class = (_temp = _class2 = function (_Api) {
		(0, _inherits3.default)(AppApi, _Api);
	
		function AppApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? AppApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, AppApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AppApi).call(this, state));
	
			(0, _defineProperties2.default)(_this, {
				Account: { enumerable: true, value: _Account.Account },
				Brand: { enumerable: true, value: _Brand.Brand },
				Group: { enumerable: true, value: _Group.Group },
				Product: { enumerable: true, value: _Product.Product },
				Rating: { enumerable: true, value: _Rating.Rating },
				Role: { enumerable: true, value: _Role.Role },
				StockItem: { enumerable: true, value: _StockItem.StockItem },
				Store: { enumerable: true, value: _Store.Store }
			});
	
			_this.auth = (0, _reduxFetchApi.remote)('/auth')((0, _reduxApis.link)(_this, new _api.AuthApi()));
	
			_this.brands = (0, _reduxFetchApi.remote)('/brands')((0, _reduxApis.link)(_this, new _api2.BrandsApi()));
	
			_this.products = (0, _reduxFetchApi.remote)('/products')((0, _reduxApis.link)(_this, new _api3.ProductsApi()));
	
			_this.stores = (0, _reduxFetchApi.remote)('/stores')((0, _reduxApis.link)(_this, new _api4.StoresApi()));
	
			_this.leftDrawer = (0, _reduxApis.link)(_this, new _api5.DrawerApi());
			_this.rightDrawer = (0, _reduxApis.link)(_this, new _api5.DrawerApi());
			_this.lightbox = (0, _reduxApis.link)(_this, new _api5.LightboxApi());
			return _this;
		}
	
		(0, _createClass3.default)(AppApi, [{
			key: 'authenticated',
			value: function authenticated() {
				_picolog2.default.debug('authenticated');
				return this.auth.authenticated();
			}
		}, {
			key: 'getSession',
			value: function getSession() {
				return this.auth.session;
			}
		}]);
		return AppApi;
	}(_reduxApis2.default), _class2.INITIAL_STATE = {
		managedStores: [],
		managedStoreIndex: 0,
		managedBrands: [],
		managedBrandIndex: 0
	}, _class2.SET_MANAGED_STORES = 'SET_MANAGED_STORES', _class2.SET_MANAGED_STORE_INDEX = 'SET_MANAGED_STORE_INDEX', _class2.SET_MANAGED_BRANDS = 'SET_MANAGED_BRANDS', _class2.SET_MANAGED_BRAND_INDEX = 'SET_MANAGED_BRAND_INDEX', _temp)) || _class) || _class);
	
	// A version of fetch that sets cors headers and intercepts 401 Unauthorized responses.
	// J2EE servers will, after a succesful login, send a 302 redirect with the original url.
	// This function capitalizes on that to do transparent interception
	
	function authenticatedCrossOriginFetchWithTimeout(url, opts) {
		var _this2 = this;
	
		_picolog2.default.log('authenticatedCrossOriginFetchWithTimeout', url);
		opts = (0, _extends3.default)({ credentials: 'include', mode: 'cors' }, opts);
	
		if ((typeof global === 'undefined' ? 'undefined' : (0, _typeof3.default)(global)) == 'object' && global.session) {
			opts.headers = opts.headers || {};
			opts.headers['Cookie'] = 'JSESSIONID=' + global.session;
		}
		var result = new _promise2.default(function (resolve, reject) {
			var timeout = setTimeout(function () {
				reject(Error('timed out after 30s.'));
			}, 30000);
			_picolog2.default.debug('authenticatedCrossOriginFetchWithTimeout: fetching...');
			fetch(url, opts).then(function (response) {
				clearTimeout(timeout);
				_picolog2.default.debug('authenticatedCrossOriginFetchWithTimeout: got response ', response);
				if (response.status && response.status === 401) {
					// auth needed
					_picolog2.default.debug('authenticatedCrossOriginFetchWithTimeout: auth needed');
					if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object') {
						_picolog2.default.debug('authenticatedCrossOriginFetchWithTimeout: client, allow login');
						// client, allow user to login
						return response.json().then(function (json) {
							_picolog2.default.debug('authenticatedCrossOriginFetchWithTimeout: calling auth.challenge...');
							return _this2.auth.challenge(json.challenge, resolve, reject);
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
		return result;
	}
	
	function apiUrl() {
		if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object') {
			return window.__bridalapp_api_server || 'http://api.bridalapp.net/api';
		}
		var protocol = process.env.BRIDALAPP_API_SERVER_PROTOCOL || 'http://';
		var host = process.env.BRIDALAPP_API_SERVER_HOST || 'localhost';
		var port = process.env.BRIDALAPP_API_SERVER_PORT || '8080';
		var path = process.env.BRIDALAPP_API_SERVER_PATH || '/api';
		return protocol + host + (port == '80' ? '' : ':' + port) + path;
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Role = undefined;
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _class;
	
	var _Entity = __webpack_require__(8);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Role = exports.Role = (0, _Entity2.default)(_class = function Role() {
	  (0, _classCallCheck3.default)(this, Role);
	}) || _class;
	
	Role.GUEST = new Role({ id: 1, name: 'Guest' });
	Role.USER = new Role({ id: 2, name: 'User' });
	Role.STORE_USER = new Role({ id: 3, name: 'Store-User' });
	Role.STORE_MANAGER = new Role({ id: 4, name: 'Store-Manager' });
	Role.BRAND_USER = new Role({ id: 5, name: 'Brand-User' });
	Role.BRAND_MANAGER = new Role({ id: 6, name: 'Brand-Manager' });
	Role.BRAUTSCHLOSS_USER = new Role({ id: 7, name: 'Brautschloss-User' });
	Role.BRAUTSCHLOSS_MANAGER = new Role({ id: 8, name: 'Brautschloss-Manager' });
	Role.ADMINISTRATOR = new Role({ id: 9, name: 'Administrator' });
	
	Role.BRAUTSCHLOSS_ROLES = [Role.BRAUTSCHLOSS_MANAGER, Role.BRAUTSCHLOSS_USER];
	Role.STORE_ROLES = [Role.STORE_MANAGER, Role.STORE_USER];
	Role.BRAND_ROLES = [Role.BRAND_MANAGER, Role.BRAND_USER];
	
	exports.default = Role;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.store = undefined;
	
	var _typeof2 = __webpack_require__(16);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _redux = __webpack_require__(82);
	
	var _reduxThunk = __webpack_require__(84);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reduxLogger = __webpack_require__(83);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	var _reduxApis = __webpack_require__(13);
	
	var _Entity = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createReducer(app) {
		var rootReducer = (0, _redux.combineReducers)({
			/*
	  browser: createResponsiveStateReducer({
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
	  	xxs: 320,	// < 360: small phones, portrait (e.g. iPhone 4)
	  	xs: 360,	// < 480: large phones/phablets, portrait (e.g. Samsung Galaxy S5, iPhone 6 Plus)
	  	sm: 480,	// < 720: small tablets, portrait
	  	md: 720,	// < 1025: large tablets, portrait
	  	lg: 1025,	// < 1600: small monitor, landscape (cutoff at 1025 i.s.o 1024 to exclude tablets with 1024x1440 resolution)
	  	xl: 1600,	// < 2560: HD monitor
	  	xxl: 2560,	// Projection screens, VR devices?
	  }),
	  */
			app: app.reducer
		});
	
		return function (state, action) {
			var currentState = action.type === '@@bridalapp/RESET' ? undefined : state;
			return rootReducer(currentState, action);
		};
	}
	
	var storeEnhancer = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object' ? (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reduxLogger2.default)({ logger: _picolog2.default }))) : (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default));
	
	var AppApi = __webpack_require__(19).AppApi;
	var app = new AppApi();
	
	var store = exports.store = (0, _redux.createStore)(createReducer(app), (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object' && window.bridalapp_initial_state && (0, _Entity.fromJSON)(window.bridalapp_initial_state) || undefined, storeEnhancer);
	store.app = (0, _reduxApis.link)(store, app);
	exports.default = store;
	
	
	if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object') {
		window.bridalapp = app;
	} else if ((typeof global === 'undefined' ? 'undefined' : (0, _typeof3.default)(global)) == 'object') {
		global.bridalapp = app;
	}
	
	if (false) {
		module.hot.accept('./components/App/api', function () {
			var msg = 'Hot-reloading \'./components/App/api\'',
			    args = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object' ? ['%c' + msg, 'color:green'] : [msg];
	
			AppApi = require('./components/App/api').AppApi;
			app = new AppApi();
			store.replaceReducer(createReducer(app));
			store.app = (0, _reduxApis.link)(store, app);
			if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object') {
				window.bridalapp = app;
			} else if ((typeof global === 'undefined' ? 'undefined' : (0, _typeof3.default)(global)) == 'object') {
				global.bridalapp = app;
			}
		});
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("fbjs/lib/shallowEqual");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("redux-load-api");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AuthApi = exports.RegisterDialogApi = exports.LoginDialogApi = undefined;
	
	var _typeof2 = __webpack_require__(16);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _promise = __webpack_require__(15);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _defineProperties = __webpack_require__(14);
	
	var _defineProperties2 = _interopRequireDefault(_defineProperties);
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _class2, _temp;
	
	exports.authenticated = authenticated;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(13);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	var _reduxAsyncApi = __webpack_require__(48);
	
	var _reduxAsyncApi2 = _interopRequireDefault(_reduxAsyncApi);
	
	var _reduxFetchApi = __webpack_require__(18);
	
	var _api = __webpack_require__(30);
	
	var _Entity = __webpack_require__(8);
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	var _PasswordCredential = __webpack_require__(37);
	
	var _PasswordCredential2 = _interopRequireDefault(_PasswordCredential);
	
	var _Account = __webpack_require__(35);
	
	var _Account2 = _interopRequireDefault(_Account);
	
	var _Role = __webpack_require__(20);
	
	var _Role2 = _interopRequireDefault(_Role);
	
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
	
	var NULL_SESSION = { sessionId: null, user: null };
	
	var AuthApi = exports.AuthApi = (0, _reduxFetchApi.remote)(_class = (_temp = _class2 = function (_Async) {
		(0, _inherits3.default)(AuthApi, _Async);
	
		function AuthApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? AuthApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, AuthApi);
	
			var _this3 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AuthApi).call(this, state));
	
			_this3.setHandler(AuthApi.CHALLENGE, function (state, _ref) {
				var payload = _ref.payload;
				return (0, _extends3.default)({}, state, { challenge: payload });
			});
			_this3.setHandler(AuthApi.LOGGED_IN, function (state, _ref2) {
				var payload = _ref2.payload;
				return (0, _extends3.default)({}, state, { session: payload, challenge: null });
			});
			_this3.setHandler(AuthApi.LOGGED_OUT, function (state, _ref3) {
				var payload = _ref3.payload;
				return (0, _extends3.default)({}, state, { session: payload, challenge: null });
			});
			_this3.setHandler(AuthApi.CANCEL, function (state, action) {
				return (0, _extends3.default)({}, state, { challenge: null });
			});
	
			(0, _defineProperties2.default)(_this3, {
				loggedIn: { enumerable: true, get: function get() {
						return !!(_this3.session && _this3.session.user);
					} },
				challenged: { enumerable: true, get: function get() {
						return !!(_this3.challenge() && _this3.challenge().url && !_this3.challenge().accepted);
					} },
				session: { enumerable: true, get: function get() {
						return _this3.getState().session;
					} }
			});
	
			_this3.onProvoke = function () {
				return _this3.provoke();
			};
			_this3.onCancel = function () {
				return _this3.cancel();
			};
			_this3.onLogin = function () {
				return _this3.login();
			};
			_this3.onLogout = function () {
				return _this3.logout();
			};
			_this3.onRegister = function () {
				return _this3.register();
			};
	
			_this3.loginDialog = (0, _reduxApis.link)(_this3, new LoginDialogApi());
			_this3.registerDialog = (0, _reduxApis.link)(_this3, new RegisterDialogApi());
			return _this3;
		}
	
		(0, _createClass3.default)(AuthApi, [{
			key: 'loadSession',
			value: function loadSession() {
				var _this4 = this;
	
				_picolog2.default.debug('loadSession');
				this.setBusy();
				return fetchSessionInfo(this).then(function (session) {
					_picolog2.default.log('loadSession => ', session);
					_this4.setDone();
					return session;
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
						return fetchSessionInfo(auth).then(function (session) {
							auth.setDone();
							challenge.resolve(response);
							return session;
						});
					}).catch(function (error) {
						auth.setError(error);
						challenge.reject(error);
					});
				}
	
				if (this.loggedIn) {
					_picolog2.default.log('Already logged in as `' + this.session.user.name + '`: ', this.session.user);
					return;
				}
	
				this.setBusy();
				return this.dispatch(function () {
					return new _promise2.default(function (resolve, reject) {
						if (!_this5.challenge()) {
							_picolog2.default.debug('Provoking login challenge');
							return _this5.provoke().then(function (challenge) {
								_picolog2.default.debug('Server issued a login challenge');
								return remoteLogin(_this5, challenge).then(resolve).catch(reject);
							});
						}
						return remoteLogin(_this5, _this5.challenge()).then(resolve).catch(reject);
					}).then(function (results) {
						_picolog2.default.debug('Login', username);return results;
					});
					_picolog2.default.debug('Posting credentials to ', challenge.url);
				});
			}
		}, {
			key: 'logout',
			value: function logout() {
				var _this6 = this;
	
				_picolog2.default.debug('logout', this.session.user);
				return this.dispatch(function () {
					_this6.setBusy();
					_this6.cancel();
					return _this6.fetch('/logout').catch().then(function () {
						_this6.setDone();
						_this6.dispatch(_this6.createAction(AuthApi.LOGGED_OUT)(NULL_SESSION));
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
						var account = new _Account2.default(_ws2.default.next(), username, [new _PasswordCredential2.default(_ws2.default.next(), password)]);
	
						_picolog2.default.log('register: creating account', account);
						return _this7.fetch('/accounts', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: (0, _Entity.toJSON)(account)
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
								_picolog2.default.error(error);
								_this7.setError(error);
							});
						}).catch(function (error) {
							_picolog2.default.error(error);
							_this7.setError(error);
						});
					}).catch(function (error) {
						_picolog2.default.error(error);
						_this7.setError(error);
					});
				});
			}
		}, {
			key: 'cancel',
			value: function cancel() {
				var _this8 = this;
	
				_picolog2.default.log('cancel');
				return this.dispatch(function () {
					var c = _this8.challenge();
					if (c) {
						var _error = Error('Login/registration cancelled');
						_this8.setError(_error);
						_this8.dispatch(_this8.createAction(AuthApi.CANCEL)());
						if (c.reject) {
							c.reject(_error);
						}
					}
				});
			}
		}, {
			key: 'authenticated',
			value: function authenticated() {
				_picolog2.default.log('authenticated');
				var auth = this;
				return new _promise2.default(function (resolve, reject) {
					if (auth.loggedIn) {
						resolve(auth.session);
					} else auth.provoke(resolve, reject);
				});
			}
		}, {
			key: 'provoke',
			value: function provoke(resolve, reject) {
				var _this9 = this;
	
				_picolog2.default.log('provoke', resolve, reject);
				// provoke a login challenge, async
				// provoke a challenge by fetching url
				return new _promise2.default(function (accept, deny) {
					// set up intermediate challenge to make accept and deny survive the round-trip
					_this9.challenge({}, accept, deny);
					// this fetch will result in 401 and be intercepted, after which
					// challenge will be called again with the actual server challenge
					_picolog2.default.debug('provoke: calling /challenge...');
					_this9.fetch('/challenge').then(function (response) {
						_picolog2.default.debug('provoke: got response ', response);
						if (response && response.status == 200) {
							return response.text();
						}
						return response.text().then(function (text) {
							var error = new Error(text);
							error.status = response.status;
							error.statusText = response.statusText;
							throw error;
						});
					}).then(function (text) {
						return (0, _Entity.fromJSON)(text);
					}).then(function (session) {
						return processSession(_this9, session);
					}).then(function (session) {
						_picolog2.default.log('provoke: got session ', session);
						if (resolve) {
							_picolog2.default.debug('provoke: calling resolve ', resolve);
							resolve(session);
						}
						return session;
					}).catch(function (error) {
						_picolog2.default.info('Provoking login challenge failed.', error);
						if (reject) {
							_picolog2.default.debug('provoke: calling reject ', reject);
							reject(error);
						}
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
				// paramless invocation is sync
				if (!challenge) {
					return this.getState().challenge;
				}
				// only accept challenges on the client side
				if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) != 'object') {
					reject(new Error('Unauthorized'));
				}
	
				_picolog2.default.info('challenge', challenge, resolve, reject);
	
				// reject any old login challenge
				var c = this.getState().challenge;
				if (c && c.url) {
					_picolog2.default.info('challenge: rejecting previous challenge...');
					c.reject(new Error("Login challenge cancelled"));
				}
	
				// dispatch the challenge
				challenge.resolve = resolve;
				challenge.reject = reject;
				_picolog2.default.info('dispatching challenge', challenge);
				this.dispatch(this.createAction(AuthApi.CHALLENGE)(challenge));
	
				// If there is an old challenge which was a provocation, and new challenge is login challenge
				if (c && !c.url && c.resolve && challenge.url) {
					// if new challenge is login challenge (does have url), provocation is now resolved
					_picolog2.default.info('challenge: resolving provocation...', c.resolve);
					c.resolve(challenge);
				}
			})
		}, {
			key: 'is',
			value: function is(role) {
				_picolog2.default.debug('is', role);
				var roles = this.session.user && this.session.user.roles || [];
				return (0, _Entity.indexOf)(roles, role) !== -1;
			}
		}, {
			key: 'isAny',
			value: function isAny(roles) {
				_picolog2.default.debug('isAny');
				for (var i = 0, role; role = roles[i]; i++) {
					if (this.is(role)) {
						return true;
					}
				}
				return false;
			}
		}, {
			key: 'isAll',
			value: function isAll(roles) {
				_picolog2.default.debug('isAll');
				for (var i = 0, role; role = roles[i]; i++) {
					if (!this.is(role)) {
						return false;
					}
				}
				return true;
			}
		}]);
		return AuthApi;
	}(_reduxAsyncApi2.default), _class2.CHALLENGE = 'AUTH_CHALLENGE', _class2.LOGGED_IN = 'LOGGED_IN', _class2.LOGGED_OUT = 'LOGGED_OUT', _class2.CANCEL = 'CANCEL_AUTH', _class2.INITIAL_STATE = (0, _extends3.default)({}, _reduxAsyncApi2.default.INITIAL_STATE, {
		session: NULL_SESSION,
		challenge: null
	}), _temp)) || _class;
	
	exports.default = AuthApi;
	function authenticated(target) {
		function enhance(target) {
			_picolog2.default.debug('authenticated', target);
			(0, _defineProperties2.default)(target.prototype, {
				authenticated: { value: function value() {
						var p = this;
						while (p = p.__parent) {
							if (p.authenticated) {
								return p.authenticated();
							}
						}
						return _promise2.default.reject(new Error('No authentication method'));
					} },
	
				getSession: { value: function value() {
						var p = this;
						while (p = p.__parent) {
							if (p.getSession) {
								return p.getSession();
							}
						}
						return null;
					} },
	
				auth: { get: function get() {
						var p = this;
						while (p = p.__parent) {
							if (p.auth) {
								return p.auth;
							}
						}
					} }
			});
			_picolog2.default.trace('authenticated => ', target);
			return target;
		}
		return target ? enhance(target) : enhance;
	}
	
	function fetchSessionInfo(auth) {
		_picolog2.default.debug('fetchSessionInfo');
		return auth.fetch('/session').then(function (response) {
			_picolog2.default.debug('fetchSessionInfo => response.status=', response.status);
			return response.status == 200 && response.text();
		}).then(function (text) {
			_picolog2.default.log('fetchSessionInfo => text=', text);
			return (0, _Entity.fromJSON)(text);
		}).then(function (session) {
			return processSession(auth, session);
		});
	}
	
	function processSession(auth, session) {
		_picolog2.default.log('processSession', session);
		var user = session.user;
		var sessionId = session.sessionId;
	
		_picolog2.default.debug('processSession => sessionId=', sessionId);
		_picolog2.default.debug('processSession => user=', user);
		if ((typeof document === 'undefined' ? 'undefined' : (0, _typeof3.default)(document)) == 'object') {
			var maxAge = sessionId ? 10 * 24 * 60 * 60 : 0;
			document.cookie = 'BASESSION=' + sessionId + '; Max-Age=' + maxAge + '; path=/';
			_picolog2.default.debug('processSession => cookie ' + (maxAge ? 'set' : 'cleared'));
		}
		if (user && !auth.loggedIn) {
			_picolog2.default.debug('fetchSessionInfo => Dispatching LOGGED_IN action', session);
			auth.dispatch(auth.createAction(AuthApi.LOGGED_IN)(session));
		} else if (!user && auth.loggedIn) {
			_picolog2.default.debug('fetchSessionInfo => Dispatching LOGGED_OUT action');
			auth.dispatch(auth.createAction(AuthApi.LOGGED_OUT)(session));
		}
		return session;
	}
	
	function encode(challenge, username, password) {
		if (challenge.contentType === 'application/x-www-form-urlencoded') {
			return urlEncode(challenge, username, password);
		} else {
			error = Error('Unable to encode the given credentials. Unsupported content type \'' + challenge.contentType + '\'.');
		}
	}
	
	function urlEncode(challenge, username, password) {
		var uf = encodeURIComponent(challenge.usernameField);
		var u = encodeURIComponent(username);
		var pf = encodeURIComponent(challenge.passwordField);
		var p = encodeURIComponent(password);
		return uf + '=' + u + '&' + pf + '=' + p;
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.FilterPanel = undefined;
	
	var _objectWithoutProperties2 = __webpack_require__(21);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactMdl = __webpack_require__(11);
	
	var _classnames = __webpack_require__(17);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlExtras = __webpack_require__(12);
	
	var _Entity = __webpack_require__(8);
	
	var _FilterFields = __webpack_require__(56);
	
	var _FilterFields2 = _interopRequireDefault(_FilterFields);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bool = _react.PropTypes.bool;
	var string = _react.PropTypes.string;
	var array = _react.PropTypes.array;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var shape = _react.PropTypes.shape;
	var any = _react.PropTypes.any;
	var FilterPanel = exports.FilterPanel = (_temp = _class = function (_Component) {
		(0, _inherits3.default)(FilterPanel, _Component);
	
		function FilterPanel() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, FilterPanel);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			return (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(FilterPanel)).call.apply(_Object$getPrototypeO, [this].concat(args)));
		}
	
		(0, _createClass3.default)(FilterPanel, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				_picolog2.default.debug('componentDidMount()');
			}
		}, {
			key: 'searchClicked',
			value: function searchClicked(event) {
				var _props = this.props;
				var location = _props.location;
				var values = _props.values;
				var onApplyFields = _props.onApplyFields;
				var onSearch = _props.onSearch;
				var onCancel = _props.onCancel;
				var router = this.context.router;
	
				if (event) {
					event.preventDefault();
				}
				var newValues = onApplyFields();
				onCancel();
				var pathname = location.pathname;
				var category = newValues.category;
				var query = (0, _objectWithoutProperties3.default)(newValues, ['category']);
	
				router.push({ pathname: pathname, query: query });
			}
		}, {
			key: 'renderFilterFields',
			value: function renderFilterFields() {
				return _react2.default.createElement(_FilterFields2.default, this.props);
			}
		}, {
			key: 'render',
			value: function render() {
				var _props2 = this.props;
				var open = _props2.open;
				var fields = _props2.fields;
				var onCancel = _props2.onCancel;
				var className = _props2.className;
				var children = _props2.children;
	
				var classes = (0, _classnames2.default)('FilterPanel', className, { 'is-open': open });
				var filterFields = this.renderFilterFields();
				return _react2.default.createElement(
					_mdlExtras.Modal,
					{ open: open, onCancel: onCancel },
					_react2.default.createElement(
						_reactMdl.Card,
						{ className: classes },
						open ? _react2.default.createElement(
							_reactMdl.CardText,
							null,
							filterFields,
							children
						) : undefined,
						_react2.default.createElement(
							_reactMdl.CardActions,
							null,
							_react2.default.createElement(
								_reactMdl.Button,
								{ colored: true, raised: true, onClick: this.searchClicked.bind(this) },
								'Search'
							),
							_react2.default.createElement(
								_reactMdl.Button,
								{ onClick: onCancel },
								'Cancel'
							)
						)
					)
				);
			}
		}]);
		return FilterPanel;
	}(_react.Component), _class.propTypes = {
		open: bool.isRequired,
		values: object.isRequired,
		fields: shape({
			q: shape({
				value: string,
				onChange: func
			}).isRequired
		}).isRequired,
		onApplyFields: func.isRequired,
		onSearch: func.isRequired,
		onCancel: func.isRequired,
		location: shape({
			pathname: string.isRequired
		}).isRequired
	}, _class.contextTypes = {
		router: object.isRequired
	}, _temp);
	exports.default = FilterPanel;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.LightboxApi = exports.DrawerApi = exports.TextfieldApi = undefined;
	
	var _objectWithoutProperties2 = __webpack_require__(21);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _defineProperties = __webpack_require__(14);
	
	var _defineProperties2 = _interopRequireDefault(_defineProperties);
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp, _class2, _temp2, _class3, _temp3;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(13);
	
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
	
			(0, _defineProperties2.default)(_this, {
				value: { enumerable: true, get: function get() {
						return _this.getState().value;
					} }
			});
	
			_this.onChange = _this.setValue.bind(_this);
			return _this;
		}
	
		(0, _createClass3.default)(TextfieldApi, [{
			key: 'setValue',
			value: function setValue(value) {
				return this.dispatch(this.createAction(TextfieldApi.SET_VALUE)(value === undefined ? '' : value));
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
			(0, _defineProperties2.default)(_this2, {
				open: { enumerable: true, get: function get() {
						return _this2.getState().open;
					} }
			});
			_this2.onCancel = _this2.closeDrawer.bind(_this2);
			_this2.onActivate = _this2.openDrawer.bind(_this2);
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
			(0, _defineProperties2.default)(_this3, {
				open: { enumerable: true, get: function get() {
						return _this3.getState() && _this3.getState().open;
					} },
				index: { enumerable: true, get: function get() {
						return _this3.getState() && _this3.getState().index;
					} },
				images: { enumerable: true, get: function get() {
						return _this3.getState() && _this3.getState().images;
					} },
				onOpenLightbox: { enumerable: true, value: _this3.openLightbox.bind(_this3) },
				onCancel: { enumerable: true, value: _this3.cancel.bind(_this3) },
				onNext: { enumerable: true, value: _this3.next.bind(_this3) },
				onPrev: { enumerable: true, value: _this3.prev.bind(_this3) },
				onNav: { enumerable: true, value: _this3.nav.bind(_this3) }
			});
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Publication = undefined;
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var Publication = exports.Publication = (_temp = _class = function (_Component) {
		(0, _inherits3.default)(Publication, _Component);
	
		function Publication() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, Publication);
	
			for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
				props[_key] = arguments[_key];
			}
	
			return (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Publication)).call.apply(_Object$getPrototypeO, [this].concat(props)));
		}
	
		(0, _createClass3.default)(Publication, [{
			key: 'mayPublish',
			value: function mayPublish(item) {
				return this.props.onMayPublish(item);
			}
		}, {
			key: 'publishClicked',
			value: function publishClicked(item, event) {
				_picolog2.default.log('publishClicked', item, event);
				event.preventDefault();
				return this.props.onPublish(item);
			}
		}, {
			key: 'unpublishClicked',
			value: function unpublishClicked(item, event) {
				_picolog2.default.log('unpublishClicked', item, event);
				event.preventDefault();
				return this.props.onUnpublish(item);
			}
		}]);
		return Publication;
	}(_react.Component), _class.propTypes = {
		onMayPublish: func.isRequired,
		onPublish: func.isRequired,
		onUnpublish: func.isRequired
	}, _temp);
	exports.default = Publication;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.PublicationApi = undefined;
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _toConsumableArray2 = __webpack_require__(46);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _class2, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(13);
	
	var _reduxFetchApi = __webpack_require__(18);
	
	var _Entity = __webpack_require__(8);
	
	var _api = __webpack_require__(57);
	
	var _api2 = __webpack_require__(28);
	
	var _Role = __webpack_require__(20);
	
	var _Role2 = _interopRequireDefault(_Role);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PublicationApi = exports.PublicationApi = (0, _reduxFetchApi.remote)(_class = (0, _api2.authenticated)(_class = (_temp = _class2 = function (_EntityApi) {
		(0, _inherits3.default)(PublicationApi, _EntityApi);
	
		function PublicationApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? PublicationApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, PublicationApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PublicationApi).call(this, state));
	
			_this.item.onMayPublish = _this.mayPublish.bind(_this);
			_this.item.onPublish = _this.publish.bind(_this);
			_this.item.onUnpublish = _this.unpublish.bind(_this);
			return _this;
		}
	
		(0, _createClass3.default)(PublicationApi, [{
			key: 'mayPublish',
			value: function mayPublish(item) {
				_picolog2.default.trace('mayPublish', item, this, this.getSession);
				if (this.getSession().user) {
					for (var i = 0, role; role = this.getSession().user.roles[i]; i++) {
						if (role.equals(_Role2.default.BRAUTSCHLOSS_USER) || role.equals(_Role2.default.BRAUTSCHLOSS_MANAGER) || role.equals(_Role2.default.ADMINISTRATOR)) {
							_picolog2.default.trace('mayPublish => true');
							return true;
						}
					}
				}
				_picolog2.default.trace('mayPublish => false');
				return false;
			}
		}, {
			key: 'setPublished',
			value: function setPublished(item, published) {
				var _this2 = this;
	
				_picolog2.default.debug('setPublished', item, published);
				var newItem = item.clone();
				newItem.published = published;
				return this.save(newItem).then(function (saved) {
					_picolog2.default.debug('saved successfully', saved);
					var newItems = [].concat((0, _toConsumableArray3.default)(_this2.items));
					var idx = (0, _Entity.indexOf)(newItems, item);
					newItems[idx] = saved;
					_this2.setItems(newItems);
					return saved;
				}).catch(function (error) {
					_picolog2.default.error('Unable to change published status for item ' + item + '.', error);
				});
			}
		}, {
			key: 'publish',
			value: function publish(item) {
				_picolog2.default.log('publish', item);
				return this.setPublished(item, true);
			}
		}, {
			key: 'unpublish',
			value: function unpublish(item) {
				_picolog2.default.log('unpublish', item);
				return this.setPublished(item, false);
			}
		}]);
		return PublicationApi;
	}(_api.EntityApi), _class2.INITIAL_STATE = (0, _extends3.default)({}, _api.EntityApi.INITIAL_STATE), _temp)) || _class) || _class;
	
	exports.default = PublicationApi;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _typeof2 = __webpack_require__(16);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(47);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Scroller = (_temp = _class = function (_React$Component) {
		(0, _inherits3.default)(Scroller, _React$Component);
	
		function Scroller() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, Scroller);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			_picolog2.default.debug.apply(_picolog2.default, ['Scroller'].concat(args));
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Scroller)).call.apply(_Object$getPrototypeO, [this].concat(args)));
	
			var _this$props = _this.props;
			var items = _this$props.items;
			var itemSize = _this$props.itemSize;
			var initialItemsInView = _this$props.initialItemsInView;
			var bufferBefore = _this$props.bufferBefore;
			var bufferAfter = _this$props.bufferAfter;
	
			var itemsInView = Math.min(initialItemsInView, items.length);
			var renderedItems = items.slice(0, itemsInView);
			var sizeItems = itemsInView * itemSize;
			_this.state = {
				horizontal: false,
				renderedItems: renderedItems,
				sizeBefore: 0,
				sizeItems: sizeItems,
				sizeAfter: (items.length - itemsInView) * itemSize,
				itemSize: itemSize,
				firstRenderedItemIndex: 0,
				lastRenderedItemIndex: itemsInView - 1,
				size: sizeItems
			};
	
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
	
				var items = props.items;
				var bufferBefore = props.bufferBefore;
				var bufferAfter = props.bufferAfter;
	
				var itemSize = horizontal ? w : props.itemSize;
				var itemsPer = !win ? 1 : w > 1024 ? 3 : w > 767 ? 2 : 1;
				var containerCount = ~ ~(items.length / itemsPer) + (~ ~(items.length % itemsPer) ? 1 : 0);
	
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
				var lastIdx = Math.min(firstIdx + containersInView * itemsPer + bufferAfter * itemsPer, items.length - 1);
				for (var i = firstIdx; i <= lastIdx; i++) {
					var item = items[i] || null;
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
				if (this.props.items !== nextProps.items) return true;
				if (this.props.state !== nextProps.state) return true;
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
		itemSize: 560,
		initialItemsInView: 20,
		//		itemsPer: 1,
		bufferBefore: 1,
		bufferAfter: 1,
		scrollDebounce: 100,
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
		var res = void 0;
	
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.App = undefined;
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _class, _class2, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(23);
	
	var _reactRouter = __webpack_require__(26);
	
	var _reactMdl = __webpack_require__(11);
	
	var _mdlExtras = __webpack_require__(12);
	
	var _SessionPanel = __webpack_require__(52);
	
	var _SessionPanel2 = _interopRequireDefault(_SessionPanel);
	
	var _AuthDialog = __webpack_require__(50);
	
	var _AuthDialog2 = _interopRequireDefault(_AuthDialog);
	
	var _store = __webpack_require__(22);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _api = __webpack_require__(19);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bool = _react.PropTypes.bool;
	var number = _react.PropTypes.number;
	var string = _react.PropTypes.string;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var array = _react.PropTypes.array;
	var shape = _react.PropTypes.shape;
	var any = _react.PropTypes.any;
	var App = exports.App = (_dec = (0, _reactRedux.connect)(bridalapp.connector), _dec(_class = (_temp = _class2 = function (_Component) {
		(0, _inherits3.default)(App, _Component);
	
		function App() {
			(0, _classCallCheck3.default)(this, App);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
		}
	
		(0, _createClass3.default)(App, [{
			key: 'getChildContext',
			value: function getChildContext() {
				return { lightbox: bridalapp.lightbox };
			}
		}, {
			key: 'render',
			value: function render() {
				_picolog2.default.debug('render', this.props);
				var _props = this.props;
				var auth = _props.auth;
				var managedStore = _props.stores.managedStore;
				var managedBrand = _props.brands.managedBrand;
				var leftDrawer = _props.leftDrawer;
				var rightDrawer = _props.rightDrawer;
				var lightbox = _props.lightbox;
				var className = _props.className;
				var appbarComponent = _props.appbarComponent;
				var mainComponent = _props.mainComponent;
	
				_picolog2.default.log('render: appbarComponent=', appbarComponent);
	
				var logo = 'https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png';
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
								_react2.default.createElement(_reactMdl.Icon, { name: 'menu' })
							),
							_react2.default.createElement(
								'div',
								{ className: 'mdl-layout__header-row' },
								_react2.default.createElement('img', { className: 'logo', src: 'https://cdn.rawgit.com/download/bridalapp-static/1.0.0/bridalapp/logo-bridalapp.png' }),
								_react2.default.createElement('div', { className: 'mdl-layout-spacer' }),
								_react2.default.createElement(
									_reactMdl.Navigation,
									{ className: 'ContextActions' },
									appbarComponent
								),
								_react2.default.createElement(
									_reactMdl.Navigation,
									{ className: 'RightDrawer' },
									_react2.default.createElement(_reactMdl.Icon, { name: 'account_circle', onClick: rightDrawer.onActivate })
								)
							)
						),
						_react2.default.createElement(
							_mdlExtras.Drawer,
							(0, _extends3.default)({ modal: true, autoClose: true }, leftDrawer),
							_react2.default.createElement(
								_mdlExtras.LayoutTitle,
								null,
								_react2.default.createElement('img', { className: 'logo', src: logo, alt: 'BridalApp' })
							),
							_react2.default.createElement(
								_reactMdl.Navigation,
								null,
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/Wedding+Dresses' },
									_react2.default.createElement(_mdlExtras.Sprite, { name: 'bridal-dress' }),
									' Wedding Dresses'
								),
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/stores' },
									_react2.default.createElement(_reactMdl.Icon, { name: 'store' }),
									' Bridal Stores'
								),
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/brands' },
									_react2.default.createElement(_reactMdl.Icon, { name: 'content_cut' }),
									' Bridal Brands'
								)
							)
						),
						_react2.default.createElement(
							_mdlExtras.Drawer,
							(0, _extends3.default)({ right: true, modal: true, autoClose: true }, rightDrawer),
							_react2.default.createElement(
								_mdlExtras.LayoutTitle,
								null,
								_react2.default.createElement(_SessionPanel2.default, auth)
							),
							managedStore || managedBrand ? _react2.default.createElement(
								_reactMdl.Navigation,
								null,
								managedStore ? _react2.default.createElement(
									_reactRouter.Link,
									{ to: '/store/' + managedStore.city + '/' + managedStore.name },
									_react2.default.createElement(_reactMdl.Icon, { name: 'store' }),
									' ',
									managedStore.name
								) : _react2.default.createElement('i', null),
								managedBrand ? _react2.default.createElement(
									_reactRouter.Link,
									{ to: '/brand/' + managedBrand.name },
									_react2.default.createElement(_reactMdl.Icon, { name: 'content_cut' }),
									' ',
									managedBrand.name
								) : _react2.default.createElement('i', null)
							) : '',
							auth.loggedIn ? _react2.default.createElement(
								_reactMdl.Navigation,
								null,
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: '/loved/Wedding+Dresses' },
									_react2.default.createElement(_reactMdl.Icon, { name: 'favorite' }),
									' My Favorites'
								)
							) : ''
						),
						_react2.default.createElement(
							_reactMdl.Content,
							{ className: 'main' },
							mainComponent
						),
						_react2.default.createElement(_AuthDialog2.default, auth),
						_react2.default.createElement(_mdlExtras.Lightbox, (0, _extends3.default)({ noNextOnClick: true, noImageCount: true }, lightbox))
					)
				);
			}
		}]);
		return App;
	}(_react.Component), _class2.propTypes = {
		auth: shape({
			loggedIn: bool.isRequired,
			challenged: bool.isRequired,
			onProvoke: func,
			onLogin: func,
			onLogout: func,
			onRegister: func,
			onCancel: func,
			user: shape({
				id: any.isRequired,
				name: string.isRequired
			})
		}).isRequired,
		stores: shape({
			managedStore: shape({
				id: any.isRequired,
				name: string.isRequired,
				city: string.isRequired
			})
		}).isRequired,
		brands: shape({
			managedBrand: shape({
				id: any.isRequired,
				name: string.isRequired
			})
		}).isRequired,
		leftDrawer: object,
		rightDrawer: object,
		lightbox: object,
		appbarComponent: any,
		mainComponent: any
	}, _class2.childContextTypes = {
		lightbox: shape({
			onOpenLightbox: func.isRequired
		}).isRequired
	}, _temp)) || _class);
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
	
	var _Entity = __webpack_require__(8);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _Role = __webpack_require__(20);
	
	var _Role2 = _interopRequireDefault(_Role);
	
	var _Group = __webpack_require__(36);
	
	var _Group2 = _interopRequireDefault(_Group);
	
	var _PasswordCredential = __webpack_require__(37);
	
	var _PasswordCredential2 = _interopRequireDefault(_PasswordCredential);
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Account = exports.Account = (0, _Entity2.default)(_class = function Account(id, name) {
		var credentials = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
		var roles = arguments.length <= 3 || arguments[3] === undefined ? [_Role2.default.USER] : arguments[3];
		var groups = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
		(0, _classCallCheck3.default)(this, Account);
	
		this.id = id || 0;
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
	exports.Group = undefined;
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _class;
	
	var _Entity = __webpack_require__(8);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Group = exports.Group = (0, _Entity2.default)(_class = function Group(id, name) {
		(0, _classCallCheck3.default)(this, Group);
	
		this.id = id;
		this.name = name;
	}) || _class;
	
	exports.default = Group;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.PasswordCredential = undefined;
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class;
	
	var _Entity = __webpack_require__(8);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _Credential2 = __webpack_require__(51);
	
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Brand = undefined;
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _class;
	
	var _Entity = __webpack_require__(8);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Brand = exports.Brand = (0, _Entity2.default)(_class = function Brand() {
	  (0, _classCallCheck3.default)(this, Brand);
	}) || _class;
	
	exports.default = Brand;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Product = undefined;
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _class;
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	var _Entity = __webpack_require__(8);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Product = exports.Product = (0, _Entity2.default)(_class = function Product() {
	  (0, _classCallCheck3.default)(this, Product);
	}) || _class;
	
	exports.default = Product;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Rating = undefined;
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _class;
	
	var _Entity = __webpack_require__(8);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Rating = exports.Rating = (0, _Entity2.default)(_class = function Rating() {
	  (0, _classCallCheck3.default)(this, Rating);
	}) || _class;
	
	exports.default = Rating;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.StockItem = undefined;
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _class;
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	var _Entity = __webpack_require__(8);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var StockItem = exports.StockItem = (0, _Entity2.default)(_class = function StockItem() {
	  (0, _classCallCheck3.default)(this, StockItem);
	}) || _class;
	
	exports.default = StockItem;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Store = undefined;
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _class;
	
	var _Entity = __webpack_require__(8);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Store = exports.Store = (0, _Entity2.default)(_class = function Store() {
	  (0, _classCallCheck3.default)(this, Store);
	}) || _class;
	
	exports.default = Store;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _stringify = __webpack_require__(44);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	exports.markupBefore = markupBefore;
	exports.markupAfter = markupAfter;
	
	var _serializeJavascript = __webpack_require__(85);
	
	var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function markupBefore(version, apiUrl, scripts) {
		var meta = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
		var production = arguments.length <= 4 || arguments[4] === undefined ? ("production") == 'production' : arguments[4];
	
		return '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta charset="utf-8" />\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1" />\n\t\t' + meta + '\n\t\t<link rel="shortcut icon" href="/favicon.ico" />\n\t\t<link rel="stylesheet" href="https://cdn.rawgit.com/tleunen/react-mdl/v1.5.3/extra/material.min.css" />\n\t\t<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />\n\t\t<link rel="stylesheet" href="/style.css?v' + version + '" />\n\t\t<script>\n\t\t\twindow.__bridalapp_api_server=\'' + apiUrl + '\';\n\t\t\twindow.mdlSuppressAutoUpgrade = true;\n\t\t</script>\n\t\t<script>(function(){\n\t\t\tvar loadScripts = (function() {return function(stagedScripts) {\n\t\t\t\tfunction loadStage(n) {\n\t\t\t\t\tvar scripts = Object.keys(stagedScripts[n]).map(function(key){return stagedScripts[n][key]});\n\t\t\t\t\tfor (var i=0,script; script=scripts[i]; i++) {loadScript(script);}\n\t\t\t\t\treturn function(){return stageLoaded(n);};\n\t\t\t\t}\n\t\t\t\tfunction loadScript(src) {if (src) {\n\t\t\t\t\tvar s = document.createElement(\'script\');\n\t\t\t\t\ts.async=true;  s.src=src;  s.charSet=\'UTF-8\';\n\t\t\t\t\tdocument.getElementsByTagName(\'head\')[0].appendChild(s);\n\t\t\t\t}}\n\t\t\t\tfunction stageLoaded(n) {\n\t\t\t\t\tvar deps = Object.keys(stagedScripts[n]);\n\t\t\t\t\tfor (var i=0,dep; dep=deps[i]; i++) {if (! window[dep]) {return false;}}\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t\tvar poll = (function(){var timeout; return function(check, cb, delay) {\n\t\t\t\t\t(function poller(){\n\t\t\t\t\t\tif (check()) {if (timeout) {clearTimeout(timeout); timeout=null;} cb();}\n\t\t\t\t\t\telse {timeout = setTimeout(poller, delay)}\n\t\t\t\t\t})()\n\t\t\t\t}})();\n\t\t\t\tvar loadNextStage = (function(){var stage=0; return function() {\n\t\t\t\t\tif (stage < stagedScripts.length) {poll(loadStage(stage++), loadNextStage, 50)}\n\t\t\t\t}})()\n\t\t\t\tloadNextStage();\n\t\t\t}})();\n\n\t\t\tloadScripts(' + (0, _stringify2.default)(scripts) + ');\n\t\t})()</script>\n\t</head>\n\t<body>\n\t\t<div id="bridalapp">';
	}
	
	function markupAfter(state) {
		return '</div>\n\t\t<script>\n\t\t\twindow.bridalapp_initial_state=' + (0, _serializeJavascript2.default)(state) + ';\n\t\t</script>\n\t</body>\n</html>\n';
	}

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = require("redux-async-api");

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(80);
	
	var buildPath = path.resolve(__dirname);
	var publicPath = path.resolve(__dirname, 'public');
	var testPath = path.resolve(publicPath, 'test');
	var pkg = __webpack_require__(68);
	
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
			protocol: process.env.OPENSHIFT_NODEJS_PROTOCOL || 'http://',
			host: process.env.OPENSHIFT_NODEJS_IP || undefined,
			port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 80,
			path: process.env.OPENSHIFT_NODEJS_PATH || '/',
			entry: './src/server',
			output: {
				filename: 'server.js',
				path: '',
			},
		},
		apiServer: {
			name: 'BridalApp API Server',
			protocol: process.env.BRIDALAPP_API_SERVER_PROTOCOL || 'http://',
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
	
	cfg.server.url = url(cfg.server);
	cfg.apiServer.url = url(cfg.apiServer);
	
	module.exports = cfg;
	
	function url(srv) {
		return srv.protocol + srv.host + (srv.port == '80' ? '' : ':' + srv.port) + srv.path;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.AuthDialog = undefined;
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(21);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactMdl = __webpack_require__(11);
	
	var _classnames = __webpack_require__(17);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlExtras = __webpack_require__(12);
	
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
	
				_picolog2.default.debug('render', this.props);
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
/* 51 */
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SessionPanel = undefined;
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(26);
	
	var _reactMdl = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bool = _react.PropTypes.bool;
	var number = _react.PropTypes.number;
	var string = _react.PropTypes.string;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var array = _react.PropTypes.array;
	var shape = _react.PropTypes.shape;
	var any = _react.PropTypes.any;
	var SessionPanel = exports.SessionPanel = (_temp = _class = function (_Component) {
		(0, _inherits3.default)(SessionPanel, _Component);
	
		function SessionPanel() {
			(0, _classCallCheck3.default)(this, SessionPanel);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SessionPanel).apply(this, arguments));
		}
	
		(0, _createClass3.default)(SessionPanel, [{
			key: 'render',
			value: function render() {
				_picolog2.default.debug('render', this.props);
				var _props = this.props;
				var onProvoke = _props.onProvoke;
				var onLogout = _props.onLogout;
				var user = _props.session.user;
				var children = _props.children;
	
				var profile = user ? '/profile/' + user.name : '';
				return _react2.default.createElement(
					'h4',
					null,
					user ? _react2.default.createElement(
						_reactMdl.Button,
						{ className: 'Logout', colored: true, onClick: onLogout },
						'Logout'
					) : _react2.default.createElement(
						_reactMdl.Button,
						{ className: 'Login', colored: true, raised: true, onClick: onProvoke },
						'Login'
					),
					_react2.default.createElement(
						_reactMdl.Navigation,
						{ className: 'Session' },
						user ? _react2.default.createElement(
							_reactRouter.Link,
							{ className: 'Profile', onClick: function onClick(e) {
									return e.preventDefault();
								}, to: profile },
							_react2.default.createElement(_reactMdl.Icon, { name: 'account_circle' }),
							' ',
							_react2.default.createElement(
								'span',
								{ title: user.name },
								user.name
							)
						) : _react2.default.createElement(
							'b',
							null,
							'Not logged in'
						)
					)
				);
			}
		}]);
		return SessionPanel;
	}(_react.Component), _class.propTypes = {
		onProvoke: func.isRequired,
		onLogout: func.isRequired,
		session: shape({
			user: shape({
				id: any.isRequired,
				name: string.isRequired
			})
		}).isRequired
	}, _temp);
	exports.default = SessionPanel;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BrandBrowserAppBar = exports.BrandBrowser = undefined;
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _dec2, _class, _class2, _temp, _dec3, _class3, _class4, _temp2;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _shallowEqual = __webpack_require__(25);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _reactRedux = __webpack_require__(23);
	
	var _reduxLoadApi = __webpack_require__(27);
	
	var _reactMdl = __webpack_require__(11);
	
	var _store = __webpack_require__(22);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _api = __webpack_require__(19);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _FilterPanel = __webpack_require__(29);
	
	var _FilterPanel2 = _interopRequireDefault(_FilterPanel);
	
	var _mdlExtras = __webpack_require__(12);
	
	var _Scroller = __webpack_require__(33);
	
	var _Scroller2 = _interopRequireDefault(_Scroller);
	
	var _BrandCard = __webpack_require__(54);
	
	var _BrandCard2 = _interopRequireDefault(_BrandCard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bool = _react.PropTypes.bool;
	var object = _react.PropTypes.object;
	var array = _react.PropTypes.array;
	var func = _react.PropTypes.func;
	var shape = _react.PropTypes.shape;
	var any = _react.PropTypes.any; // explicitly import to facilitate hot-reload
	
	function load(params) {
		_picolog2.default.log('load', params);
		return bridalapp.brands.search(params).then(function (results) {
			_picolog2.default.log('load: search returned ' + results.length + ' brands.');
			return results;
		}).catch(function (error) {
			_picolog2.default.error('Searching brands failed.', error);
			return error;
		});
	}
	
	var BrandBrowser = exports.BrandBrowser = (_dec = (0, _reduxLoadApi.onload)(load), _dec2 = (0, _reactRedux.connect)(bridalapp.brands.connector), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
		(0, _inherits3.default)(BrandBrowser, _React$Component);
	
		function BrandBrowser() {
			(0, _classCallCheck3.default)(this, BrandBrowser);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BrandBrowser).apply(this, arguments));
		}
	
		(0, _createClass3.default)(BrandBrowser, [{
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
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				_picolog2.default.debug('componentWillReceiveProps', nextProps);
				var newFilter = (0, _extends3.default)({}, nextProps.location.query, nextProps.params);
				var pathChanged = nextProps.location.pathname !== this.props.location.pathname;
				var queryChanged = !(0, _shallowEqual2.default)(nextProps.location.query, this.props.location.query);
				if (pathChanged || queryChanged || nextProps.pending && !this.props.pending) {
					load(newFilter);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				_picolog2.default.debug('render', this.props);
				var _props2 = this.props;
				var params = _props2.params;
				var location = _props2.location;
				var filter = _props2.filter;
				var onSearch = _props2.onSearch;
				var pending = _props2.pending;
				var error = _props2.error;
				var items = _props2.items;
				var onItemsChange = _props2.onItemsChange;
				var stockedItems = _props2.stockedItems;
				var item = _props2.item;
	
				var filterProps = (0, _extends3.default)({ onSearch: onSearch, location: location }, filter);
	
				return _react2.default.createElement(
					'div',
					{ style: { boxSizing: 'border-box', height: '100%' } },
					_react2.default.createElement(_FilterPanel2.default, filterProps),
					_react2.default.createElement(_Scroller2.default, {
						className: 'BrandBrowser ',
						bufferBefore: 2,
						items: items,
						bufferAfter: 4,
						renderItem: function renderItem(brand, idx) {
							var props = (0, _extends3.default)({ brand: brand }, item, { frontLoadDelay: idx < 10 ? 0 : 500, backLoadDelay: idx < 10 ? 0 : 2500 });
							return _react2.default.createElement(_BrandCard2.default, props);
						}
					})
				);
			}
		}]);
		return BrandBrowser;
	}(_react2.default.Component), _class2.propTypes = {
		params: object.isRequired,
		location: shape({
			query: object
		}).isRequired,
		filter: shape({
			values: object.isRequired
		}).isRequired,
		items: array.isRequired,
		pending: bool.isRequired,
		error: any,
		onSearch: func.isRequired,
		onItemsChange: func.isRequired,
		item: shape({
			onMayPublish: func.isRequired,
			onPublish: func.isRequired,
			onUnpublish: func.isRequired
		}).isRequired
	}, _temp)) || _class) || _class);
	exports.default = BrandBrowser;
	var BrandBrowserAppBar = exports.BrandBrowserAppBar = (_dec3 = (0, _reactRedux.connect)(bridalapp.brands.connector), _dec3(_class3 = (_temp2 = _class4 = function (_Component) {
		(0, _inherits3.default)(BrandBrowserAppBar, _Component);
	
		function BrandBrowserAppBar() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, BrandBrowserAppBar);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			var _this2 = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(BrandBrowserAppBar)).call.apply(_Object$getPrototypeO, [this].concat(args)));
	
			_this2.filterClicked = _this2.filterClicked.bind(_this2);
			return _this2;
		}
	
		(0, _createClass3.default)(BrandBrowserAppBar, [{
			key: 'filterClicked',
			value: function filterClicked(event) {
				_picolog2.default.log('filterClicked', event);
				if (event) {
					event.preventDefault();
				}
				var _props$filter = this.props.filter;
				var open = _props$filter.open;
				var onActivate = _props$filter.onActivate;
				var onCancel = _props$filter.onCancel;
	
				open ? onCancel() : onActivate();
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					_mdlExtras.Badge,
					{ className: 'mdl-navigation__link', text: '' + this.props.items.length, onClick: this.filterClicked },
					_react2.default.createElement(_reactMdl.Icon, { name: 'search' })
				);
			}
		}]);
		return BrandBrowserAppBar;
	}(_react.Component), _class4.propTypes = {
		filter: shape({
			open: bool.isRequired,
			onActivate: func.isRequired,
			onCancel: func.isRequired
		}).isRequired,
		items: array.isRequired
	}, _temp2)) || _class3);

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BrandCard = undefined;
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(21);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(17);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	var _reactMdl = __webpack_require__(11);
	
	var _mdlExtras = __webpack_require__(12);
	
	var _Publication2 = __webpack_require__(31);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var any = _react.PropTypes.any;
	var bool = _react.PropTypes.bool;
	var string = _react.PropTypes.string;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var shape = _react.PropTypes.shape;
	var BrandCard = exports.BrandCard = (_temp = _class = function (_Publication) {
		(0, _inherits3.default)(BrandCard, _Publication);
	
		function BrandCard() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, BrandCard);
	
			for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
				props[_key] = arguments[_key];
			}
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(BrandCard)).call.apply(_Object$getPrototypeO, [this].concat(props)));
	
			_this.state = { size: { height: '100%' } };
			return _this;
		}
	
		(0, _createClass3.default)(BrandCard, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.setState({ size: window.innerWidth < 480 ? { width: '100%' } : { height: '100%' } });
			}
		}, {
			key: 'thumbnailClicked',
			value: function thumbnailClicked(images, index, event) {
				var onOpenLightbox = this.context.lightbox.onOpenLightbox;
	
				onOpenLightbox(images, index, event);
				if (event) {
					event.preventDefault();event.stopPropagation();
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				var _props = this.props;
				var brand = _props.brand;
				var others = (0, _objectWithoutProperties3.default)(_props, ['brand']);
				var id = brand.id;
				var name = brand.name;
				var published = brand.published;
				var size = this.state.size;
	
				var bid = id.toString();
				var img = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
				var prdUrl = 'https://cdn.rawgit.com/Download/bridalapp-static/1.0.15/products/' + bid + '/Brand';
				var brandUrl = 'https://cdn.rawgit.com/Download/bridalapp-static/1.0.15/brands/' + bid + '/logo-brand-name.png';
				var thumbs = prdUrl + '/thumbs.jpg';
				var thumbnail = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
				var images = [{ src: prdUrl + '/back-large.jpg', className: 'back', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '300%', backgroundPosition: '100% 0' }) } }, { src: prdUrl + '/front-large.jpg', className: 'front', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '150%', backgroundPosition: '0 0' }) } }, { src: prdUrl + '/detail-1-large.jpg', className: 'detail-1', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '600%', backgroundPosition: '200% 200%' }) } }, { src: prdUrl + '/detail-2-large.jpg', className: 'detail-2', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '600%', backgroundPosition: '100% 200%' }) } }, { src: prdUrl + '/detail-3-large.jpg', className: 'detail-3', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '600%', backgroundPosition: '200% 100%' }) } }];
				var classes = (0, _classnames2.default)('Product', { 'unpublished': !published });
	
				return _react2.default.createElement(
					_mdlExtras.StatefulFlipCard,
					(0, _extends3.default)({ className: classes, key: bid }, others),
					_react2.default.createElement(
						_mdlExtras.FrontFace,
						null,
						_react2.default.createElement(
							'div',
							{ className: 'content' },
							_react2.default.createElement('img', { className: 'ProductImage', src: img, style: { backgroundImage: 'url(' + thumbs + ')', height: '100%' } }),
							this.mayPublish(brand) ? _react2.default.createElement(
								'div',
								{ className: 'ModActions' },
								published ? _react2.default.createElement(
									_reactMdl.FABButton,
									{ className: 'Unpublish', onClick: this.unpublishClicked.bind(this, brand) },
									_react2.default.createElement(_reactMdl.Icon, { name: 'visibility_off' })
								) : _react2.default.createElement(
									_reactMdl.FABButton,
									{ className: 'Publish', onClick: this.publishClicked.bind(this, brand) },
									_react2.default.createElement(_reactMdl.Icon, { name: 'visibility' })
								)
							) : ''
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
	}(_Publication2.Publication), _class.propTypes = {
		brand: shape({
			id: any,
			name: string
		}).isRequired
	}, _class.contextTypes = {
		lightbox: shape({
			onOpenLightbox: func.isRequired
		}).isRequired
	}, _temp);
	exports.default = BrandCard;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BrandsApi = undefined;
	
	var _defineProperties = __webpack_require__(14);
	
	var _defineProperties2 = _interopRequireDefault(_defineProperties);
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _class2, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(13);
	
	var _reduxFetchApi = __webpack_require__(18);
	
	var _api = __webpack_require__(32);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _Brand = __webpack_require__(38);
	
	var _Brand2 = _interopRequireDefault(_Brand);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BrandsApi = exports.BrandsApi = (0, _reduxFetchApi.remote)(_class = (_temp = _class2 = function (_PublicationApi) {
		(0, _inherits3.default)(BrandsApi, _PublicationApi);
	
		function BrandsApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? BrandsApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, BrandsApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BrandsApi).call(this, state));
	
			_this.setHandler(BrandsApi.SET_MANAGED_BRANDS, function (state, _ref) {
				var payload = _ref.payload;
				return (0, _extends3.default)({}, state, { managedBrands: payload });
			});
			_this.setHandler(BrandsApi.SET_MANAGED_BRAND_INDEX, function (state, _ref2) {
				var payload = _ref2.payload;
				return (0, _extends3.default)({}, state, { managedBrandIndex: payload });
			});
	
			(0, _defineProperties2.default)(_this, {
				managedBrands: { enumerable: true, get: function get() {
						return _this.getState().managedBrands;
					} },
				managedBrandIndex: { enumerable: true, get: function get() {
						return _this.getState().managedBrandIndex;
					} },
				managedBrand: { enumerable: true, get: function get() {
						return _this.managedBrands[_this.managedBrandIndex];
					} }
			});
			return _this;
		}
	
		(0, _createClass3.default)(BrandsApi, [{
			key: 'setManagedBrands',
			value: function setManagedBrands(brands) {
				return this.dispatch(this.createAction(BrandsApi.SET_MANAGED_BRANDS)(brands));
			}
		}, {
			key: 'setManagedBrandIndex',
			value: function setManagedBrandIndex(index) {
				return this.dispatch(this.createAction(BrandsApi.SET_MANAGED_BRAND_INDEX)(index));
			}
		}]);
		return BrandsApi;
	}(_api2.default), _class2.INITIAL_STATE = (0, _extends3.default)({}, _api2.default.INITIAL_STATE, {
		managedBrands: [],
		managedBrandIndex: 0
	}), _class2.SET_MANAGED_BRANDS = 'SET_MANAGED_BRANDS', _class2.SET_MANAGED_BRAND_INDEX = 'SET_MANAGED_BRAND_INDEX', _temp)) || _class;
	
	exports.default = BrandsApi;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.FilterFields = undefined;
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactMdl = __webpack_require__(11);
	
	var _mdlExtras = __webpack_require__(12);
	
	var _Entity = __webpack_require__(8);
	
	var _classnames = __webpack_require__(17);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var shape = _react.PropTypes.shape;
	var FilterFields = exports.FilterFields = (_temp = _class = function (_Component) {
		(0, _inherits3.default)(FilterFields, _Component);
	
		function FilterFields() {
			(0, _classCallCheck3.default)(this, FilterFields);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(FilterFields).apply(this, arguments));
		}
	
		(0, _createClass3.default)(FilterFields, [{
			key: 'clearField',
			value: function clearField(field, event) {
				_picolog2.default.info('clearField', field, event);
				event.preventDefault();
				var _props = this.props;
				var onApplyFields = _props.onApplyFields;
				var onSearch = _props.onSearch;
	
				field.onChange('');
			}
		}, {
			key: 'render',
			value: function render() {
				var _props2 = this.props;
				var fields = _props2.fields;
				var className = _props2.className;
				var children = _props2.children;
	
				var classes = (0, _classnames2.default)('FilterFields', className);
				return _react2.default.createElement(
					'div',
					{ className: classes },
					_react2.default.createElement(_mdlExtras.Textfield, (0, _extends3.default)({}, fields.q, { placeholder: 'Type here...' })),
					_react2.default.createElement(
						'a',
						{ className: 'clear-button', href: '#', onClick: this.clearField.bind(this, fields.q) },
						_react2.default.createElement(_reactMdl.Icon, { name: 'clear' })
					)
				);
			}
		}]);
		return FilterFields;
	}(_react.Component), _class.propTypes = {
		fields: shape({
			q: object.isRequired
		}).isRequired,
		onApplyFields: func.isRequired,
		onSearch: func.isRequired
	}, _temp);
	exports.default = FilterFields;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.EntityApi = exports.FilterApi = exports.FilterFields = undefined;
	
	var _promise = __webpack_require__(15);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _defineProperties = __webpack_require__(14);
	
	var _defineProperties2 = _interopRequireDefault(_defineProperties);
	
	var _keys = __webpack_require__(24);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp, _class2, _class3, _temp2;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(13);
	
	var _reduxAsyncApi = __webpack_require__(48);
	
	var _reduxFetchApi = __webpack_require__(18);
	
	var _shallowEqual = __webpack_require__(25);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _api = __webpack_require__(30);
	
	var _Entity = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FilterFields = exports.FilterFields = function (_Api) {
		(0, _inherits3.default)(FilterFields, _Api);
	
		function FilterFields(state) {
			(0, _classCallCheck3.default)(this, FilterFields);
	
			// query field is standard for all entities
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(FilterFields).call(this, state));
	
			_this.q = (0, _reduxApis.link)(_this, new _api.TextfieldApi());
			_this.q.type = 'text';
			return _this;
		}
	
		return FilterFields;
	}(_reduxApis.Api);
	
	var FilterApi = exports.FilterApi = (_temp = _class = function (_Api2) {
		(0, _inherits3.default)(FilterApi, _Api2);
	
		function FilterApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? FilterApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, FilterApi);
	
			var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(FilterApi).call(this, state));
	
			_this2.setHandler(FilterApi.ACTIVATE, function (state) {
				return (0, _extends3.default)({}, state, { open: true });
			});
			_this2.setHandler(FilterApi.CANCEL, function (state) {
				return (0, _extends3.default)({}, state, { open: false });
			});
			_this2.setHandler(FilterApi.SET_VALUES, function (state, _ref) {
				var payload = _ref.payload;
				return (0, _extends3.default)({}, state, { values: payload });
			});
			_this2.setHandler(FilterApi.APPLY_FIELDS, function (state) {
				var changed = false;
				var values = (0, _extends3.default)({}, _this2.values);
				var keys = (0, _keys2.default)(_this2.fields);
				for (var i = 0, key; key = keys[i]; i++) {
					if (_this2.fields[key].value !== values[key]) {
						changed = true;
						values[key] = _this2.fields[key].value;
					}
				}
				return changed ? (0, _extends3.default)({}, state, { values: values }) : state;
			});
	
			(0, _defineProperties2.default)(_this2, {
				open: { enumerable: true, get: function get() {
						return _this2.getState().open;
					} },
				values: { enumerable: true, get: function get() {
						return _this2.getState().values;
					} }
			});
			_this2.fields = _this2.createFields();
	
			_this2.onActivate = _this2.activate.bind(_this2);
			_this2.onCancel = _this2.cancel.bind(_this2);
			_this2.onApplyFields = _this2.applyFields.bind(_this2);
			return _this2;
		}
	
		(0, _createClass3.default)(FilterApi, [{
			key: 'activate',
			value: function activate() {
				this.dispatch(this.createAction(FilterApi.ACTIVATE)());
			}
		}, {
			key: 'cancel',
			value: function cancel() {
				this.dispatch(this.createAction(FilterApi.CANCEL)());
			}
		}, {
			key: 'applyFields',
			value: function applyFields() {
				this.dispatch(this.createAction(FilterApi.APPLY_FIELDS)());
				return this.values;
			}
		}, {
			key: 'setValues',
			value: function setValues(values) {
				var _this3 = this;
	
				this.dispatch(this.createAction(FilterApi.SET_VALUES)(values));
				(0, _keys2.default)(this.fields).forEach(function (key) {
					return _this3.fields[key].setValue(values[key]);
				});
			}
		}, {
			key: 'createFields',
			value: function createFields() {
				return (0, _reduxApis.link)(this, new FilterFields());
			}
		}]);
		return FilterApi;
	}(_reduxApis.Api), _class.INITIAL_STATE = {
		open: false,
		values: {}
	}, _class.ACTIVATE = 'ACTIVATE', _class.CANCEL = 'CANCEL', _class.SET_VALUES = 'SET_VALUES', _class.APPLY_FIELDS = 'APPLY_FIELDS', _temp);
	
	var EntityApi = exports.EntityApi = (0, _reduxFetchApi.remote)(_class2 = (_temp2 = _class3 = function (_Async) {
		(0, _inherits3.default)(EntityApi, _Async);
	
		function EntityApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? EntityApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, EntityApi);
	
			var _this4 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(EntityApi).call(this, state));
	
			_this4.setHandler(EntityApi.SET_FILTER, function (state, action) {
				return (0, _extends3.default)({}, state, { filter: action.payload });
			});
			_this4.setHandler(EntityApi.SET_ITEMS, function (state, action) {
				return (0, _extends3.default)({}, state, { items: action.payload });
			});
			_this4.setHandler(EntityApi.SET_PROCESSING, function (state, action) {
				return (0, _extends3.default)({}, state, { processing: action.payload });
			});
	
			(0, _defineProperties2.default)(_this4, {
				items: { enumerable: true, get: function get() {
						return _this4.getState().items;
					} },
				itemStates: { enumerable: true, get: function get() {
						return _this4.getState().itemStates;
					} }
			});
	
			_this4.onSearch = function () {
				return _this4.search();
			};
			_this4.onItemsChange = _this4.setItems.bind(_this4);
			_this4.onItemStatesChange = _this4.setItemStates.bind(_this4);
	
			_this4.item = {
				itemState: _this4.itemState.bind(_this4),
				onItemStateChange: _this4.setItemState.bind(_this4),
				onItemSave: _this4.save.bind(_this4)
			};
	
			_this4.filter = _this4.createFilter();
			return _this4;
		}
	
		(0, _createClass3.default)(EntityApi, [{
			key: 'itemState',
			value: function itemState(item) {
				return this.items[item.id] || _reduxAsyncApi.Async.DONE;
			}
		}, {
			key: 'setItemState',
			value: function setItemState(item, newState) {
				var newStates = (0, _extends3.default)({}, this.itemStates);
				if (newState != DONE) {
					newStates[item.id] = newState;
				} else {
					delete newStates[item.id];
				}
				this.setItemStates(newStates);
				return this;
			}
		}, {
			key: 'save',
			value: function save(item) {
				var _this5 = this;
	
				_picolog2.default.log('save', item);
				var result = _promise2.default.resolve(item);
				if (this.itemState(item) !== _reduxAsyncApi.Async.BUSY) {
					this.itemState(item, _reduxAsyncApi.Async.BUSY);
					result = this.fetch('', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: (0, _Entity.toJSON)(item)
					}).then(function (response) {
						if (response && response.status == 200) {
							return response.text();
						}
						return response.text().then(function (text) {
							var error = Error(text);
							error.status = response.status;
							error.statusText = response.statusText;
							throw error;
						});
					}).then(function (text) {
						_this5.itemState(item, _reduxAsyncApi.Async.DONE);
						return (0, _Entity.fromJSON)(text);
					}).catch(function (error) {
						_this5.itemState(item, error);
						throw error;
					});
				}
				return result;
			}
		}, {
			key: 'setItems',
			value: function setItems(items) {
				_picolog2.default.debug('setItems', items);
				this.dispatch(this.createAction(EntityApi.SET_ITEMS)(items));
			}
		}, {
			key: 'setItemStates',
			value: function setItemStates(itemStates) {
				_picolog2.default.debug('setItemStates', itemStates);
				this.dispatch(this.createAction(EntityApi.SET_ITEM_STATES)(itemStates));
			}
		}, {
			key: 'searchUrl',
			value: function searchUrl(filter) {
				var keys = (0, _keys2.default)(filter);
				var result = '';
				for (var i = 0, key; key = keys[i]; i++) {
					result += result ? '&' : '?';
					result += encodeURIComponent(key) + '=' + encodeURIComponent(filter[key]);
				}
				return result;
			}
		}, {
			key: 'search',
			value: function search(params) {
				var _this6 = this;
	
				if (params && !(0, _shallowEqual2.default)(this.filter.values, params)) {
					this.filter.setValues(params);
				}
				var url = this.searchUrl(this.filter.values);
				_picolog2.default.log('search', url);
				this.setBusy();
				return new _promise2.default(function (resolve, reject) {
					_this6.fetch(url).then(function (response) {
						return response && response.status === 200 ? response.text() : new _promise2.default(function (ok, err) {
							response.text().then(function (text) {
								var error = Error(text);
								error.message = text;
								error.status = response.status;
								error.statusText = response.statusText;
								err(error);
							});
						});
					}).then(function (text) {
						return (0, _Entity.fromJSON)(text);
					}).then(function (json) {
						_picolog2.default.debug('search: OK got ' + json.length + ' results');
						_this6.setItems(json);
						_this6.setDone();
						return json;
					}).then(resolve).catch(function (error) {
						_picolog2.default.info('search: error=', error);
						_this6.setError(error);
						reject(error);
					});
				});
			}
		}, {
			key: 'createFilter',
			value: function createFilter() {
				return (0, _reduxApis.link)(this, new FilterApi());
			}
		}]);
		return EntityApi;
	}(_reduxAsyncApi.Async), _class3.INITIAL_STATE = (0, _extends3.default)({}, _reduxAsyncApi.Async.INITIAL_STATE, {
		items: [],
		itemStates: {}
	}), _class3.SET_FILTER = 'SET_FILTER', _class3.SET_ITEMS = 'SET_ITEMS', _class3.SET_ITEM_STATES = 'SET_ITEM_STATES', _temp2)) || _class2;
	
	exports.default = EntityApi;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(9);
	
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ProductBrowserAppBar = exports.ProductBrowser = undefined;
	
	var _promise = __webpack_require__(15);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _keys = __webpack_require__(24);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _dec2, _class, _class2, _temp, _dec3, _class3, _class4, _temp2;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _shallowEqual = __webpack_require__(25);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _reactRedux = __webpack_require__(23);
	
	var _reduxLoadApi = __webpack_require__(27);
	
	var _reactMdl = __webpack_require__(11);
	
	var _store = __webpack_require__(22);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _api = __webpack_require__(19);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _Entity = __webpack_require__(8);
	
	var _FilterPanel = __webpack_require__(29);
	
	var _FilterPanel2 = _interopRequireDefault(_FilterPanel);
	
	var _mdlExtras = __webpack_require__(12);
	
	var _Scroller = __webpack_require__(33);
	
	var _Scroller2 = _interopRequireDefault(_Scroller);
	
	var _ProductCard = __webpack_require__(60);
	
	var _ProductCard2 = _interopRequireDefault(_ProductCard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bool = _react.PropTypes.bool;
	var array = _react.PropTypes.array;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var shape = _react.PropTypes.shape;
	var any = _react.PropTypes.any; // explicitly import to facilitate hot-reload
	
	var ANIMATION_TIME = 510;
	
	function load(params) {
		_picolog2.default.log('load', params);
		return bridalapp.products.search(params).then(function (results) {
			_picolog2.default.debug('load: search returned ' + results.length + ' products.');
			return results;
		}).catch(function (error) {
			_picolog2.default.error('Searching products failed.', error);
			return error;
		});
	}
	
	var ProductBrowser = exports.ProductBrowser = (_dec = (0, _reduxLoadApi.onload)(load), _dec2 = (0, _reactRedux.connect)(bridalapp.products.connector), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
		(0, _inherits3.default)(ProductBrowser, _React$Component);
	
		function ProductBrowser() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, ProductBrowser);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(ProductBrowser)).call.apply(_Object$getPrototypeO, [this].concat(args)));
	
			_this.state = { removing: {}, filterPanelOpen: false };
			return _this;
		}
	
		(0, _createClass3.default)(ProductBrowser, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				_picolog2.default.debug('componentDidMount()');
				var _props = this.props;
				var params = _props.params;
				var query = _props.location.query;
				var pending = _props.pending;
				var error = _props.error;
	
				if (pending || error) {
					load((0, _extends3.default)({}, query, params));
				}
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				_picolog2.default.debug('componentWillReceiveProps', nextProps);
				var newFilter = (0, _extends3.default)({}, nextProps.location.query, nextProps.params);
				var pathChanged = nextProps.location.pathname !== this.props.location.pathname;
				var queryChanged = !(0, _shallowEqual2.default)(nextProps.location.query, this.props.location.query);
				if (pathChanged || queryChanged || nextProps.pending && !this.props.pending) {
					if ((0, _keys2.default)(this.state.removing).length > 0) {
						this.setState({ removing: {} });
					}
					load(newFilter);
				}
			}
		}, {
			key: 'dislike',
			value: function dislike(product) {
				var _this2 = this;
	
				_picolog2.default.log('dislike', product);
				var pid = product.id.toString();
				if (bridalapp.auth.loggedIn) {
					var removing = (0, _extends3.default)({}, this.state.removing);
					removing[pid] = 'disliked';
					this.setState((0, _extends3.default)({}, this.state, { removing: removing }));
				}
				var timer = new _promise2.default(function (resolve) {
					return setTimeout(function () {
						return resolve();
					}, ANIMATION_TIME);
				});
				return _promise2.default.all([timer, this.props.item.onDislike(product)]).then(function () {
					var _props2 = _this2.props;
					var items = _props2.items;
					var onItemsChange = _props2.onItemsChange;var idx = (0, _Entity.indexOf)(items, product);
					if (idx >= 0) {
						onItemsChange(items.slice(0, idx).concat(items.slice(idx + 1)));
					}
					var removing = (0, _extends3.default)({}, _this2.state.removing);
					delete removing[pid];
					_this2.setState((0, _extends3.default)({}, _this2.state, { removing: removing }));
				});
			}
		}, {
			key: 'love',
			value: function love(product) {
				var _this3 = this;
	
				_picolog2.default.log('love', product);
				var pid = product.id.toString();
				if (bridalapp.auth.loggedIn) {
					var removing = (0, _extends3.default)({}, this.state.removing);
					removing[pid] = 'loved';
					this.setState((0, _extends3.default)({}, this.state, { removing: removing }));
				}
				var timer = new _promise2.default(function (resolve) {
					return setTimeout(function () {
						return resolve();
					}, ANIMATION_TIME);
				});
				return _promise2.default.all([timer, this.props.item.onLove(product)]).then(function () {
					var _props3 = _this3.props;
					var items = _props3.items;
					var onItemsChange = _props3.onItemsChange;var idx = (0, _Entity.indexOf)(items, product);
					if (idx >= 0) {
						onItemsChange(items.slice(0, idx).concat(items.slice(idx + 1)));
					}
					var removing = (0, _extends3.default)({}, _this3.state.removing);
					delete removing[pid];
					_this3.setState((0, _extends3.default)({}, _this3.state, { removing: removing }));
				});
			}
		}, {
			key: 'undoRating',
			value: function undoRating(product) {
				var _this4 = this;
	
				_picolog2.default.log('undoRating', product);
				var pid = product.id.toString();
				if (bridalapp.auth.loggedIn) {
					var removing = (0, _extends3.default)({}, this.state.removing);
					removing[pid] = 'undoRating';
					this.setState((0, _extends3.default)({}, this.state, { removing: removing }));
				}
				var timer = new _promise2.default(function (resolve) {
					return setTimeout(function () {
						return resolve();
					}, ANIMATION_TIME);
				});
				return _promise2.default.all([timer, this.props.item.onUndoRating(product)]).then(function () {
					var _props4 = _this4.props;
					var items = _props4.items;
					var onItemsChange = _props4.onItemsChange;var idx = (0, _Entity.indexOf)(items, product);
					if (idx >= 0) {
						onItemsChange(items.slice(0, idx).concat(items.slice(idx + 1)));
					}
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this5 = this;
	
				var _props5 = this.props;
				var params = _props5.params;
				var location = _props5.location;
				var filter = _props5.filter;
				var onSearch = _props5.onSearch;
				var pending = _props5.pending;
				var error = _props5.error;
				var items = _props5.items;
				var onItemsChange = _props5.onItemsChange;
				var stockedItems = _props5.stockedItems;
	
	
				_picolog2.default.debug('render', (0, _keys2.default)(stockedItems).join(' '));
				var item = (0, _extends3.default)({}, this.props.item, {
					onDislike: this.dislike.bind(this),
					onLove: this.love.bind(this),
					onUndoRating: this.undoRating.bind(this)
				});
				var state = (0, _keys2.default)(stockedItems).join(' ') + ', ' + (0, _keys2.default)(this.state.removing).join(' ');
				var filterProps = (0, _extends3.default)({ onSearch: onSearch, location: location }, filter);
				return _react2.default.createElement(
					'div',
					{ style: { boxSizing: 'border-box', height: '100%' } },
					_react2.default.createElement(_FilterPanel2.default, filterProps),
					_react2.default.createElement(_Scroller2.default, {
						className: 'ProductBrowser ' + filter.values.category,
						bufferBefore: 4,
						items: items,
						itemSize: 580,
						bufferAfter: 16,
						renderItem: function renderItem(product, idx) {
							var pid = product.id.toString();
							var props = (0, _extends3.default)({ product: product }, item, { rating: filter.values.rating, stocked: !!stockedItems[pid],
								removing: _this5.state.removing[pid], frontLoadDelay: idx < 10 ? 0 : 500, backLoadDelay: idx < 10 ? 0 : 2500 });
							return _react2.default.createElement(_ProductCard2.default, props);
						},
						state: state
					})
				);
			}
		}]);
		return ProductBrowser;
	}(_react2.default.Component), _class2.propTypes = {
		params: object.isRequired,
		location: shape({
			query: object
		}).isRequired,
		filter: shape({
			values: object.isRequired
		}).isRequired,
		items: array.isRequired,
		stockedItems: object.isRequired,
		pending: bool.isRequired,
		error: any,
		onSearch: func.isRequired,
		onItemsChange: func.isRequired,
		item: shape({
			onMayPublish: func.isRequired,
			onPublish: func.isRequired,
			onUnpublish: func.isRequired,
			onLove: func.isRequired,
			onDislike: func.isRequired,
			onUndoRating: func.isRequired,
			onMayToggleStock: func.isRequired,
			onIsStocked: func.isRequired,
			onToggleStock: func.isRequired
		}).isRequired
	}, _temp)) || _class) || _class);
	exports.default = ProductBrowser;
	var ProductBrowserAppBar = exports.ProductBrowserAppBar = (_dec3 = (0, _reactRedux.connect)(bridalapp.products.connector), _dec3(_class3 = (_temp2 = _class4 = function (_Component) {
		(0, _inherits3.default)(ProductBrowserAppBar, _Component);
	
		function ProductBrowserAppBar() {
			var _Object$getPrototypeO2;
	
			(0, _classCallCheck3.default)(this, ProductBrowserAppBar);
	
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}
	
			var _this6 = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO2 = (0, _getPrototypeOf2.default)(ProductBrowserAppBar)).call.apply(_Object$getPrototypeO2, [this].concat(args)));
	
			_this6.filterClicked = _this6.filterClicked.bind(_this6);
			return _this6;
		}
	
		(0, _createClass3.default)(ProductBrowserAppBar, [{
			key: 'filterClicked',
			value: function filterClicked(event) {
				_picolog2.default.log('filterClicked', event);
				if (event) {
					event.preventDefault();
				}
				var _props$filter = this.props.filter;
				var open = _props$filter.open;
				var onActivate = _props$filter.onActivate;
				var onCancel = _props$filter.onCancel;
	
				open ? onCancel() : onActivate();
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					_mdlExtras.Badge,
					{ className: 'mdl-navigation__link', text: '' + this.props.items.length, onClick: this.filterClicked },
					_react2.default.createElement(_reactMdl.Icon, { name: 'search' })
				);
			}
		}]);
		return ProductBrowserAppBar;
	}(_react.Component), _class4.propTypes = {
		filter: shape({
			open: bool.isRequired,
			onActivate: func.isRequired,
			onCancel: func.isRequired
		}).isRequired,
		items: array.isRequired
	}, _temp2)) || _class3);

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ProductCard = undefined;
	
	var _objectWithoutProperties2 = __webpack_require__(21);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _typeof2 = __webpack_require__(16);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _toConsumableArray2 = __webpack_require__(46);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(17);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	var _reactMdl = __webpack_require__(11);
	
	var _mdlExtras = __webpack_require__(12);
	
	var _Publication2 = __webpack_require__(31);
	
	var _Publication3 = _interopRequireDefault(_Publication2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var any = _react.PropTypes.any;
	var bool = _react.PropTypes.bool;
	var string = _react.PropTypes.string;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var shape = _react.PropTypes.shape;
	var ProductCard = exports.ProductCard = (_temp = _class = function (_Publication) {
		(0, _inherits3.default)(ProductCard, _Publication);
	
		function ProductCard() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, ProductCard);
	
			for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
				props[_key] = arguments[_key];
			}
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(ProductCard)).call.apply(_Object$getPrototypeO, [this].concat(props)));
	
			_this.state = { size: { height: '100%' } };
			return _this;
		}
	
		(0, _createClass3.default)(ProductCard, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.setState.apply(this, (0, _toConsumableArray3.default)(this.state).concat([{ size: window.innerWidth < 480 ? { width: '100%' } : { height: '100%' } }]));
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object' && nextProps.removing) {
					var node = ReactDOM.findDOMNode(this);
					var newState = (0, _extends3.default)({}, this.state, { rect: node.getBoundingClientRect(), win: window.innerWidth });
					this.setState(newState);
					_picolog2.default.debug('componentWillReceiveProps: state=', this.state, ', newState=', newState);
				}
			}
		}, {
			key: 'thumbnailClicked',
			value: function thumbnailClicked(images, index, event) {
				_picolog2.default.log('thumbnailClicked', images, index, event);
				var onOpenLightbox = this.context.lightbox.onOpenLightbox;
	
				if (event) {
					event.preventDefault();event.stopPropagation();
				}
				onOpenLightbox(images, index, event);
			}
		}, {
			key: 'dislikeClicked',
			value: function dislikeClicked(product, event) {
				_picolog2.default.log('dislikeClicked', product, event);
				if (event) {
					event.preventDefault();event.stopPropagation();
				}
				return this.props.onDislike(product);
			}
		}, {
			key: 'loveClicked',
			value: function loveClicked(product, event) {
				_picolog2.default.log('loveClicked', product, event);
				if (event) {
					event.preventDefault();event.stopPropagation();
				}
				return this.props.onLove(product);
			}
		}, {
			key: 'undoRatingClicked',
			value: function undoRatingClicked(product, event) {
				_picolog2.default.log('undoRatingClicked', product, event);
				if (event) {
					event.preventDefault();event.stopPropagation();
				}
				return this.props.onUndoRating(product);
			}
		}, {
			key: 'mayToggleStock',
			value: function mayToggleStock(product) {
				_picolog2.default.trace('mayToggleStock', product);
				var result = this.props.onMayToggleStock(product);
				_picolog2.default.trace('mayToggleStock => ' + result);
				return result;
			}
		}, {
			key: 'isStocked',
			value: function isStocked(product) {
				_picolog2.default.trace('isStocked', product);
				var result = this.props.onIsStocked(product);
				_picolog2.default.trace('isStocked => ' + result);
				return result;
			}
		}, {
			key: 'toggleStockClicked',
			value: function toggleStockClicked(product, event) {
				_picolog2.default.log('toggleStockClicked', product, event);
				if (event) {
					event.preventDefault();event.stopPropagation();
				}
				return this.props.onToggleStock(product);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				_picolog2.default.debug('render', this.props);
				var _props = this.props;
				var className = _props.className;
				var product = _props.product;
				var rating = _props.rating;
				var stocked = _props.stocked;
				var onLove = _props.onLove;
				var onDislike = _props.onDislike;
				var onUndoRating = _props.onUndoRating;
				var removing = _props.removing;
				var others = (0, _objectWithoutProperties3.default)(_props, ['className', 'product', 'rating', 'stocked', 'onLove', 'onDislike', 'onUndoRating', 'removing']);
	
				if (stocked) _picolog2.default.debug('render: stocked ', product.id.toString());
				var id = product.id;
				var name = product.name;
				var brandId = product.brandId;
				var brandName = product.brandName;
				var description = product.description;
				var published = product.published;
				var _state = this.state;
				var size = _state.size;
				var rect = _state.rect;
				var win = _state.win;
	
				var pid = (0, _ws2.default)(id).toString();
				var bid = (0, _ws2.default)(brandId).toString();
				var flipCard = this.refs.flipCard;
	
				var img = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
				var prdUrl = 'https://cdn.rawgit.com/Download/bridalapp-static/1.0.15/products/' + bid + '/' + encodeURIComponent(name);
				var brandUrl = 'https://cdn.rawgit.com/Download/bridalapp-static/1.0.15/brands/' + bid + '/logo-brand-name.png';
				var thumbs = prdUrl + '/thumbs.jpg';
				var thumbnail = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
				var images = [{ src: prdUrl + '/back-large.jpg', className: 'back', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '300%', backgroundPosition: '100% 0' }) } }, { src: prdUrl + '/front-large.jpg', className: 'front', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '150%', backgroundPosition: '0 0' }) } }, { src: prdUrl + '/detail-1-large.jpg', className: 'detail-1', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '600%', backgroundPosition: '200% 200%' }) } }, { src: prdUrl + '/detail-2-large.jpg', className: 'detail-2', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '600%', backgroundPosition: '100% 200%' }) } }, { src: prdUrl + '/detail-3-large.jpg', className: 'detail-3', alt: { src: img, style: (0, _extends3.default)({}, size, { backgroundImage: 'url(' + thumbs + ')', backgroundSize: '600%', backgroundPosition: '200% 100%' }) } }];
				var classes = (0, _classnames2.default)('Product', className, { 'unpublished': !published, 'removing': removing,
					'loved': removing === 'loved', 'disliked': removing === 'disliked' });
				var width = rect ? rect.right - rect.left : 0;
				var height = rect ? rect.bottom - rect.top : 0;
				var trans = removing === 'disliked' || removing === 'undoRating' ? 0 - rect.left - width : removing === 'loved' ? win - rect.left : '';
				var transform = 'translate3d(' + trans + 'px, 0, 10px) scale3d(0.2, 0.2, 0.2)';
				var style = removing ? { width: width, height: height, transform: transform, WebkitTransform: transform } : {};
				return _react2.default.createElement(
					_mdlExtras.StatefulFlipCard,
					(0, _extends3.default)({ className: classes, key: id, style: style }, others),
					_react2.default.createElement(
						_mdlExtras.FrontFace,
						null,
						_react2.default.createElement(
							'div',
							{ className: 'content' },
							_react2.default.createElement('img', { className: 'ProductImage', src: img, style: { backgroundImage: 'url(' + thumbs + ')', height: '100%' } }),
							!rating ? _react2.default.createElement(
								'div',
								{ className: 'RatingActions' },
								_react2.default.createElement(
									_reactMdl.FABButton,
									{ colored: true, className: 'Rate disliked danger', onClick: this.dislikeClicked.bind(this, product) },
									_react2.default.createElement(_mdlExtras.Sprite, { name: 'broken-heart' })
								),
								_react2.default.createElement(
									_reactMdl.FABButton,
									{ colored: true, className: 'Rate loved', onClick: this.loveClicked.bind(this, product) },
									_react2.default.createElement(_reactMdl.Icon, { name: 'favorite' })
								)
							) : _react2.default.createElement(
								'div',
								{ className: 'RatingActions' },
								_react2.default.createElement(
									_reactMdl.Button,
									{ onClick: this.undoRatingClicked.bind(this, product) },
									rating == 'disliked' ? _react2.default.createElement(_mdlExtras.Sprite, { name: 'broken-heart' }) : _react2.default.createElement(_reactMdl.Icon, { name: 'favorite' }),
									'undo'
								)
							),
							this.mayPublish(product) ? _react2.default.createElement(
								'div',
								{ className: 'ModActions' },
								published ? _react2.default.createElement(
									_reactMdl.FABButton,
									{ className: 'Unpublish', onClick: this.unpublishClicked.bind(this, product) },
									_react2.default.createElement(_reactMdl.Icon, { name: 'visibility_off' })
								) : _react2.default.createElement(
									_reactMdl.FABButton,
									{ className: 'Publish', onClick: this.publishClicked.bind(this, product) },
									_react2.default.createElement(_reactMdl.Icon, { name: 'visibility' })
								)
							) : '',
							this.mayToggleStock(product) ? _react2.default.createElement(
								'div',
								{ className: 'ActorActions' },
								_react2.default.createElement(_mdlExtras.Switch, { on: stocked, name: 'stock' + product.id, sprite: 'stock',
									onChange: this.toggleStockClicked.bind(this, product) })
							) : ''
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
							_reactMdl.CardText,
							{ className: 'ProductDescription' },
							description || ''
						)
					)
				);
			}
		}]);
		return ProductCard;
	}(_Publication3.default), _class.propTypes = {
		className: string,
		product: shape({
			id: any,
			name: string,
			brandId: any,
			brandName: string,
			description: string,
			published: bool
		}).isRequired,
		rating: string,
		stocked: bool,
		onLove: func.isRequired,
		onDislike: func.isRequired,
		onUndoRating: func.isRequired,
		onMayToggleStock: func.isRequired,
		onToggleStock: func.isRequired,
		removing: string
	}, _class.defaultProps = {
		removing: ''
	}, _class.contextTypes = {
		lightbox: shape({
			onOpenLightbox: func.isRequired
		}).isRequired
	}, _temp);
	exports.default = ProductCard;
	
	//								<FABButton className="Unclaim" onClick={this.unclaimClicked.bind(this, product)}><Sprite name="disable-stock" /></FABButton>
	//								<FABButton className="Claim" onClick={this.claimClicked.bind(this, product)}><Sprite name="stock" /></FABButton>

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ProductsApi = undefined;
	
	var _defineProperty2 = __webpack_require__(45);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _promise = __webpack_require__(15);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _defineProperties = __webpack_require__(14);
	
	var _defineProperties2 = _interopRequireDefault(_defineProperties);
	
	var _extends3 = __webpack_require__(7);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _get2 = __webpack_require__(72);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _class2, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(13);
	
	var _reduxFetchApi = __webpack_require__(18);
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	var _Entity = __webpack_require__(8);
	
	var _Role = __webpack_require__(20);
	
	var _api = __webpack_require__(32);
	
	var _Product = __webpack_require__(39);
	
	var _StockItem = __webpack_require__(41);
	
	var _Rating = __webpack_require__(40);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ProductsApi = exports.ProductsApi = (0, _reduxFetchApi.remote)(_class = (_temp = _class2 = function (_PublicationApi) {
		(0, _inherits3.default)(ProductsApi, _PublicationApi);
	
		function ProductsApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? ProductsApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, ProductsApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProductsApi).call(this, state));
	
			_this.setHandler(ProductsApi.SET_STOCK, function (state, _ref) {
				var payload = _ref.payload;
				return (0, _extends4.default)({}, state, { stockedItems: payload });
			});
			(0, _defineProperties2.default)(_this, {
				stockedItems: { enumerable: true, get: function get() {
						return _this.getState().stockedItems;
					} }
			});
			_this.item.onLove = _this.love.bind(_this);
			_this.item.onDislike = _this.dislike.bind(_this);
			_this.item.onUndoRating = _this.undoRating.bind(_this);
			_this.item.onMayToggleStock = _this.mayToggleStock.bind(_this);
			_this.item.onIsStocked = _this.isStocked.bind(_this);
			_this.item.onToggleStock = _this.toggleStock.bind(_this);
			return _this;
		}
	
		(0, _createClass3.default)(ProductsApi, [{
			key: 'searchUrl',
			value: function searchUrl(filter) {
				var result = filter.category ? '/' + filter.category : '/Wedding+Dresses';
				var clone = (0, _extends4.default)({}, filter);
				delete clone.category;
				return result + (0, _get3.default)((0, _getPrototypeOf2.default)(ProductsApi.prototype), 'searchUrl', this).call(this, clone);
			}
		}, {
			key: 'search',
			value: function search(params) {
				var _this2 = this;
	
				_picolog2.default.log('search');
				var store = this.getParent().stores.managedStore;
				var storeLoaded = store ? _promise2.default.resolve(store) : this.auth.isAny(_Role.Role.STORE_ROLES) ? this.getParent().stores.loadManagedStores().then(function () {
					return _this2.getParent().stores.managedStore;
				}) : _promise2.default.resolve(null);
	
				var stockLoaded = storeLoaded.then(function (store) {
					_picolog2.default.debug('storeLoaded: ', store);
					return store ? _this2.loadStock(store) : _promise2.default.resolve({});
				});
	
				return stockLoaded.then(function (stock) {
					_picolog2.default.debug('stockLoaded: ', stock);
					return (0, _get3.default)((0, _getPrototypeOf2.default)(ProductsApi.prototype), 'search', _this2).call(_this2, params);
				});
			}
		}, {
			key: 'rate',
			value: function rate(product, rating) {
				_picolog2.default.log('rate', product, rating);
				return this.fetch('/ratings', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: (0, _Entity.toJSON)(rating)
				}).then(function (response) {
					return response && response.status === 200 ? response.text() : (0, _Entity.toError)(response);
				}).then(function (text) {
					return (0, _Entity.fromJSON)(text);
				}).catch(function (error) {
					_picolog2.default.error('Unable to create rating for product ' + product.id.toString() + ' ' + product.name + ' by ' + product.brandName + '.', error);
				});
			}
		}, {
			key: 'unrate',
			value: function unrate(product) {
				_picolog2.default.log('unrate', product);
				return this.fetch('/ratings', {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
					body: (0, _Entity.toJSON)(product)
				}).then(function (response) {
					return response && response.status === 200 ? response.text() : (0, _Entity.toError)(response);
				}).then(function (text) {
					return (0, _Entity.fromJSON)(text);
				}).catch(function (error) {
					_picolog2.default.error('Unable to delete rating for product ' + product.id.toString() + ' ' + product.name + ' by ' + product.brandName + '.', error);
				});
			}
		}, {
			key: 'love',
			value: function love(product) {
				var _this3 = this;
	
				_picolog2.default.log('love', product);
				return this.authenticated().then(function (session) {
					_picolog2.default.debug('authenticated', session);
					var rating = { id: _ws2.default.next(), productId: product.id, accountId: session.user.id, score: 'loved' };
					return _this3.rate(product, new _Rating.Rating(rating));
				}).catch(function (error) {
					return _picolog2.default.log('authentication failed.', error);
				});
			}
		}, {
			key: 'dislike',
			value: function dislike(product) {
				var _this4 = this;
	
				_picolog2.default.log('dislike', product);
				return this.authenticated().then(function (session) {
					return _this4.rate(product, new _Rating.Rating({ id: _ws2.default.next(), productId: product.id, accountId: session.user.id, score: 'disliked' }));
				});
			}
		}, {
			key: 'undoRating',
			value: function undoRating(product) {
				_picolog2.default.log('undoRating', product);
				return this.unrate(product);
			}
		}, {
			key: 'loadStock',
			value: function loadStock(store) {
				var _this5 = this;
	
				_picolog2.default.debug('loadStock', store);
				return this.fetch('/stock?storeId=' + store.id.toString()).then(function (response) {
					return response && response.status === 200 ? response.text() : (0, _Entity.toError)(response);
				}).then(function (text) {
					return (0, _Entity.fromJSON)(text);
				}).then(function (json) {
					_picolog2.default.log('loadStock: OK got ' + json.length + ' results');
					var stock = {};
					for (var i = 0, stockItem; stockItem = json[i]; i++) {
						stock[stockItem.productId.toString()] = stockItem;
					}
					_this5.setStock(stock);
					_picolog2.default.debug('loadStock: this.stockedItems=', _this5.stockedItems);
					return stock;
				}).catch(function (error) {
					return _picolog2.default.error('loadStock: error=', error);
				});
			}
		}, {
			key: 'setStock',
			value: function setStock(stock) {
				_picolog2.default.debug('setStock', stock);
				return this.dispatch(this.createAction(ProductsApi.SET_STOCK)(stock));
			}
		}, {
			key: 'mayToggleStock',
			value: function mayToggleStock(product) {
				_picolog2.default.trace('mayToggleStock', product);
				var result = !!(this.getSession().user && this.getParent().stores.managedStore);
				_picolog2.default.trace('mayToggleStock => ' + result);
				return result;
			}
		}, {
			key: 'isStocked',
			value: function isStocked(product) {
				_picolog2.default.trace('isStocked', product);
				var result = !!this.stockedItems[product.id.toString()];
				_picolog2.default.trace('isStocked => ' + result);
				return result;
			}
		}, {
			key: 'toggleStock',
			value: function toggleStock(product) {
				var _this6 = this;
	
				var pid = product.id.toString();
				var store = this.getParent().stores.managedStore;
				if (!store) {
					return _promise2.default.reject(new Error('No managed store selected'));
				}
	
				var isStocked = this.isStocked(product);
				_picolog2.default.debug('toggleStock', !isStocked, pid, store);
	
				// optimistically set new stock before making the server call, giving
				// ultra-fast response time. Save the old state so we can rollback
				var stockItem = isStocked ? this.stockedItems[pid] : new _StockItem.StockItem({ id: _ws2.default.next(), storeId: store.id, productId: product.id });
				_picolog2.default.debug('toggleStock: stockItem=', stockItem);
				var newStock = (0, _extends4.default)({}, this.stockedItems);
				if (isStocked) {
					delete newStock[pid];
				} else {
					newStock[pid] = stockItem;
				}
				this.setStock(newStock);
				_picolog2.default.debug('toggleStock: OPTIMISTIC: newStock=', newStock);
				// now make the server call. If it fails, we need to rollback
				return this.fetch('/stock', {
					method: isStocked ? 'DELETE' : 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: (0, _Entity.toJSON)(stockItem)
				}).then(function (response) {
					return response && response.status === 200 ? response.text() : (0, _Entity.toError)(response);
				}).then(function (text) {
					return (0, _Entity.fromJSON)(text);
				}).then(function (stockItem) {
					_picolog2.default.debug('toggleStock: COMMIT: newStock=', newStock);
					// commit
					// in case of DELETE, nothing needs to be done
					// in case of CREATE, replace the stockItem with the saved one
					if (!isStocked) {
						_this6.setStock((0, _extends4.default)({}, _this6.stockedItems, (0, _defineProperty3.default)({}, pid, stockItem)));
					}
					return stockItem;
				}).catch(function (error) {
					_picolog2.default.error('Unable to toggle stock for product ' + product.id.toString() + ' ' + product.name + ' by ' + product.brandName + '.', error);
					// rollback
					// in case of DELETE, replace the stockItem with the original one
					// in case of CREATE, delete the stockItem again
					var newStock = (0, _extends4.default)({}, _this6.stockedItems);
					if (isStocked) {
						newStock[pid] = stockItem;
					} else {
						delete newStock[pid];
					}
					_this6.setStock(newStock);
				});
			}
		}]);
		return ProductsApi;
	}(_api.PublicationApi), _class2.SET_STOCK = 'SET_STOCK', _class2.INITIAL_STATE = (0, _extends4.default)({}, _api.PublicationApi.INITIAL_STATE, {
		stockedItems: {}
	}), _temp)) || _class;
	
	exports.default = ProductsApi;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.StoreBrowserAppBar = exports.StoreBrowser = undefined;
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _dec2, _class, _class2, _temp, _dec3, _class3, _class4, _temp2;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _shallowEqual = __webpack_require__(25);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _reactRedux = __webpack_require__(23);
	
	var _reduxLoadApi = __webpack_require__(27);
	
	var _reactMdl = __webpack_require__(11);
	
	var _store = __webpack_require__(22);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _api = __webpack_require__(19);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _FilterPanel = __webpack_require__(29);
	
	var _FilterPanel2 = _interopRequireDefault(_FilterPanel);
	
	var _mdlExtras = __webpack_require__(12);
	
	var _Scroller = __webpack_require__(33);
	
	var _Scroller2 = _interopRequireDefault(_Scroller);
	
	var _StoreCard = __webpack_require__(63);
	
	var _StoreCard2 = _interopRequireDefault(_StoreCard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bool = _react.PropTypes.bool;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var array = _react.PropTypes.array;
	var shape = _react.PropTypes.shape;
	var any = _react.PropTypes.any; // explicitly import to facilitate hot-reloading.
	
	function load(params) {
		_picolog2.default.log('load', params);
		return bridalapp.stores.search(params).then(function (results) {
			_picolog2.default.log('load: search returned ' + results.length + ' stores.');
			return results;
		}).catch(function (error) {
			_picolog2.default.error('Searching stores failed.', error);
			return error;
		});
	}
	
	var StoreBrowser = exports.StoreBrowser = (_dec = (0, _reduxLoadApi.onload)(load), _dec2 = (0, _reactRedux.connect)(bridalapp.stores.connector), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
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
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				_picolog2.default.debug('componentWillReceiveProps', nextProps);
				var newFilter = (0, _extends3.default)({}, nextProps.location.query, nextProps.params);
				var pathChanged = nextProps.location.pathname !== this.props.location.pathname;
				var queryChanged = !(0, _shallowEqual2.default)(nextProps.location.query, this.props.location.query);
				if (pathChanged || queryChanged || nextProps.pending && !this.props.pending) {
					load(newFilter);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				_picolog2.default.debug('render', this.props);
				var _props2 = this.props;
				var params = _props2.params;
				var location = _props2.location;
				var filter = _props2.filter;
				var onSearch = _props2.onSearch;
				var pending = _props2.pending;
				var error = _props2.error;
				var items = _props2.items;
				var onItemsChange = _props2.onItemsChange;
				var item = _props2.item;
	
				var filterProps = (0, _extends3.default)({ onSearch: onSearch, location: location }, filter);
	
				return _react2.default.createElement(
					'div',
					{ style: { boxSizing: 'border-box', height: '100%' } },
					_react2.default.createElement(_FilterPanel2.default, filterProps),
					_react2.default.createElement(_Scroller2.default, {
						className: 'StoreBrowser',
						bufferBefore: 4,
						items: items,
						bufferAfter: 8,
						renderItem: function renderItem(store, idx) {
							var props = (0, _extends3.default)({ store: store }, item, { frontLoadDelay: idx < 10 ? 0 : 500, backLoadDelay: idx < 10 ? 0 : 2500 });
							return _react2.default.createElement(_StoreCard2.default, props);
						}
					})
				);
			}
		}]);
		return StoreBrowser;
	}(_react2.default.Component), _class2.propTypes = {
		params: object.isRequired,
		location: shape({
			query: object
		}).isRequired,
		filter: shape({
			values: object.isRequired
		}).isRequired,
		items: array.isRequired,
		pending: bool.isRequired,
		error: any,
		onSearch: func.isRequired,
		onItemsChange: func.isRequired,
		item: shape({
			onMayPublish: func.isRequired,
			onPublish: func.isRequired,
			onUnpublish: func.isRequired
		}).isRequired
	}, _temp)) || _class) || _class);
	exports.default = StoreBrowser;
	var StoreBrowserAppBar = exports.StoreBrowserAppBar = (_dec3 = (0, _reactRedux.connect)(bridalapp.stores.connector), _dec3(_class3 = (_temp2 = _class4 = function (_Component) {
		(0, _inherits3.default)(StoreBrowserAppBar, _Component);
	
		function StoreBrowserAppBar() {
			var _Object$getPrototypeO;
	
			(0, _classCallCheck3.default)(this, StoreBrowserAppBar);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			var _this2 = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(StoreBrowserAppBar)).call.apply(_Object$getPrototypeO, [this].concat(args)));
	
			_this2.filterClicked = _this2.filterClicked.bind(_this2);
			return _this2;
		}
	
		(0, _createClass3.default)(StoreBrowserAppBar, [{
			key: 'filterClicked',
			value: function filterClicked(event) {
				_picolog2.default.log('filterClicked', event);
				if (event) {
					event.preventDefault();
				}
				var _props$filter = this.props.filter;
				var open = _props$filter.open;
				var onActivate = _props$filter.onActivate;
				var onCancel = _props$filter.onCancel;
	
				open ? onCancel() : onActivate();
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					_mdlExtras.Badge,
					{ className: 'mdl-navigation__link', text: '' + this.props.items.length, onClick: this.filterClicked },
					_react2.default.createElement(_reactMdl.Icon, { name: 'search' })
				);
			}
		}]);
		return StoreBrowserAppBar;
	}(_react.Component), _class4.propTypes = {
		filter: shape({
			open: bool.isRequired,
			onActivate: func.isRequired,
			onCancel: func.isRequired
		}).isRequired,
		items: array.isRequired
	}, _temp2)) || _class3);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.StoreCard = undefined;
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(17);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactMdl = __webpack_require__(11);
	
	var _ws = __webpack_require__(10);
	
	var _ws2 = _interopRequireDefault(_ws);
	
	var _mdlExtras = __webpack_require__(12);
	
	var _Publication2 = __webpack_require__(31);
	
	var _Publication3 = _interopRequireDefault(_Publication2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var any = _react.PropTypes.any;
	var bool = _react.PropTypes.bool;
	var string = _react.PropTypes.string;
	var object = _react.PropTypes.object;
	var func = _react.PropTypes.func;
	var shape = _react.PropTypes.shape;
	var StoreCard = exports.StoreCard = (_temp = _class = function (_Publication) {
		(0, _inherits3.default)(StoreCard, _Publication);
	
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
			key: 'impersonateClicked',
			value: function impersonateClicked(store, event) {
				_picolog2.default.log('impersonate', store, event);
				event.preventDefault();
				this.props.onImpersonate(store);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				_picolog2.default.debug('render', this.props);
				var _props = this.props;
				var store = _props.store;
				var mayImpersonate = _props.mayImpersonate;
				var id = store.id;
				var name = store.name;
				var description = store.description;
				var address1 = store.address1;
				var address2 = store.address2;
				var postalCode = store.postalCode;
				var city = store.city;
				var state = store.state;
				var countryCode = store.countryCode;
				var telephone = store.telephone;
				var website = store.website;
				var premium = store.premium;
				var published = store.published;
	
				var sid = id.toString();
				var logo = 'https://cdn.rawgit.com/Download/bridalapp-static/1.0.15/stores/' + sid + '/logo.png';
				var thumb = 'https://cdn.rawgit.com/Download/bridalapp-static/1.0.15/stores/' + sid + '/thumb.jpg';
				var classes = (0, _classnames2.default)('Store', { 'premium': premium, 'unpublished': !published });
				var publishButton = this.mayPublish(store) ? published ? _react2.default.createElement(
					_reactMdl.FABButton,
					{ className: 'Unpublish', onClick: this.unpublishClicked.bind(this, store) },
					_react2.default.createElement(_reactMdl.Icon, { name: 'visibility_off' })
				) : _react2.default.createElement(
					_reactMdl.FABButton,
					{ className: 'Publish', onClick: this.publishClicked.bind(this, store) },
					_react2.default.createElement(_reactMdl.Icon, { name: 'visibility' })
				) : '';
				var impersonateButton = mayImpersonate ? _react2.default.createElement(
					_reactMdl.FABButton,
					{ className: 'Impersonate', onClick: this.impersonateClicked.bind(this, store) },
					_react2.default.createElement(_reactMdl.Icon, { name: 'verified_user' })
				) : '';
				return _react2.default.createElement(
					_mdlExtras.StatefulFlipCard,
					{ className: classes, key: sid },
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
							) : _react2.default.createElement('img', { className: 'StoreLogo', src: logo,
								onError: function onError() {
									return _this2.setState((0, _extends3.default)({}, _this2.state, { logoMissing: true }));
								} })
						),
						_react2.default.createElement(
							'div',
							{ className: 'mdl-card__content' },
							this.state.thumbMissing ? _react2.default.createElement('div', { className: 'StoreThumbAlt' }) : _react2.default.createElement('img', { className: 'StoreThumb', src: thumb,
								onError: function onError() {
									return _this2.setState((0, _extends3.default)({}, _this2.state, { thumbMissing: true }));
								} }),
							_react2.default.createElement(
								_reactMdl.CardText,
								{ className: 'StoreDescription' },
								description
							)
						),
						mayImpersonate || this.mayPublish(store) ? _react2.default.createElement(
							'div',
							{ className: 'ModActions' },
							publishButton,
							impersonateButton
						) : ''
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
	}(_Publication3.default), _class.propTypes = {
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
		}).isRequired,
		mayImpersonate: bool.isRequired,
		onImpersonate: func.isRequired
	}, _temp);
	exports.default = StoreCard;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.StoresApi = undefined;
	
	var _defineProperties = __webpack_require__(14);
	
	var _defineProperties2 = _interopRequireDefault(_defineProperties);
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _getPrototypeOf = __webpack_require__(3);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(5);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(4);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class, _class2, _temp;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(13);
	
	var _reduxFetchApi = __webpack_require__(18);
	
	var _Role = __webpack_require__(20);
	
	var _api = __webpack_require__(28);
	
	var _api2 = __webpack_require__(32);
	
	var _Entity = __webpack_require__(8);
	
	var _Store = __webpack_require__(42);
	
	var _Store2 = _interopRequireDefault(_Store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var StoresApi = exports.StoresApi = (0, _reduxFetchApi.remote)(_class = (0, _api.authenticated)(_class = (_temp = _class2 = function (_PublicationApi) {
		(0, _inherits3.default)(StoresApi, _PublicationApi);
	
		function StoresApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? StoresApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, StoresApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(StoresApi).call(this, state));
	
			_this.setHandler(StoresApi.SET_MANAGED_STORES, function (state, _ref) {
				var payload = _ref.payload;
				return (0, _extends3.default)({}, state, { managedStores: payload });
			});
			_this.setHandler(StoresApi.SET_MANAGED_STORE_INDEX, function (state, _ref2) {
				var payload = _ref2.payload;
				return (0, _extends3.default)({}, state, { managedStoreIndex: payload });
			});
	
			(0, _defineProperties2.default)(_this, {
				managedStores: { enumerable: true, get: function get() {
						return _this.getState().managedStores;
					} },
				managedStoreIndex: { enumerable: true, get: function get() {
						return _this.getState().managedStoreIndex;
					} },
				managedStore: { enumerable: true, get: function get() {
						return _this.managedStores[_this.managedStoreIndex];
					} }
			});
	
			(0, _defineProperties2.default)(_this.item, {
				mayImpersonate: { enumerable: true, get: function get() {
						return _this.auth.is(_Role.Role.ADMINISTRATOR) || _this.auth.isAny(_Role.Role.BRAUTSCHLOSS_ROLES);
					} },
				onImpersonate: { enumerable: true, value: _this.impersonate.bind(_this) }
			});
			return _this;
		}
	
		(0, _createClass3.default)(StoresApi, [{
			key: 'setManagedStores',
			value: function setManagedStores(stores) {
				return this.dispatch(this.createAction(StoresApi.SET_MANAGED_STORES)(stores));
			}
		}, {
			key: 'setManagedStoreIndex',
			value: function setManagedStoreIndex(index) {
				return this.dispatch(this.createAction(StoresApi.SET_MANAGED_STORE_INDEX)(index));
			}
		}, {
			key: 'loadManagedStores',
			value: function loadManagedStores() {
				var _this2 = this;
	
				_picolog2.default.debug('loadManagedStores');
				return this.fetch('/managed').then(function (response) {
					return response && response.status === 200 ? response.text() : response.text().then(function (text) {
						return (0, _Entity.toError)(text);
					});
				}).then(function (text) {
					return (0, _Entity.fromJSON)(text);
				}).then(function (json) {
					_picolog2.default.debug('loadManagedStores: OK got ' + json.length + ' results');
					_this2.setManagedStores(json);
					_picolog2.default.debug('loadManagedStores: this.managedStores=', _this2.managedStores);
					return json;
				}).catch(function (error) {
					_picolog2.default.error('loadManagedStores: error=', error);
				});
			}
		}, {
			key: 'impersonate',
			value: function impersonate(store) {
				this.setManagedStores([store]);
				this.setManagedStoreIndex(0);
				this.getParent().products.loadStock(this.managedStore);
			}
		}]);
		return StoresApi;
	}(_api2.PublicationApi), _class2.INITIAL_STATE = (0, _extends3.default)({}, _api2.PublicationApi.INITIAL_STATE, {
		managedStores: [],
		managedStoreIndex: 0
	}), _class2.SET_MANAGED_STORES = 'SET_MANAGED_STORES', _class2.SET_MANAGED_STORE_INDEX = 'SET_MANAGED_STORE_INDEX', _temp)) || _class) || _class;
	
	exports.default = StoresApi;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
			value: true
	});
	exports.routes = undefined;
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(26);
	
	var _App = __webpack_require__(34);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _Home = __webpack_require__(58);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _ProductBrowser = __webpack_require__(59);
	
	var _ProductBrowser2 = _interopRequireDefault(_ProductBrowser);
	
	var _BrandBrowser = __webpack_require__(53);
	
	var _BrandBrowser2 = _interopRequireDefault(_BrandBrowser);
	
	var _StoreBrowser = __webpack_require__(62);
	
	var _StoreBrowser2 = _interopRequireDefault(_StoreBrowser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import StoreDetails from './components/Stores/StoreDetails';
	// import { LayoutTest, ComponentA, ComponentB } from './components/Layout/Layout';
	
	// import ProductEdit from './components/Products/ProductEdit';
	// import ProductDetails from './components/Products/ProductDetails';
	var routes = exports.routes = _react2.default.createElement(
			_reactRouter.Route,
			{ path: '/', component: _App2.default },
			'// redirect to \'Wedding Dresses\' for the time being // until we get a decent homepage',
			_react2.default.createElement(_reactRouter.IndexRedirect, { to: '/Wedding+Dresses' }),
			_react2.default.createElement(_reactRouter.Route, { path: '/brands', components: { appbarComponent: _BrandBrowser.BrandBrowserAppBar, mainComponent: _BrandBrowser2.default } }),
			_react2.default.createElement(_reactRouter.Route, { path: '/stores', components: { appbarComponent: _StoreBrowser.StoreBrowserAppBar, mainComponent: _StoreBrowser2.default } }),
			'// products are mounted at the root, but you must always specify // a category, so as long as category names do not conflict with // root paths, this will work. // so don\'t create a category \'stores\'  :) // TODO, probably if we hardcode the only two ratings, // \'loved\' and \'disliked\', we will open up more options // for short URLs, such as // \'/:category/:country\' // \'/:category/:country/:city\'',
			_react2.default.createElement(_reactRouter.Route, { path: '/:rating/:category', components: { appbarComponent: _ProductBrowser.ProductBrowserAppBar, mainComponent: _ProductBrowser2.default } }),
			_react2.default.createElement(_reactRouter.Route, { path: '/:category', components: { appbarComponent: _ProductBrowser.ProductBrowserAppBar, mainComponent: _ProductBrowser2.default } })
	);
	
	/*
			<Route path="/layout" component={LayoutTest}>
				<IndexRedirect to="/layout/a" />
				<Route path="a" component={ComponentA} />
				<Route path="b" component={ComponentB} />
			</Route>
	
			// we start with all routes that are not mounted at the root
			// so they will be matched before the products section,
			// which is mounted at the root.
			<Route path="/brands" component={Brands} >
				<IndexRoute component={BrandBrowser} />
			</Route>
	
			<Route path="/stores" component={Stores} >
				// not implemented yet
				<Route path=":city/:name" component={ProductDetails} />
	
				<IndexRoute component={StoreBrowser} />
			</Route>
	
			// products are mounted at the root, but you must always specify
			// a category, so as long as category names do not conflict with
			// root paths, this will work.
			// so don't create a category 'stores'  :)
			<Route component={Products} >
				// TODO, probably if we hardcode the only two ratings,
				// 'loved' and 'disliked', we will open up more options
				// for short URLs, such as
				// '/:category/:country'
				// '/:category/:country/:city'
				<Route path="/:rating/:category" component={ProductBrowser} />
				<Route path="/:category" component={ProductBrowser} />
			</Route>
	*/
	
	// import Stores from './components/Stores/Stores';
	exports.default = routes;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.scripts = scripts;
	// client scripts, will be loaded async from the head of the document
	// each stage will only start loading once the previous stage has completed
	function scripts(version) {
		return  true ? [// PRODUCTION
		{ // stage 0, no dependencies
			React: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.min.js',
			fetch: 'https://cdnjs.cloudflare.com/ajax/libs/fetch/0.11.0/fetch.min.js',
			componentHandler: 'https://cdn.rawgit.com/tleunen/react-mdl/v1.5.2/extra/material.min.js'
		}, { // stage 1, depends on stage 0
			ReactDOM: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.min.js'
		}, { // stage 2, depends on stage 1
			ReactRouter: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.3.0/ReactRouter.min.js',
			ReactMDL: 'https://npmcdn.com/react-mdl@1.5.2/out/ReactMDL.min.js',
			bridalapp_initial_state: '' }, // make sure store state is loaded
		{ // stage 3, depends on stage 2
			bridalapp: '/assets/bridalapp-ui.js?v' + version
		}] : [// DEVELOPMENT
		{ // stage 0, no dependencies
			React: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.js',
			fetch: 'https://cdnjs.cloudflare.com/ajax/libs/fetch/0.11.0/fetch.js',
			componentHandler: '/material.js'
		}, { // stage 1, depends on stage 0
			ReactDOM: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.js'
		}, { // stage 2, depends on stage 1
			ReactRouter: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.3.0/ReactRouter.js',
			ReactMDL: 'https://npmcdn.com/react-mdl@1.5.2/out/ReactMDL.min.js',
			bridalapp_initial_state: '' }, // make sure store state is loaded
		{ // stage 3, depends on stage 2
			bridalapp: '/assets/bridalapp-ui.js?v' + version
		}];
	}
	exports.default = scripts;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _values = __webpack_require__(71);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _extends2 = __webpack_require__(7);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _promise = __webpack_require__(15);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _chalk = __webpack_require__(73);
	
	var _chalk2 = _interopRequireDefault(_chalk);
	
	var _express = __webpack_require__(76);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(74);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _cookieParser = __webpack_require__(75);
	
	var _cookieParser2 = _interopRequireDefault(_cookieParser);
	
	var _http = __webpack_require__(77);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _httpProxy = __webpack_require__(78);
	
	var _httpProxy2 = _interopRequireDefault(_httpProxy);
	
	var _picolog = __webpack_require__(2);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(81);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _reactRouter = __webpack_require__(26);
	
	var _reactRedux = __webpack_require__(23);
	
	var _reduxLoadApi = __webpack_require__(27);
	
	var _config = __webpack_require__(49);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _store = __webpack_require__(22);
	
	var _store2 = _interopRequireDefault(_store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(69);
	global.fetch = __webpack_require__(79);
	
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
	
	// Enable gzip compresion
	// express.use(compress());
	
	// parses request cookies
	express.use((0, _cookieParser2.default)());
	
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
	}
	
	// We point to our static assets
	express.use(_express2.default.static(_config2.default.publicPath));
	
	// polled by OpenShift haproxy load balancer to test server availability
	express.get('/status', function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
		res.end('<!DOCTYPE html>\n<html>\n<head>\n\t<title>Status</title>\n</head>\n<body>\n\t<h1 style="color:green">ONLINE</h1>\n\t<p>' + _config2.default.server.name + ' is ONLINE</p>\n</body>\n</html>');
	});
	
	express.get(/\/.*/, function (req, res, next) {
		// Reset the store prior to each request
		_store2.default.dispatch({ type: '@@bridalapp/RESET' });
		// require again on each request, to enable hot-reload in development mode.
		// In production, this will just grab the module from require.cache.
		var scripts = __webpack_require__(66).scripts;
		var routes = __webpack_require__(65).routes;
		var markupBefore = __webpack_require__(43).markupBefore;
		var markupAfter = __webpack_require__(43).markupAfter;
		var AppApi = __webpack_require__(19).AppApi;
		var App = __webpack_require__(34).App;
	
		// match the current URL against defined routes
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
	
				// RENDER MARKUP BEFORE
				// eagerly send 200 status and the head of the document to improve first render speed
				// this will start off script loading on the client asap.
				res.status(200);
				res.write(markupBefore(_config2.default.version, _config2.default.apiServer.url, scripts(_config2.default.version)));
	
				// LOAD SESSION
				// Store session cookie so we can attach it to fetch calls
				global.session = req.cookies && req.cookies.BASESSION;
				global.session && _picolog2.default.log('stored session cookie: ' + global.session);
				_promise2.default.resolve(global.session ? _store2.default.app.auth.loadSession() : { sessionId: null, user: null }).then(function (session) {
					_picolog2.default.debug('loaded session: ', session);
	
					// LOAD DATA
					// pre-load onload actions
					var routes = renderProps.routes;
					var params = renderProps.params;
					var query = renderProps.location.query;
	
					var loadParams = (0, _extends3.default)({}, query, params);
					var components = routes.reduce(function (r, x) {
						r.push.apply(r, x.component && [x.component] || (0, _values2.default)(x.components));return r;
					}, []).filter(function (component) {
						return component && typeof component.onload == 'function';
					});
					_picolog2.default.log('pre-loading data for ', components);
					return (0, _reduxLoadApi.load)(components, loadParams);
				}).then(function () {
					// do awesome stuff knowing all promises (if any) are resolved
					_picolog2.default.debug('pre-load complete, rendering markup');
	
					// RENDER REACT APP
					// Render the fully hydrated React app and send it to the client
					res.write(_server2.default.renderToString(_react2.default.createElement(
						_reactRedux.Provider,
						{ store: _store2.default },
						_react2.default.createElement(_reactRouter.RouterContext, renderProps)
					)));
	
					// RENDER MARKUP AFTER
					// Send the current store state along with the ending markup
					res.write(markupAfter(_store2.default.getState()));
	
					// FINISH RENDERING
					res.end();
					_picolog2.default.debug('rendering complete');
					return true;
				}).catch(function (error) {
					_picolog2.default.error('Error rendering ' + req.originalUrl + ': ', error, error.stack);
					res.status(500);
					res.send('Server error.');
					res.end();
				});
			}
		});
	});
	
	var server = _config2.default.server.host ? httpServer.listen(_config2.default.server.port, _config2.default.server.host, serverStartup) : httpServer.listen(_config2.default.server.port, serverStartup);
	
	function serverStartup(error) {
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
	}
	
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
		module.hot.accept('./scripts', function () {
			_picolog2.default.warn(yb('Hot reloading ') + g('\'./scripts\'...'));
		});
		module.hot.accept('./store', function () {
			_picolog2.default.warn(yb('Hot reloading ') + g('\'./store\'...'));
		});
		module.hot.accept('./routes', function () {
			_picolog2.default.warn(yb('Hot reloading ') + g('\'./routes\'...'));
		});
		module.hot.accept('./markup', function () {
			_picolog2.default.warn(yb('Hot reloading ') + g('\'./markup\'...'));
		});
		module.hot.accept('./components/App/api', function () {
			_picolog2.default.warn(yb('Hot reloading ') + g('\'./components/App/api\'...'));
		});
		module.hot.accept('./components/App/App', function () {
			_picolog2.default.warn(yb('Hot reloading ') + g('\'./components/App/App\'...'));
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
/* 68 */
/***/ function(module, exports) {

	module.exports = {
		"name": "bridalapp-ui",
		"version": "1.0.9",
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
			"build-client": "webpack --config webpack/client.config.js",
			"build": "npm run build-server && npm run build-client",
			"release-server": "npm run clean-server && npm run build-server",
			"release-client": "npm run clean-client && npm run build-client",
			"release": "npm run clean && npm run build",
			"watch": "webpack --inline --watch --hide-modules --config webpack/development.server.config.js",
			"run-dev": "npm run -s clean && parallelshell \"npm run -s watch\" \"npm run -s start-dev\"",
			"dev": "cross-env PICOLOG_LEVEL=info npm run -s run-dev",
			"debug": "cross-env PICOLOG_LEVEL=log npm run -s run-dev",
			"test": "mocha --require babel-register \"src/bridalapp-ui.spec.jsx\"",
			"--test-dev": "webpack-dev-server --inline --hot --config webpack/test.config.js --port 8081",
			"test-dev": "webpack-dev-server --output-path test --output-filename bridalapp-ui.spec.js \"mocha!./bridalapp-ui.spec.jsx\" --content-base test --port 8888 --config webpack/test.config.js"
		},
		"engines": {
			"node": ">= 0.6.0",
			"npm": ">= 1.0.0"
		},
		"dependencies": {
			"babel-polyfill": "^6.7.4",
			"babel-preset-es2015": "^6.5.0",
			"babel-preset-react": "^6.5.0",
			"babel-preset-stage-0": "^6.5.0",
			"babel-runtime": "^6.3.19",
			"babylon": "^6.5.2",
			"chalk": "^1.1.3",
			"classnames": "^2.2.3",
			"compression": "^1.6.1",
			"cookie-parser": "^1.4.1",
			"express": "^4.13.4",
			"http-proxy": "^1.12.0",
			"node-fetch": "^1.5.1",
			"picolog": "^1.0.4",
			"react": "^15.0.1",
			"react-dom": "^15.0.1",
			"react-mdl": "^1.5.3",
			"react-redux": "^4.4.5",
			"react-router": "^2.3.0",
			"redux": "^3.4.0",
			"redux-apis": ">=2.0.0-alpha.1",
			"redux-async-api": "^2.0.1",
			"redux-fetch-api": "^1.0.1",
			"redux-load-api": "^2.0.1",
			"redux-logger": "^2.5.2",
			"redux-thunk": "^2.0.1",
			"serialize-javascript": "^1.1.2",
			"ws.suid": "^0.10.1"
		},
		"devDependencies": {
			"babel-core": "^6.7.6",
			"babel-loader": "^6.2.4",
			"babel-plugin-react-transform": "^2.0.2",
			"babel-plugin-transform-class-properties": "^6.4.0",
			"babel-plugin-transform-decorators-legacy": "^1.3.4",
			"babel-plugin-transform-runtime": "^6.7.5",
			"babel-preset-es2015": "^6.5.0",
			"babel-preset-react": "^6.3.13",
			"babel-preset-stage-0": "^6.3.13",
			"babel-register": "^6.6.5",
			"chai": "^3.5.0",
			"cross-env": "^1.0.7",
			"eventsource-polyfill": "^0.9.6",
			"json-loader": "^0.5.4",
			"just-wait": "^1.0.5",
			"mocha": "^2.4.5",
			"mocha-loader": "^0.7.1",
			"parallelshell": "^2.0.0",
			"react-addons-test-utils": "^15.0.1",
			"react-mdl": "^1.0.4",
			"react-transform-hmr": "^1.0.4",
			"rimraf": "^2.5.2",
			"webpack": "^1.13.0",
			"webpack-dev-middleware": "^1.6.1",
			"webpack-dev-server": "^1.14.1",
			"webpack-hot-middleware": "^2.9.1"
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
/* 69 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/create");

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/values");

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/get");

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = require("chalk");

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = require("http-proxy");

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = require("node-fetch");

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = require("redux-logger");

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = require("serialize-javascript");

/***/ }
/******/ ])));
//# sourceMappingURL=server.js.map