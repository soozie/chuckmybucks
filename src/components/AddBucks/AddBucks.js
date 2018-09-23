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
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
});

const AddBucks = ({
  classes,
  handleChange,
  setValue,
  userName,
  bucksAmount,
  when,
  what,
  note
}) => (
  <div className='AddBucks'>
    <Paper className={classes.root} elevation={1}>
      <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl} margin="normal">
            <InputLabel htmlFor="user-simple">Who?</InputLabel>
            <Select
              value={userName}
              onChange={handleChange}
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
        </form>
        <TextField
          id="amount"
          label="How Much?"
          placeholder="How Much?"
          className={classes.textField}
          value={bucksAmount}
          onChange={(e) => {setValue('bucksAmount', e.target.value);}}
          margin="normal"
        />
        <TextField
          id="date"
          label="When?"
          type="date"
          placeholder="When?"
          value={when}
          className={classes.textField}
          onChange={(e) => {setValue('when', e.target.value);}}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl className={classes.formControl} margin="normal">
          <InputLabel htmlFor="category-simple">What?</InputLabel>
          <Select
            value={what}
            onChange={handleChange}
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
          value={note}
          onChange={(e) => {setValue('note', e.target.value);}}
          margin="normal"
        />
    </Paper>
  </div>
);

AddBucks.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  bucksAmount: PropTypes.string.isRequired,
  when: PropTypes.string.isRequired,
  what: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired
}

export default withStyles(styles)(AddBucks);
