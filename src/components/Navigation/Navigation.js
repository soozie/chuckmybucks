import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AddBucks from '../AddBucks/AddBucks.js';
import Settings from '../Settings/Settings.js';
import TripContainer from '../TripContainer/TripContainer.js';
import Reports from '../Reports/Reports.js';
import './Navigation.css';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'coral',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      selectedView: 'addBucks'
    };

    this.handleSelectView = this.handleSelectView.bind(this);
  }

  handleSelectView(view) {
    this.setState({
      selectedView: view
    });
  }

  render() {
    const {
      classes
    } = this.props;

    let view = null;

    switch(this.state.selectedView) {
      case 'addBucks':
        view = (<AddBucks />);
        break;
      case 'reports':
        view = (<Reports />);
        break;
      case 'tripContainer':
        view = (<TripContainer />);
        break;
      case 'settings':
        view = (<Settings />);
        break;
      case 'savings':
        view = (<div> </div>);
        break;
      case 'rewards':
        view = (<div> </div>);
        break;
    }

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              The Bucks Calculator
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List component="nav">
            <ListItem className="hover" onClick={() => { this.handleSelectView('addBucks'); }} button component="a" href="#add-bucks">
              <ListItemText primary="Add Bucks" />
            </ListItem>
            <ListItem className="hover" onClick={() => { this.handleSelectView('reports'); }} button component="a" href="#reports">
              <ListItemText primary="Reports" />
            </ListItem>
            <ListItem className="hover" onClick={() => { this.handleSelectView('tripContainer'); }} button component="a" href="#trip-container">
              <ListItemText primary="Trip Container" />
            </ListItem>
            <ListItem className="hover" onClick={() => { this.handleSelectView('settings'); }} button component="a" href="#settings">
            <ListItemText primary="Settings" />
            </ListItem>
            <ListItem className="hover" onClick={() => { this.handleSelectView('savings'); }} button component="a" href="#savings">
              <ListItemText primary="Savings" />
            </ListItem>
            <ListItem className="hover" onClick={() => { this.handleSelectView('rewards'); }} button component="a" href="#rewards">
              <ListItemText primary="Rewards" />
            </ListItem>
          </List>
        </Drawer>
        <div className="Navigation__containerView">

          {view}

        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Navigation);
