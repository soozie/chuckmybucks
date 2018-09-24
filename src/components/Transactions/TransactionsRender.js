import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const TransactionsRender = ({ classes, expenses }) => (
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
      expenses.map(row => (
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
);

TransactionsRender.propTypes = {
  classes: PropTypes.object.isRequired,
  expenses: PropTypes.array.isRequired,
};

export default withStyles(styles)(TransactionsRender);
