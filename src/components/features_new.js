import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createFeature } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import base from '../index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
 

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

		const { fields: { username, title, desc }, handleSubmit } = this.props;

		console.log(username);

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create a new feature request</h3>

				<div className={`form-group ${username.touched && username.invalid ? 'has-danger' : ''}`}>
					<TextField
						hintText="Username"
						{...username} 
						errorText={username.touched ? username.error : ''}
					/>
				</div>



				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<TextField
						hintText = "Title"
						{...title} 
						errorText={title.touched ? title.error : ''}
						/>
				</div>


				<div className={`form-group ${desc.touched && desc.invalid ? 'has-danger' : ''}`}>
					<TextField
						hintText="Please describe this feature"
						multiLine={true}
						rows={6}
						{...desc} 
						errorText={desc.touched ? desc.error : ''}
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

	if (!values.title) {
		errors.title = 'Title is required';
	}
	if (!values.username) {
		errors.username = 'Username is required';
	}
	if (!values.desc) {
		errors.desc = 'Description is required';
	}
	return errors;
}



// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
	form: 'FeaturesNewForm',
	fields: ['username', 'title', 'desc'],
	validate
}, null, { createFeature })(FeaturesNew);