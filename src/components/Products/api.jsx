import { Api, link } from 'redux-apis';
import { remote } from 'redux-fetch-api';

import SearchApi from '../Search/api';

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
	}
}
export default ProductsApi;