import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { any, bool, string, object, func, shape } = PropTypes;
import classNames from 'classnames';

import { Card, CardTitle } from 'react-mdl';
import { StatefulFlipCard, FrontFace, BackFace } from '../Mdl/mdl-extras';

export class BrandCard extends Component {
	static propTypes = {
		brand: shape({
			id: any,
			name: string,
		}).isRequired,
		onOpenLightbox: func.isRequired,
	};

	constructor(...props) {
		super(...props);
	}

	thumbnailClicked(images, index, event) {
		const { onOpenLightbox } = this.props;
		if (onOpenLightbox) {onOpenLightbox(images, index, event);}
		if (event) {event.preventDefault(); event.stopPropagation();}
	}

	render() {
		const { brand: { id, name } } = this.props;
		const img = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
		const prdUrl = `https://cdn.rawgit.com/Download/bridalapp-static/1.0.1/products/${id}/Brand`;
		const brandUrl = `https://cdn.rawgit.com/Download/bridalapp-static/1.0.1/brands/${id}/logo-brand-name.png`;
		const thumbs = `${prdUrl}/thumbs.jpg`;
		const thumbnail = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
		const images = [
			{src: `${prdUrl}/back-large.jpg`, className:'back'},
			{src: `${prdUrl}/front-large.jpg`, className:'front'},
			{src: `${prdUrl}/detail-1-large.jpg`, className:'detail-1'},
			{src: `${prdUrl}/detail-2-large.jpg`, className:'detail-2'},
			{src: `${prdUrl}/detail-3-large.jpg`, className:'detail-3'},
		];

		return (
			<StatefulFlipCard className="Product" key={id}>
				<FrontFace>
					<div className="content">
						<img className="ProductImage" src={img} style={{backgroundImage: `url(${thumbs})`, height:'100%'}} />
					</div>
				</FrontFace>
				<BackFace>
					<CardTitle>
						<img className="BrandLogo" src={brandUrl} />
						<h3 className="ProductName">{name}</h3>
					</CardTitle>
					<div className="ProductGallery">
						<div className="thumbs">{images.map(({src, className}, i) => (
							<img key={i} className={classNames(className, 'thumb')}
									src={thumbnail} onClick={this.thumbnailClicked.bind(this, images, i)}
									style={{backgroundImage:`url(${thumbs})`}}
							/>
						))}</div>
					</div>
				</BackFace>
			</StatefulFlipCard>
		);
	}
}
export default BrandCard;