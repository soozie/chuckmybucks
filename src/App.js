import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import Main from './components/Main/Main.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
