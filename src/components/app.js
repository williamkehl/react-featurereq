import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import { Link, browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';



export default class App extends Component {

  addNewClickHandler() {
    browserHistory.push('/features/new');
  }

  homeClickHandler() {
    browserHistory.push('/');
  }  

  handleTouchTap() {
    console.log('tapped');
  }
// dark theme: add  muiTheme={getMuiTheme(darkBaseTheme)}
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
    title="Feature Requests"
    onTitleTouchTap={this.handleTouchTap}
    iconElementLeft={
      <IconButton tooltip="Home" onClick={this.homeClickHandler}>
      <FontIcon className="material-icons">home</FontIcon>
    </IconButton>
    }
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
