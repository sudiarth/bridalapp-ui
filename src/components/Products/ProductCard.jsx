import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { any, bool, string, object, func, shape } = PropTypes;
import classNames from 'classnames';
import Suid from 'ws.suid';
import { CardTitle, CardText, FABButton, Icon } from 'react-mdl';
import { StatefulFlipCard, FrontFace, BackFace } from '../Mdl/mdl-extras';
import Publication from '../Publication/Publication';

export class ProductCard extends Publication {
	static propTypes = {
		product: shape({
			id: any,
			name: string,
			brandId: any,
			brandName: string,
			description: string,
			published: bool,
		}).isRequired,
	}

	static contextTypes = {
		auth: shape({
			user: object,
		}).isRequired,

		lightbox: shape({
			onOpenLightbox: func.isRequired,
		}).isRequired,
	}


	constructor(...props) {
		super(...props);
		this.state = {size: {height:'100%'}};
	}

	componentDidMount() {
		this.setState({size: window.innerWidth < 480 ? {width:'100%'} : {height:'100%'}});
	}

	thumbnailClicked(images, index, event) {
		log.log('thumbnailClicked', images, index, event);
		const { lightbox: { onOpenLightbox } } = this.context;
		onOpenLightbox(images, index, event);
		if (event) {event.preventDefault(); event.stopPropagation();}
	}

	render() {
		log.debug('render', this.props);
		const { product } = this.props;
		const { id, name, brandId, brandName, description, published } = product;
		const { size } = this.state;
		const pid = Suid(id).toString();
		const bid = Suid(brandId).toString();
		const { flipCard } = this.refs;
		const img = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
		const prdUrl = `https://cdn.rawgit.com/Download/bridalapp-static/1.0.8/products/${bid}/${encodeURIComponent(name)}`;
		const brandUrl = `https://cdn.rawgit.com/Download/bridalapp-static/1.0.8/brands/${bid}/logo-brand-name.png`;
		const thumbs = `${prdUrl}/thumbs.jpg`;
		const thumbnail = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
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
						{this.mayPublish(product) ?
							<div className="ModActions">
							{published ?
								<FABButton className="Unpublish" onClick={this.unpublishClicked.bind(this, product)}><Icon name="visibility_off" /></FABButton>
							:
								<FABButton className="Publish" onClick={this.publishClicked.bind(this, product)}><Icon name="visibility" /></FABButton>
							}
							</div>
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
					<CardText className="ProductDescription">{description || ''}</CardText>
				</BackFace>
			</StatefulFlipCard>
		);
	}
}
export default ProductCard;