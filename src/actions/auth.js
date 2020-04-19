import { push } from "connected-react-router";
import * as types from "../constants/actionTypes";
import * as MSG from "../constants/msg";
import { postData } from "../utils/fetch_utils";

export const login = (data) => (dispatch, getState) => {
  dispatch({ type: types.USER_AUTH_BEGIN });
  return postData("api/rpc/login", data)
    .then((response) => Promise.all([response.ok, response.json()]))
    .then((response) => {
      if (response[0] === true) {
        dispatch({
          type: types.USER_AUTH_SUCCESS,
          error: false,
          msg: MSG.SUCCESS_MSG,
          isAuthenticated: true,
          userName: data.uye.split("@", 2)[0],
          firma: data.uye.split("@", 2)[1],
        });
        dispatch(push("/dashboard"));
        localStorage.removeItem("jeton");
        localStorage.setItem("jeton", response[1][0].token);
      } else {
        dispatch({
          type: types.USER_AUTH_FAIL,
          error: true,
          msg: response[1].message || MSG.FAIL_MSG,
        });
      }
    })
    .catch((error) => {
      console.error("Network operasyonunda hata oluştu:", error);
    });
};

export const logOut = () => (dispatch, getState, { socket }) => {};
