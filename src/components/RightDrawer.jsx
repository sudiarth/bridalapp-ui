import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class RightDrawer extends React.Component {
	render() {
	    const { className, title, children, ...otherProps } = this.props;
	    const classes = classNames('mdl-layout__drawer mdl-layout__drawer-right', className);
	
	    return (
	        <div className={classes} {...otherProps}>
	            {title ? <span className="mdl-layout-title">{title}</span> : null}
	            {children}
	        </div>
	    );
	}
}

RightDrawer.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string
};
