export const FETCH_FEATURES = 'FETCH_FEATURES';
export const CREATE_FEATURE = 'CREATE_FEATURE';
export const FETCH_FEATURE = 'FETCH_FEATURE';

const Rebase = require('re-base');
export const base = Rebase.createClass({
      apiKey: "AIzaSyBJGSMYcOP_KEftd_u2T1dCRBAnUpmvTKg",
      databaseURL: "https://coinigy-featurerequests.firebaseio.com"
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
	console.log(props);

	let idCount = 0;

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