import React, { Component } from 'react';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin'

const ref = new Firebase('https://coinigy-featurerequests.firebaseio.com'); 


export default class App extends Component {
  render() {
    return (
      <div>
      	<div className="logo">
      		<img className="logoImg" src="https://www.coinigy.com/assets/home/images/logowhite.svg" />
      	</div>
      	{this.props.children}
      </div>
    );
  }
}
