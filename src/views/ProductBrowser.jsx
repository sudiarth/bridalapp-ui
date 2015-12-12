import log from 'picolog';
import React, { PropTypes } from 'react';
import Scroller from '../components/Scroller';
import FlipCard, { Front, Back } from '../components/FlipCard';

export default class ProductBrowser extends React.Component {
	constructor(props) {
		super(props); 
		this.state = this.getState(props);
	}

	getState(props) {
		let items = this.state && this.state.items;
		let itemCount = this.state && this.state.itemCount;
		if (! items) {
			let initialData = typeof window != 'undefined' ? window.initialData : global.initialData;
			if (initialData && initialData.products) {
				if (initialData.products instanceof Array) {
					items = initialData.products;
				}
				else {
					// TODO paging
					itemCount = initialData.products.count;
					items = initialData.products.pages;
				}
			}
		}
		
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
				itemSize={400}
				itemsPer={3}
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
}

ProductBrowser.propTypes = {
	category: PropTypes.string
};

ProductBrowser.defaultProps = {
	category: 'Wedding Dresses'
}
