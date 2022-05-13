import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenses, total } from '../actions';
import fetchEconomia from '../services/EconomiaApi';
import RequestExchange from '../services/request';

class InputsWallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: [],
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { fetching } = this.props;
    fetching();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

getExpense = () => {
  const { expense } = this.state;
  const { dispatchTotal, dispatchExpenses } = this.props;
  dispatchExpenses(expense);
  // const teste = expense[0].exchangeRates[expense[0].currency];
  // console.log(teste.ask);
  // console.log(expense[0].value);
  // console.log(parseFloat(expense[0].value) * teste.ask);

  const reduzindo = expense.reduce((a, b) => a
  + (parseFloat(b.value) * b.exchangeRates[b.currency].ask), 0).toFixed(2);

  dispatchTotal(reduzindo);
  this.setState({
    value: '',
  });
}

  clickHandle = async () => {
    const { id, value, description, currency,
      method, tag } = this.state;

    const obj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await RequestExchange(),
    };

    this.setState((prevState) => ({
      expense: [...prevState.expense, obj],
      id: prevState.id + 1,
    }), () => {
      this.getExpense();
    });
  }

  render() {
    const { currencies, loading } = this.props;
    const { value, tag } = this.state;
    return (
      <div>

        <label htmlFor="valor">
          Valor:
          <input
            type="text"
            id="valor"
            data-testid="value-input"
            name="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>

        <label htmlFor="descript">
          Descrição:
          <input
            type="text"
            id="descript"
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="moeda">
          Moeda:
          {loading ? 'Carregando...'
            : (
              <select
                id="moeda"
                data-testid="currency-input"
                name="currency"
                onChange={ this.handleChange }
              >
                {currencies.map((element) => (
                  <option value={ element } key={ element }>
                    {' '}
                    {element}
                    {' '}
                  </option>
                ))}
              </select>
            )}
        </label>

        <label htmlFor="metodo">
          Método de pagamento:
          <select
            id="metodo"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro"> Dinheiro </option>
            <option value="Cartão de crédito"> Cartão de crédito </option>
            <option value="Cartão de débito"> Cartão de débito </option>
          </select>
        </label>

        <label htmlFor="categoria">
          Categoria:
          <select
            id="categoria"
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentacao"> Alimentação </option>
            <option value="Lazer"> Lazer </option>
            <option value="Trabalho"> Trabalho </option>
            <option value="Transporte"> Transporte </option>
            <option value="Saúde"> Saúde </option>
          </select>
        </label>

        <button type="button" onClick={ this.clickHandle }> Adicionar despesa </button>

      </div>
    );
  }
}

InputsWallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  loading: PropTypes.bool.isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
  exchange: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  loading: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (value) => dispatch(expenses(value)),
  dispatchTotal: (value) => dispatch(total(value)),
  fetching: () => dispatch(fetchEconomia()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputsWallet);
