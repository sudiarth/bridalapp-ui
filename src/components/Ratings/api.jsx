import log from 'picolog';
import { link, Api } from 'redux-apis';
import { remote } from 'redux-fetch-api';

import { fromJSON, indexOf } from '../Entity/Entity';
import Rating from './Rating';

@remote
export class RatingsApi extends Api {
	constructor(state) {
		super(state);
		Object.defineProperties(this, {
			OnLove: {enumerable:true, value:this.love.bind(this)},
			OnDislike: {enumerable:true, value:this.dislike.bind(this)},
			OnUndoRating: {enumerable:true, value:this.undoRating.bind(this)},
		});
	}

	searchUrl(filter) {
		const result = filter.category ? `/${filter.category}` : '';
		const clone = { ...filter };
		delete clone.category;
		return result + super.searchUrl(clone);
	}

	rate(product, rating) {
		log.debug('rate', product, rating);
		this.fetch('', {
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
		.then(savedRating => {
			const { results } = this.search;
			const idx = indexOf(results, product);
			if (idx >= 0) {
				const newResults = results.slice(0, idx).concat(results.slice(idx + 1));
				this.search.setResults(newResults);
			}
			return savedRating;
		})
		.catch(error => {
			log.error('Unable to create rating for product ' + product.id.toString() + ' ' + product.name + ' by ' + product.brandName + '.', error);
		});
	}

	unrate(product) {
		log.debug('unrate', product);
		this.fetch('', {
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
		.then(deletedRating => {
			const { results } = this.search;
			const idx = indexOf(results, product);
			if (idx >= 0) {
				const newResults = results.slice(0, idx).concat(results.slice(idx + 1));
				this.search.setResults(newResults);
			}
			return deletedRating;
		})
		.catch(error => {
			log.error('Unable to delete rating for product ' + product.id.toString() + ' ' + product.name + ' by ' + product.brandName + '.', error);
		});
	}

	love(user, product) {
		return this.rate(product, new Rating({id: Suid.next(), productId:product.id, accountId:user.id, score:'loved'}));
	}

	dislike(user, product) {
		return this.rate(product, new Rating({id: Suid.next(), productId:product.id, accountId:user.id, score:'disliked'}));
	}

	undoRating(product) {
		return this.unrate(product);
	}
}
export default RatingsApi;













/*
import log from 'picolog';
import { Api, link } from 'redux-apis';
import { remote } from 'redux-fetch-api';

import SearchApi from '../Search/api';
import { fromJSON, indexOf } from '../Entity/Entity';
import Product from './Product';

export class ProductSearch extends SearchApi {
	url(filter) {
		let clone = { ...filter };
		let result = filter.category ? `/${filter.category}` : '';
		delete clone.category;
		return result + super.url(clone);
	}
}

@remote
export class ProductsApi extends Api {
	constructor(state) {
		super(state);
		this.search = remote('/search')(
			link(this, new ProductSearch())
		);
		Object.defineProperty(this, 'onPublish', {enumerable:true, value:this.publish.bind(this)});
		Object.defineProperty(this, 'onUnpublish', {enumerable:true, value:this.unpublish.bind(this)});
	}

	setPublished(product, published) {
		log.debug('setPublished', product, published);
		if (product.published !== published) {
			const newProduct = product.clone();
			newProduct.published = published;
			this.fetch('', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: toJSON(newProduct),
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
			.then(savedProduct => {
				//const newResults = this.search.results.concat();
				const newResults = [ ...this.search.results ];
				const idx = indexOf(newResults, product);
				newResults[idx] = savedProduct;
				this.search.setResults(newResults);
			})
			.catch(error => {
				log.error('Unable to change published status for product ' + product.id.toString() + ' ' + product.name + ' by ' + product.brandName + '.', error);
			});
		}
	}

	publish(product) {
		this.setPublished(product, true);
	}

	unpublish(product) {
		this.setPublished(product, false);
	}
}
export default ProductsApi;
*/