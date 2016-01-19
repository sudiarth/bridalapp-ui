import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class CardFace extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		faceClass: PropTypes.string,
		children: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
	};

	static defaultProps = {
		faceClass: 'mdl-card__face'
	};

	render() {
		const { className, faceClass, children, ...otherProps } = this.props;
		const classes = classNames(className, faceClass);
		return (
			<div className={classes} {...otherProps}>{children}</div>
		);
	}
}

export class Front extends CardFace {
	static defaultProps = {
		faceClass: classNames(CardFace.defaultProps.faceClass, 'mdl-card__front')
	};
}

export class Back extends CardFace {
	static defaultProps = {
		faceClass: classNames(CardFace.defaultProps.faceClass, 'mdl-card__back')
	};
}