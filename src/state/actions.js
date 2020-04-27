import { push } from "connected-react-router";
import * as types from "./actionTypes";
import * as MSG from "../utils/msg";
import { postData, getData, DelData } from "../utils/fetch_utils";

const fetch_begin = () => ({ type: types.FETCH_BEGIN });
const fetch_end = () => ({ type: types.FETCH_END });
const clear_msg = () => ({ type: types.CLEAR_MSG });
const display_msg = (msg, error) => ({ type: types.DISPLAY_MSG, msg, error });

export const login = (data) => async (dispatch, getState) => {
  dispatch(fetch_begin());
  dispatch(clear_msg());
  try {
    const response = await postData("api/rpc/login", data);
    const result = await response.json();
    dispatch(fetch_end());

    if (!response.ok) {
      dispatch({ type: types.USER_AUTH_FAIL });
      dispatch(display_msg(result.message, true));
    } else {
      localStorage.removeItem("jeton");
      localStorage.setItem("jeton", result[0].token);
      dispatch({
        type: types.USER_AUTH_SUCCESS,
        isAuthenticated: true,
        userName: data.uye.split("@", 2)[0],
        firma: data.uye.split("@", 2)[1],
      });
      dispatch(push("/dashboard"));
    }
  } catch (error) {
    dispatch(fetch_end());
    dispatch(display_msg(error.message, true));
  }
};

export const bolgeEkle = (data) => async (dispatch, getState) => {
  dispatch({ type: types.INS_BOLGE_BEGIN });
  const firma = getState().auth.firma;
  const veri = { firma, ...data };

  const response = await postData("api/bolge", veri);

  if (!response.ok) {
    dispatch({ type: types.INS_BOLGE_FAIL });
    throw new Error("Network operasyonu başarisiz. " + response.statusText);
  }

  dispatch({
    type: types.INS_BOLGE_SUCCESS,
    bolge: veri,
  });
};

export const bolgeGetir = (data) => async (dispatch, getState) => {
  dispatch({ type: types.FETCH_BOLGE_BEGIN });
  const response = await getData("api/bolge");

  if (!response.ok) {
    dispatch({ type: types.FETCH_BOLGE_FAIL });
    throw new Error("Network operasyonu başarisiz. " + response.statusText);
  }

  const result = await response.json();

  dispatch({
    type: types.FETCH_BOLGE_SUCCESS,
    bolge: result,
  });
};

export const bolgeGuncelle = (data) => async (dispatch, getState) => {
  dispatch({ type: types.INS_BOLGE_BEGIN });
};

export const bolgeSil = (data) => async (dispatch, getState) => {
  dispatch({ type: types.DEL_BOLGE_BEGIN });
  const firma = getState().auth.firma;
  const response = await DelData(
    `api/bolge?firma=eq.${firma}&bolge=eq.${data}`
  );
  if (!response.ok) {
    dispatch({ type: types.DEL_BOLGE_FAIL });
    throw new Error("Network operasyonu başarisiz. " + response.statusText);
  }

  dispatch({
    type: types.DEL_BOLGE_SUCCESS,
    bolge: data,
  });
};

export const masaEkle = (data) => async (dispatch, getState) => {
  dispatch({ type: types.INS_MASA_BEGIN });
};

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
    masa: result,
  });
};

export const masaSil = (data) => async (dispatch, getState) => {
  dispatch({ type: types.INS_MASA_BEGIN });
};

export const masaGuncelle = (data) => async (dispatch, getState) => {
  dispatch({ type: types.INS_MASA_BEGIN });
};

export const urun_ekle = (data) => async (dispatch, getState) => {
  dispatch({ type: types.INS_URUN_BEGIN });
};

export const urun_getir = () => async (dispatch, getState) => {
  dispatch({ type: types.FETCH_URUN_BEGIN });
  const response = await getData(
    "api/urun?select=no,urun,aciklama,katagori,fiyat,miktar,gnc_trh"
  );

  if (!response.ok) {
    dispatch({ type: types.FETCH_URUN_FAIL });
    throw new Error("Network operasyonu başarisiz. " + response.statusText);
  }

  const result = await response.json();

  dispatch({
    type: types.FETCH_URUN_SUCCESS,
    urun: result,
  });
};

export const urunSil = (data) => async (dispatch, getState) => {
  dispatch({ type: types.INS_URUN_BEGIN });
};

export const urunGuncelle = (data) => async (dispatch, getState) => {
  dispatch({ type: types.INS_URUN_BEGIN });
};
