import React, { Component } from 'react';

class Results extends Component {

  startOver = e => {
    const card = document.getElementsByClassName("card");
    card[0].classList.remove('hidden');
    const table = document.getElementsByClassName("results-table");
    table[0].classList.add('hidden');
  }

  betterInvestment(tfsa, rrsp) {
   if (rrsp.netWithdrawal > tfsa.netWithdrawal) {
    return (
      <div>
        <h4>TFSA</h4>
        <blockquote>Depositing ${tfsa.deposited} now, into a TFSA for {tfsa.term} years will grow to a ater-tax value of ${tfsa.netWithdrawal}.</blockquote>
        <h4>RRSP</h4>
        <blockquote className='better-investment'>A ${rrsp.deposited} investment into an RRSP, results in a ${rrsp.taxReturn} tax-return and total investment of ${rrsp.netContribution} and grow over {rrsp.term} years to ${rrsp.netWithdrawal}.</blockquote>
      </div>
    )
   } else if (tfsa.netWithdrawal > rrsp.netWithdrawal) {
    return (
      <div>
        <h4>TFSA</h4>
        <blockquote className='better-investment'>Depositing ${tfsa.deposited} now, into a TFSA for {tfsa.term} years will grow to a ater-tax value of ${tfsa.netWithdrawal}.</blockquote>
        <h4>RRSP</h4>
        <blockquote>A ${rrsp.deposited} investment into an RRSP, results in a ${rrsp.taxReturn} tax-return and total investment of ${rrsp.netContribution} and grow over {rrsp.term} years to ${rrsp.netWithdrawal}.</blockquote>
      </div>
    )
   }

  }

  render() {
    const {tfsa, rrsp} = this.props;

    return (
      <div className='results-table col s7 offset-s1 hidden'>
        {this.betterInvestment(tfsa, rrsp)}
        <table className="highlight">
          <thead>
            <tr>
                <th></th>
                <th>TFSA</th>
                <th>RRSP</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>After-tax Deposited</td>
              <td>{`$${tfsa.netContribution}`}</td>
              <td>{`$${rrsp.netContribution}`}</td>
            </tr>
            <tr>
              <td>Future Value (Pre-tax)</td>
              <td>{`$${tfsa.futureValue}`}</td>
              <td>{`$${rrsp.futureValue}`}</td>
            </tr>
            <tr>
              <td>Future Tax</td>
              <td>{`$${tfsa.withdrawalTax}`}</td>
              <td>{`$${rrsp.withdrawalTax}`}</td>
            </tr>
            <tr className='bold'>
              <td>Future Value (After-tax)</td>
              <td>{`$${tfsa.netWithdrawal}`}</td>
              <td>{`$${rrsp.netWithdrawal}`}</td>
            </tr>
          </tbody>
        </table>
        <a className="waves-effect waves-light btn" onClick={this.startOver}><i className="material-icons right">replay</i>Start Over</a>
      </div>
    );
  }
}

export default Results;
