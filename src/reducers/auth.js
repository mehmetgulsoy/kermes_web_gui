import * as types from "../constants/actionTypes";

const initialState = {
  isAuthenticated: false,
  userName: "",
  firma: "",
  error: false,
  msg: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER_AUTH_BEGIN:
      return {
        ...initialState
      };
    case types.USER_AUTH_SUCCESS:
      return {
        isAuthenticated: action.isAuthenticated,
        userName: action.userName,
        firma: action.firma
      };
    case types.USER_AUTH_FAIL:
      return {
        ...initialState,
        error: true,
        msg: action.msg
      };
    default:
      return state;
  }
};

export const getisAuthenticated = state => state.isAuthenticated;
export const getUserName = state => state.getUserName;
export const getFirma = state => state.firma;
export const getError = state => state.error;
export const getMsg = state => state.msg;
