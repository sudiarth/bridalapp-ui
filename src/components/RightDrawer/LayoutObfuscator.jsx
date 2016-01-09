import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class LayoutObfuscator extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		obfuscatorClassName: PropTypes.string,
		visibleClassName: PropTypes.string,
		visible: PropTypes.bool,
		children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	};

	static defaultProps = {
		obfuscatorClassName: 'mdl-layout__obfuscator',
		visibleClassName: 'is-visible',
		visible: false,
	};

	render() {
		const { className, obfuscatorClassName, visibleClassName, visible, children, ...otherProps } = this.props;
		const classes = classNames(className, obfuscatorClassName, visible && visibleClassName);
		return (
			<div className={classes} { ...otherProps} />
		);
	}
}


