import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as api from '../../modules/addBucks/api';
import './AddBucks.css';

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

class AddBucks extends Component {
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

  render() {
    const {
      classes
    } = this.props;
    return (
      <div className='AddBucks'>
        <Paper className={classes.root} elevation={1}>
            <FormControl className={classes.formControl} margin="normal">
              <InputLabel htmlFor="user-simple">Who?</InputLabel>
              <Select
                value={this.state.userName}
                onChange={this.handleChange}
                inputProps={{
                  name: 'userName',
                  id: 'userName-id',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Nico">Nico</MenuItem>
                <MenuItem value="Susa">Susa</MenuItem>
                <MenuItem value="Zlata">Zlata</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="amount"
              label="How Much?"
              placeholder="How Much?"
              className={classes.textField}
              value={this.state.bucksAmount}
              onChange={(e) => {this.setValue('bucksAmount', e.target.value);}}
              margin="normal"
            />
            <TextField
              id="date"
              label="When?"
              type="date"
              placeholder="When?"
              value={this.state.when}
              className={classes.textField}
              onChange={(e) => {this.setValue('when', e.target.value);}}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl className={classes.formControl} margin="normal">
              <InputLabel htmlFor="category-simple">What?</InputLabel>
              <Select
                value={this.state.what}
                onChange={this.handleChange}
                inputProps={{
                  name: 'what',
                  id: 'category-id',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Drink">Drink</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Grocery">Grocery</MenuItem>
                <MenuItem value="Tobacco">Tobacco</MenuItem>
                <MenuItem value="Bills">Bills</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
                <MenuItem value="EatOut">EatOut</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Holidays">Holidays</MenuItem>
                <MenuItem value="Fun">Fun</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="note"
              label="Note"
              placeholder="More"
              className={classes.textField}
              value={this.state.note}
              onChange={(e) => {this.setValue('note', e.target.value);}}
              margin="normal"
            />
            <Button variant="contained" className={`${classes.button} hover`} onClick={this.addData}>
              Save
            </Button>
        </Paper>
      </div>
    )
  }
}

AddBucks.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddBucks);
