import log from 'picolog';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Scroller from '../Scroller';
import FlipCard, { Front, Back } from '../FlipCard';

function select(state) {return {items: state.products.results};}

export default connect(select)(class ProductBrowser extends React.Component {
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
		return app.products.search(filter);
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
				className={'ProductBrowser ' + this.props.category}
				direction="vertical"
				bufferBefore={2}
				items={this.state.items}
				bufferAfter={4}
				itemCount={this.state.itemCount}
				itemSize={480}
				itemsPer={1}
				renderItem ={ (item, idx) => (
					<FlipCard className="Product" key={item.id}>
						<Front className="Test">
							<div className="content">
								<img src="data:image/gif;base64,R0lGODlhAgADAIAAAP///////yH5BAEKAAEALAAAAAACAAMAAAICjF8AOw=="
										style={{backgroundImage: 'url(https://cdn.rawgit.com/download/bridalapp-static/0.9.13/products/' + item.brandId + '/' + encodeURIComponent(item.name) + '/thumbs.jpg)'}} />
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

