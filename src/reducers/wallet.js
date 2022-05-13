// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  isFetching: false,
  expenses: [],
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
    return { ...state, expenses: action.value };
  default:
    return state;
  }
}

export default wallet;
