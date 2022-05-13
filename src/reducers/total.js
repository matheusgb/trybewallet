const INITIAL_STATE = '0';

function total(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_TOTAL':
    return action.value;
  default:
    return state;
  }
}

export default total;
