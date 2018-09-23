import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddBucks from '../AddBucks/AddBucks.js';
import Transactions from '../Transactions/Transactions.js';
import * as api from '../../modules/addBucks/api';

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

const checkProperties = (obj) => {
  for (var key in obj) {
    if (obj[key] === null || obj[key] === '') {
      return false;
    }
  }
  return true;
}

class Main extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      bucksAmount: '',
      when: '',
      what: '',
      note: '',
      expenses: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.setValue = this.setValue.bind(this);
    this.addData = this.addData.bind(this);
    this.getData = this.getData.bind(this);
    this.getTotalBucks = this.getTotalBucks.bind(this);
    this.startCalculation = this.startCalculation.bind(this);
  }

  componentDidMount() {
    console.log('will mount');
    this.getData();
  }

  setValue(name, value) {
    this.setState({ [name]: value });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addData() {
    const expense = {
      userName: this.state.userName,
      bucksAmount: this.state.bucksAmount,
      when: this.state.when,
      what: this.state.what,
      note: this.state.note
    };

    if (checkProperties(expense)) {
      api.saveExpense(expense)
      .then((expenses) => {
        console.log(expenses);
        this.setState({
          userName: '',
          bucksAmount: '',
          when: '',
          what: '',
          note: '',
          expenses
        });
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      alert('Fill in all the details!');
    }
  }

  getData() {
    console.log('getting data');
    api.getExpences()
    .then((response) => {
      console.log('setting state');
      this.setState({
        expenses: response
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getTotalBucks() {
    let totalBucks = 0;
    console.log(this.state.expenses);
    this.state.expenses.forEach((expense) => {
      totalBucks += parseFloat(expense.bucksAmount);
    });

    return totalBucks;
  }

  startCalculation() {
    let totalBucks = this.getTotalBucks();
    console.log('The total is ' + totalBucks);
  }

  render() {
    const {
      classes
    } = this.props;
    return (
      <div className="Main">
        <AddBucks
          handleChange={this.handleChange}
          setValue={this.setValue}
          startCalculation={this.startCalculation}
          addData={this.addData}
          userName={this.state.userName}
          bucksAmount={this.state.bucksAmount}
          when={this.state.when}
          what={this.state.what}
          note={this.state.note}
        />
        <Transactions expenses={this.state.expenses}/>
        <Button variant="contained" className={classes.button} onClick={this.addData}>
          Save
        </Button>
        <Button variant="contained" className={classes.button} onClick={this.startCalculation}>
          Get Total Bucks
        </Button>
        <Button variant="contained" className={classes.button}>
          Show Transactions
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
