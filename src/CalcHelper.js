import React, { Component } from 'react';

class CalcHelper extends Component {

  render() {
    const {handleClick, depositedClick, yearsClick, returnRateClick} = this.props;
    const taxTable = this.props.taxInfo.map(prov => {
      const taxBrackets = prov.taxBrackets.map(taxBracket => {
        return (
          <tr>
            <td>{taxBracket.income}</td>
            <td id={taxBracket.taxRate} onClick={handleClick} className='hoverable tax-table'>{taxBracket.taxRate}</td>
          </tr>
        )
      })
      return (
        <table className='highlight'>
          <thead>
            <tr>
              <th>Net Income</th>
              <th>Tax Rate(%)</th>
            </tr>
          </thead>
          <tbody>
            {taxBrackets}
          </tbody>
        </table>
      )
    })
    return (
      <div className='card teal col s7 offset-s1 '>
        <div className='card-content white-text'>
          <span className='card-title'>Calculator Assistant</span>
          <p>Fill out the form on the left if you are familiar with the financial concepts or use the assistant to help you.</p>
        </div>
        <ul className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header">Current Marginal Tax Rate</div>
          <div id='cmtr-helper' ref='cmtr-helper' className="collapsible-body white">
            <span>The current marginal tax rate is the percentage you will be taxed in the last dollar of income earned in a given tax year.</span>
            {taxTable}
          </div>
        </li>
        <li>
          <div ref='artrHelper' className="collapsible-header">Average Tax Rate in Retirement</div>
          <div id='artr-helper'  className="collapsible-body white">
            <span>The tax rate at which you expect to be at throughout your retirement, based on all sources of income (pension, investments, rents, etc...)</span>
            {taxTable}
          </div>
        </li>
        <li>
          <div ref='depositedHelper' className="collapsible-header">Amount Deposited</div>
          <div className="collapsible-body white">
            <span>The amount you are depositing for this partiuclar investment. <br></br>Please enter the deposit amount you wish to invest</span>
            <a className="waves-effect waves-light btn" onClick={depositedClick}>Next</a>
          </div>
        </li>
        <li>
          <div ref='yearsHelper' className="collapsible-header">Years Invested</div>
          <div className="collapsible-body white">
            <span>The duration (in years) that your money will be invested.</span>
            <a className="waves-effect waves-light btn" onClick={yearsClick}>Next</a>
          </div>
        </li>
        <li>
          <div ref='returnRateHelper' className="collapsible-header">Return Rate on Investment</div>
          <div className="collapsible-body white">
            <span>The percentage per year at which you expect your investment to grow. (e.g. if you had invested in CDN Govt Bonds over past 20 years your rate of return would be 4.2%, or if you had invested in the S&P 500 over the past 20 years, your rate of return would be 7.6%)<br></br></span>
            <a className="waves-effect waves-light btn" onClick={returnRateClick}>Next</a>
          </div>
        </li>
        <li>
          <div ref='inflationHelper' className="collapsible-header">Rate of Inflation</div>
          <div className="collapsible-body white">
            <span>The rate of inflation is the percentage at which there is a general increase in prices and fall in the purchasing value of money, on a yearly basis. The averate rate of inflation over the last decade has been 1.58%. Please enter the rate of inflation expected during the period of investment.</span>
          </div>
        </li>
        </ul>
      </div>
    )
  }
}

export default CalcHelper;


