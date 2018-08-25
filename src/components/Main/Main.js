import React, { Component } from 'react';
import AddBucks from '../AddBucks/AddBucks.js';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Main">
        <AddBucks />
      </div>
    );
  }
}

export default Main;
