import log from 'picolog';
import React, { Component, PropTypes } from 'react';
const { bool, string, array, object, func, shape, any } = PropTypes;
import { Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import classNames from 'classnames';

import { Modal, Textfield } from '../Mdl/mdl-extras';
import { fromJSON, toJSON, indexOf } from '../Entity/Entity';
import FilterFields from './FilterFields';

export class FilterPanel extends Component {
	static propTypes = {
		open: bool.isRequired,
		values: object.isRequired,
		fields: shape({
			q: shape({
				value: string,
				onChange: func,
			}).isRequired,
		}).isRequired,
		onApplyFields: func.isRequired,
		onSearch: func.isRequired,
		onCancel: func.isRequired,
		location: shape({
			pathname: string.isRequired,
		}).isRequired,
	}

	static contextTypes = {
		router: object.isRequired,
	}

	constructor(...args) {
		super(...args);
	}

	componentDidMount() {
		log.debug('componentDidMount()');
	}

	searchClicked(event) {
		const { location, values, onApplyFields, onSearch, onCancel } = this.props;
		const { router } = this.context;
		if (event) {event.preventDefault();}
		const newValues = onApplyFields();
		onCancel();
		const { pathname } = location;
		const { category, ...query } = newValues;
		router.push({pathname, query});
	}

	renderFilterFields() {
		return <FilterFields {...this.props} />
	}

	render() {
		const { open, fields, onCancel, className, children } = this.props;
		const classes = classNames('FilterPanel', className, {'is-open': open});
		const filterFields = this.renderFilterFields();
		return (
			<Modal open={open} onCancel={onCancel}>
				<Card className={classes}>
					{open ? filterFields :undefined}
					<CardActions>
						<div className="FilterActions">
							<Button colored raised onClick={this.searchClicked.bind(this)}>Search</Button>
							<Button onClick={onCancel}>Cancel</Button>
						</div>
					</CardActions>
				</Card>
			</Modal>
		)
	}
}
export default FilterPanel;
