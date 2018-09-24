import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <Navigation />
      </div>
    );
  }
}

export default App;
