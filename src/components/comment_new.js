import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createComment } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import base from '../index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText, CardMedia, CardTitle} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionBugReport from 'material-ui/svg-icons/action/bug-report';
import ActionAnnouncement from 'material-ui/svg-icons/action/announcement';

class CommentNew extends Component {

	static contextTypes = {
		router: PropTypes.object
	}

	onSubmit(props) {
		this.props.createComment(props, this.props.featureID)
		.then(() => { 
			// blog post has been created, navigate the user to the index
			// we navigate by calling this.context.router.push with the
			// new path to navigate to.
			this.context.router.push('/');
		 });
	}

	cancelBtnHandler() {
		browserHistory.push('/');
	}


	render() {
		console.log(this.props.featureID);
		const { fields: { username, comment }, handleSubmit } = this.props;
		const styles = {
		  block: {
		    maxWidth: 250,
		  },
		  radioButton: {
		    marginBottom: 16,
		  },
		};

		return (
			
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<p><strong>Add a new comment:</strong></p>
				<div className={`form-group ${username.touched && username.invalid ? 'has-danger' : ''}`}>
					<TextField
						hintText="Username"
						{...username} 
						errorText={username.touched ? username.error : ''}
						style={{width: "100%"}}
					/>
				</div>

				<div className={`form-group ${comment.touched && comment.invalid ? 'has-danger' : ''}`}>
					<TextField
						hintText="Comment"
						multiLine={true}
						rows={6}
						{...comment} 
						errorText={comment.touched ? comment.error : ''}
						style={{width: "100%"}}
						/>
					
				</div>
				<RaisedButton label="Submit"
					primary={true} type="submit" />

				<RaisedButton label="Cancel"
					default={true} onClick={this.cancelBtnHandler} />
				
			</form>
				
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.username) {
		errors.username = 'Username is required';
	}
	if (!values.comment) {
		errors.comment = 'Comment is required';
	}
	return errors;
}



// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
	form: 'CommentNewForm',
	fields: ['username', 'comment'],
	validate
}, null, { createComment })(CommentNew);