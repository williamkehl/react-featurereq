import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import { Link, browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

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
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
              </IconMenu>
            }
          />
        	{this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
