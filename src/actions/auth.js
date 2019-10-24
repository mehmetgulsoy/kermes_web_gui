import { getIsFetching } from "../reducers/responce";
import * as types from "../constants/actionTypes";
import * as URL from "../constants/URLs";

const UserAuthSuccses = (respons) => (
  {
    type: types.USER_AUTH,
    isAuthenticated: !respons.data.error,
    userName: respons.data.uye,
  }
)

const UserAuthFail = () => (
  {
    type: types.USER_AUTH,
    isAuthenticated: false,
    userName: '',
  }
)

export const login = (data) => (dispatch, getState, { axios, socket }) => {
  if (getIsFetching(getState().responce)) {
    return Promise.resolve();
  }
  dispatch({
    type: types.NETWORK_REQUEST_BEGIN,
  });
  return axios.post(`${URL.apiUrl}/login`, data, { headers: { "Access-Control-Allow-Origin": "*" } }).then(
    respons => {
      dispatch({
        type: types.NETWORK_REQUEST_END,
        error: respons.data.error,
        msg: respons.data.msg || ''
      });
      dispatch(UserAuthSuccses(respons));
      return respons;
    },
    error => {
      dispatch({
        type: types.NETWORK_REQUEST_END,
        error: error.error || true,
        msg: error.msg || 'Hata oluştu'
      });
      dispatch(UserAuthFail);
    }
  );
};

export const logOut = () => (dispatch, getState, { axios, socket }) => {
  if (getIsFetching(getState().responce)) {
    return Promise.resolve();
  }
  dispatch({
    type: types.NETWORK_REQUEST_BEGIN,
  });
  return axios.get(`${URL.apiUrl}/logout`, { headers: { "Access-Control-Allow-Origin": "*" } }).then(
    respons => {
      dispatch({
        type: types.NETWORK_REQUEST_END,
        error: respons.data.error || false,
        msg: respons.data.msg || ''
      });
      dispatch(dispatch(UserAuthFail));
    },
    error => {
      dispatch({
        type: types.NETWORK_REQUEST_END,
        error: error.data.error || true,
        msg: error.data.msg || 'Hata oluştu'
      });
      dispatch(dispatch(UserAuthFail));
    }
  );
}; 