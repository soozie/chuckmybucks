import React, { Component } from 'react';
import AddBucks from '../AddBucks/AddBucks.js';
import Transactions from '../Transactions/Transactions.js';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addBucksView: 'visible', // 3 possible values: inProgress hidden visible
      transactionsView: 'hidden'
    };
    this.handleShowView = this.handleShowView.bind(this);
  }

  handleShowView() {
    if (this.state.addBucksView === 'visible' && this.state.transactionsView === 'hidden') {
      this.setState({
        addBucksView: 'inProgress',
        transactionsView: 'inProgress'
      });
      setTimeout(() => {
        this.setState({
          addBucksView: 'hidden',
          transactionsView: 'visible'
        });
      }, 400);
    } else if (this.state.addBucksView === 'hidden' && this.state.transactionsView === 'visible') {
      this.setState({
        addBucksView: 'inProgress',
        transactionsView: 'inProgress'
      });
      setTimeout(() => {
        this.setState({
          addBucksView: 'visible',
          transactionsView: 'hidden'
        });
      }, 400);
    }

  }

  render() {
    return (
      <div className="Main">
        <AddBucks showaddBucks={this.state.addBucksView}/>
        <Transactions showStats={this.state.transactionsView} />
        <button className="Main__button" type="button" onClick={this.handleShowView}>Show Transactions</button>
      </div>
    );
  }
}

export default Main;
