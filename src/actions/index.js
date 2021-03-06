// Coloque aqui suas actions
export const addAssignment = (value) => ({ type: 'ADD_ELEMENT', value });
export const requestApi = () => ({ type: 'REQUEST_API' });
export const getApi = (value) => ({ type: 'GET_API', value });
export const expenses = (value) => ({ type: 'GET_EXPENSES', value });
export const deleteExpense = (value) => ({ type: 'DELETE', value });
export const editExpense = (value) => ({ type: 'EDIT', value });
export const submitEdit = (value) => ({ type: 'SUBMIT', value });
