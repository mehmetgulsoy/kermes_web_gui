import { push } from "connected-react-router";
import { getIsFetching } from "../reducers/responce";
import * as types from "../constants/actionTypes";
import * as MSG from "../constants/msg";

const UserAuthSuccses = respons => ({
  type: types.USER_AUTH,
  isAuthenticated: true,
  userName: respons.data.data.uye
});

const UserAuthFail = () => ({
  type: types.USER_AUTH,
  isAuthenticated: false,
  userName: ""
});

export const login = data => (dispatch, getState, { axios, socket }) => {
  if (getIsFetching(getState().responce)) {
    return Promise.resolve();
  }
  dispatch({
    type: types.NETWORK_REQUEST_BEGIN
  });
  return axios
    .post("/login", data)
    .then(dispatch(UserAuthFail()))
    .then(
      respons => {
        dispatch({
          type: types.NETWORK_REQUEST_END,
          error: false,
          msg: (respons.data && respons.data.msg) || MSG.SUCCESS_MSG
        });
        dispatch(UserAuthSuccses(respons));
        dispatch(push("/"));
      },
      error => {
        dispatch({
          type: types.NETWORK_REQUEST_END,
          error: true,
          msg: (error.response && error.response.data.msg) || MSG.FAIL_MSG
        });
        dispatch(UserAuthFail());
      }
    );
};

export const logOut = () => (dispatch, getState, { axios, socket }) => {
  if (getIsFetching(getState().responce)) {
    return Promise.resolve();
  }
  dispatch({
    type: types.NETWORK_REQUEST_BEGIN
  });
  return axios.get("/logout").then(
    respons => {
      dispatch({
        type: types.NETWORK_REQUEST_END,
        error: false,
        msg: MSG.SUCCESS_MSG
      });
      dispatch(dispatch(UserAuthFail));
    },
    error => {
      dispatch({
        type: types.NETWORK_REQUEST_END,
        error: true,
        msg: MSG.FAIL_MSG
      });
      dispatch(dispatch(UserAuthFail));
    }
  );
};
