import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { any, bool, string, object, func, shape } = PropTypes;
import classNames from 'classnames';
import Suid from 'ws.suid';
import { CardTitle, CardText, Button, FABButton, Icon } from 'react-mdl';
import { StatefulFlipCard, FrontFace, BackFace, Sprite, Switch } from '../Mdl/mdl-extras';
import Publication from '../Publication/Publication';

export class ProductCard extends Publication {
	static propTypes = {
		className: string,
		product: shape({
			id: any,
			name: string,
			brandId: any,
			brandName: string,
			description: string,
			published: bool,
		}).isRequired,
		rating: string,
		stocked: bool,
		onLove: func.isRequired,
		onDislike: func.isRequired,
		onUndoRating: func.isRequired,
		onMayToggleStock: func.isRequired,
		onToggleStock: func.isRequired,
		removing: string
	}

	static defaultProps = {
		removing: '',
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
		this.setState(...this.state, {size: window.innerWidth < 480 ? {width:'100%'} : {height:'100%'}});
	}

	componentWillReceiveProps(nextProps) {
		if (typeof window == 'object' && nextProps.removing) {
			const node = ReactDOM.findDOMNode(this);
			const newState = {...this.state, rect:node.getBoundingClientRect(), win:window.innerWidth};
			this.setState(newState);
			log.debug('componentWillReceiveProps: state=', this.state, ', newState=', newState);
		}
	}

	thumbnailClicked(images, index, event) {
		log.log('thumbnailClicked', images, index, event);
		const { lightbox: { onOpenLightbox } } = this.context;
		if (event) {event.preventDefault(); event.stopPropagation();}
		onOpenLightbox(images, index, event);
	}

	dislikeClicked(product, event) {
		log.log('dislikeClicked', product, event);
		if (event) {event.preventDefault(); event.stopPropagation();}
		return this.props.onDislike(product);
	}

	loveClicked(product, event) {
		log.log('loveClicked', product, event);
		if (event) {event.preventDefault(); event.stopPropagation();}
		return this.props.onLove(product);
	}

	undoRatingClicked(product, event) {
		log.log('undoRatingClicked', product, event);
		if (event) {event.preventDefault(); event.stopPropagation();}
		return this.props.onUndoRating(product);
	}

	mayToggleStock(product) {
		log.trace('mayToggleStock', product);
		const result = this.props.onMayToggleStock(product);
		log.trace('mayToggleStock => ' + result);
		return result;
	}

	isStocked(product) {
		log.trace('isStocked', product);
		const result = this.props.onIsStocked(product);
		log.trace('isStocked => ' + result);
		return result;
	}

	toggleStockClicked(product, event) {
		log.log('toggleStockClicked', product, event);
		if (event) {event.preventDefault(); event.stopPropagation();}
		return this.props.onToggleStock(product);
	}

	render() {
		log.debug('render', this.props);
		const { className, product, rating, stocked, onLove, onDislike, onUndoRating, removing, ...others } = this.props;
		if (stocked) log.info('render', product);
		const { id, name, brandId, brandName, description, published } = product;
		const { size, rect, win } = this.state;
		const pid = Suid(id).toString();
		const bid = Suid(brandId).toString();
		const { flipCard } = this.refs;
		const img = 'data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw==';
		const prdUrl = `https://cdn.rawgit.com/Download/bridalapp-static/1.0.14/products/${bid}/${encodeURIComponent(name)}`;
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
		const classes = classNames('Product', className, {'unpublished':!published, 'removing':removing,
				'loved':removing === 'loved', 'disliked':removing === 'disliked'});
		const width = rect ? rect.right - rect.left : 0;
		const height = rect ? rect.bottom - rect.top : 0;
		const trans = (removing === 'disliked' || removing === 'undoRating')
			? 0 - rect.left - width : (removing === 'loved' ? win - rect.left : '');
		const transform = `translate3d(${trans}px, 0, 10px) scale3d(0.2, 0.2, 0.2)`
		const style = removing ? {width:width, height:height, transform:transform, WebkitTransform:transform} : {};
		return (
			<StatefulFlipCard className={classes} key={id} style={style}>
				<FrontFace>
					<div className="content">
						<img className="ProductImage" src={img} style={{backgroundImage: `url(${thumbs})`, height:'100%'}} />

						{!rating ?
							<div className="RatingActions">
								<FABButton colored className="Rate disliked danger" onClick={this.dislikeClicked.bind(this, product)}><Sprite name="broken-heart" /></FABButton>
								<FABButton colored className="Rate loved" onClick={this.loveClicked.bind(this, product)}><Icon name="favorite" /></FABButton>
							</div>
						:
							<div className="RatingActions">
								<Button onClick={this.undoRatingClicked.bind(this, product)}>
									{rating == 'disliked' ?
										<Sprite name="broken-heart" />
									:
										<Icon name="favorite" />
									}
									undo
								</Button>
							</div>
						}

						{this.mayPublish(product) ?
							<div className="ModActions">
							{published ?
								<FABButton className="Unpublish" onClick={this.unpublishClicked.bind(this, product)}><Icon name="visibility_off" /></FABButton>
							:
								<FABButton className="Publish" onClick={this.publishClicked.bind(this, product)}><Icon name="visibility" /></FABButton>
							}
							</div>
						: ''}

						{this.mayToggleStock(product) ?
							<div className="ActorActions">
								<Switch on={stocked} name={'stock' + product.id} sprite="stock"
									onChange={this.toggleStockClicked.bind(this, product)} />
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

//								<FABButton className="Unclaim" onClick={this.unclaimClicked.bind(this, product)}><Sprite name="disable-stock" /></FABButton>
//								<FABButton className="Claim" onClick={this.claimClicked.bind(this, product)}><Sprite name="stock" /></FABButton>



