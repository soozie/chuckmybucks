import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Filters from '../Filters/Filters.js';
import * as api from '../../modules/addBucks/api';
import './Reports.css';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      bucksAmount: '',
      when: '',
      what: '',
      note: '',
      expenses: [],
      filteredExpences: []
    };

    this.getData = this.getData.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
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
      console.log('setting expenses state', response);
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

  handleFilter(category) {
    const filteredExpences = this.state.expenses.filter(expense => {
      if (expense.what === category) {
        return true;
      }
      return false;
    });

    this.setState({
      filteredExpences
    });
  }

  getTotalBucks() {
    let totalBucks = 0;
    console.log('getting total bucks', this.state.expenses);
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

    console.log('render', this.state.expenses, this.state.filteredExpences);

    let expenses = this.state.expenses;
    if (this.state.filteredExpences.length) {
      expenses = this.state.filteredExpences;
    }

    return (
      <div className="Reports">
        <Filters handleFilter={this.handleFilter}/>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead className="TableHead">
              <TableRow>
                <TableCell className="TableCell">Name</TableCell>
                <TableCell className="TableCell">Amount</TableCell>
                <TableCell className="TableCell">Date</TableCell>
                <TableCell className="TableCell">Type</TableCell>
                <TableCell className="TableCell">Note</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
        <Paper className={`${classes.root} DataTable`}>
          <Table>
            <TableHead className="hiddenTableHead">
            </TableHead>
            <TableBody className="TableBody">
            {
              expenses.map(row => (
                <TableRow key={row.id}>
                  <TableCell className="TableCell" component="th" scope="row">
                    {row.userName}
                  </TableCell>
                  <TableCell className="TableCell">{row.bucksAmount}</TableCell>
                  <TableCell className="TableCell">{row.when}</TableCell>
                  <TableCell className="TableCell">{row.what}</TableCell>
                  <TableCell className="TableCell">{row.note}</TableCell>
                </TableRow>
              ))
            }
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Reports);
