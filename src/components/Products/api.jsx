import log from 'picolog';
import { link } from 'redux-apis';
import { remote } from 'redux-fetch-api';
import Suid from 'ws.suid';

import { fromJSON, toJSON, toError, indexOf } from '../Entity/Entity';
import { Role } from '../Auth/Role';
import { PublicationApi } from '../Publication/api';
import { Product } from './Product';
import { StockItem } from './StockItem';
import { Rating } from './Rating';

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
		log.log('search');
		const store = this.getParent().stores.managedStore;
		const storeLoaded = (store
			? Promise.resolve(store)
			: (this.auth.isAny(Role.STORE_ROLES)
				? this.getParent().stores.loadManagedStores().then(() => this.getParent().stores.managedStore)
				: Promise.resolve(null)
			)
		)

		const stockLoaded = storeLoaded.then(store => {
			log.debug('storeLoaded: ', store);
			return store
			? this.loadStock(store)
			: Promise.resolve({})
		})

		return stockLoaded.then(stock => {
			log.debug('stockLoaded: ', stock);
			return super.search()
		})
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
		.then(response => response && response.status === 200 ? response.text() : toError(response))
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
		.then(response => response && response.status === 200 ? response.text() : toError(response))
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

	loadStock(store) {
		log.debug('loadStock', store);
		return this.fetch(`/stock?storeId=${store.id.toString()}`)
			.then(response => response && response.status === 200 ? response.text() : toError(response))
			.then(text => fromJSON(text))
			.then(json => {
				log.log('loadStock: OK got ' + json.length + ' results');
				const stock = {};
				for (let i=0, stockItem; stockItem=json[i]; i++) {
					stock[stockItem.productId.toString()] = stockItem;
				}
				this.setStock(stock);
				log.debug('loadStock: this.stockedItems=', this.stockedItems);
				return stock;
			})
			.catch(error => log.error('loadStock: error=', error));
	}

	setStock(stock) {
		log.debug('setStock', stock);
		return this.dispatch(this.createAction(ProductsApi.SET_STOCK)(stock));
	}

	mayToggleStock(product) {
		log.trace('mayToggleStock', product);
		const result = !!(this.getSession().user && this.getParent().stores.managedStore);
		log.trace('mayToggleStock => ' + result);
		return result;
	}

	isStocked(product) {
		log.trace('isStocked', product);
		const result = !!this.stockedItems[product.id.toString()];
		log.trace('isStocked => ' + result);
		return result;
	}

	toggleStock(product) {
		const pid = product.id.toString();
		const store = this.getParent().stores.managedStore;
		if (!store) {return Promise.reject(new Error('No managed store selected'));}

		const isStocked = this.isStocked(product);
		log.debug('toggleStock', !isStocked, pid, store);

		// optimistically set new stock before making the server call, giving
		// ultra-fast response time. Save the old state so we can rollback
		const stockItem = isStocked
			? this.stockedItems[pid]
			: new StockItem({id: Suid.next(), storeId:store.id, productId:product.id});
		log.debug('toggleStock: stockItem=', stockItem);
		const newStock = { ...this.stockedItems};
		if (isStocked) {delete newStock[pid];}
		else {newStock[pid] = stockItem;}
		this.setStock(newStock);
		log.debug('toggleStock: OPTIMISTIC: newStock=', newStock);
		// now make the server call. If it fails, we need to rollback
		return this.fetch('/stock', {
			method: isStocked ? 'DELETE' : 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: toJSON(stockItem),
		})
		.then(response => response && response.status === 200 ? response.text() : toError(response))
		.then(text => fromJSON(text))
		.then(stockItem => {
			log.info('toggleStock: COMMIT: newStock=', newStock);
			// commit
			// in case of DELETE, nothing needs to be done
			// in case of CREATE, replace the stockItem with the saved one
			if (! isStocked) {this.setStock({ ...this.stockedItems, [pid]: stockItem });}
			return stockItem;
		})
		.catch(error => {
			log.error('Unable to toggle stock for product ' + product.id.toString() + ' ' + product.name + ' by ' + product.brandName + '.', error);
			// rollback
			// in case of DELETE, replace the stockItem with the original one
			// in case of CREATE, delete the stockItem again
			const newStock = { ...this.stockedItems};
			if (isStocked) {newStock[pid] = stockItem}
			else {delete newStock[pid];}
			this.setStock(newStock);
		});
	}
}
export default ProductsApi;
