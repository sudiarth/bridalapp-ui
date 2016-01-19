import log from 'picolog';
import Api from 'redux-apis';

import DrawerApi from '../../components/RightDrawer/api';
import ProductsApi from '../../components/Products/api';
import BrandsApi from '../../components/Brands/api';

export default class AppApi extends Api {
	constructor(state) {
		super(state);
		this.sub('rightDrawer', DrawerApi);
		this.sub('products', ProductsApi);
		this.sub('brands', BrandsApi);
	}
}
