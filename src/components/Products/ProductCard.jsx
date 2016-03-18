import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { any, bool, string, object, func, shape } = PropTypes;
import classNames from 'classnames';
import Suid from 'ws.suid';

import { Card, CardTitle, FABButton, Icon } from 'react-mdl';
import { StatefulFlipCard, FrontFace, BackFace } from '../Mdl/mdl-extras';

export class ProductCard extends Component {
	static propTypes = {
		product: shape({
			id: any,
			name: string,
			brandId: any,
			brandName: string,
			description: string,
			published: bool,
		}).isRequired,
		onOpenLightbox: func.isRequired,
		mayPublish: bool.isRequired,
		onPublish: func.isRequired,
		onUnpublish: func.isRequired,
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
		const { product: { id, name, brandId, brandName, description, published },
				mayPublish, onPublish, onUnpublish } = this.props;
		const pid = Suid(id).toString();
		const bid = Suid(brandId).toString();
		log.debug('render', id, name, brandName);
		const { flipCard } = this.refs;
		const img = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
		const prdUrl = `https://cdn.rawgit.com/Download/bridalapp-static/1.0.5/products/${bid}/${encodeURIComponent(name)}`;
		const brandUrl = `https://cdn.rawgit.com/Download/bridalapp-static/1.0.5/brands/${bid}/logo-brand-name.png`;
		const thumbs = `${prdUrl}/thumbs.jpg`;
		const thumbnail = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
		const size = typeof window == 'object' && window.innerWidth < 480 ? {width:'100%'} : {height:'100%'};
		const images = [
			{src: `${prdUrl}/back-large.jpg`, className:'back', alt:{src:img, style:{...size, backgroundImage:`url(${thumbs})`, backgroundSize:'300%', backgroundPosition:'100% 0'}}},
			{src: `${prdUrl}/front-large.jpg`, className:'front', alt:{src:img, style:{...size, backgroundImage:`url(${thumbs})`, backgroundSize:'150%', backgroundPosition:'0 0'}}},
			{src: `${prdUrl}/detail-1-large.jpg`, className:'detail-1', alt:{src:img, style:{...size, backgroundImage:`url(${thumbs})`, backgroundSize:'600%', backgroundPosition:'200% 200%'}}},
			{src: `${prdUrl}/detail-2-large.jpg`, className:'detail-2', alt:{src:img, style:{...size, backgroundImage:`url(${thumbs})`, backgroundSize:'600%', backgroundPosition:'100% 200%'}}},
			{src: `${prdUrl}/detail-3-large.jpg`, className:'detail-3', alt:{src:img, style:{...size, backgroundImage:`url(${thumbs})`, backgroundSize:'600%', backgroundPosition:'200% 100%'}}},
		];
		const classes = classNames('Product', {'unpublished':!published});
		return (
			<StatefulFlipCard className={classes} key={id}>
				<FrontFace>
					<div className="content">
						<img className="ProductImage" src={img} style={{backgroundImage: `url(${thumbs})`, height:'100%'}} />
						{mayPublish ?
							(published ?
								<FABButton onClick={onUnpublish}><Icon name="visibility" /></FABButton>
							:
								<FABButton onClick={onPublish}><Icon name="visibility_off" /></FABButton>
							)
						: ''}
					</div>
				</FrontFace>
				<BackFace>
					<CardTitle>
						<img className="BrandLogo" src={brandUrl} />
						<h3 className="ProductName">{name || 'Loading...'}</h3>
					</CardTitle>
					<div className="ProductGallery">
						<div className="thumbs">{images.map(({src, className}, i) => (
							<img key={i} className={classNames(className, 'thumb')}
									src={thumbnail} onClick={this.thumbnailClicked.bind(this, images, i)}
									style={{backgroundImage:`url(${thumbs})`}}
							/>
						))}</div>
					</div>
					<div className="ProductDescription">{description || ''}</div>
				</BackFace>
			</StatefulFlipCard>
		);
	}
}
export default ProductCard;