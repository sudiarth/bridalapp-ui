import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { any, bool, string, object, func, shape } = PropTypes;
import classNames from 'classnames';
import { CardTitle, CardText, FABButton, Icon } from 'react-mdl';
import Suid from 'ws.suid';
import { StatefulFlipCard, FrontFace, BackFace } from '../Mdl/mdl-extras';
import Publication from '../Publication/Publication';

export class StoreCard extends Publication {
	static propTypes = {
		store: shape({
			id: any,
			name: string,
			description: string,
			address1: string,
			address2: string,
			postalCode: string,
			city: string,
			state: string,
			countryCode: string,
			telephone: string,
			website: string,
			email: string,
			premium: bool.isRequired,
		}).isRequired,
		mayImpersonate: bool.isRequired,
		onImpersonate: func.isRequired,
	}

	constructor(...props) {
		super(...props);
		this.state = {logoMissing:false, thumbMissing:false};
	}

	impersonateClicked(store, event) {
		log.log('impersonate', store, event);
		event.preventDefault();
		this.props.onImpersonate(store);
	}

	render() {
		log.debug('render', this.props);
		const { store, mayImpersonate } = this.props;
		const { id, name, description, address1, address2, postalCode, city, state, countryCode, telephone, website, premium, published } = store;
		const sid = id.toString();
		const logo = `https://cdn.rawgit.com/Download/bridalapp-static/1.0.15/stores/${sid}/logo.png`;
		const thumb = `https://cdn.rawgit.com/Download/bridalapp-static/1.0.15/stores/${sid}/thumb.jpg`;
		const classes = classNames('Store', {'premium':premium, 'unpublished':!published});
		const publishButton = this.mayPublish(store) ? (published
			? <FABButton className="Unpublish" onClick={this.unpublishClicked.bind(this, store)}><Icon name="visibility_off" /></FABButton>
			: <FABButton className="Publish" onClick={this.publishClicked.bind(this, store)}><Icon name="visibility" /></FABButton>
		):'';
		const impersonateButton = mayImpersonate ?
			<FABButton className="Impersonate" onClick={this.impersonateClicked.bind(this, store)}><Icon name="verified_user" /></FABButton>
		:'';
		return (
			<StatefulFlipCard className={classes} key={sid}>
				<FrontFace>
					<CardTitle>
						{this.state.logoMissing ?
							<h3 className="StoreLogoAlt">{name}</h3>
						:
							<img className="StoreLogo" src={logo}
								onError={()=>this.setState({...this.state, logoMissing:true})} />
						}
					</CardTitle>
					<div className="mdl-card__content">
						{this.state.thumbMissing ?
							<div className="StoreThumbAlt"></div>
						:
							<img className="StoreThumb" src={thumb}
								onError={()=>this.setState({...this.state, thumbMissing:true})} />
						}

						<CardText className="StoreDescription">
							{description}
						</CardText>
					</div>
					{mayImpersonate || this.mayPublish(store) ?
						<div className="ModActions">
							{publishButton}
							{impersonateButton}
						</div>
					:''}
				</FrontFace>
				<BackFace>
					<CardTitle>
						{this.state.logoMissing ?
							<h3 className="StoreLogoAlt">{name}</h3>
						:
							<img style={{filter:'grayscale(1)'}} className="StoreLogo" src={logo} onError={()=>this.setState({...this.state, logoMissing:true})} />
						}
					</CardTitle>
					<p>{description}</p>
					<address>
						{address1}<br/>
						{address2}<br/>
						{city}
					</address>
				</BackFace>
			</StatefulFlipCard>
		);
	}
}
export default StoreCard;