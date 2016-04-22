import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, number, string, object, func, array, shape, any } = PropTypes;
import { connect } from 'react-redux';
import { Content, Icon } from 'react-mdl';

import store from '../../store';
import AppApi from '../App/api'; // explicitly import to facilitate hot-reload
import AppLayout from '../App/AppLayout';
import { Badge } from '../Mdl/mdl-extras';


@connect(bridalapp.connector)
export class Products extends Component {
	static propTypes = {
		auth: object.isRequired,
		products: shape({
			items: array.isRequired,
			filter: shape({
				onActivate: func,
			}).isRequired,
		}).isRequired,
		stores: object.isRequired,
		brands: object.isRequired,
		leftDrawer: object.isRequired,
		rightDrawer: object.isRequired,
		lightbox: object.isRequired,
	}

	static contextTypes = {
		router: object,
	}

	render() {
		const { router } = this.context;
		const { auth, products, stores, brands, leftDrawer, rightDrawer, lightbox, children } = this.props;
		return (
			<AppLayout {...{auth, products, stores, brands, leftDrawer, rightDrawer}}
				contextActions={()=>(
					<Badge text={'' + products.items.length} onClick={products.filter.onActivate}>
						<Icon name="search" />
					</Badge>
				)}
			>
				{children}
			</AppLayout>
		)
	}
}
export default Products;
