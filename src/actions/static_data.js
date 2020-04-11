import { getData, postData, DelData } from "../utils/fetch_utils";
import * as types from "../constants/actionTypes";

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
