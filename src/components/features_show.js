import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFeature } from '../actions/index';
import { Link } from 'react-router';

class FeaturesShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	componentWillMount() {
		this.props.fetchFeature(this.props.params.id);
	}

	
	render() {
		const { feature } = this.props;
		if (!this.props.feature) {
			return <div>Loading...</div>
		}
		return (
			<div>
				<Link to="/">Back To Index</Link>
				
				<h3>{feature.username}</h3>
				<h6>{feature.title}</h6>
				<p>{feature.desc}</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { feature: state.features.feature };
}


export default connect(mapStateToProps, { fetchFeature })(FeaturesShow);