import React, { Component } from 'react';
import AddUser from '../AddUser/AddUser.js';
import AddCategory from '../AddCategory/AddCategory.js';
import './Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Settings">
          <AddUser />
          <AddCategory />
      </div>
    );
  }
}

export default Settings;
