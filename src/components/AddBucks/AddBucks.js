import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as api from '../../modules/addBucks/api';
import './AddBucks.css';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: 'white',
  },
});

class AddBucks extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      who: '',
      howMuch: '',
      when: '',
      what: '',
      expences: []
    };

    this.addData = this.addData.bind(this);
    this.startCalculation = this.startCalculation.bind(this);
    this.getTotalBucks = this.getTotalBucks.bind(this);
  }

  setValue(name, value) {
    console.log(name, value);
    this.setState({ [name]: value });
  }

  addData() {
    const expense = {
      userName: this.state.who,
      bucksAmount: this.state.howMuch,
      when: this.state.when,
      what: this.state.what
    };

    api.saveExpense(expense)
      .then((expense) => {
        this.setState({
          userName: '',
          bucksAmount: '',
          when: '',
          what: ''
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getTotalBucks() {
    let totalBucks = 0;
    this.state.expences.forEach((expence) => {
      totalBucks += parseFloat(expence.bucksAmount);
    });

    return totalBucks;
  }

  startCalculation() {
    var totalBucks = this.getTotalBucks();
    console.log('The total is ' + totalBucks);
  }


  render() {
    const {
      classes
    } = this.props;

    return (
      <div className='AddBucks'>
        <Paper className={classes.root} elevation={1}>
          <TextField
            id="name"
            label="Name"
            placeholder="Who?"
            className={classes.textField}
            value={this.state.who}
            onChange={(e) => {this.setValue('who', e.target.value);}}
            margin="normal"
          />
          <TextField
            id="amount"
            label="Amount"
            placeholder="How much?"
            className={classes.textField}
            value={this.state.howMuch}
            onChange={(e) => {this.setValue('howMuch', e.target.value);}}
            margin="normal"
          />
          <TextField
            id="date"
            label="Date"
            placeholder="When?"
            className={classes.textField}
            value={this.state.when}
            onChange={(e) => {this.setValue('when', e.target.value);}}
            margin="normal"
          />
          <TextField
            id="type"
            label="Type"
            placeholder="What?"
            className={classes.textField}
            value={this.state.what}
            onChange={(e) => {this.setValue('what', e.target.value);}}
            margin="normal"
          />
        </Paper>
        <Button variant="contained" className={classes.button} onClick={this.addData}>
          Save
        </Button>
        <Button variant="contained" className={classes.button} onClick={this.startCalculation}>
          Get Total Bucks
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(AddBucks);
