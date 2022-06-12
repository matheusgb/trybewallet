import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../actions';

class TableWallet extends React.Component {
  render() {
    const { expenses, removeExpense, changingExpense } = this.props;
    return (
      <table className="all--table">
        <thead className="head--table">
          <tr className="container--cels">
            <th> Descrição </th>
            <th> Tag </th>
            <th> Método de pagamento </th>
            <th> Valor </th>
            <th> Moeda </th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>
        </thead>

        <tbody className="body--table">
          {expenses.map((element) => (
            <tr key={ element.id }>
              <td>{element.description}</td>
              <td>{element.tag}</td>
              <td>{element.method}</td>
              <td>{parseFloat((element.value)).toFixed(2)}</td>
              <td>
                {(element.exchangeRates[element.currency]
                  .name.replace('/Real Brasileiro', ''))}
              </td>
              <td>
                {parseFloat(
                  (element.exchangeRates[element.currency].ask),
                ).toFixed(2)}
              </td>
              <td>
                {(parseFloat(
                  (element.value) * element.exchangeRates[element.currency].ask,
                )
                ).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => changingExpense(element) }
                >
                  Editar

                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => removeExpense(element.id) }
                >
                  Excluir

                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    );
  }
}

TableWallet.propTypes = {
  expenses: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (value) => dispatch(deleteExpense(value)),
  changingExpense: (value) => dispatch(editExpense(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TableWallet);
