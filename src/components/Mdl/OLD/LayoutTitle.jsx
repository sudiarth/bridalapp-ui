import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class DrawerTitle extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		titleClassName: PropTypes.string,
		children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	};

	static defaultProps = {
		titleClassName: 'mdl-layout-title',
		open: false,
	};

	render() {
		const { className, titleClassName, children, ...otherProps } = this.props;
		const classes = classNames(className, titleClassName);
		return (
			<span className={classes} {...otherProps}>{children}</span>
		);
	}
}

