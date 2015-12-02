import log from 'picolog';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Scroller extends React.Component {
	constructor(props) {
		super(props); // direction, itemCount, items, itemSize, itemsPer
		this.state = this.getState(props);
		this.onScroll = this.onScroll.bind(this);
	}

	getState(props) {
		// default values
		var state = {
			renderedItems: [],
			firstRenderedItemIndex: 0,
			lastRenderedItemIndex: Math.min(99, props.items.length - 1),
			size: 0,
			sizeBefore: 0,
			sizeItems: 0,
			sizeAfter: props.items.length * props.itemSize
		};

		// early return if nothing to render
		if (props.itemCount == 0 || props.items.length == 0 || props.itemSize <= 0) return state;
		let scrollerStart = 0;
		let scrollerSize = (state.lastRenderedItemIndex+1) * props.itemSize;
		let scrollOffset = 0;
		if (this.mounted) {
			let scroller = ReactDOM.findDOMNode(this);
			let slider = this.refs.slider;
			scrollerStart = getScrollPos(this.props.direction, scroller);
			scrollerSize = getSize(this.props.direction, scroller);
			scrollOffset = posDifference(this.props.direction, slider, scroller);
		}
		let renderStats = Scroller.getItems(scrollerStart, scrollerSize, scrollOffset, props.itemSize, props.items.length, props.itemBuffer || 1);
		state.size = scrollerSize;
		if (renderStats.itemsInView.length === 0) return state;
		state.renderedItems = props.items.slice(renderStats.firstItemIndex, renderStats.lastItemIndex + 1);
		state.firstRenderedItemIndex = renderStats.firstItemIndex;
		state.lastRenderedItemIndex = renderStats.lastItemIndex;
		state.sizeBefore = renderStats.firstItemIndex * props.itemSize;
		state.sizeItems = state.renderedItems.length * props.itemSize;
		state.sizeAfter = props.items.length * props.itemSize - state.sizeBefore - state.sizeItems;
		return state;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.size !== nextState.size) return true;
		if (this.state.sizeBefore !== nextState.sizeBefore) return true;
		if (this.state.sizeAfter !== nextState.sizeAfter) return true;
		if (!arraysEqual(this.state.renderedItems, nextState.renderedItems)) return true;
		return false;
	}

	componentWillReceiveProps(nextProps) {
		var state = this.getState(nextProps);
		this.setState(state);
	}

	componentWillMount() {
		this.onScrollDebounced = debounce(this.onScroll, this.props.scrollDelay, false);
	}

	componentDidMount() {
		this.mounted = true;
		this.setState(this.getState(this.props));
//		ReactDOM.findDOMNode(this).addEventListener('scroll', this.onScrollDebounced);
	}

	componentWillUnmount() {
//		ReactDOM.findDOMNode(this).removeEventListener('scroll', this.onScrollDebounced);
		this.mounted = false;
	}

	onScroll() {
		this.setState(this.getState(this.props));
	}

	renderedItems() {
		return this.state.renderedItems;
	}

	render() {
		var styleBefore = this.props.direction === 'horizontal' ? {width:this.state.sizeBefore + 'px'} : {height:this.state.sizeBefore + 'px'};
		var styleAfter = this.props.direction === 'horizontal' ? {width:this.state.sizeAfter + 'px'} : {height:this.state.sizeAfter + 'px'};
		return (
			<div className={'Scroller ' + this.props.direction} onScroll={this.onScroll}>
				<div className="ScrollSlider" ref="slider">
					<div className="ScrollSpacer ScrollSpacerBefore" ref="spacerBefore" style={styleBefore} />
					{this.state.renderedItems.map(this.props.renderItem)}
					<div className="ScrollSpacer ScrollSpacerAfter" ref="spacerAfter" style={styleAfter} />
				</div>
			</div>
		);
	}
}

Scroller.propTypes = {
	itemCount: React.PropTypes.number.isRequired,
	items: React.PropTypes.array.isRequired,
	itemSize: React.PropTypes.number.isRequired,
	renderItem: React.PropTypes.func.isRequired,
	itemsPer: React.PropTypes.number,
	itemBuffer: React.PropTypes.number,
	scrollDelay: React.PropTypes.number,
	direction: React.PropTypes.oneOf(['vertical','horizontal'])
};

Scroller.getBox = function(view, list) {
	list.size = list.size || list.end - list.start;
	return {
		start: Math.max(0, Math.min(view.start - list.start)),
		end: Math.max(0, Math.min(list.size, view.end - list.start))
	};
};

Scroller.getItems = function(viewStart, viewSize, itemStart, itemSize, itemCount, itemBuffer) {
	var result = {itemsInView: 0};
	if (itemCount === 0 || itemSize === 0) {return result;}
	
	var 
	listSize = itemSize * itemCount,
	bufferSize = itemBuffer * itemSize;
	viewStart -= bufferSize;
	viewSize += bufferSize * 2;
	// list is outside of viewport
	if ((viewStart + viewSize < itemStart) || (viewStart > viewStart + viewSize)) {return result;}

	var 
	listBox = {
		start: itemStart,
		size: listSize,
		end: itemStart + listSize
	},
	viewBox = {
		start: viewStart,
		end: viewStart + viewSize
	},
	listViewBox = Scroller.getBox(viewBox, listBox);
	
	result.firstItemIndex = Math.max(0,  Math.floor(listViewBox.start / itemSize));
	result.lastItemIndex = Math.ceil(listViewBox.end / itemSize) - 1;
	result.itemsInView = result.lastItemIndex - result.firstItemIndex + 1;
	return result;
};

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
	const dir = direction === 'horizontal' ? 'Width' : 'Height';
	return typeof element['inner' + dir] != 'undefined' ? element['inner' + dir] : element['client' + dir];
}

function getScrollPos(direction, element) {
	var res, axis = 'Y', dir = 'Top';
	if (direction === 'horizontal') {axis = 'X'; dir = 'Left';} 
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