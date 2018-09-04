import React, { Component } from 'react';
import './AddBucks.css';

class AddBucks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      expences: [],
    };

    this.getUserName = this.getUserName.bind(this);
    this.getBucksAmount = this.getBucksAmount.bind(this);
    this.getWhen = this.getWhen.bind(this);
    this.getWhat = this.getWhat.bind(this);
    this.addData = this.addData.bind(this);
    this.startCalculation = this.startCalculation.bind(this);
    this.getTotalBucks = this.getTotalBucks.bind(this);
  }

  getUserName(event) {
    // logica to get the value of input element and return it
    this.setState({ input1: event.target.value });
  }

  getBucksAmount(event) {
    // logica to get the value of input element and return it
    this.setState({ input2: event.target.value });
  }

  getWhen(event) {
    // logica to get the value of input element and return it
    this.setState({ input3: event.target.value });
  }

  getWhat(event) {
    // logica to get the value of input element and return it
    this.setState({ input4: event.target.value });
  }

  addData() {
    const expense = {
      userName: this.state.input1,
      bucksAmount: this.state.input2,
      when: this.state.input3,
      what: this.state.input4
    };

    fetch(`http://localhost:4000/api/saveExpence`, {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => { return response.json(); })
    .then(jsonResponse => {
      this.setState({
        expences: jsonResponse,
        input1: '',
        input2: '',
        input3: '',
        input4: ''
      });
      console.log(jsonResponse);
    })
    .catch(error => {
      console.log(error);

      return error;
    });
  }

  getTotalBucks() {
    let totalBucks = 0;
    this.state.expences.forEach((expence) => {
      totalBucks += parseFloat(expence.bucksAmount);
    });

    return totalBucks;
  }

  startCalculation() {
    var totalBucks = this.getTotalBucks();
    console.log('The total is ' + totalBucks);
  }


  render() {

    let hiddenClassName = '';
    if (this.props.showaddBucks === 'inProgress') {
      hiddenClassName = 'AddBucks--fadeOut';
    } else if (this.props.showaddBucks === 'hidden') {
      hiddenClassName = 'AddBucks--hidden';
    }
    return (
      <div className={`AddBucks ${hiddenClassName}`}>
        <div className="saveContainer">
          <div className="topSaveContainer">
            <div className="topContainer uno">
              <input className="input1" value={this.state.input1} placeholder="Who?" onChange={this.getUserName}></input>
            </div>
            <div className="topContainer due">
              <input className="input2" value={this.state.input2} placeholder="How much?" onChange={this.getBucksAmount}></input>
            </div>
            <div className="topContainer tre">
              <input className="input3" value={this.state.input3} placeholder="What?" onChange={this.getWhen}></input>
            </div>
            <div className="topContainer quattro">
              <input className="input4" value={this.state.input4} placeholder="When?" onChange={this.getWhat}></input>
            </div>
          </div>
          <div className="bottomSaveContainer">
            <div className="bottomContainer left">
              <button className="button" type="button" onClick={this.addData}>Save</button>
            </div>
            <div className="bottomContainer right">
              <button className="button" type="button" onClick={this.startCalculation}>Get Total Bucks</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddBucks;
