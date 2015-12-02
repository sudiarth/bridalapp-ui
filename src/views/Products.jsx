import React from 'react';
import Scroller from '../components/Scroller';

export default class Products extends React.Component {
	constructor() {
		super();
		this.state = {
			items: []
		};
		var names = ['Anafi', 'Aura', 'Baku', 'Ceos', 'Delos', 'Ella', 'Hada', 'Hawaii']
		for (var i=0; i<1000; i++) {
			var nameIdx = i % 8;
			this.state.items.push({id:i, name:names[nameIdx], description:'This is product number ' + i + '.', brandId:'j4', });
		}
	}

	render() {
		return (
			<div>
				<Scroller direction="vertical" 
					itemCount={1000} 
					itemSize={125} 
					itemsPer={1}  
					items={this.state.items}
					renderItem ={ item => (
						<div key={item.id} style={{height:'125px'}}>
							<h2>{item.name}</h2>
							<p>{item.description}</p>
						</div>
					)} />
			</div>
		);
	}
}
