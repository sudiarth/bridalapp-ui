import Immutable from 'seamless-immutable';

export function isOpen(state) {
	return state.open;
}

export function open(state){
	return state.merge({
		open: true
	});
}

export function close(state) {
	return state.merge({
		open: false
	});
}

export function toggle(state) {
	const newOpen = !isOpen(state);
	const result = state.merge({
		open: newOpen
	});
	return result;
}
