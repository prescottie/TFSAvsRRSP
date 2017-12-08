import React, { Component } from 'react';
import Results from './Results.js';
import taxInfo from './taxInfo.js';
import { setTimeout } from 'timers';

class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cmtr: '',
      artr: '',
      deposited: '',
      years: '',
      returnRate: '',
      inflation: '',
      provinces: taxInfo
    }
  }

  handleChange = key => {
    this.setState({
      [key]: this.refs[key].value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const {cmtr, artr, deposited, years, returnRate, inflation } = this.state;
    const realReturnRate = ((1 + (returnRate/100)) / (1 + (inflation/100)) - 1); 
    console.log( "Real: ", realReturnRate);
    this.props.calcTFSA(cmtr, deposited, years, realReturnRate);
    this.props.calcRRSP(artr, deposited, years, realReturnRate);

    const card = document.getElementsByClassName("card");
    card[0].classList.add('hidden');
    const table = document.getElementsByClassName("results-table");
    table[0].classList.remove('hidden');

    this.setState({
      cmtr: '',
      artr: '',
      deposited: '',
      years: '',
      returnRate: '',
      inflation: '', 
    })
  }
  
  handleClick = e => {
    const id = e.target.id;
    this.setState({
      cmtr: id
    })
    this.refs.artrHelper.click();
    this.refs.cmtr.focus();
    setTimeout(() =>{this.refs.artr.focus();}, 5);

  }

  artrClick = e => {
    this.refs.deposited.focus();
    this.refs.depositedHelper.click();
  }

  depositedClick = e => {
    this.refs.years.focus();
    this.refs.yearsHelper.click();
  }
  yearsClick = e => {
    this.refs.returnRate.focus();
    this.refs.returnRateHelper.click();
  }

  returnRateClick = e => {
    this.refs.inflation.focus();
    this.refs.inflationHelper.click();
  }

  inflationClick = e => {
    this.setState({inflation: 1.58});
    this.refs.inflation.focus();
  }


  render() {

    const taxTable = this.state.provinces.map(prov => {
      const taxBrackets = prov.taxBrackets.map(taxBracket => {
        return (
          <tr>
            <td>{taxBracket.income}</td>
            <td id={taxBracket.taxRate} onClick={this.handleClick} className='hoverable tax-table'>{taxBracket.taxRate}</td>
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
      <div className="row">
        <form className='col s4' onSubmit={ this.handleSubmit }>
          <div className='input-field'>
            <input id='cmtr' type='number' step='0.01' className='validate' ref='cmtr' value={ this.state.cmtr } onChange={this.handleChange.bind(this, 'cmtr')}></input>
            <label htmlFor='cmtr'>Current Marginal Tax rate (%)</label>
          </div>
          <div className='input-field'>
            <input id='artr' type='number' step='0.01' className='validate' ref='artr' value={ this.state.artr } onChange={this.handleChange.bind(this, 'artr')}></input>
            <label htmlFor='artr'>Avg Tax Rate in Retirment (%)</label>
          </div>
          <div className='input-field'>
            <input id='deposited' type='number' step='0.01' className='validate' ref='deposited' value={ this.state.deposited } onChange={this.handleChange.bind(this, 'deposited')}></input>
            <label htmlFor='deposited'>Amount Deposited ($)</label>
          </div>
          <div className='input-field'>
            <input id='years' type='number' className='validate' ref='years' value={ this.state.years } onChange={this.handleChange.bind(this, 'years')}></input>
            <label htmlFor='years'>Years Invested </label>
          </div>
          <div className='input-field'>
            <input id='returnRate' type='number' step='0.01' className='validate' ref='returnRate' value={ this.state.returnRate } onChange={this.handleChange.bind(this, 'returnRate')}></input>
            <label htmlFor='returnRate'>Return Rate on Investment (%)</label>
          </div>
          <div className='input-field'>
            <input id='inflation' type='number' step='0.01' className='validate' ref='inflation' value={ this.state.inflation } onChange={this.handleChange.bind(this, 'inflation')}></input>
            <label htmlFor='inflation'>Rate of Inflation (%)</label>
          </div>
          <button className="btn waves-effect waves-light" type="submit">Calculate
            <i className="material-icons right">attach_money</i>
          </button>
        </form>
        <Results tfsa={ this.props.tfsa } rrsp={ this.props.rrsp }/>

        <div className='card teal col s7 offset-s1 '>
          <div className='card-content white-text'>
            <span className='card-title'>Calculator Assistant</span>
            <p>Fill out the form on the left if you are familiar with the financial concepts or use the assistant to help you.</p>
          </div>
          <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header">Current Marginal Tax Rate</div>
            <div id='cmtr-helper' ref='cmtr-helper' className="collapsible-body white">
              <span>The current marginal tax rate is the percentage you will be taxed in the last dollar of income earned in a given tax year.
              <br/><br/>Below is a combined federal & provincial tax schdule. Please click on a tax rate that matches your net income.
              </span>
              {taxTable}
            </div>
          </li>
          <li>
            <div ref='artrHelper' className="collapsible-header">Average Tax Rate in Retirement</div>
            <div id='artr-helper'  className="collapsible-body white">
              <span>The tax rate at which you expect to be at throughout your retirement, based on all sources of income (pension, investments, rents, etc...)
              <br/><br/><strong>Please enter expected average tax rate you will pay in retirement. </strong><br></br>
              </span>
              <a className="waves-effect waves-light btn" onClick={this.artrClick}>Next</a>
            </div>
          </li>
          <li>
            <div ref='depositedHelper' className="collapsible-header">Amount Deposited</div>
            <div className="collapsible-body white">
              <span>The amount you are depositing for this partiuclar investment. <br></br>Please enter the deposit amount you wish to invest</span>
              <a className="waves-effect waves-light btn" onClick={this.depositedClick}>Next</a>
            </div>
          </li>
          <li>
            <div ref='yearsHelper' className="collapsible-header">Years Invested</div>
            <div className="collapsible-body white">
              <span>The duration (in years) that your money will be invested.</span>
              <a className="waves-effect waves-light btn" onClick={this.yearsClick}>Next</a>
            </div>
          </li>
          <li>
            <div ref='returnRateHelper' className="collapsible-header">Return Rate on Investment</div>
            <div className="collapsible-body white">
              <span>The percentage per year at which you expect your investment to grow. (e.g. if you had invested in CDN Govt Bonds over past 20 years your rate of return would be 4.2%, or if you had invested in the S&P 500 over the past 20 years, your rate of return would be 7.6%)<br/><br/></span>
              <a className="waves-effect waves-light btn" onClick={this.returnRateClick}>Next</a>
            </div>
          </li>
          <li>
            <div ref='inflationHelper' className="collapsible-header">Rate of Inflation</div>
            <div className="collapsible-body white">
              <span>The rate of inflation is the percentage at which there is a general increase in prices and fall in the purchasing value of money, on a yearly basis. The averate rate of inflation over the last decade has been <span class="new badge" data-badge-caption="1.58%" onClick={this.inflationClick}></span>.<br/>Please enter the rate of inflation expected during the period of investment.</span>
            </div>
          </li>
        </ul>
        </div>
      </div>
    );
  }
}

export default Calc;
