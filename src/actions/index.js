export const FETCH_FEATURES = 'FETCH_FEATURES';
export const CREATE_FEATURE = 'CREATE_FEATURE';
export const FETCH_FEATURE = 'FETCH_FEATURE';
export const CREATE_COMMENT = 'CREATE_COMMENT';

const Rebase = require('re-base');
export const base = Rebase.createClass({
      apiKey: "",
      databaseURL: ""
});



export function fetchFeatures() {
	
	const request = base.fetch('features', {
	    context: {},
	    asArray: true
	}).then(function (data) {
		return data;
	});
	    
	return {
	       	type: FETCH_FEATURES,
	       	payload: request
	}
	
}


export function createFeature(props) {
	let idCount = 0;
	props.date = Date.now();
	const request = base.fetch('features', {
	    context: {},
	    asArray: true
	}).then(function (data) {
		data.map((feature) => {
			if (feature.key > idCount) {
				idCount = parseFloat(feature.key);
			}
		});

		base.post('features/' + parseFloat(idCount + 1), {
			data: props
		}).then(function () {
			
		});
		
	});

	return {
		type: CREATE_FEATURE,
		payload: request
	}
}


export function createComment(props, featureID) {

	let idCount = 0;

	props.date = Date.now();

	const request = base.fetch('features/' + featureID + '/comments', {
	    context: {},
	    asArray: true
	}).then(function (data) {
		data.map((comment) => {
			if (comment.key > idCount) {
				idCount = parseFloat(comment.key);
			}
		});

		base.post('features/' + featureID + '/comments/' + parseFloat(idCount + 1), {
			data: props
		}).then(function () {
			
		});
		
	});

	return {
		type: CREATE_COMMENT,
		payload: request
	}
}



export function fetchFeature(id) {

	const request = base.fetch(`features/${id}`, {
	    context: {},
	    asArray: false
	}).then(function (data) {
		return data;
	});
	    
	return {
	       	type: FETCH_FEATURE,
	       	payload: request
	}
}