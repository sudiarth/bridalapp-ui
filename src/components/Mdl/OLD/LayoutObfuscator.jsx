import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class LayoutObfuscator extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		obfuscatorClassName: PropTypes.string,
		children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	};

	static defaultProps = {
		obfuscatorClassName: 'mdl-layout__obfuscator mdl-layout__obfuscator-right',
	};

	render() {
		const { className, obfuscatorClassName, children, ...otherProps } = this.props;
		const classes = classNames(className, obfuscatorClassName);
		return (
			<div className={classes} { ...otherProps} />
		);
	}
}


