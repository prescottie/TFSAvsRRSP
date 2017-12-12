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


  calcTFSA = (deposited, years, realReturnRate) => {
    const futureValue = this.calcFV(deposited, realReturnRate, years);
    this.setState({
      tfsa: {
        deposited: Number(deposited).toFixed(2),
        term: years,
        taxReturn: (0.00).toFixed(2),
        netContribution: Number(deposited).toFixed(2),
        futureValue: Number(futureValue).toFixed(2),
        withdrawalTax: (0.00).toFixed(2),
        netWithdrawal: Number(futureValue).toFixed(2)
      }
    })
  }

  calcRRSP = (cmtr, artr, deposited, years, realReturnRate) => {
    const withTaxReturn = deposited/(1 - (cmtr/100));
    console.log(withTaxReturn);
    const futureValue = this.calcFV(withTaxReturn, realReturnRate, years);
    const withdrawalTax = (artr/100) * futureValue;
    const netWithdrawal = futureValue - withdrawalTax;
    this.setState({
      rrsp: {
        deposited: Number(deposited).toFixed(2),
        term: years,
        taxReturn: Number(withTaxReturn - deposited).toFixed(2),
        netContribution: Number(withTaxReturn).toFixed(2),
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
