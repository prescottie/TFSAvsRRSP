import React, { Component } from 'react';

class Results extends Component {

  startOver = e => {
    const card = document.getElementsByClassName("card");
    card[0].classList.remove('hidden');
    const table = document.getElementsByClassName("results-table");
    table[0].classList.add('hidden');
  }

  render() {
    const {tfsa, rrsp} = this.props;
    return (
      <div className='results-table col s7 offset-s1 hidden'>
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
              <td>Pre-tax Amount Deposited</td>
              <td>{`$${tfsa.deposited}`}</td>
              <td>{`$${rrsp.deposited}`}</td>
            </tr>
            <tr>
              <td>Amount taxed</td>
              <td>{`$${tfsa.tax}`}</td>
              <td>{rrsp.tax}</td>
            </tr>
            <tr>
              <td>Net Contribution</td>
              <td>{`$${tfsa.netContribution}`}</td>
              <td>{`$${rrsp.netContribution}`}</td>
            </tr>
            <tr>
              <td>Future Value (Pre-tax)</td>
              <td>{`$${tfsa.futureValue}`}</td>
              <td>{`$${rrsp.futureValue}`}</td>
            </tr>
            <tr>
              <td>Amount Taxed on Withdrawal</td>
              <td>{tfsa.withdrawalTax}</td>
              <td>{`$${rrsp.withdrawalTax}`}</td>
            </tr>
            <tr className='bold'>
              <td>Future Value (After-tax)</td>
              <td>{`$${tfsa.netWithdrawal}`}</td>
              <td>{`$${rrsp.netWithdrawal}`}</td>
            </tr>
          </tbody>
        </table>
        <a className="waves-effect waves-light btn" onClick={this.startOver}><i class="material-icons right">replay</i>Start Over</a>
      </div>
    );
  }
}

export default Results;
