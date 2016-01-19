import log from 'picolog';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Scroller from '../Scroller';
import FlipCard, { Front, Back } from '../FlipCard';

function select(state) {return {items: state.brands.results};}

export default connect(select)(class BrandBrowser extends React.Component {
	static propTypes = {
		category: PropTypes.string
	};

	static defaultProps = {
		category: 'Wedding Dresses'
	};

	static fetchData = (props) => {
		const filter = {
			category: props.params.category,
		}
		return app.brands.search(filter);
	};

	constructor(props) {
		super(props);
		this.state = this.getState(props);
	}

	getState(props) {
		let items = this.state && this.state.items || props.items;
		let itemCount = this.state && this.state.itemCount || props.itemCount || (props.items && props.items.length);
		return {
			items: items || [],
			itemCount: itemCount || items && items.length || 0
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.getState(nextProps));
	}

	componentWillMount() {
	}

	componentDidMount() {
		this.mounted = true;
		this.setState(this.getState(this.props));
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		log.debug("items=" + this.state.items);
		return (
			<Scroller
				className={'BrandBrowser ' + this.props.category}
				direction="vertical"
				bufferBefore={2}
				items={this.state.items}
				bufferAfter={4}
				itemCount={this.state.itemCount}
				itemSize={480}
				itemsPer={1}
				renderItem ={ (item, idx) => (
					<FlipCard className="Brand" key={item.id}>
						<Front className="Test">
							<div className="content">
								<img src={'https://cdn.rawgit.com/download/bridalapp-static/0.10.0/brands/' + item.id + '/logo-brand-name.png'} />
							</div>
						</Front>
						<Back>
							<h3>{item.name || 'Loading'}</h3>
							<p>{item.description || 'Loading item ' + idx}</p>
						</Back>
					</FlipCard>
				)}
			/>
		);
	}
})

