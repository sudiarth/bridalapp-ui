import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { any, bool, string, object, func, shape } = PropTypes;
import classNames from 'classnames';
import Suid from 'ws.suid';
import { CardTitle, FABButton, Icon } from 'react-mdl';
import { StatefulFlipCard, FrontFace, BackFace } from '../Mdl/mdl-extras';
import { Publication } from '../Publication/Publication';

export class BrandCard extends Publication {
	static propTypes = {
		brand: shape({
			id: any,
			name: string,
		}).isRequired,
	}

	static contextTypes = {
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
		const { lightbox: { onOpenLightbox } } = this.context;
		onOpenLightbox(images, index, event);
		if (event) {event.preventDefault(); event.stopPropagation();}
	}

	render() {
		const { brand } = this.props;
		const { id, name, published } = brand;
		const { size } = this.state;
		const bid = id.toString();
		const img = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
		const prdUrl = `https://cdn.rawgit.com/Download/bridalapp-static/1.0.14/products/${bid}/Brand`;
		const brandUrl = `https://cdn.rawgit.com/Download/bridalapp-static/1.0.14/brands/${bid}/logo-brand-name.png`;
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
			<StatefulFlipCard className={classes} key={bid}>
				<FrontFace>
					<div className="content">
						<img className="ProductImage" src={img} style={{backgroundImage: `url(${thumbs})`, height:'100%'}} />
						{this.mayPublish(brand) ?
							<div className="ModActions">
							{published ?
								<FABButton className="Unpublish" onClick={this.unpublishClicked.bind(this, brand)}><Icon name="visibility_off" /></FABButton>
							:
								<FABButton className="Publish" onClick={this.publishClicked.bind(this, brand)}><Icon name="visibility" /></FABButton>
							}
							</div>
						: ''}
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