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
import './AddBudget.css';

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

class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetAmount: '',
      requestStatus: 'default'
    };

    this.setValue = this.setValue.bind(this);
    this.addData = this.addData.bind(this);

    this.loading = null;
    this.saved = null;
  }

  setValue(name, value) {
    this.setState({ [name]: value });
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

    const amount = {
      budgetAmount: this.state.budgetAmount
    };

    if (checkProperties(amount)) {
      setTimeout(() => {
        api.saveUser(amount)
        .then((amounts) => {
          console.log(amounts);
          this.setState({
            budgetAmount: '',
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
      }, 200);
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
      <div className='AddBudget'>
        <Paper className={classes.root} elevation={1}>
            <TextField
              id="budget-amount"
              label="budgetAmount"
              placeholder="Type an Amount"
              className={classes.textField}
              value={this.state.budgetAmount}
              onChange={(e) => {this.setValue('budgetAmount', e.target.value);}}
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

AddBudget.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddBudget);
