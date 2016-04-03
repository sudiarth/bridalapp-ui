import log from 'picolog';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Scroller extends React.Component {
	static propTypes = {
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
		items: React.PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array,
		]),

		/**
		 * Default size of an item in the scroll direction, in pixels.
		 * Defaults to 300.
		 *
		 * For a vertical scroller, set this to the height of each
		 * item, for a horizontal scroller, the screen width is used.
		 */
		itemSize: React.PropTypes.number.isRequired,

		/**
		 * Number of items to be rendered initially, before the component
		 * is mounted.
		 * Defaults to 12.
		 *
		 * This will determine how many items are rendered
		 * during server-side rendering and hence how many items googlebot
		 * will see when visiting the page.
		 */
		initialItemsInView: React.PropTypes.number,

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
		bufferBefore: React.PropTypes.number,

		/**
		 * Size of buffer after the last visible item, defaults to 1.
		 * Enables smoother scrolling by pre-rendering some items into a buffer area
		 * just outside the visible viewport, causing images to be pre-loaded.
		 * The number of items rendered after the last visible item will be
		 * the value of this property, multiplied by `itemsPer`.
		 */
		bufferAfter: React.PropTypes.number,

		/**
		 * Whether to snap items to grid when scrolling comes to an end.
		 *
		 * NOT IMPLEMENTED YET. IMPLEMENTATION SHOULD BE BASED ON CSS Scroll Snap Points
		 * http://www.w3.org/TR/css-snappoints-1/
		 * Backed by a polyfill for non-compliant browsers (many still unfortunately)
		 *
		 * Reason: We want fluid native scrolling on iPhone.
		 */
		snap: React.PropTypes.bool,

		/**
		 * Render function accepting an item and it's index and returning
		 * the markup for that item. This function should accept empty
		 * objects for it's item parameter and return valid markup either way.
		 */
		renderItem: React.PropTypes.func.isRequired, // function(item, index)

		/**
		 * Function accepting an item and it's index and returning
		 * an identifying key for that item. The key is used for technical
		 * purposes. This function should accept null for it's item parameter
		 * and return a valid key either way. If this function is not provided,
		 * the key will default to `'item' + index`.
		 */
		keyForItem: React.PropTypes.func, // function(item, index)

		/**
		 * Function accepting an item and it's index and returning
		 * an identifying slug for that item. The slug is used for
		 * bookmarking etc, so should preferably be human-friendly.
		 * This function should accept null for it's item parameter
		 * and return a valid slug either way. If this function is
		 * not provided, the slug will default to `'item' + index`.
		 */
		slugForItem: React.PropTypes.func, // function(item, index)

		/**
		 * Time, in ms, to capture scroll events before processing them.
		 * Defaults to 10.
		 */
		scrollDebounce: React.PropTypes.number,


		/* PROPERTIES RELATED TO PAGING */

		/**
		 * Total number of items available in the virtual scroller.
		 * Defaults to `items[0].length`;
		 *
		 * When paging is enabled, set this to the total number of
		 * items in the resultset. E.g. for a query with 9,287 results,
		 * set this to 9287.
		 */
		itemCount: React.PropTypes.number,

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
		pageSize: React.PropTypes.number,

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
		pageBufferSize: React.PropTypes.number,

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
		pageFetch: React.PropTypes.func, // function(pageIndex)

		/**
		 * Render function accepting an item index and returning markup
		 * indicating that the item is still loading.
		 *
		 * This function is called when paging is enabled and the item to
		 * be rendered is not (yet) available. If this function is not
		 * provided, the system will fall back to calling `renderItem`
		 * and providing an empty object as item parameter.
		 */
		renderLoadingItem: React.PropTypes.func, // function(index)
	};

	static defaultProps = {
		items: {0: []},
		itemSize: 560,
		initialItemsInView: 20,
//		itemsPer: 1,
		bufferBefore: 1,
		bufferAfter: 1,
		scrollDebounce: 100,
//		direction: 'vertical',
		snap: false,
	};

	constructor(...args) {
		log.debug('Scroller', ...args);
		super(...args);
		const { items, itemSize, initialItemsInView, bufferBefore, bufferAfter } = this.props;
		const itemsInView = Math.min(initialItemsInView, items.length);
		const renderedItems = items.slice(0, itemsInView);
		const sizeItems = itemsInView * itemSize;
		this.state = {
			horizontal: false,
			renderedItems,
			sizeBefore: 0,
			sizeItems,
			sizeAfter: (items.length - itemsInView) * itemSize,
			itemSize,
			firstRenderedItemIndex: 0,
			lastRenderedItemIndex: itemsInView - 1,
			size: sizeItems,
		};

		this.onScroll = this.onScroll.bind(this);
	}

	getState(props) {
		// let dir = props.direction;
		const win = typeof window == 'object' && window;
		const w = win && window.innerWidth || 767;
		const horizontal = win && w < 480;
		const scroller = this.mounted ? ReactDOM.findDOMNode(this) : undefined;
		const scrollPos = scroller ? getScrollPos(horizontal, scroller) : 0;

		const { items, bufferBefore, bufferAfter } = props;
		const itemSize = horizontal ? w : props.itemSize;
		const itemsPer = !win ? 1 : (w > 1024 ? 3 : (w > 767 ? 2 : 1));
		const containerCount = ~~(items.length / itemsPer) + (~~(items.length % itemsPer) ? 1 : 0);

		const scrollerSize = scroller ? getSize(horizontal, scroller) : Math.min(initialItemsInView, containerCount) * itemSize;
		const slider = this.refs.slider;
		const sliderOffset = scroller ? posDifference(horizontal, slider, scroller) : 0;

		const renderedItems = [];

		const containersBefore = ~~(scrollPos / itemSize);
		const bufBefore = Math.min(containersBefore, bufferBefore);
		const skippedContainers = containersBefore - bufBefore;
		const skippedItems = skippedContainers * itemsPer;
		const firstIdx = skippedItems;
		const containersInView = ~~(scrollerSize / itemSize) + (~~(scrollerSize % itemSize) ? 2 : 1)
		const lastIdx = Math.min(firstIdx + containersInView * itemsPer + bufferAfter * itemsPer, items.length - 1);
		for (let i=firstIdx; i<=lastIdx; i++) {
			const item = items[i] || null;
			renderedItems.push(item);
		}
		const renderedContainerCount = ~~(renderedItems.length / itemsPer) + (~~(renderedItems.length % itemsPer) ? 1 : 0);
		const sizeBefore = ~~(firstIdx / itemsPer) * itemSize;
		const sizeItems = renderedContainerCount * itemSize;
		const sizeAfter = containerCount * itemSize - sizeBefore - sizeItems;

		return {
			horizontal,
			renderedItems,
			sizeBefore,
			sizeItems,
			sizeAfter,
			itemSize,
			// scrollPos,
			firstRenderedItemIndex: firstIdx,
			lastRenderedItemIndex: lastIdx,
			size: scrollerSize,
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		log.debug('shouldComponentUpdate', nextProps, nextState);
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

	componentWillReceiveProps(nextProps) {
		log.debug('componentWillReceiveProps', nextProps);
		this.setState(this.getState(nextProps));
	}

	componentDidMount() {
		log.debug('componentDidMount');
		this.mounted = true;
		this.onScrollDebounced = window.innerWidth < 480
			? debounce(this.onScroll, this.props.scrollDebounce, false)
			: this.onScroll;
		this.setState(this.getState(this.props));
		ReactDOM.findDOMNode(this).addEventListener('scroll', this.onScrollDebounced);
	}

	componentWillUnmount() {
		log.debug('componentWillUnmount');
		ReactDOM.findDOMNode(this).removeEventListener('scroll', this.onScrollDebounced);
		this.mounted = false;
	}

	onScroll() {
		log.trace('onscroll');
		this.setState(this.getState(this.props));
	}

	render() {
		log.debug('render', this.props, this.state);
		let slider={}, before={}, after={}, itm={};
		const dim = (this.state.horizontal ? 'width' : 'height');
		slider[dim] = this.state.sizeBefore + this.state.sizeItems + this.state.sizeAfter;
		before[dim] = this.state.sizeBefore;
		itm[dim] = this.state.itemSize;
		after[dim] = this.state.sizeAfter;
		return (
			<div className="Scroller">
				<div className="ScrollSlider" ref="slider" style={slider}
					><div className="ScrollSpacer ScrollSpacerBefore" ref="spacerBefore" style={before}></div
					>{this.state.renderedItems.map((item, idx) => {
						idx = idx + this.state.firstRenderedItemIndex;
						const key = this.props.keyForItem ? this.props.keyForItem(item, idx) : 'item' + idx;
						let { renderItem } = this.props;
						if (item === null) {
							if (this.props.renderLoadingItem) {renderItem = this.props.renderLoadingItem;}
							else {item = {};}
						}

						// style={itm}
						return(
							<div className="ScrollItem" key={key} style={itm}>{
								renderItem(item, idx)
							}</div>
						);
					})}<div className="ScrollSpacer ScrollSpacerAfter" ref="spacerAfter" style={after}></div
				></div
			></div>
		);
	}
}

function arraysEqual(a, b) {
	if (!a || !b) return false;
	if (a.length != b.length) return false;
	for (var i = 0, length = a.length; i < length; i++) {
		if (a[i] != b[i]) return false;
	}
	return true;
}

function posFromWindow(horizontal, element) {
	const dir = horizontal ? 'Left' : 'Top';
	if (!element || element === window) return 0;
	return element['offset' + dir] + posFromWindow(horizontal, element.offsetParent);
}

function posDifference(horizontal, element, container) {
	return posFromWindow(horizontal, element) - posFromWindow(horizontal, container);
}

function getSize(horizontal, element) {
	const dir = horizontal ? 'Width' : 'Height';
	return typeof element['inner' + dir] != 'undefined' ? element['inner' + dir] : element['client' + dir];
}

function getScrollPos(horizontal, element) {
	let res;
	const { axis, dir } = horizontal ? {axis:'X', dir:'Left'} : {axis:'Y', dir:'Top'};
	if (element === window) {
		res = window['page' + axis + 'Offset'];
		if (res == null) res = document.documentElement['scroll' + dir];
		if (res == null) res = document.body['scroll' + dir];
	}
	else {
		res = element['scroll' + axis];
		if (res == null) res = element['scroll' + dir];
	}
	return (res == null) ? 0 : res;
}

function debounce(func, wait, immediate) {
	if (!wait) return func;
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;

			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}