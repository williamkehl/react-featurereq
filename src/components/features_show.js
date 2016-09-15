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
import {cyan100, cyan300, blue500, orange600, deepPurple400, green500} from 'material-ui/styles/colors';
import { truncate } from '../helpers/index';
import { base } from '../actions/index';
import CommentNew from './comment_new';

class FeaturesShow extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showHide: 'none'
		}
	}

	static contextTypes = {
		router: PropTypes.object
	}

	componentWillMount() {
		this.props.fetchFeature(this.props.params.id);
	}

	componentDidMount() {
		this.ref = base.listenTo('features/'+this.props.params.id, {
		    context: this,
		    asArray: true,
		    then(data){
		    	this.props.fetchFeature(this.props.params.id);
		    }
  		});
	}

	componentWillUnmount(){
 		base.removeBinding(this.ref);
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

		let bgColor = orange600;

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

		console.log(this.props);
		return (
			<div>
				<Card>
					<CardHeader
						title={<strong>{feature.title}</strong>} 
						subtitle={`Submitted by ${feature.username} on ${feature.date}`}
						avatar={<Avatar icon={
							<FontIcon className="material-icons">
							{feature.icon}</FontIcon>} backgroundColor={bgColor}  />}
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
      						onClick={() => this.setState({showHide: 'block'})} 
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
    				<CardText style={{display: this.state.showHide}}>
    					<CommentNew featureID={this.props.params.id} />
    				</CardText>
				</Card>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { feature: state.features.feature };
}

 
export default connect(mapStateToProps, { fetchFeature })(FeaturesShow);