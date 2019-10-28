import * as types from '../constants/actionTypes';
import { getIsFetching } from "../reducers/responce";


export const fethKatagori = () => (dispatch, getState, {axios}) => {
  dispatch({ type: types.MENU_KATAGORI_BEGIN});
  axios.get('/urun_katagori').then(
    respons => {       
      dispatch({ type: types.MENU_KATAGORI_SUCCESS, katagori: respons.data.data.katagori.split(',')});
    },
    error =>{
      dispatch({ type: types.MENU_KATAGORI_FAIL}); 
      console.log('hata: ',error);       
    }
  );
}
 
export const saveMenuItem = (data) => (dispatch, getState, {axios}) => {
  if (getIsFetching(getState().responce)) {
    return Promise.resolve();
  }
  dispatch({ type: types.ITEM_SAVE_BEGIN});
  axios.post('/urun_ekle', data).then(
    respons => { 
      console.log(respons);       
      dispatch({ type: types.ITEM_SAVE_SUCCESS});
    },
    error =>{
      dispatch({ type: types.ITEM_SAVE_FAILURE}); 
      console.log('hata: ',error);       
    }
  );
}


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