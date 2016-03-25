import log from 'picolog';
import { link } from 'redux-apis';
import { remote } from 'redux-fetch-api';

import { fromJSON, indexOf } from '../Entity/Entity';
import { PublicationApi } from '../Publication/api';
import Product from './Product';

@remote
export class ProductsApi extends PublicationApi {
	constructor(state) {
		super(state);
	}

	searchUrl(filter) {
		const result = filter.category ? `/${filter.category}` : '';
		const clone = { ...filter };
		delete clone.category;
		return result + super.searchUrl(clone);
	}
}
export default ProductsApi;













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