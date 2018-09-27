import React, { Component } from 'react';
import TripAddMate from '../TripAddMate/TripAddMate.js';
import TripAddExpense from '../TripAddExpense/TripAddExpense.js';
import './TripContainer.css';

class TripContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="TripContainer">
          <TripAddMate />
          <TripAddExpense />
      </div>
    );
  }
}

export default TripContainer;
