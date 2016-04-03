import log from 'picolog';
import { link } from 'redux-apis';
import { remote } from 'redux-fetch-api';
import Suid from 'ws.suid';

import { fromJSON, toJSON, indexOf } from '../Entity/Entity';
import { authenticated } from '../Auth/api';
import { PublicationApi } from '../Publication/api';
import Product from './Product';
import Rating from './Rating';

@remote
export class ProductsApi extends PublicationApi {
	constructor(state) {
		super(state);
		this.item.onLove = this.love.bind(this);
		this.item.onDislike = this.dislike.bind(this);
		this.item.onUndoRating = this.undoRating.bind(this);
	}

	searchUrl(filter) {
		const result = filter.category ? `/${filter.category}` : '';
		const clone = { ...filter };
		delete clone.category;
		return result + super.searchUrl(clone);
	}

	rate(product, rating) {
		log.log('rate', product, rating);
		return this.fetch('/ratings', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: toJSON(rating),
		})
		.then(response => {
			if (response && response.status == 200) {
				return response.text();
			}
			return response.text().then(text => {
				const error = Error(text);
				error.status = response.status;
				error.statusText = response.statusText;
				throw error;
			});
		})
		.then(text => fromJSON(text))
		.catch(error => {
			log.error('Unable to create rating for product ' + product.id.toString() + ' ' + product.name + ' by ' + product.brandName + '.', error);
		});
	}

	unrate(product) {
		log.log('unrate', product);
		return this.fetch('/ratings', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: toJSON(product),
		})
		.then(response => {
			if (response && response.status == 200) {
				return response.text();
			}
			return response.text().then(text => {
				const error = Error(text);
				error.status = response.status;
				error.statusText = response.statusText;
				throw error;
			});
		})
		.then(text => fromJSON(text))
		.catch(error => {
			log.error('Unable to delete rating for product ' + product.id.toString() + ' ' + product.name + ' by ' + product.brandName + '.', error);
		});
	}

	love(product) {
		log.log('love', product);
		return this.authenticated().then(session => {
			log.debug('authenticated', session);
			const rating = {id: Suid.next(), productId:product.id, accountId:session.user.id, score:'loved'};
			return this.rate(product, new Rating(rating));
		})
		.catch(error => log.log('authentication failed.', error));
	}

	dislike(product) {
		log.log('dislike', product);
		return this.authenticated().then(session =>
			this.rate(product, new Rating({id: Suid.next(), productId:product.id, accountId:session.user.id, score:'disliked'}))
		)
	}

	undoRating(product) {
		log.log('undoRating', product);
		return this.unrate(product);
	}
}
export default ProductsApi;
