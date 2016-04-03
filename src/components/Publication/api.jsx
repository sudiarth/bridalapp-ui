import log from 'picolog';
import { link } from 'redux-apis';
import { remote } from 'redux-fetch-api';

import { fromJSON, indexOf } from '../Entity/Entity';
import { EntityApi } from '../Entity/api';
import { authenticated } from '../Auth/api';
import Role from '../Auth/Role';

@remote
@authenticated
export class PublicationApi extends EntityApi {
	static INITIAL_STATE = {
		...EntityApi.INITIAL_STATE,
	}

	constructor(state = PublicationApi.INITIAL_STATE) {
		super(state);
		this.item.onMayPublish = this.mayPublish.bind(this);
		this.item.onPublish = this.publish.bind(this);
		this.item.onUnpublish = this.unpublish.bind(this);
	}

	mayPublish(item) {
		log.trace('mayPublish', item, this, this.getSession);
		if (this.getSession()) {
			for (let i=0, role; role=this.getSession().user.roles[i]; i++) {
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
				return saved;
			})
			.catch(error => {
				log.error('Unable to change published status for item ' + item + '.', error);
			});
	}

	publish(item) {
		log.log('publish', item);
		return this.setPublished(item, true);
	}

	unpublish(item) {
		log.log('unpublish', item);
		return this.setPublished(item, false);
	}
}
export default PublicationApi;
