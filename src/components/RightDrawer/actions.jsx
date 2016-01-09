import Immutable from 'seamless-immutable';
import { open, close, toggle } from './commands';

export const OPEN = 'RightDrawer/OPEN';
export const CLOSE = 'RightDrawer/CLOSE';
export const TOGGLE = 'RightDrawer/TOGGLE';

export const INITIAL_STATE = Immutable({
	open: false
});

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case OPEN: return open(state);
		case CLOSE: return close(state);
		case TOGGLE: return toggle(state);
	}
	return state;
}
