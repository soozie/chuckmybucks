import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddBucks from '../AddBucks/AddBucks.js';
import Transactions from '../Transactions/Transactions.js';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: 'white',
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


  }

  render() {
    const {
      classes
    } = this.props;
    return (
      <div className="Main">
        <AddBucks />
        <Transactions />
        <Button variant="contained" className={classes.button}>
          Show Transactions
        </Button>
      </div>
    );
  }
}

export default withStyles(styles) (Main);
