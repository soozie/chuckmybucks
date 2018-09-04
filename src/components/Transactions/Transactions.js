import React, { Component } from 'react';
import './Transactions.css';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expences: []
    };

    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    fetch('http://localhost:4000/api/getExpences')
    .then(response => { return response.json(); })
    .then(jsonResponse => {
      console.log(jsonResponse);
      this.setState({
        expences: jsonResponse
      })
    })
    .catch(error => { return error; });
  }


  render() {
    console.log(this.state.expences);
    let hiddenClassName = '';
    if (this.props.showStats === 'inProgress') {
      hiddenClassName = 'Transactions--fadeOut';
    } else if (this.props.showStats === 'hidden') {
      hiddenClassName = 'Transactions--hidden';
    }
    return (
      <div className={`Transactions ${hiddenClassName}`}>
        <table className="Transactions__table">
          <tbody>
            <tr>
              <th>UserName</th>
              <th>Bucks Amount</th>
              <th>When</th>
              <th>What</th>
            </tr>
            {
              this.state.expences.map(expence => {
                return (
                  <tr
                    key={expence.id}
                    type="row"
                  >
                    <td>{expence.userName}</td>
                    <td>{expence.bucksAmount}</td>
                    <td>{expence.when}</td>
                    <td>{expence.what}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Transactions;
