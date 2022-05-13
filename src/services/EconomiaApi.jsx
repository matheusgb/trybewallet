import { requestApi, getApi } from '../actions';

function fetchEconomia() {
  return async (dispatch) => {
    try {
      dispatch(requestApi());
      const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await resolve.json();
      delete data.USDT;
      dispatch(getApi(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default fetchEconomia;
