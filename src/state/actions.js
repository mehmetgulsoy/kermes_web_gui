import { push } from "connected-react-router";
import * as types from "./actionTypes";
import * as MSG from "../utils/msg";
import { postData, getData, DelData } from "../utils/fetch_utils";

export const login = (data) => async (dispatch, getState) => {
  dispatch({ type: types.USER_AUTH_BEGIN });
  try {
    const response = await postData("api/rpc/login", data);
    const result = await response.json();

    if (!response.ok) {
      return dispatch({
        type: types.USER_AUTH_FAIL,
        error: true,
        msg: result.message || MSG.FAIL_MSG,
      });
    }

    localStorage.removeItem("jeton");
    localStorage.setItem("jeton", result[0].token);

    return dispatch({
      type: types.USER_AUTH_SUCCESS,
      error: false,
      msg: MSG.SUCCESS_MSG,
      isAuthenticated: true,
      userName: data.uye.split("@", 2)[0],
      firma: data.uye.split("@", 2)[1],
    });
  } catch (error) {
    return {
      error: true,
      message: error,
    };
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
