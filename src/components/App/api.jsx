import log from 'picolog';
import Api from 'redux-apis';

log.debug('Api=' + Api);

import DrawerApi from '../../components/RightDrawer/api';

export default class AppApi extends Api {
	constructor(state) {
		super(state);
		this.sub('rightDrawer', DrawerApi);
	}
}
