import log from 'picolog';
import { link } from 'redux-apis';
import { remote } from 'redux-fetch-api';
import Suid from 'ws.suid';

import { fromJSON, toJSON, indexOf } from '../Entity/Entity';
import { authenticated, Role } from '../Auth';
import { PublicationApi } from '../Publication/api';
import Product from './Product';
import Rating from './Rating';

@remote
export class ProductsApi extends PublicationApi {

	static SET_STOCK = 'SET_STOCK';

	static INITIAL_STATE = {
		...PublicationApi.INITIAL_STATE,
		stockedItems: {}
	}

	constructor(state = ProductsApi.INITIAL_STATE) {
		super(state);
		this.setHandler(ProductsApi.SET_STOCK, (state, { payload }) => ({...state, stockedItems:payload}));
		Object.defineProperties(this, {
			stockedItems: {enumerable:true, get:() => this.getState().stockedItems},
		})
		this.item.onLove = this.love.bind(this);
		this.item.onDislike = this.dislike.bind(this);
		this.item.onUndoRating = this.undoRating.bind(this);
		this.item.onMayToggleStock = this.mayToggleStock.bind(this);
		this.item.onIsStocked = this.isStocked.bind(this);
		this.item.onToggleStock = this.toggleStock.bind(this);
	}

	searchUrl(filter) {
		const result = filter.category ? `/${filter.category}` : '/Wedding+Dresses';
		const clone = { ...filter };
		delete clone.category;
		return result + super.searchUrl(clone);
	}

	search() {
		log.info('search');

		const roles = this.getSession().user && this.getSession().user.roles;
		log.info('roles:', roles);
		if (roles) {
			log.info('YEAH');
			for (let i=0,role; role=roles && roles[i]; i++) {
				if (role.equals(Role.STORE_USER) || role.equals(Role.STORE_MANAGER)) {
					return this.loadStock().then(() => super.search());
				}
			}
		}
		else {
			log.info(this.getSession(), this.getSession() && this.getSession().user);
		}
		return super.search();
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

	loadStock() {
		log.info('loadStock');
		return this.fetch('/stock')
			.then(response => response && response.status === 200
				? response.text()
				: new Promise((ok, err) => {
					response.text().then(text => {
						const error = Error(text);
						error.message = text;
						error.status = response.status;
						error.statusText = response.statusText;
						err(error);
					});
				})
			)
			.then(text => fromJSON(text))
			.then(json => {
				log.info('loadStock: OK got ' + json.length + ' results');
				const stock = {};
				for (let i=0, stockItem; stockItem=json[i]; i++) {
					stock[stockItem.productId.toString()] = stockItem;
				}
				this.setStock(stock);
				log.info('loadStock: this.stockedItems=', this.stockedItems);
				return stock;
			})
			.catch(error => {
				log.error('loadStock: error=', error);
			});
	}

	setStock(stock) {
		log.info('setStock', stock);
		return this.dispatch(this.createAction(ProductsApi.SET_STOCK)(stock));
	}

	mayToggleStock(product) {
		log.trace('mayToggleStock', product);
		if (this.getSession().user) {
			for (let i=0, role; role=this.getSession().user.roles[i]; i++) {
				if (role.equals(Role.STORE_USER) ||
					role.equals(Role.STORE_MANAGER)) {
					log.trace('mayToggleStock => true');
					return true;
				}
			}
		}
		log.trace('mayToggleStock => false');
		return false;
	}

	isStocked(product) {
		log.trace('isStocked', product);
		const result = !!this.stockedItems[product.id.toString()];
		log.trace('isStocked => ' + result);
		return result;
	}

	toggleStock(product) {
		const pid = product.id.toString();
		const isStocked = this.isStocked(product);
		log.info('toggleStock', !isStocked, pid);
		return this.fetch('/stock', {
			method: isStocked ? 'DELETE' : 'POST',
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
		.then(stockItem => {
			log.info('toggleStock => ', isStocked, stockItem)
			const newStock = { ...this.stockedItems};
			if (isStocked) {delete newStock[pid];}
			else {newStock[pid] = stockItem;}
			this.setStock(newStock);
			return stockItem;
		})
		.catch(error => {
			log.error('Unable to toggle stock for product ' + product.id.toString() + ' ' + product.name + ' by ' + product.brandName + '.', error);
		});
	}
}
export default ProductsApi;
