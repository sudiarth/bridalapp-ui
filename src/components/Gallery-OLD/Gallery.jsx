import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, string, array } = PropTypes;
import Lightbox from './Lightbox';

export class Gallery extends Component {
	static displayName = 'Gallery';
	static propTypes = {
		images: array.isRequired,
	}

	constructor() {
		super();
		this.state = {open:false, index:0};
		this.open = this.open.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.cancel= this.cancel.bind(this);
	}

	open(index, event) {
		if (event) {event.preventDefault();}
		this.setState({index, open:true});
	}

	next() {
		this.setState({index: this.state.index + 1});
	}

	prev() {
		this.setState({index: this.state.index - 1});
	}

	cancel() {
		this.setState({index:0, open:false});
	}

	render () {
		const { images } = this.props;
		const { index, open } = this.state;
		return (
			<div className="mdl-gallery">
				<div className="mdl-gallery__thumbs">{images.map((obj, i) => (
					<a className="mdl-gallery__thumb" key={i} href={obj.src} onClick={(e)=>this.open(i,e)}>
						<img src={obj.thumbnail} />
					</a>
				))}</div>
				<Lightbox images={images} open={open} index={index} onPrev={this.prev} onNext={this.next} onCancel={this.cancel} />
			</div>
		);
	}
};


export default Gallery;
