import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeatures } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

class FeaturesIndex extends Component {
	componentWillMount() {
		this.props.fetchFeatures();
	}

	componentDidMount() {
		
	}

	navigateToFeature(featureID) {
		console.log(featureID);
		browserHistory.push(`/features/${featureID}`);
		
	}

	renderFeatures() {
		return this.props.features.map((feature) => {
			return (
				<div key={feature.id}>
					<ListItem primaryText={feature.title} onClick={() => this.navigateToFeature(feature.id)} />
					<Divider />
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<div className="text-xs-right">
					
				</div>
				<List>
					{this.renderFeatures()}
				</List>
				
			</div>
		);
	}

}

function mapStateToProps(state) {
	return { features: state.features.all };
}

export default connect(mapStateToProps, { fetchFeatures })(FeaturesIndex);