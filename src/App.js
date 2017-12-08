import React, { Component } from 'react';
import './App.css';
import Calc from './Calc.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tfsa: {},
      rrsp: {},
    }
  }

  calcFV = (amount, rate, period) => {
    return amount * Math.pow((1 + rate), period);
  }


  calcTFSA = (cmtr, deposited, years, realReturnRate) => {
    const tax = (cmtr/100) * deposited;
    const netContribution = deposited - tax;
    const futureValue = this.calcFV(netContribution, realReturnRate, years);
    this.setState({
      tfsa: {
        deposited: Number(deposited).toFixed(2),
        tax: Number(tax).toFixed(2),
        netContribution: Number(netContribution).toFixed(2),
        futureValue: Number(futureValue).toFixed(2),
        withdrawalTax: 'N/A',
        netWithdrawal: Number(futureValue).toFixed(2)
      }
    })
  }

  calcRRSP = (artr, deposited, years, realReturnRate) => {
    const futureValue = this.calcFV(deposited, realReturnRate, years);
    const withdrawalTax = (artr/100) * futureValue;
    const netWithdrawal = futureValue - withdrawalTax;
    this.setState({
      rrsp: {
        deposited: Number(deposited).toFixed(2),
        tax: 'N/A',
        netContribution: Number(deposited).toFixed(2),
        futureValue: Number(futureValue).toFixed(2),
        withdrawalTax: Number(withdrawalTax).toFixed(2),
        netWithdrawal: Number(netWithdrawal).toFixed(2),
      }
    })
  }

  render() {
    return (
      <div>
        <header className="header teal center-text">
          <h1 className="white-text site-title">TFSA/RRSP Comparison Calculator</h1>
          <h5 className="white-text">Find out which will help you save more money</h5>
        </header>
        <div className='container'>
          <Calc calcTFSA={ this.calcTFSA } calcRRSP={ this.calcRRSP } tfsa={ this.state.tfsa } rrsp={ this.state.rrsp }/>
        </div>
      </div>
    );
  }
}

export default App;
