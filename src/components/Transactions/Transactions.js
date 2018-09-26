import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as api from '../../modules/addBucks/api';
import TransactionsRender from './TransactionsRender.js';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Transactions extends Component {
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

    this.getData = this.getData.bind(this);
    this.getTotalBucks = this.getTotalBucks.bind(this);
    this.startCalculation = this.startCalculation.bind(this);
  }

  componentDidMount() {
    console.log('will mount');
    this.getData();
  }

  getData() {
    console.log('getting data');
    api.getExpenses()
    .then((response) => {
      console.log('setting state', response);
      if (response.length) {
        this.setState({
          expenses: response
        });
      }
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

  render () {
    const {
      classes
    } = this.props;
    console.log(this.state.expenses);
    return (
      <TransactionsRender expenses={this.state.expenses}/>
    )
  }

}

export default Transactions;
