import { FETCH_FEATURES, FETCH_FEATURE, CREATE_FEATURE, CREATE_COMMENT } from '../actions/index';



const INITIAL_STATE = { all: [], feature: null };

export default function(state = INITIAL_STATE, action) {
//console.log(action.type, action);

	switch(action.type) {
		case FETCH_FEATURE:
			return { ...state, feature: action.payload }
		case FETCH_FEATURES:
			return { ...state, all: action.payload }
		case CREATE_FEATURE:
			return state;
		case CREATE_COMMENT:
			return state;
		default:
			return state;
	};
}