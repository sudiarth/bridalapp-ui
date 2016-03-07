import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, number, string, func, array, arrayOf, shape } = PropTypes;

export class Lightbox extends Component {
	static displayName = 'Lightbox';

	static propTypes = {
		open: bool,
		images: arrayOf(shape({
			src: string.isRequired,
			srcset: array,
			caption: string,
		})),
		index: number,
		onCancel: func,
		onNext: func,
		onPrev: func,

		noKeyboardInput: bool,
		noBackdropCancel: bool,
		noNextOnClick: bool,
		noCloseButton: bool,
		noImageCount: bool,
		width: number,
	}

	static defaultProps = {
		open: false,
		images: [],
		index: 0,

		noKeyboardInput: false,
		noBackdropCancel: false,
		noNextOnClick: false,
		noCloseButton: false,
		noImageCount: false,
		width: 900,
	}

	constructor() {
		super();
		this.state = {windowHeight:0};
		this.cancel = this.cancel.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.imageClicked = this.imageClicked.bind(this);
		this.keyPressed = this.keyPressed.bind(this);
//		this.resized = this.resized.bind(this);
	}

	componentWillReceiveProps (nextProps) {
/*		if (canUseDOM) {
			if (nextProps.open) {
				!nextProps.noKeyboardInput && window.addEventListener('keydown', this.keyPressed);
				window.addEventListener('resize', this.resized);
				this.resized();
			} else {
				window.removeEventListener('keydown', this.keyPressed);
				window.removeEventListener('resize', this.resized);
			}
		} */
	}

	componentDidMount() {
		const { noKeyboardInput } = this.props;
		if (!noKeyboardInput && typeof window == 'object') {window.addEventListener('keydown', this.keyPressed);}
	}

	componentWillUnmount() {
		if (!noKeyboardInput && typeof window == 'object') {window.removeEventListener('keydown', this.keyPressed);}
	}

	cancel(event) {
		const { noBackdropCancel, onCancel } = this.props;
		if (this.props.noBackdropCancel) return;
		if (onCancel) {onCancel(event);}
		if (event) {event.preventDefault();}
	}

	next(event) {
		log.info('next');
		const { index, images, onNext } = this.props;
		if (index === (images.length - 1)) return;
		if (onNext) {onNext(event);}
		if (event) {event.preventDefault(); event.stopPropagation();}
	}

	prev(event) {
		const { index, onPrev } = this.props;
		if (index === 0) {return;}
		if (onPrev) {onPrev(event);}
		if (event) {event.preventDefault(); event.stopPropagation();}
	}

	imageClicked(event) {
		if (this.props.noNextOnClick) return;
		this.next(event);
	}

	imageLoaded(event, index) {
	}

	keyPressed(event) {
		if (event.keyCode === 37) {
			this.prev(event);
		} else if (event.keyCode === 39) {
			this.next(event);
		} else if (event.keyCode === 27) {
			this.cancel(event);
		}
	}

	/*
	resized() {
		this.setState({windowHeight: window.innerHeight || 0});
	}
	*/

	renderArrowNext () {
		if (this.props.index === (this.props.images.length - 1)) return;
		return <i className="material-icons" onClick={this.next} onTouchEnd={this.next}>navigate_next</i>
	}

	renderArrowPrev () {
		if (this.props.index === 0) return;
		return <i className="material-icons" onClick={this.prev} onTouchEnd={this.prev}>navigate_before</i>
	}

	renderCloseButton () {
		if (this.props.noCloseButton) return;
		return <i className="material-icons" onClick={this.cancel} onTouchEnd={this.cancel}>close</i>
	}

	render() {
		const { open } = this.props;
		return (
			<div className={'mdl-lightbox' + (open ? ' is-visible' : '')}>
				<div className="mdl-lightbox__content">
					{this.renderCloseButton()}
					{this.renderImages()}
				</div>
				{this.renderArrowPrev()}
				{this.renderArrowNext()}
				<div className={'mdl-layout__obfuscator' + (open ? ' is-visible' : '')} onClick={this.cancel} onTouchEnd={this.cancel} />
			</div>
		);
	}

	renderFooter (caption) {
		const { index, images, noImageCount } = this.props;
		if (!caption && noImageCount) return;
		const imageCount = !noImageCount ? <div className="">{index + 1} of {images.length}</div> : null;
		const figcaption = caption ? <figcaption className={classes.footerCaption}>{caption}</figcaption> : null;
		return (
			<div className="mdl-lightbox__footer">
				{imageCount}
				{figcaption}
			</div>
		);
	}

	renderImages () {
		const { images, index } = this.props;
		if (!images || !images.length) return;
		const image = images[index];
		let srcset, sizes;
		if (image.srcset) {
			srcset = image.srcset.join();
			sizes = '100vw';
		}
		return (
			<figure>
				<img
					onClick={this.imageClicked}
					onLoad={e => this.imageLoaded(e, index)}
					onTouchEnd={this.imageClicked}
					src={image.src}
					style={{cursor: this.props.noNextOnClick ? 'auto' : 'pointer'}}
				/>
				{this.renderFooter(images[index].caption)}
			</figure>
		);
	}
};

export default Lightbox;
