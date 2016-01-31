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

	module.exports = __webpack_require__(38);


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

	module.exports = require("redux-apis");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("redux-fetch-api");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _get2 = __webpack_require__(19);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _class;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.app = exports.AppApi = undefined;
	
	var _reduxApis = __webpack_require__(9);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	var _reduxFetchApi = __webpack_require__(14);
	
	var _api = __webpack_require__(36);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _api3 = __webpack_require__(26);
	
	var _api4 = _interopRequireDefault(_api3);
	
	var _api5 = __webpack_require__(32);
	
	var _api6 = _interopRequireDefault(_api5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var API_URL = '/api';
	if (typeof process != 'undefined') {
		var host = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
		var port = process.env.OPENSHIFT_NODEJS_PORT || '80';
		var path = process.env.BRIDALAPP_API_SERVER_PATH || '/api';
		API_URL = 'http://' + host + (port === '80' ? '' : ':' + port) + path;
	}
	
	var AppApi = exports.AppApi = (_dec = (0, _reduxFetchApi.remote)(API_URL), _dec(_class = function (_Api) {
		(0, _inherits3.default)(AppApi, _Api);
	
		function AppApi(state) {
			(0, _classCallCheck3.default)(this, AppApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(AppApi).call(this, state));
	
			_this.rightDrawer = (0, _reduxApis.link)(_this, new _api2.default());
			_this.brands = (0, _reduxApis.link)(_this, new _api4.default());
			_this.products = (0, _reduxApis.link)(_this, new _api6.default());
			return _this;
		}
	
		(0, _createClass3.default)(AppApi, [{
			key: 'reducer',
			value: function reducer(state, action) {
				return (0, _get3.default)((0, _getPrototypeOf2.default)(AppApi.prototype), 'reducer', this).call(this, state, action);
			}
		}]);
		return AppApi;
	}(_reduxApis2.default)) || _class);
	var app = exports.app = new AppApi();
	exports.default = app;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(10);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Back = exports.Front = exports.CardFace = exports.CardActions = exports.SupportingText = exports.CardMedia = exports.SubtitleText = exports.CardTitle = undefined;
	exports.Card = Card;
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(11);
	
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
	
	function Card(props) {
		var className = props.className;
		var cardClass = props.cardClass;
		var shadowClass = props.shadowClass;
		var flippedClass = props.flippedClass;
		var flipped = props.flipped;
		var children = props.children;
		var otherProps = (0, _objectWithoutProperties3.default)(props, ['className', 'cardClass', 'shadowClass', 'flippedClass', 'flipped', 'children']);
	
		var classes = (0, _classnames2.default)(className, cardClass, shadowClass, { flippedClass: flipped });
		return _react2.default.createElement(
			'div',
			(0, _extends3.default)({ className: classes }, otherProps),
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	var _class, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(53);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Scroller = (_temp = _class = function (_React$Component) {
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _promise = __webpack_require__(44);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _getIterator2 = __webpack_require__(41);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _keys = __webpack_require__(43);
	
	var _keys2 = _interopRequireDefault(_keys);
	
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
	
	var _class, _class2, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SearchApi = undefined;
	
	var _reduxApis = __webpack_require__(9);
	
	var _reduxAsyncApi = __webpack_require__(56);
	
	var _reduxAsyncApi2 = _interopRequireDefault(_reduxAsyncApi);
	
	var _reduxFetchApi = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SearchApi = exports.SearchApi = (0, _reduxFetchApi.remote)(_class = (_temp = _class2 = function (_Async) {
		(0, _inherits3.default)(SearchApi, _Async);
	
		function SearchApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? SearchApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, SearchApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SearchApi).call(this, state));
	
			_this.setHandler('SET_FILTER', function (state, action) {
				return (0, _extends3.default)({}, state, { filter: action.payload });
			});
			_this.setHandler('SET_RESULTS', function (state, action) {
				return (0, _extends3.default)({}, state, { results: action.payload });
			});
			return _this;
		}
	
		(0, _createClass3.default)(SearchApi, [{
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
	
				// dispatch a function... redux-thunk will execute the function
				return this.dispatch(function () {
					_this2.setBusy();
					return _this2.fetch(_this2.url(_this2.filter())).then(function (response) {
						if (response.status === 200) {
							return response.json();
						} else {
							return new _promise2.default(function (resolve, reject) {
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
	}(_reduxAsyncApi2.default), _class2.INITIAL_STATE = (0, _extends3.default)({}, _reduxAsyncApi2.default.INITIAL_STATE, {
		filter: {},
		results: []
	}), _temp)) || _class;
	
	exports.default = SearchApi;

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/get");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("redux-load-api");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(51);
	
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	var _dec, _class, _class2, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.App = undefined;
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(13);
	
	var _reactRedux = __webpack_require__(12);
	
	var _Layout = __webpack_require__(54);
	
	var _RightDrawer = __webpack_require__(35);
	
	var _RightDrawer2 = _interopRequireDefault(_RightDrawer);
	
	var _LayoutTitle = __webpack_require__(34);
	
	var _LayoutTitle2 = _interopRequireDefault(_LayoutTitle);
	
	var _LayoutObfuscator = __webpack_require__(33);
	
	var _LayoutObfuscator2 = _interopRequireDefault(_LayoutObfuscator);
	
	var _api = __webpack_require__(15);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var App = exports.App = (_dec = (0, _reactRedux.connect)(_api2.default.connector), _dec(_class = (_temp = _class2 = function (_Component) {
		(0, _inherits3.default)(App, _Component);
	
		function App(props) {
			(0, _classCallCheck3.default)(this, App);
			return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));
		}
	
		(0, _createClass3.default)(App, [{
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	var _class, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(12);
	
	var _Scroller = __webpack_require__(17);
	
	var _Scroller2 = _interopRequireDefault(_Scroller);
	
	var _Card = __webpack_require__(16);
	
	var _Card2 = _interopRequireDefault(_Card);
	
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getPrototypeOf = __webpack_require__(1);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(4);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _class;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BrandsApi = undefined;
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(9);
	
	var _reduxFetchApi = __webpack_require__(14);
	
	var _api = __webpack_require__(18);
	
	var _api2 = _interopRequireDefault(_api);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BrandsApi = exports.BrandsApi = (0, _reduxFetchApi.remote)(_class = function (_Api) {
		(0, _inherits3.default)(BrandsApi, _Api);
	
		function BrandsApi(state) {
			(0, _classCallCheck3.default)(this, BrandsApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BrandsApi).call(this, state));
	
			_this.search = (0, _reduxApis.link)(_this, new _api2.default());
			return _this;
		}
	
		return BrandsApi;
	}(_reduxApis.Api)) || _class;
	
	exports.default = BrandsApi;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _objectWithoutProperties2 = __webpack_require__(10);
	
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
	
	var _class, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Html = undefined;
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(20);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _serializeJavascript = __webpack_require__(58);
	
	var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);
	
	var _reactDocumentMeta = __webpack_require__(52);
	
	var _reactDocumentMeta2 = _interopRequireDefault(_reactDocumentMeta);
	
	var _reactRouter = __webpack_require__(13);
	
	var _reactRedux = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
				var lang = _props.lang;
				var store = _props.store;
				var renderProps = (0, _objectWithoutProperties3.default)(_props, ['lang', 'store']);
	
				var content = _server2.default.renderToString(_react2.default.createElement(
					_reactRedux.Provider,
					{ store: store },
					_react2.default.createElement(_reactRouter.RouterContext, renderProps)
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
						_react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: 'window.__data=' + (0, _serializeJavascript2.default)(store.getState()) + ';' }, charSet: 'UTF-8' }),
						this.props.children,
						_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react.min.js' }),
						_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.min.js' }),
						_react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0-rc5/ReactRouter.min.js' }),
						_react2.default.createElement('script', { src: 'https://cdn.rawgit.com/tleunen/react-mdl/v1.0.4/extra/material.min.js' }),
						_react2.default.createElement('script', { src: '/assets/bridalapp-ui.js', charSet: 'UTF-8' })
					)
				);
			}
		}]);
		return Html;
	}(_react.Component), _class.propTypes = {
		lang: _react.PropTypes.string,
		store: _react.PropTypes.object
	}, _class.defaultProps = {
		lang: 'en-US'
	}, _temp);
	exports.default = Html;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _dec, _dec2, _class, _class2, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(12);
	
	var _reduxLoadApi = __webpack_require__(21);
	
	var _api = __webpack_require__(15);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _Scroller = __webpack_require__(17);
	
	var _Scroller2 = _interopRequireDefault(_Scroller);
	
	var _ProductCard = __webpack_require__(30);
	
	var _ProductCard2 = _interopRequireDefault(_ProductCard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ProductBrowser = (_dec = (0, _reduxLoadApi.onload)(function (params) {
		var filter = _api2.default.products.search.filter();
		_api2.default.products.search.setFilter((0, _extends3.default)({}, filter, { category: params.category }));
		return _api2.default.products.search.search();
	}), _dec2 = (0, _reactRedux.connect)(_api2.default.products.search.connector), _dec(_class = _dec2(_class = (_temp = _class2 = function (_React$Component) {
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
	
	var _class, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ProductCard = undefined;
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(11);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Card = __webpack_require__(16);
	
	var _Card2 = _interopRequireDefault(_Card);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bool = _react.PropTypes.bool;
	var string = _react.PropTypes.string;
	var object = _react.PropTypes.object;
	var shape = _react.PropTypes.shape;
	var ProductCard = exports.ProductCard = (_temp = _class = function (_Component) {
		(0, _inherits3.default)(ProductCard, _Component);
	
		function ProductCard(props) {
			(0, _classCallCheck3.default)(this, ProductCard);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProductCard).call(this, props));
	
			_this.state = _this.getState(props);
			return _this;
		}
	
		(0, _createClass3.default)(ProductCard, [{
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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	var _get2 = __webpack_require__(19);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _inherits2 = __webpack_require__(3);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _class;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ProductsApi = exports.ProductSearch = undefined;
	
	var _reduxApis = __webpack_require__(9);
	
	var _reduxFetchApi = __webpack_require__(14);
	
	var _api = __webpack_require__(18);
	
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
	
	var ProductsApi = exports.ProductsApi = (_dec = (0, _reduxFetchApi.remote)('/products'), _dec(_class = function (_Api) {
		(0, _inherits3.default)(ProductsApi, _Api);
	
		function ProductsApi(state) {
			(0, _classCallCheck3.default)(this, ProductsApi);
	
			var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ProductsApi).call(this, state));
	
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
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(10);
	
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
	
	var _class, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(11);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LayoutObfuscator = (_temp = _class = function (_React$Component) {
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
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(10);
	
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
	
	var _class, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(11);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DrawerTitle = (_temp = _class = function (_React$Component) {
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
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(10);
	
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
	
	var _class, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(11);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RightDrawer = (_temp = _class = function (_React$Component) {
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
	
	var _class, _temp;
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _reduxApis = __webpack_require__(9);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DrawerApi = (_temp = _class = function (_Api) {
		(0, _inherits3.default)(DrawerApi, _Api);
	
		function DrawerApi() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? DrawerApi.INITIAL_STATE : arguments[0];
			(0, _classCallCheck3.default)(this, DrawerApi);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DrawerApi).call(this, state));
	
			_this.setHandler('OPEN', function (state, action) {
				return (0, _extends3.default)({}, state, { open: true });
			});
			_this.setHandler('CLOSE', function (state, action) {
				return (0, _extends3.default)({}, state, { open: false });
			});
			return _this;
		}
	
		(0, _createClass3.default)(DrawerApi, [{
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
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(13);
	
	var _App = __webpack_require__(23);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _Home = __webpack_require__(27);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _Products = __webpack_require__(31);
	
	var _Products2 = _interopRequireDefault(_Products);
	
	var _ProductBrowser = __webpack_require__(29);
	
	var _ProductBrowser2 = _interopRequireDefault(_ProductBrowser);
	
	var _Brands = __webpack_require__(25);
	
	var _Brands2 = _interopRequireDefault(_Brands);
	
	var _BrandBrowser = __webpack_require__(24);
	
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
	
	var _extends2 = __webpack_require__(8);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _stringify = __webpack_require__(42);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _chalk = __webpack_require__(46);
	
	var _chalk2 = _interopRequireDefault(_chalk);
	
	var _express = __webpack_require__(47);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _http = __webpack_require__(48);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _httpProxy = __webpack_require__(49);
	
	var _httpProxy2 = _interopRequireDefault(_httpProxy);
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(20);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _reactRouter = __webpack_require__(13);
	
	var _reduxApis = __webpack_require__(9);
	
	var _reduxLoadApi = __webpack_require__(21);
	
	var _config = __webpack_require__(22);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(40);
	global.fetch = __webpack_require__(50);
	
	//import { syncHistory, routeReducer } from 'redux-simple-router';
	
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
	
	// Proxy to BridalApp API server
	_picolog2.default.warn(gr('Proxying requests incoming at ') + w('http://%s:%s%s'), _config2.default.server.host, _config2.default.server.port, _config2.default.apiServer.path);
	_picolog2.default.warn(gr('   to ') + w('%s') + gr(' at ') + w('http://%s:%s%s'), _config2.default.apiServer.name, _config2.default.apiServer.host, _config2.default.apiServer.port, _config2.default.apiServer.path);
	var apiProxy = _httpProxy2.default.createProxyServer({
		target: { host: _config2.default.apiServer.host, port: _config2.default.apiServer.port, path: _config2.default.apiServer.path }
	});
	express.use(_config2.default.apiServer.path, function (req, res) {
		_picolog2.default.debug('Received API request.');
		apiProxy.web(req, res);
	});
	// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
	apiProxy.on('error', function (error, req, res) {
		if (error.code !== 'ECONNRESET') {
			_picolog2.default.error('proxy error', error);
		}
		if (!res.headersSent) {
			res.writeHead(500, { 'content-type': 'application/json' });
		}
		var json = { error: 'proxy_error', reason: error.message };
		res.end((0, _stringify2.default)(json));
	});
	
	// polled by OpenShift haproxy load balancer to test server availability
	express.get('/status', function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
		res.end('<!DOCTYPE html>\n<html>\n<head>\n\t<title>Status</title>\n</head>\n<body>\n\t<h1 style="color:green">ONLINE</h1>\n\t<p>' + _config2.default.server.name + ' is ONLINE</p>\n</body>\n</html>');
	});
	
	express.get(/\/.*/, function (req, res) {
		// require again on each request, to enable hot-reload in development mode.
		// In production, this will just grab the module from require.cache.
		var store = __webpack_require__(39).store;
		var routes = __webpack_require__(37).routes;
		var Html = __webpack_require__(28).Html;
	
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
	
				// dispatch initial action(s) based on route
				//			var fetchingComponents = renderProps.components
				//					.map(component => component.WrappedComponent ? component.WrappedComponent : component)
				//					.filter(component => component.fetchData);
				//			log.info('fetchingComponents=', fetchingComponents);
				// any promises fired will be captured by redux-promise
				//			var fetchPromises = fetchingComponents.map(component => component.fetchData(renderProps));
	
				// pre-load onload actions
				(0, _reduxLoadApi.load)(renderProps.components, renderProps.params).then(function () {
					// do awesome stuff knowing all promises (if any) are resolved
					res.status(200);
					res.send('<!DOCTYPE html>\n' + _server2.default.renderToString(_react2.default.createElement(Html, (0, _extends3.default)({ lang: 'en-US', store: store }, renderProps))));
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
		_picolog2.default.warn(gb(' √  ') + g('Talking to ') + gb('%s') + g(' at ') + gb('%s:%s'), _config2.default.apiServer.name, _config2.default.apiServer.host, _config2.default.apiServer.port);
		_picolog2.default.warn(gb(' √  ') + g('Listening for connections at ') + gb('http://%s:%s'), addr.address, addr.port);
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
		_picolog2.default.warn(msg = rb(' ×  ') + g('Stopping ') + gb(_config2.default.server.name) + g(' due to uncaught exception ') + yb(error) + g('.'));
		server.close();
		process.exit();
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof2 = __webpack_require__(45);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.store = undefined;
	
	var _picolog = __webpack_require__(7);
	
	var _picolog2 = _interopRequireDefault(_picolog);
	
	var _redux = __webpack_require__(55);
	
	var _reduxThunk = __webpack_require__(57);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reduxApis = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = __webpack_require__(15).app;
	var data = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object' && window.__data || undefined;
	var store = exports.store = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore)(app.reducer, data);
	(0, _reduxApis.link)(store, app);
	if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object') {
		window.app = app;
	}
	exports.default = store;
	
	if (false) {
		module.hot.accept('./components/App/api', function () {
	
			var msg = 'Hot-reloading \'./components/App/api\'',
			    args = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object' ? ['%c' + msg, 'color:green'] : [msg];
			_picolog2.default.warn.apply(_picolog2.default, args);
			app = require('./components/App/api').app;
			_picolog2.default.log('Replacing store reducer...');
			store.replaceReducer(app.reducer);
			_picolog2.default.log('Re-linking app to store...');
			(0, _reduxApis.link)(store, app);
			_picolog2.default.log('Re-exposing app to global scope...');
			if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) == 'object') {
				window.app = app;
			}
			_picolog2.default.log('Hot-reload done.');
		});
	}

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/typeof");

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("chalk");

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = require("http-proxy");

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("node-fetch");

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = require("react-document-meta");

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = require("react-mdl/lib/Layout");

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = require("redux-async-api");

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = require("serialize-javascript");

/***/ }
/******/ ])));
//# sourceMappingURL=server.js.map