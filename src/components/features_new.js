import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createFeature } from '../actions/index';
import { Link } from 'react-router';
import base from '../index';

 

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

	render() {

		const { fields: { username, title, desc }, handleSubmit } = this.props;

		console.log(username);

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create a new feature request</h3>

				<div className={`form-group ${username.touched && username.invalid ? 'has-danger' : ''}`}>
					<label>Username</label>
					<input type="text" className="form-control" {...username} />
					<div className="text-help">
						{username.touched ? username.error : ''}
					</div>
				</div>



				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title</label>
					<input type="text" className="form-control" {...title} />
					<div className="text-help">
						{title.touched ? title.error : ''}
					</div>
				</div>


				<div className={`form-group ${desc.touched && desc.invalid ? 'has-danger' : ''}`}>
					<label>Content</label>
					<textarea className="form-control" {...desc} />
					<div className="text-help">
						{desc.touched ? desc.error : ''}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Enter a title';
	}
	if (!values.username) {
		errors.username = 'Enter a username';
	}
	if (!values.desc) {
		errors.desc = 'Enter a description';
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