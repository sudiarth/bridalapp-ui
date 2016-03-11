import React, { PropTypes } from 'react';
import classNames from 'classnames';

export function FlipCard(props) {
	const { className, cardClass, shadowClass, flippedClass, flipped, children, ...otherProps } = props;
	const classes = classNames(className, cardClass, shadowClass, {flippedClass: flipped});
	return (<div className={classes} {...otherProps}>{children}</div>);
}

FlipCard.propTypes = {
	className: PropTypes.string,
	cardClass: PropTypes.string,
	shadowClass: PropTypes.string,
	flippedClass: PropTypes.string,
	flipped: PropTypes.bool,
	children: PropTypes.node,
};

FlipCard.defaultProps = {
	cardClass: 'mdl-card mdl-flip-card',
	shadowClass: 'mdl-shadow--2dp',
	flippedClass: 'is-flipped',
	flipped: false,
};

export default FlipCard;
export CardFace from './CardFace';
export { Front } from './CardFace';
export { Back } from './CardFace';
