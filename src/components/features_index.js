import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeatures } from '../actions/index';
import { Link } from 'react-router';
import { base } from '../index';

class FeaturesIndex extends Component {
	componentWillMount() {
		this.props.fetchFeatures();
	}

	componentDidMount() {
		console.log('doit');
		base.syncState('main', {
			context: this,
			state: 'all'
		});
	}

	renderFeatures() {
		return this.props.features.map((feature) => {
			return (
				<li className="list-group-item" key={feature.id}>
					<Link to={"features/" + feature.id}>
						<span className="pull-xs-right">{feature.points}</span>
						<strong>{feature.title}</strong>
					</Link>
				</li>

			);
		});
	}

	render() {
		return (
			<div>
				<div className="text-xs-right">
					<Link to="/features/new" className="btn btn-primary">
						Add a Feature Request
					</Link>
				</div>
				<h3>Feature Requests</h3>
				<ul className="list-group">
					{this.renderFeatures()}
				</ul>
				
			</div>
		);
	}

}

function mapStateToProps(state) {
	return { features: state.features.all };
}

export default connect(mapStateToProps, { fetchFeatures })(FeaturesIndex);