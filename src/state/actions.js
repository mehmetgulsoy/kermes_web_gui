import { push } from "connected-react-router";
import * as types from "./actionTypes";
import { postData, getData, DelData } from "../utils/fetch_utils";
import { auth_slice } from "./auth_slice";
import { ui_slice } from "./ui_slice";
import { masa_slice } from "./masa_slice";
import { bolge_slice as blg } from "./bolge_slice";

export const login = (data) => async (dispatch, getState) => {
  dispatch(ui_slice.actions.clear_msg());
  dispatch(ui_slice.actions.loading_begin());
  try {
    const response = await postData("api/rpc/login", data);
    const result = await response.json();
    dispatch(ui_slice.actions.loading_end());

    if (!response.ok) {
      dispatch(ui_slice.actions.display_msg(true, result.message));
    } else {
      localStorage.removeItem("jeton");
      localStorage.setItem("jeton", result[0].token);
      const [userName, firma] = data.uye.split("@", 2);
      dispatch(auth_slice.actions.login(userName, firma));
      dispatch(push("/dashboard"));
    }
  } catch (error) {
    dispatch(ui_slice.actions.loading_end());
    dispatch(ui_slice.actions.display_msg(true, error.message));
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
  const response = await getData("api/bolge");
  if (!response.ok) {
    dispatch({ type: types.FETCH_BOLGE_FAIL });
    throw new Error("Network operasyonu başarisiz. " + response.statusText);
  }
  const result = await response.json();
  dispatch(blg.actions.fetch(result));
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
  const response = await getData("api/masa");
  if (!response.ok) {
    dispatch({ type: types.FETCH_MASA_FAIL });
    throw new Error("Network operasyonu başarisiz. " + response.statusText);
  }
  const result = await response.json();
  dispatch(masa_slice.actions.fetch(result));
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
