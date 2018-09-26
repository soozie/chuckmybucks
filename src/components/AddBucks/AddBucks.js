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
import AddUser from '../AddUser/AddUser.js';
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
      expenses: [],
      requestStatus: 'default',
      users: [],
      categories: []
    };

    this.getUsers = this.getUsers.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setValue = this.setValue.bind(this);
    this.addData = this.addData.bind(this);

    this.loading = null;
    this.saved = null;
  }

  componentWillMount() {
    this.getUsers();
    this.getCategories();
    console.log('componentWillMount');
  }

  getUsers() {
    console.log('getting users');
    api.getUsers()
    .then((response) => {
      console.log('setting state', response);
      if (response.length) {
        this.setState({
          users: response
        });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getCategories() {
    console.log('getting categories');
    api.getCategories()
    .then((response) => {
      console.log('setting state', response);
      if (response.length) {
        this.setState({
          categories: response
        });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  setValue(name, value) {
    this.setState({ [name]: value });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addData() {
    this.setState({
      requestStatus: 'loading'
    });

    if (!this.loading) {
      this.loading = lottie.loadAnimation({
        container: document.getElementById('loading'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/progress.json' // the path to the animation json
      });
      this.loading.play();
    } else {
      this.loading.play();
    }

    const expense = {
      userName: this.state.userName,
      bucksAmount: this.state.bucksAmount,
      when: this.state.when,
      what: this.state.what,
      note: this.state.note
    };

    if (checkProperties(expense)) {
      setTimeout(() => {
        api.saveExpense(expense)
        .then((expenses) => {
          console.log(expenses);
          this.setState({
            userName: '',
            bucksAmount: '',
            when: '',
            what: '',
            note: '',
            expenses,
            requestStatus: 'saved'
          });

          this.loading.destroy();
          this.loading = null;

          if (!this.saved) {
            this.saved = lottie.loadAnimation({
              container: document.getElementById('loading'), // the dom element that will contain the animation
              renderer: 'svg',
              loop: false,
              autoplay: false,
              path: '/anima.json' // the path to the animation json
            });
            this.saved.play();
          } else {
            this.saved.play();
          }

          setTimeout(() => {
            this.saved.destroy();
            this.saved = null;
            this.setState({
              requestStatus: 'default'
            });
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            requestStatus: 'default'
          });
        });
      }, 2000);
    } else {
      console.error('Fill in all the details!');
      setTimeout(() => {
        this.setState({
          requestStatus: 'default'
        });
      }, 2000);
    }
  }

  render() {
    const {
      classes
    } = this.props;

    let hiddenDefault = '';
    let hiddenLoading = '';
    let hiddenSaved = '';

    switch (this.state.requestStatus) {
      case 'default':
      hiddenDefault = '';
      hiddenLoading = 'hidden';
        break;
      case 'loading':
      hiddenLoading = '';
      hiddenDefault = 'hidden';
        break;
      case 'saved':
      hiddenDefault = 'hidden';
      hiddenLoading = '';
        break;
    }

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
                {
                  this.state.users.map((user) => {
                    return (<MenuItem value={user.userName}>{user.userName}</MenuItem>)
                  })
                }
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
                {
                  this.state.categories.map((category) => {
                    return (<MenuItem value={category.name}>{category.name}</MenuItem>)
                  })
                }
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
              <div id="default" className={hiddenDefault} >SAVE</div>
              <div id="loading" className={hiddenLoading} ></div>
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
