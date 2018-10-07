import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddBucks from '../AddBucks/AddBucks.js';
import Reports from '../Reports/Reports.js';
import Navigation from '../Navigation/Navigation.js';
import * as api from '../../modules/addBucks/api';
import './Main.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: 'white',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Main extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      expenses: []
    };

  }

  render() {
    const {
      classes
    } = this.props;
    console.log(this.state.expenses);
    return (
      <div className="Main">
        <Navigation />
        <Button variant="contained" className={`${classes.button} hover`} onClick={this.startCalculation}>
          Get Total Bucks
        </Button>
        <Button variant="contained" className={`${classes.button} hover`}>
          Show Reports
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
