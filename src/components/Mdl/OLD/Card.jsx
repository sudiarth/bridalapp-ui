import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { string, node, bool } = PropTypes;
import classNames from 'classnames';

function simpleComponent(defaultClass) {
	const result = (props) => {
		const { className, defaultClass, children, ...otherProps } = props;
		const classes = classNames(className, defaultClass);
		return <div className={classes} {...otherProps}>{children}</div>;
	}
	result.propTypes = {
		className: string,
		defaultClass: string.isRequired,
		children: node,
	};

	result.defaultProps = {
		defaultClass: defaultClass,
	};

	return result;
}

export const CardTitle = simpleComponent('mdl-card__title');
export const SubtitleText = simpleComponent('mdl-card__subtitle-text');
export const CardMedia = simpleComponent('mdl-card__media');
export const SupportingText = simpleComponent('mdl-card__supporting-text');
export const CardActions = simpleComponent('mdl-card__actions');
export const CardFace = simpleComponent('mdl-card__face');
export const Front = simpleComponent(CardFace.defaultProps.defaultClass + ' mdl-card__front');
export const Back = simpleComponent(CardFace.defaultProps.defaultClass + ' mdl-card__back');

export class Card extends Component {
	static propTypes = {
		className: string,
		cardClass: string,
		shadowClass: string,
		flippedClass: string,
		flipped: bool,
		children: node,
	};

	static defaultProps = {
		cardClass: 'mdl-card',
		shadowClass: 'mdl-shadow--2dp',
		flippedClass: 'is-flipped',
		flipped: false,
	};

	render() {
		const { className, cardClass, shadowClass, flippedClass, flipped, children, ...others } = this.props;
		const classes = classNames(className, cardClass, shadowClass, {[flippedClass]: flipped});
		return (<div className={classes} {...others}>{children}</div>);
	}
}
export default Card;

export class FlipCard extends Component {
	static propTypes = {
		flipped: bool.isRequired,
		trigger: string.isRequired,
	};

	static defaultProps = {
		flipped: false,
		trigger: 'onClick',
	};

	constructor(props) {
		super(props);
		this.state = this.getState(props);
		this.flip = this.flip.bind(this);
	}

	getState(props) {
		return {flipped: this.state && this.state.flipped || props && props.flipped };
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.getState(nextProps));
	}

	componentDidMount() {
		this.setState(this.getState(this.props));
	}

	isFlipped() {
		return this.state && this.state.flipped;
	}

	flip() {
		log.debug('Card.flip():', !this.getState().flipped);
		this.setState({ ...this.state, flipped:!this.isFlipped()});
	}
}
