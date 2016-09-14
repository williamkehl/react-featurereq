import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createFeature } from '../actions/index';
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

class FeaturesNew extends Component {

	static contextTypes = {
		router: PropTypes.object
	}

	onSubmit(props) {
		
		this.props.createFeature(props)
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

		const { fields: { username, title, desc, icon }, handleSubmit } = this.props;

		const styles = {
		  block: {
		    maxWidth: 250,
		  },
		  radioButton: {
		    marginBottom: 16,
		  },
		};

		return (
			<Card>
				<CardHeader
					title="Submit a new feature request"
					subtitle="Please be as descriptive as possible."
      				avatar={<Avatar icon={
							<FontIcon className="material-icons">spa</FontIcon>}  />}
      			/>
				<CardText>
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<p><strong>Type:</strong></p>
						<div>
						    <RadioButtonGroup
						    	name="icon"
						    	{...icon}
						    >
						      <RadioButton
						        value="assessment"
						        label="New Feature"
						        checkedIcon={<ActionAssessment />}
						        uncheckedIcon={<ActionAssessment />}
						        style={styles.radioButton}
						        name="icon"
						      />
						      <RadioButton
						        value="build"
						        label="Enhancement"
						        checkedIcon={<ActionBuild />}
						        uncheckedIcon={<ActionBuild />}
						        style={styles.radioButton}
						        name="icon"
						      />
						      <RadioButton
						        value="bug_report"
						        label="Bug Report"
						        checkedIcon={<ActionBugReport />}
						        uncheckedIcon={<ActionBugReport />}
						        style={styles.radioButton}
						        name="icon"
						      />
						      <RadioButton
						        value="announcement"
						        label="Discussion"
						        checkedIcon={<ActionAnnouncement />}
						        uncheckedIcon={<ActionAnnouncement />}
						        style={styles.radioButton}
						        name="icon"
						      />
						    </RadioButtonGroup>
						    <div className="errorText">
						    	{icon.touched ? icon.error : ''}
						    </div>
						</div>


						<p><strong>Details:</strong></p>
						<div className={`form-group ${username.touched && username.invalid ? 'has-danger' : ''}`}>
							<TextField
								hintText="Username"
								{...username} 
								errorText={username.touched ? username.error : ''}
								style={{width: "100%"}}
							/>
						</div>



						<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
							<TextField
								hintText = "Title"
								{...title} 
								errorText={title.touched ? title.error : ''}
								style={{width: "100%"}}
								/>
						</div>


						<div className={`form-group ${desc.touched && desc.invalid ? 'has-danger' : ''}`}>
							<TextField
								hintText="Description"
								multiLine={true}
								rows={6}
								{...desc} 
								errorText={desc.touched ? desc.error : ''}
								style={{width: "100%"}}
								/>
							
						</div>

						<RaisedButton label="Submit"
							primary={true} type="submit" />

						<RaisedButton label="Cancel"
							default={true} onClick={this.cancelBtnHandler} />
						
					</form>
				</CardText>
			</Card>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Title is required';
	}
	if (!values.username) {
		errors.username = 'Username is required';
	}
	if (!values.desc) {
		errors.desc = 'Description is required';
	}
	if (!values.icon) {
		errors.icon = 'Type is required';
	}
	return errors;
}



// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
	form: 'FeaturesNewForm',
	fields: ['username', 'title', 'desc', 'icon'],
	validate
}, null, { createFeature })(FeaturesNew);