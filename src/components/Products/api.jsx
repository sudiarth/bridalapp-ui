import Api from 'redux-apis';

export default class ProductsApi extends Api {
	constructor(state) {
		super(state);
		this.addHandler('SEARCH', (action) => ({
			...this.state,
			filter: action.payload,
			loading: true,
		}));
		this.addHandler('SEARCH_SUCCESS', (action) => ({
			...this.state,
			results: action.payload.results,
			loading: false,
			loaded: true,
		}));
	}

	initialState() {
		return {
			loading: false,
			loaded: false,
			filter: {
				category: 'Wedding Dresses',
			},
			results: [],
		};
	}

	search(filter) {
		this.dispatch(this.createAction('SEARCH')(filter));
	}

	results() {
		return this.state.results;
	}
}
