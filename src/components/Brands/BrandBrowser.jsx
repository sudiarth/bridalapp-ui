import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, object, array, any } = PropTypes;
import { connect } from 'react-redux';
import { onload } from 'redux-load-api';

import store from '../../store';
const app = store.app;
import Scroller from '../Scroller/Scroller';
import Card, { Front, Back } from '../Card/Card';
import BrandCard from './BrandCard'

function load(params) {
	log.log('load', params);
	params && app.brands.search.setFilter(params);
	return app.brands.search.search()
		.then(results => {
			log.log('load: search returned ' + results.length + ' brands.');
			return results;
		})
		.catch((error) => {
			log.error('Searching brands failed.', error);
			return error;
		});
}

@onload(load)
@connect((state, props) => ({lightbox:app.lightbox, ...app.brands.search}))
export default class BrandBrowser extends React.Component {
	static propTypes = {
		params: object.isRequired,
		lightbox: object.isRequired,
		filter: object.isRequired,
		results: array.isRequired,
		pending: bool,
		error: any,
	}


	componentDidMount() {
		log.debug('componentDidMount()');
		const { pending, error, params } = this.props;
		if (pending || error) {load(params);}
	}

	render() {
		log.debug('render', this.props);
		const { results, lightbox } = this.props;
		return (
			<Scroller
				className={'BrandBrowser '}
				bufferBefore={2}
				items={results}
				bufferAfter={4}
				renderItem ={ (item, idx) => (
					<BrandCard brand={item} {...lightbox} />
				)}
			/>
		);
	}
}
