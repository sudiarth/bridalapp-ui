import React, { Component, PropTypes } from 'react';
const { bool, string, object, shape } = PropTypes;
import classNames from 'classnames';

import Card, { Front, Back } from '../Card/Card';

export class ProductCard extends Component {
	static propTypes = {
//		product: PropTypes.object.isRequired,

		product: shape({
			id: object,
			brandId: object,
			name: string,
			description: string,
		}).isRequired,

		flipped: bool.isRequired,
	};

	static defaultProps = {
		flipped: false,
	};

	constructor(props) {
		super(props);
		this.state = this.getState(props);
	}

	getState(props) {
		return {flipped: (this.state && this.state.flipped || props.flipped) };
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.getState(nextProps));
	}

	componentDidMount() {
		this.setState(this.getState(this.props));
	}

	render() {
		const { product: { id, brandId, name, description } } = this.props;
		return (
			<Card className="Product" key={id}>
				<Front>
					<div className="content">
						<img src="data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw=="
								style={{backgroundImage: 'url(https://cdn.rawgit.com/download/bridalapp-static/0.9.13/products/' + brandId + '/' + encodeURIComponent(name) + '/thumbs.jpg)'}} />
					</div>
				</Front>
				<Back>
					<h3>{name || 'Loading...'}</h3>
					<p>{description || 'Loading...'}</p>
				</Back>
			</Card>
		);
	}
}
export default ProductCard;