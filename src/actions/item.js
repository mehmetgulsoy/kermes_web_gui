import * as types from "../constants/actionTypes";
import * as MSG from "../constants/msg";
import { getIsFetching } from "../reducers/responce";
import { getMenuKatagori } from "../reducers/item";

export const fetchTumUrun = () => (dispatch, getState, { axios }) => {
  dispatch({ type: types.FETCH_URUNLER_BEGIN });
  return axios.get("/urun").then(
    respons => {
      dispatch({ type: types.FETCH_URUNLER_SUCCESS, items: respons.data.data });
    },
    error => {
      dispatch({ type: types.FETCH_URUNLER_FAIL });
      console.log("hata: ", error);
    }
  );
};

export const fetchUrun = id => (dispatch, getState, { axios }) => {
  dispatch({ type: types.FETCH_URUNLER_BEGIN });
  return axios.get(`/urun/${id}`).then(
    respons => {
      console.log(respons);

      //dispatch({ type: types.FETCH_URUNLER_SUCCESS, items: respons.data.data });
    },
    error => {
      dispatch({ type: types.FETCH_URUNLER_FAIL });
      console.log("hata: ", error);
    }
  );
};

export const fethKatagori = () => (dispatch, getState, { axios }) => {
  dispatch({ type: types.MENU_KATAGORI_BEGIN });
  return axios.get("/urun_katagori").then(
    respons => {
      let list = [];
      if (respons.data && respons.data.data)
        list = respons.data.data.katagori.split(",");
      dispatch({ type: types.MENU_KATAGORI_SUCCESS, katagori: list });
    },
    error => {
      dispatch({ type: types.MENU_KATAGORI_FAIL });
      console.log("hata: ", error);
    }
  );
};

export const katagori_ekle = katagori => (dispatch, getState, { axios }) => {
  let katagoriler = getMenuKatagori(getState().item);
  katagoriler.push(katagori);
  dispatch({ type: types.MENU_KATAGORI_BEGIN });

  return axios.post("/katagori_ekle", katagoriler).then(
    respons => {
      //dispatch({ type: types.MENU_KATAGORI_SUCCESS, katagori: katagori });
      console.log(respons);
    },
    error => {
      //dispatch({ type: types.MENU_KATAGORI_FAIL});
      console.log("hata: ", error);
    }
  );
};

export const saveMenuItem = data => (dispatch, getState, { axios }) => {
  if (getIsFetching(getState().responce)) {
    return Promise.resolve();
  }
  dispatch({ type: types.NETWORK_REQUEST_BEGIN });
  return axios.post("/urun_ekle", data).then(
    respons => {
      dispatch({ type: types.ITEM_SAVE_SUCCESS, item: data });
      dispatch({
        type: types.NETWORK_REQUEST_END,
        error: false,
        msg: (respons.data && respons.data.msg) || MSG.SUCCESS_MSG
      });
    },
    error => {
      dispatch({
        type: types.NETWORK_REQUEST_END,
        error: true,
        msg: (error.response && error.response.data.msg) || MSG.FAIL_MSG
      });
      console.log("hata: ", error);
    }
  );
};

/*
export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(),filter)) {               
      return Promise.resolve();
  }
  dispatch({
      type: 'FETCH_TODOS_REQUEST',
      filter
  });
  return api.fetchTodos(filter).then(
      respons => { 
          dispatch({
              type: types.ITEM_SAVE,
              filter,
              respons,
          });
      },
      error => {
          dispatch({
              type: 'FETCH_TODOS_FAILURE',
              filter,
              message: error.message || 'Someting went wrong'
          })
      }
  ); 
}; 
*/
