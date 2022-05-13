// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_ELEMENT':
    return { email: action.value };
  default:
    return state;
  }
}

export default user;
