import log from 'picolog';
import React, { Component, PropTypes, Children } from 'react';
import ReactDOM from 'react-dom';
import { Drawer as MdlDrawer, Textfield as MdlTextfield, FABButton, Icon, Card, Spinner } from 'react-mdl';
log.assert(MdlDrawer, 'MdlDrawer is not defined');
log.assert(MdlTextfield, 'MdlTextfield is not defined');
const { bool, number, string, object, func, array, node, shape, oneOfType, arrayOf } = PropTypes;
import classNames from 'classnames';

export function component(displayName, defaultClass, conditionals={}, elem='div', propTypes={}, defaultProps={}, createElement=React.createElement) {
	function render(props) {
		log.debug('render', props);
		const { className, defaultClass, children, ...others } = props;
		const extraClasses = Object.keys(conditionals).map(x => ({[others[x + 'Class']]: others[x]}));
		return createElement(elem, {className:classNames(className, defaultClass, extraClasses), ...others}, children);
	}
	render.displayName = displayName;
	render.propTypes = {
		defaultClass: string,
		className: string,
		children: node,
		...propTypes
	}
	render.defaultProps = {
		defaultClass,
		...defaultProps
	}
	for (let key in conditionals) {
		render.propTypes[key + 'Class'] = string;
		render.propTypes[key] = oneOfType([bool, string, object, number, node]);
		render.defaultProps[key + 'Class'] = conditionals[key];
	}
	return render;
}

export const LayoutTitle = component('LayoutTitle', 'mdl-layout__title')
export const LayoutObfuscator = component('LayoutObfuscator', 'mdl-layout__obfuscator', {open:'is-visible'}, 'div', {onCancel: func.isRequired}, {},
	(elem, props, children) => {
		const { onCancel, ...others } = props;
		return (
			<div onClick={onCancel} onTouchEnd={onCancel} {...others} />
		)
	}
)

export const Sprite = component('Sprite', 'material-icons-sprite', {}, 'i', {name: string.isRequired}, {},
	(elem, props, children) => {
		const { name, className, ...others } = props;
		const classes = classNames(className, name);
		return (
			<i className={classes} {...others} />
		)
	}
)

export const Switch = component('Switch', 'mdl-switch', {ripple:'mdl-js-ripple-efect'}, 'label',
	{
		name: string.isRequired,
		icon: string,
		sprite: string,
		on: bool,
	},
	{
		on: false
	},
	(elem, props, children) => {
		const { name, icon, sprite, on, className, ...others } = props;
		const classes = classNames(className, 'is-upgraded', {'is-checked':on, 'icon':!!icon, 'sprite':!!sprite});
		return (
			<label className={classes} htmlFor={name} {...others}>
				<input type="checkbox" id={name} className="mdl-switch__input" defaultChecked={on} />
				<span className="mdl-switch__label">
					{icon ? <Icon name={icon} /> : ''}
					{sprite ? <Sprite name={sprite} /> : ''}
					{children}
				</span>
				<div className="mdl-switch__track"></div>
				<div className="mdl-switch__thumb">
					<span className="mdl-switch__focus-helper"></span>
				</div>
			</label>
		)
	}
)
/*
<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="switch-1">
  <input type="checkbox" id="switch-1" class="mdl-switch__input" checked>
  <span class="mdl-switch__label"></span>
</label>
*/


/**
 * Controlled version of the MDL TextField component that adds a property `value`.
 */
export class Textfield extends Component {
	static propTypes = {...MdlTextfield.propTypes}
	static defaultProps = {...MdlTextfield.defaultProps}

	constructor(...props) {
		super(...props);
		this.onChange = this.onChange.bind(this);
		Object.defineProperty(this, 'value', {get:()=>this.props.value});
	}

	onChange(evt, ...params) {
		log.debug('onChange', evt, evt.target.value);
		const { onChange } = this.props;
		return onChange && onChange(evt.target.value, evt, ...params);
	}

	render() {
		log.debug('render', this.props);
		const { onChange, children, ...props } = this.props;
		return <MdlTextfield onChange={this.onChange} {...props} />
	}
}

/**
 * Stateful version of the MDL TextField component that adds a property `value`.
 *
 * This component is stateful; it uses `this.state` to keep track of the underlying
 * input's value. It basically does the work for you that is mentioned here:
 * https://facebook.github.io/react/docs/forms.html#controlled-components
 */
export class StatefulTextfield extends Component {
	static propTypes = {...MdlTextfield.propTypes}
	static defaultProps = {...MdlTextfield.defaultProps}

	constructor(...props) {
		super(...props);
		this.onChange = this.onChange.bind(this);
		this.state = {value:this.props.value};
		Object.defineProperty(this, 'value', {get:()=>this.state.value});
	}

	onChange(evt, ...params) {
		log.debug('onChange', evt, evt.target.value);
		this.setState({value:evt.target.value});
		const { onChange } = this.props;
		return onChange && onChange(evt, ...params);
	}

	render() {
		const { value } = this.state;
		log.debug('render', value);
		const { children, onChange, ...props } = this.props;
		return <MdlTextfield value={value} onChange={this.onChange} {...props} />
	}
}

/** The front face of a flippable Card */
export const FrontFace = component('FrontFace', 'mdl-card__face mdl-card__front');
/** The back face of a flippable Card */
export const BackFace = component('BackFace', 'mdl-card__face mdl-card__back');


export const FlipCard = component('FlipCard', 'mdl-card is-flippable', {flipped: 'is-flipped'});

/**
 * A base class to create a MDL Card that is flippable.
 *
 * This class is stateful; it manages the flip state in `this.state`.
 * If you extend from it, you need to implement `render()` and use
 * the methods `isFlipped()` and `flip()` to inspect/update the
 * flip state in response to e.g. clicks etc.
 */
export class StatefulFlipCard extends Component {
	static propTypes = {
		flipped: bool,
		className: string,
		frontLoadDelay: number,
		backLoadDelay: number,
	}
	static defaultProps = {
		flipped: false,
		frontLoadDelay: 250,
		backLoadDelay: 2500,
	}
	constructor(...props) {
		super(...props);
		this.state = {
			flipped: this.props.flipped,
			backLoaded:!this.props.backLoadDelay,
			frontLoaded:!this.props.frontLoadDelay,
		};
		this.flip = this.flip.bind(this);
	}

	isFlipped() {
		return this.state.flipped;
	}

	flip(event) {
		if (event && event.defaultPrevented) {return;}
		const { flipped, frontLoaded, backLoaded } = this.state;
		this.setState({...this.state, flipped: !flipped, backLoaded: backLoaded || !flipped, frontLoaded: frontLoaded || flipped});
	}

	componentDidMount() {
		const { frontLoadDelay, backLoadDelay } = this.props;
		if (frontLoadDelay) {
			this.frontLoad = setTimeout(() => {this.setState({...this.state, frontLoaded:true});}, frontLoadDelay);
		}
		if (backLoadDelay) {
			this.backLoad = setTimeout(() => {this.setState({...this.state, backLoaded:true});}, backLoadDelay);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.frontLoad);
		clearTimeout(this.backLoad);
	}

	render() {
		const { className, flipped, frontLoadDelay, backLoadDelay, children, ...others } = this.props;
		let frontProps, frontChilds, backProps, backChilds;
		for (let i=0, elem; elem=children[i]; i++) {
			if (elem.type === FrontFace) {
				const { children, ...others } = elem.props;
				frontProps = others;
				frontChilds = children;
			}
			else if (elem.type === BackFace) {
				const { children, ...others } = elem.props;
				backProps = others;
				backChilds = children;
			}
		}

		return (
			<FlipCard className={className} flipped={this.isFlipped()} onClick={this.flip} {...others} >
				<FrontFace {...frontProps}>
					{this.state.frontLoaded ? frontChilds : ''}
				</FrontFace>
				<BackFace {...backProps}>
					{this.state.backLoaded ? backChilds : ''}
				</BackFace>
			</FlipCard>
		)
	}
}

export const SimpleDialog = component('SimpleDialog', 'mdl-dialog', {visible:'is-visible'}, 'div')
export const Modal = component('Modal', 'mdl-modal', {}, 'div', {open:bool.isRequired, onCancel: func.isRequired}, {},
	(elem, props, children) => {
		const { open, onCancel, ...others } = props;
		return (
			<div {...others}>
				{children}
				<LayoutObfuscator open={open} onCancel={onCancel} />
			</div>
		)
	}
)

export const Dialog = component('Dialog', '', {}, 'div',
	{
		open: bool,
		modal: bool,
		onCancel: func,
	},
	{
		open: false,
		modal: false
	},
	(elem, props, children) => {
		const { open, modal, onCancel, ...others } = props;
		return (modal
		?
			<Modal open={open} onCancel={onCancel}>
				<SimpleDialog visible={open} {...others}>
					{children}
				</SimpleDialog>
			</Modal>
		:
			<SimpleDialog visible={open} {...others}>
				{children}
			</SimpleDialog>
		)
	}
)

export const Drawer = component('Drawer', '', {right:'mdl-layout__drawer-right', open:'is-visible'}, 'div',
	{
		modal: bool,
		autoClose: bool,
		onCancel: func,
	},
	{
		modal: false,
		autoClose: false,
	},
	(elem, props, children) => {
		log.debug('render', props);
		const { open, modal, autoClose, onCancel, onClick, ...others } = props;
		return (modal
		?
			<Modal open={open} onCancel={onCancel}>
				<MdlDrawer visible={open} onClick={(e) => onClick ? onClick(e) : (autoClose ? onCancel(e) : undefined)} {...others}>
					{children}
				</MdlDrawer>
			</Modal>
		:
			<MdlDrawer {...others}>
				{children}
			</MdlDrawer>
		)
	}
)


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
		noPositionIndicators: false,
		noPreload: false,
		noSpinner: false,
		noRotate: false,
		width: 900,
	}

	constructor() {
		super();
		this.state = {loaded:[]}
		this.cancel = this.cancel.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.nav = this.nav.bind(this);
		this.imageClicked = this.imageClicked.bind(this);
		this.keyPressed = this.keyPressed.bind(this);
	}

	componentDidMount() {
		const { noKeyboardInput } = this.props;
		if (!noKeyboardInput && typeof window == 'object') {window.addEventListener('keydown', this.keyPressed);}
	}

	componentWillUnmount() {
		const { noKeyboardInput } = this.props;
		if (!noKeyboardInput && typeof window == 'object') {window.removeEventListener('keydown', this.keyPressed);}
	}

	cancel(event) {
		log.log('cancel', event);
		const { noBackdropCancel, onCancel } = this.props;
		if (noBackdropCancel) return;
		this.setState({loaded:[]});
		if (onCancel) {onCancel(event);}
		if (event) {event.preventDefault(); event.stopPropagation();}
	}

	next(event) {
		log.log('next', event);
		const { images, index, onNext, onNav, noRotate } = this.props;
		if (index === images.length - 1) {
			if (noRotate) {return;}
			if (onNav) {onNav(0, event);}
		} else {
			if (onNext) {onNext(event);}
		}
		if (event) {event.preventDefault(); event.stopPropagation();}
	}

	prev(event) {
		log.log('prev', event);
		const { images, index, onPrev, onNav, noRotate } = this.props;
		if (index === 0) {
			if (noRotate) {return;}
			if (onNav) {onNav(images.length - 1, event);}
		} else {
			if (onPrev) {onPrev(event);}
		}
		if (event) {event.preventDefault(); event.stopPropagation();}
	}

	nav(idx, event) {
		log.log('nav', event);
		const { onNav } = this.props;
		if (onNav) {onNav(idx, event);}
		if (event) {event.preventDefault(); event.stopPropagation();}
	}

	imageClicked(event) {
		log.log('imageClicked', event);
		if (this.props.noNextOnClick) return;
		this.next(event);
	}


	imageLoaded(event, index) {
		log.log('imageLoaded', event, index);
		const loaded = this.state.loaded.concat();
		loaded[index] = true;
		this.setState({loaded});
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

	render() {
		const { open, index, images, noCloseButton, noImageCount, noPositionIndicators, noPreload, noSpinner, noRotate } = this.props;
		const noImages = !images || !images.length;
		const caption = !noImages && images[index].caption;
		const style = { cursor: this.props.noNextOnClick ? 'auto' : 'pointer', opacity: this.state.loaded[index] ? 1 : 0};
		const alt = !noImages && images[index].alt;
		const imgStyle = !this.state.loaded[index] ? {position:'absolute', width:0, height:0} : {};
		const positionIndicators = noPositionIndicators ? undefined : (
			<div className="mdl-lightbox__position-indicators">
				{images.map((img, i) => (
					<a key={i} href="#" className={'mdl-lightbox__position-indicator' + (i === index ? ' is-active' : '')}
						onClick={(evt) => this.nav(i, evt)} onTouchEnd={(evt) => this.nav(i, evt)}><b></b></a>
				))}
			</div>
		)
		const imageCount = noImageCount ? undefined : <div className="mdl-lightbox__image-count">{index + 1} / {images.length}</div>;
		const figcaption = !caption ? undefined : <figcaption className="mdl-lightbox__caption">{caption}</figcaption>;
		const noFooter = !caption && !positionIndicators && !imageCount;
		return (
			<Modal open={open} onCancel={this.cancel}>
				<div className={'mdl-lightbox' + (open ? ' is-visible' : '')}>
					<div className="mdl-lightbox__content">

						{noCloseButton ? undefined :
							<FABButton className="mdl-lightbox__close-button" onClick={this.cancel} onTouchEnd={this.cancel}>
								<Icon name="close" />
							</FABButton>
						}

						{noImages ? undefined :
							<figure>
								{!this.state.loaded[index] ?
									<Spinner />
								:''}
								{!this.state.loaded[index] && alt ?
									<img src={alt.src} style={alt.style} />
								:''}
								<img
									onClick={this.imageClicked}
									onLoad={e => this.imageLoaded(e, index)}
									onTouchEnd={this.imageClicked}
									src={images[index].src}
									style={{...style, ...imgStyle}}
								/>
								{noFooter ? undefined :
									<div className="mdl-lightbox__footer">
										{positionIndicators}
										{imageCount}
										{figcaption}
									</div>
								}
							</figure>
						}

						{noPreload || !this.state.loaded[index] ? undefined :
							<div className="mdl-lightbox__preload" style={{width:0, height:0, overflow:'hidden', opacity:0}}>
								{images.map(({src}, i) => (i === index ? undefined :
									<img key={i} src={src} onLoad={e => this.imageLoaded(e, i)} />
								))}
							</div>
						}
					</div>

					<FABButton className="mdl-lightbox__prev-button" disabled={noRotate && (index === 0)} onClick={this.prev} onTouchEnd={this.prev}>
						<Icon name="navigate_before" />
					</FABButton>

					<FABButton className="mdl-lightbox__next-button" disabled={noRotate && (index === images.length - 1)} onClick={this.next} onTouchEnd={this.next}>
						<Icon name="navigate_next" />
					</FABButton>

				</div>
			</Modal>
		);
	}
};
