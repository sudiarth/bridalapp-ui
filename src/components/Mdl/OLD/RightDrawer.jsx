import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class RightDrawer extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		drawerClassName: PropTypes.string,
		visibleClassName: PropTypes.string,
		open: PropTypes.bool,
		children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
	};

	static defaultProps = {
		drawerClassName: 'mdl-layout__drawer mdl-layout__drawer-right',
		visibleClassName: 'is-visible',
		open: false,
	};

	render() {
		const { className, drawerClassName, visibleClassName, open, children, ...otherProps } = this.props;
		const classes = classNames(className, drawerClassName, open && visibleClassName);
		return (
			<div className={classes} {...otherProps}>
				{children}
			</div>
		);
	}
}

