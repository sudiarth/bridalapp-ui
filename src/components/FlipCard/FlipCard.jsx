import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class FlipCard extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		cardClass: PropTypes.string,
		shadowClass: PropTypes.string,
		flippedClass: PropTypes.string,
		flipped: PropTypes.bool,
		children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	}

	static defaultProps = {
		cardClass: 'mdl-card mdl-flip-card',
		shadowClass: 'mdl-shadow--2dp',
		flippedClass: 'is-flipped',
		flipped: PropTypes.bool,
	}

	render() {
		const { className, cardClass, shadowClass, flippedClass, flipped, children, ...otherProps } = this.props;
		const classes = classNames(className, cardClass, shadowClass, {flippedClass: flipped});
		return (
			<div className={classes} {...otherProps}>
				{children}
			</div>
		);
	}
}
