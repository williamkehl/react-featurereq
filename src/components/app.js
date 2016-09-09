import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Link, browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';



export default class App extends Component {

  addNewClickHandler() {
    // <Link to="/features/new">
    //</Link>  
    browserHistory.push('/features/new');
  }


  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
    title="Feature Requests"
    //iconClassNameRight="muidocs-icon-navigation-expand-more"
    iconElementRight={
            <FlatButton label="ADD NEW" onClick={this.addNewClickHandler} />
          }
  />
        	{this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
