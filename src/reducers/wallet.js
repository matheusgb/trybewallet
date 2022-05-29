// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  isFetching: false,
  expenses: [],
  edit: false,
  expenseEdit: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'GET_API':
    return { ...state,
      currencies: Object.keys(action.value),
      isFetching: false };
  case 'GET_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.value] };
  case 'DELETE':
    return { ...state,
      expenses: state.expenses
        .filter((element) => element.id !== action.value) };
  case 'EDIT':
    return { ...state,
      edit: true,
      expenseEdit: action.value };
  case 'SUBMIT':
    return { ...state,
      edit: false,
      expenses: state.expenses.map((element) => {
        const { id, value, description, currency, method, tag } = action.value;
        if (element.id === id) {
          element.value = value;
          element.description = description;
          element.currency = currency;
          element.method = method;
          element.tag = tag;
        }
        return element;
      }),
    };
  default:
    return state;
  }
}

export default wallet;
