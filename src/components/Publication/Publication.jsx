import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { object, func } = PropTypes;

export class Publication extends Component {
	static propTypes = {
		onMayPublish: func.isRequired,
		onPublish: func.isRequired,
		onUnpublish: func.isRequired,
	};

	constructor(...props) {
		super(...props);
	}

	mayPublish(item) {
		return this.props.onMayPublish(item)
	}

	publishClicked(item, event) {
		log.log('publishClicked', item, event);
		event.preventDefault();
		return this.props.onPublish(item);
	}

	unpublishClicked(item, event) {
		log.log('unpublishClicked', item, event);
		event.preventDefault();
		return this.props.onUnpublish(item);
	}
}
export default Publication;
