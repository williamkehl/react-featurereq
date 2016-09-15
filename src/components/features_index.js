import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeatures } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Badge from 'material-ui/Badge';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {blue500, orange600, deepPurple400, green500} from 'material-ui/styles/colors';
import { truncate } from '../helpers/index';
import { base } from '../actions/index';

class FeaturesIndex extends Component {

	componentWillMount() {
		this.props.fetchFeatures();



	}

	componentDidMount() {

		this.ref = base.listenTo('features', {
			    context: this,
			    asArray: true,
			    then(data){
			    	this.props.fetchFeatures();
			    }
	  		});
		
		
	}

	componentWillUnmount(){
 		base.removeBinding(this.ref);
	}

	navigateToFeature(featureID) {
		
		browserHistory.push(`/features/${featureID}`);
		
	}

	renderFeatures() {
		if (this.props.features) {
			
		return this.props.features.map((feature, index) => {
			
			const truncDesc = truncate(feature.desc);

			let bgColor = orange600;

			let numComments = 0;
			let badgeColor = [true, false];

			if (feature.comments) {
				feature.comments.map((comment) => {
					numComments = numComments + 1;
					badgeColor = [false, true];
				});

			}

			switch (feature.icon) {
				case "bug_report":
					bgColor = blue500;
					break;
				case "build":
					bgColor = deepPurple400;
					break;
				case "announcement":
					bgColor = green500;
					break;
			}


			return (
				<div key={index}>
					<ListItem 
						primaryText={<div><strong>{feature.title}</strong> <small><small className="smallText">by {feature.username} on {feature.date}</small></small></div>} 
						secondaryText={truncDesc}
						onClick={() => this.navigateToFeature(feature.key)} 
						leftAvatar={<Avatar icon={
							<FontIcon className="material-icons"
							
							>{feature.icon}</FontIcon>} backgroundColor={bgColor} />}
						
						rightIcon={<Badge
								      badgeContent={numComments}
								      primary={badgeColor[0]}
								      secondary={badgeColor[1]}
								      badgeStyle={{top: 0, right: 10}}
									/>}
        				
					/>
					
					<Divider />
				</div>
			);
		});
		}
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