import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenses, submitEdit } from '../actions';
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
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
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
  const { dispatchExpenses } = this.props;
  dispatchExpenses(expense);
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
      expense: obj,
      id: prevState.id + 1,
    }), () => {
      this.getExpense();
    });
  }

  editHandle = () => {
    const { value, description, currency,
      method, tag } = this.state;
    const { submit, expenseSelected } = this.props;

    const { id } = expenseSelected;

    submit({ id, value, description, currency, method, tag });
  }

  render() {
    const { currencies, loading, edit } = this.props;
    const { value, tag, description, currency, method } = this.state;
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
            value={ description }
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
                value={ currency }
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
            value={ method }
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
        {edit
          ? <button type="button" onClick={ this.editHandle }> Editar despesa </button>
          : (
            <button
              type="button"
              onClick={ this.clickHandle }
            >

              Adicionar despesa

            </button>
          )}

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
  edit: state.wallet.edit,
  expenseSelected: state.wallet.expenseEdit,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (value) => dispatch(expenses(value)),
  fetching: () => dispatch(fetchEconomia()),
  submit: (value) => dispatch(submitEdit(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputsWallet);
