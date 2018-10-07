import PropTypes from 'prop-types';
import React, { Component } from 'react';
import lottie from 'lottie-web';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as api from '../../modules/addBucks/api';
import './Filters.css';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
  },
  button: {
    margin: theme.spacing.unit,
    backgroundColor: 'white',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 125,
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


class Filters extends Component {
  static get propTypes() {
    return {
      handleFilter: PropTypes.func.isRequired,
      classes: PropTypes.object.isRequired,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      category: '',
    };

    this.setValue = this.setValue.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

    this.loading = null;
  }

  setValue(name, value) {
    this.setState({ [name]: value });
  }

  handleFilter() {
    this.props.handleFilter(this.state.category);
  }

  render() {
    const {
      classes
    } = this.props;

    let hiddenDefault = '';
    let hiddenLoading = '';

    switch (this.state.requestStatus) {
      case 'default':
      hiddenDefault = '';
      hiddenLoading = 'hidden';
        break;
      case 'loading':
      hiddenLoading = '';
      hiddenDefault = 'hidden';
        break;
    }

    return (
      <div className="Filters">
        <Paper className={classes.root} elevation={1}>
          <TextField
            id="category"
            label="Category"
            placeholder="Type a Category"
            className={classes.textField}
            value={this.state.category}
            onChange={(e) => {this.setValue('category', e.target.value);}}
            margin="normal"
          />
          <Button variant="contained" className={`${classes.button} hover`} onClick={this.handleFilter}>
            <div id="default" className={hiddenDefault} >FILTER</div>
            <div id="loading" className={hiddenLoading} ></div>
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Filters);
