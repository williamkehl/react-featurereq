import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFeature } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Badge from 'material-ui/Badge';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {cyan100, cyan300} from 'material-ui/styles/colors';
import { truncate } from '../helpers/index';
import { base } from '../actions/index';

class FeaturesShow extends Component {

	construct() {
		
	}

	static contextTypes = {
		router: PropTypes.object
	}

	componentWillMount() {
		this.props.fetchFeature(this.props.params.id);
	}

	componentDidMount() {
		base.listenTo('features/'+this.props.params.id, {
		    context: this,
		    asArray: true,
		    then(data){
		    	this.props.fetchFeature(this.props.params.id);
		    }
  		});
	}

	newCommentClickHandler(event) {
		console.log('yay');
	}
	onListHover(e) {
		e.preventDefault();
	}


	renderComments(feature) {
		
		if (feature.comments) {
			return feature.comments.map((comment, index) => { 
				return (
				
					<ListItem
						key={index}
						primaryText={<div><strong>{comment.username}</strong><span> on {comment.date}</span></div>} 
						secondaryText={comment.comment}
					/>
				)
			});
		}
		
	}


	render() {
		const { feature } = this.props;
		if (!this.props.feature) {
			return <div>Loading...</div>
		}

		let numComments = 0;
			let badgeColor = [true, false];

			if (feature.comments) {
				feature.comments.map((comment) => {
					numComments = numComments + 1;
					badgeColor = [false, true];
				});
		}



		return (
			<div>
				<Card>
					<CardHeader
						title={<strong>{feature.title}</strong>} 
						subtitle={`Submitted by ${feature.username} on ${feature.date}`}
						avatar={<Avatar icon={
							<FontIcon className="material-icons">{feature.icon}</FontIcon>}  />}
					/>
					<CardText>
						<strong>Description:</strong>
						<p>{feature.desc}</p>
					</CardText>
				</Card>

				<List>
					{this.renderComments(feature)}
				</List>

				<Card>
					<CardActions>
      					<FlatButton 
      						label="Add new Comment" 
      						onClick={this.newCommentClickHandler} 
      						backgroundColor={cyan100}
      						hoverColor={cyan300}
      					/>
      					<Badge
								      badgeContent={numComments}
								      primary={badgeColor[0]}
								      secondary={badgeColor[1]}
								      badgeStyle={{top: 0, right: 30}}
									></Badge>
    				</CardActions>
				</Card>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { feature: state.features.feature };
}

 
export default connect(mapStateToProps, { fetchFeature })(FeaturesShow);