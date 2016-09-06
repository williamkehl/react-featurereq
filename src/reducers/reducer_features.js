import { FETCH_FEATURES, FETCH_FEATURE } from '../actions/index';



const INITIAL_STATE = { all: [], feature: null };

export default function(state = INITIAL_STATE, action) {

	switch(action.type) {
		case FETCH_FEATURE:
			return { ...state, feature: action.payload }
		case FETCH_FEATURES:
			return { ...state, all: action.payload }
		default:
			return state;
	};
}