import React, { PropTypes, cloneElement } from 'react';
import classNames from 'classnames';

export default class FlipCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getState(props);
	}
	
	getState(props) {
		return {
			flipped: props.flipped != undefined ? props.flipped : false,
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.getState(nextProps));
	}

	componentDidMount() {
		this.mounted = true;
		this.setState(this.getState(this.props));
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
	    const { className, children, ...otherProps } = this.props;
	    const classes = classNames('FlipCard', className, {flipped: this.state && this.state.flipped});
	    
	    return (
	        <div className={classes} {...otherProps} onClick={(evt)=>{this.setState({flipped: !this.state.flipped});}}>
        		{children}
	        </div>
	    );
	}
}

FlipCard.propTypes = {
    className: PropTypes.string,
    flipped: PropTypes.bool
};

class Face extends React.Component {
	getClassName(cls) {
	    return classNames('Face', cls);
	}
	render() {
	    const { className, children, ...otherProps } = this.props;
	    const classes = this.getClassName(className);
	    return (
	    	<div className={classes} {...otherProps}>{children}</div>
	    );
	}
}

Face.propTypes = {
    className: PropTypes.string,
};

export class Front extends Face {
	getClassName(cls) {
	    return classNames('Front', super.getClassName(cls));
	}
}

export class Back extends Face {
	getClassName(cls) {
	    return classNames('Back', super.getClassName(cls));
	}
}