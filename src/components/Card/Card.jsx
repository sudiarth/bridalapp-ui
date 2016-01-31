import React, { PropTypes } from 'react';
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

export function Card(props) {
	const { className, cardClass, shadowClass, flippedClass, flipped, children, ...otherProps } = props;
	const classes = classNames(className, cardClass, shadowClass, {flippedClass: flipped});
	return (<div className={classes} {...otherProps}>{children}</div>);
}

Card.propTypes = {
	className: string,
	cardClass: string,
	shadowClass: string,
	flippedClass: string,
	flipped: bool,
	children: node,
};

Card.defaultProps = {
	cardClass: 'mdl-card mdl-flip-card',
	shadowClass: 'mdl-shadow--2dp',
	flippedClass: 'is-flipped',
	flipped: false,
};

export default Card;
