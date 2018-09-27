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
import * as api from '../../modules/addBucks/api';

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
      <div className="Transactions">
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell numeric>Amount</TableCell>
                <TableCell numeric>Date</TableCell>
                <TableCell numeric>Type</TableCell>
                <TableCell numeric>Note</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
          {
            this.state.expenses.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.userName}
                </TableCell>
                <TableCell numeric>{row.bucksAmount}</TableCell>
                <TableCell numeric>{row.when}</TableCell>
                <TableCell numeric>{row.what}</TableCell>
                <TableCell numeric>{row.note}</TableCell>
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

Transactions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Transactions);
