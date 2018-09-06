import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as api from '../../modules/addBucks/api';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Transactions extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      expences: []
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    console.log('will mount');
    this.getData();
  }

  getData() {
    console.log('getting data');
    api.getExpences()
    .then((response) => {
      console.log('setting state');
      this.setState({
        expences: response
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }


  render() {
    const {
      classes
    } = this.props;

    return (
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
          {this.state.expences.map(row => {
            console.log(row);
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.userName}
                </TableCell>
                <TableCell numeric>{row.bucksAmount}</TableCell>
                <TableCell numeric>{row.when}</TableCell>
                <TableCell numeric>{row.what}</TableCell>
                <TableCell numeric>{row.protein}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles) (Transactions);
