import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderWallet extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div className="header--wallet">
        <p data-testid="email-field">{email}</p>
        <div className="total">
          <p data-testid="total-field">
            {expenses.length > 0
              ? expenses.map((expense) => parseFloat(expense.value)
              * parseFloat(expense.exchangeRates[expense.currency].ask))
                .reduce((acc, element) => acc + element).toFixed(2)
              : 0}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

HeaderWallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(HeaderWallet);
