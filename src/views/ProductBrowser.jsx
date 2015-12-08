import log from 'picolog';
import React from 'react';
import Scroller from '../components/Scroller';

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
			if (initialData && initialData.searchResults) {
				if (initialData.searchResults instanceof Array) {
					items = initialData.searchResults;
				}
				else {
					// TODO paging
					itemCount = initialData.searchResults.itemCount;
					items = initialData.searchResults.resultPages;
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
		log.debug(this.state.items);
		return (
			<Scroller
				className={'ProductBrowser ' + this.props.category}
				direction="vertical"
				bufferBefore={2}
				items={this.state.items}
				bufferAfter={4}
				itemCount={this.state.itemCount}
				itemSize={640}
//				itemsPer={3}
				renderItem ={ (item, idx) => (
					<div className="Card">
						<h2>{item.name || 'Loading'}</h2>
						<p>{item.description || 'Loading item ' + idx}</p>
					</div>
				)} 
			/>
		);
	}
}

ProductBrowser.propTypes = {
	category: React.PropTypes.string
};

ProductBrowser.defaultProps = {
	category: 'Wedding Dresses'
}
