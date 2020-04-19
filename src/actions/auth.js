import { push } from "connected-react-router";
import * as types from "../constants/actionTypes";
import * as MSG from "../constants/msg";
import { postData } from "../utils/fetch_utils";

export const login = (data) => async (dispatch, getState) => {
  dispatch({ type: types.USER_AUTH_BEGIN });
  try {
    const response  = await postData("api/rpc/login", data)  
    const result    = await response.json();

    if (!response.ok) {
      return dispatch({
        type: types.USER_AUTH_FAIL,
        error: true,
        msg: result.message || response.statusText || MSG.FAIL_MSG,
      });  
    }

    dispatch(push("/dashboard"));
    localStorage.removeItem("jeton");
    localStorage.setItem("jeton", result[1][0].token);

    return dispatch({
      type: types.USER_AUTH_SUCCESS,
      error: false,
      msg: MSG.SUCCESS_MSG,
      isAuthenticated: true,
      userName: result.uye.split("@", 2)[0],
      firma: result.uye.split("@", 2)[1],
    });    
  } catch (error) {
    return { 
      error: true,
      msg : error
    }    
  }
};

export const logOut = () => (dispatch, getState, { socket }) => {};
