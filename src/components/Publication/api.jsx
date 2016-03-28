import log from 'picolog';
import { link } from 'redux-apis';
import { remote } from 'redux-fetch-api';

import { fromJSON, indexOf } from '../Entity/Entity';
import { EntityApi } from '../Entity/api';
import Role from '../Auth/Role';

@remote
export class PublicationApi extends EntityApi {
	static INITIAL_STATE = {
		...EntityApi.INITIAL_STATE,
	}

	constructor(state = PublicationApi.INITIAL_STATE) {
		super(state);
		Object.defineProperty(this, 'onMayPublish', {enumerable:true, value:this.mayPublish.bind(this)});
		Object.defineProperty(this, 'onPublish', {enumerable:true, value:this.publish.bind(this)});
		Object.defineProperty(this, 'onUnpublish', {enumerable:true, value:this.unpublish.bind(this)});
	}

	mayPublish(user, item) {
		log.trace('mayPublish', user, item);
		if (user) {
			for (let i=0, role; role=user.roles[i]; i++) {
				if (role.equals(Role.BRAUTSCHLOSS_USER) ||
					role.equals(Role.BRAUTSCHLOSS_MANAGER) ||
					role.equals(Role.ADMINISTRATOR)) {
					log.trace('mayPublish => true');
					return true;
				}
			}
		}
		log.trace('mayPublish => false');
		return false;
	}

	setPublished(item, published) {
		log.debug('setPublished', item, published);
		const newItem = item.clone();
		newItem.published = published;
		return this.save(newItem)
			.then(saved => {
				log.debug('saved successfully', saved);
				const newItems = [ ...this.items ];
				const idx = indexOf(newItems, item);
				newItems[idx] = saved;
				this.setItems(newItems);
			})
			.catch(error => {
				log.error('Unable to change published status for item ' + item + '.', error);
			});
	}

	publish(item) {
		log.log('publish', item);
		this.setPublished(item, true);
	}

	unpublish(item) {
		log.log('unpublish', item);
		this.setPublished(item, false);
	}
}
export default PublicationApi;
