import log from 'picolog';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
const { bool, number, string, object, func, node, oneOf } = PropTypes;
import classNames from 'classnames';

function Div({ children, ...props }) {return <div {...props}>{children}</div>}
function Inp({ children, ...props }) {return <input {...props} />}
function Lbl({ children, ...props }) {return <label {...props}>{children}</label>}
function Spn({ children, ...props }) {return <span {...props}>{children}</span>}
function Btn({ children, ...props }) {return <button {...props}>{children}</button>}
function Nav({ children, ...props }) {return <nav {...props}>{children}</nav>}

function component(defaultClass, extraClasses={}, Elem=Div, propTypes={}, defaultProps={},
	render = props => {
		log.debug('render', props, extraClasses);
		const { className, defaultClass, children, ...others } = props;
		const extra = Object.keys(extraClasses).map(x => {
			const result = {[others[x + 'Class']]: others[x]}
			delete others[x + 'Class'];
			delete others[x];
			return result;
		})
		const classes = classNames(className, defaultClass, extra);
		return <Elem className={classes} {...others}>{children}</Elem>;
	}
) {
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
	for (let key in extraClasses) {
		render.propTypes[key + 'Class'] = string;
		render.propTypes[key] = oneOf(bool, string, object, number, node);
		render.defaultProps[key + 'Class'] = extraClasses[key];
	}
	return render;
}

function Inner({ children, ...props }) {return <div {...props}><div className="mdl-layout__inner-container">{children}</div></div>}
export const Layout = component('mdl-layout', {fixedHeader:'mdl-layout--fixed-header'}, Inner)

function HeaderRow({ children, ...props }) {return <header {...props}><div className="mdl-layout__header-row">{children}</div></header>}
export const Header = component('mdl-layout__header', {transparent:'mdl-layout__header--transparent'}, HeaderRow)

export const Navigation = component('mdl-navigation', {largeScreenOnly:'mdl-layout--large-screen-only'}, Nav);
export const LayoutTitle = component('mdl-layout__title')
export const Content = component('mdl-layout__content', {}, Div, {}, {}, props => {
	const { className, defaultClass, children, ...others } = props;
	const classes = classNames(className, defaultClass);
	return <main className={classes}><div className="page-content">{children}</div></main>
})
export const LayoutObfuscator = component('mdl-layout__obfuscator', {visible:'is-visible'})
export const Button = component('mdl-button', {fab:'mdl-button--fab', raised:'mdl-button--raised', colored:'mdl-button--colored'}, Btn)
export const TextInput = component('mdl-textfield__input', {}, Inp)
export const TextLabel = component('mdl-textfield__label', {}, Lbl)
export const FieldError = component('mdl-textfield__error', {}, Spn)
export const FieldHolder = component('mdl-textfield__expandable-holder')

export class TextField extends Component {
	static propTypes = {
		defaultClass: string,
		floatingLabelClass: string,
		expandableClass: string,
		type: string,
		value: string,
		floatingLabel: bool,
		expand: node,
		pattern: string,
		name: string.isRequired,
		label: string.isRequired,
	}

	static defaultProps = {
		defaultClass: 'mdl-textfield',
		floatingLabelClass: 'mdl-textfield--floating-label',
		expandableClass: 'mdl-textfield--expandable',
		type: 'text',
		value: '',
		floatingLabel: false,
	}

	constructor(props) {
		super(props);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {value:props.value, focused:false};
		Object.defineProperty(this, 'value', {get:()=>this.state.value});
	}

	onFocus() {this.setState({...this.state, focused:true});}
	onBlur() {this.setState({...this.state, focused:false});}
	onChange(evt) {this.setState({...this.state, value:evt.target.value});}

	render() {
		log.debug('render', this.props, this.state);
		const { className, defaultClass, floatingLabelClass, expandableClass,
				name, label, type, floatingLabel, expand, pattern, children, ...others } = this.props;
		const { focused, value } = this.state;
		const classes = classNames(className, defaultClass,	{[floatingLabelClass]:floatingLabel,
				[expandableClass]:expand, 'is-focused':focused, 'is-dirty':value});
		if (expand) return (
			<div className={classes}>
				{expand}
				<FieldHolder>
					<TextInput name={name} id={name} type={type} value={value} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} />
					<TextLabel htmlFor={name}>{label}</TextLabel>
					<FieldError />
				</FieldHolder>
			</div>
		)
		return (
			<div className={classes}>
				<TextInput name={name} id={name} type={type} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange} />
				<TextLabel htmlFor={name}>{label}</TextLabel>
				<FieldError />
			</div>
		)
	}
}

export const CardTitle = component('mdl-card__title');
export const CardSubtitleText = component('mdl-card__subtitle-text');
export const CardMedia = component('mdl-card__media');
export const CardSupportingText = component('mdl-card__supporting-text');
export const CardActions = component('mdl-card__actions');
export const Card = component('mdl-card', {flipped: 'is-flipped'}, Div,
	{
		shadowClass: string,
	},
	{
		shadowClass: 'mdl-shadow--2dp',
	},
	props => {
		const { className, defaultClass, shadowClass, flippedClass, flipped, children, ...others } = props;
		const classes = classNames(className, defaultClass, shadowClass, {[flippedClass]: flipped});
		return <div className={classes} {...others}>{children}</div>;
	}
)

export const Front = component('mdl-card__face mdl-card__front');
export const Back = component('mdl-card__face mdl-card__back');

export class FlipCard extends Component {
	static propTypes = {
		flipped: bool,
	};

	static defaultProps = {
		flipped: false,
	};

	constructor(props) {
		super(props);
		log.debug('constructor');
		this.state = this.getState(props);
		this.flip = this.flip.bind(this);
	}

	getState(props) {
		return {flipped: this.state && this.state.flipped || props && props.flipped };
	}

	componentWillReceiveProps(nextProps) {
		log.debug('componentWillReceiveProps');
		this.setState(this.getState(nextProps));
	}

	componentDidMount() {
		log.debug('componentDidMount');
		this.setState(this.getState(this.props));
	}

	isFlipped() {
		log.debug('isFlipped', this.state && this.state.flipped);
		return this.state && this.state.flipped;
	}

	flip() {
		log.debug('flip', !this.getState().flipped);
		this.setState({ ...this.state, flipped:!this.isFlipped()});
	}
}

export const DialogTitle = component('mdl-dialog__title');
export const DialogContent = component('mdl-dialog__content');
export const DialogActions = component('mdl-dialog__actions');

export const Dialog = component('mdl-dialog', {open:'is-visible'})

export const ModalDialog = component('mdl-modal-dialog', {}, Div,
	{
		open: bool,
		onClose: func.isRequired,
	},
	{
		open: false,
	},
	props => {
		const { className, defaultClass, open, onClose, children, ...others } = props;
		const classes = classNames(className, defaultClass);
		return (
			<div className={classes} {...others}>
				<Dialog open={open}>
					{children}
				</Dialog>
				<LayoutObfuscator visible={open} onClick={onClose} />
			</div>
		)
	}
)

export const Drawer = component('mdl-layout__drawer', {}, Div,
	{
		align: oneOf(['left', 'right']),
		rightClass: string,
		visibleClass: string,
		open: PropTypes.bool,
		onClose: func.isRequired,
	},
	{
		align: 'left',
		rightClass: ' mdl-layout__drawer-right',
		visibleClass: 'is-visible',
		open: false,
	},
	props => {
		const { className, defaultClass, visibleClass, rightClass, open, align, onClose, children, ...others } = props;
		const classes = classNames(className, defaultClass, {[visibleClass]: open, [rightClass]:align=='right'});
		return (
			<div>
				<div className={classes} {...others}>
					{children}
				</div>
				<LayoutObfuscator visible={open} onClick={onClose} />
			</div>
		)
	}
)

