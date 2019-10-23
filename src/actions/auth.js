import { getIsFetching } from "../reducers/responce";
import * as types from "../constants/actionTypes";
import * as URL from "../constants/URLs";

export const login = (data) => (dispatch, getState,{ axios, socket }) => {
  if (getIsFetching(getState().responce)) {               
      return Promise.resolve();
  }
  dispatch({
      type: types.NETWORK_REQUEST_BEGIN,       
  });
  return axios.post(`${URL.apiUrl}/login`, data,{headers:{"Access-Control-Allow-Origin":  "*"}}).then(
      respons => { 
        console.log(respons);        
        dispatch({
          type: types.NETWORK_REQUEST_END,
          error: respons.error || false,
          msg :  respons.msg || ''      
        });  
        dispatch({
          type: types.USER_AUTH_SUCCESS,
          isAuthenticated: !respons.error,
          userName: respons.data.uye,        
        });       
      },
      error => {
          dispatch({
            type: types.NETWORK_REQUEST_END,
            error: error.error || true,
            msg :  error.msg || 'Hata oluştu'
          });
          dispatch({
            type: types.USER_AUTH_FAILURE,
            isAuthenticated: false,
            userName: '',        
          });   
      }
  ); 
}; 


export const logOut = () => (dispatch, getState,{ axios, socket }) => {
  if (getIsFetching(getState().responce)) {               
      return Promise.resolve();
  }
  dispatch({
      type: types.NETWORK_REQUEST_BEGIN,       
  });
  return axios.get(`${URL.apiUrl}/logout`,{headers: {"Access-Control-Allow-Origin":  "*"}}).then(
      respons => { 
        dispatch({
          type: types.NETWORK_REQUEST_END,
          error: respons.error || false,
          msg :  respons.msg || ''      
        });  
        dispatch({
          type: types.USER_AUTH_SUCCESS,
          isAuthenticated: true,
          userName: respons.userName,        
        });       
      },
      error => {
          dispatch({
            type: types.NETWORK_REQUEST_END,
            error: error.error || true,
            msg :  error.msg || 'Hata oluştu'
          });
          dispatch({
            type: types.USER_AUTH_FAILURE,
            isAuthenticated: false,
            userName: '',        
          });   
      }
  ); 
}; 