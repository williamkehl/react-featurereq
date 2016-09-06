export const FETCH_FEATURES = 'FETCH_FEATURES';
export const CREATE_FEATURE = 'CREATE_FEATURE';
export const FETCH_FEATURE = 'FETCH_FEATURE';

export function fetchFeatures() {
	return {
		type: FETCH_FEATURES,
		payload: [
			{
				id: 1,
				title: 'test1',
				desc: 'description of test1',
				username: 'billyjean',
				points: 4
			},
			{
				id: 2,
				title: 'test2',
				desc: 'description of test2',
				username: 'johndoe',
				points: 25
			},
			{
				id: 3,
				title: 'test3',
				desc: 'description of test3',
				username: 'jeffrey',
				points: 71
			}
		]  
	}
}

export function createFeature(props) {
	return {
		type: CREATE_FEATURE,
		payload: {
				id: 1,
				title: 'test1',
				desc: 'description of test1',
				username: 'billyjean',
				points: 4
			}
	}
}

export function fetchFeature(id) {

	return {
		type: FETCH_FEATURE,
		payload: {
				id: 1,
				title: 'test1',
				desc: 'description of test1',
				username: 'billyjean',
				points: 4
			}
	}
}