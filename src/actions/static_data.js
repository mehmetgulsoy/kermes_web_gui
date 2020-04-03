import { getData } from "../utils/fetch_utils";
import * as types from "../constants/actionTypes";

export const masaGetir = () => async (dispatch, getState) => {
  dispatch({ type: types.FETCH_MASA_BEGIN });
  const response = await getData("api/masa");

  if (!response.ok) {
    dispatch({ type: types.FETCH_MASA_FAIL });
    throw new Error("Network operasyonu başarisiz. " + response.statusText);
  }

  const result = await response.json();

  dispatch({
    type: types.FETCH_MASA_SUCCESS,
    masa: result
  });
};

export const masaEkle = data => async (dispatch, getState) => {
  dispatch({ type: types.INS_MASA_BEGIN });
};
