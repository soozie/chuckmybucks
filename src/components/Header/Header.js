import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Header">
          <h1 className="Header-title">The Bucks Calculator</h1>
      </div>
    );
  }
}

export default Header;
