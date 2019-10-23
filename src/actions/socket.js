import * as types from "../constants/actionTypes";

export const connect = () => (dispatch, getState,{ axios, socket }) => {  
  socket.on('connect_info', (data) => {
    if (data && data.type){
      dispatch(data)
    }
    console.log(socket,data);    
  });     
  
}

export const disconnect = () => (dispatch, getState,{ axios, socket }) => {  
  socket.on('disconnect', () => {
    console.log('disconnected');     
  });
}

const uye_kayit_Begin = ()       => ({ type: types.NETWORK_REQUEST_BEGIN});
const uye_kayit_end   = (res)   => ({ type: types.NETWORK_REQUEST_END, error: res.error, msg : res.msg });

export const uye_kayit = (data) => (dispatch, getState,{ axios, socket }) => {  
  dispatch(uye_kayit_Begin());
  socket.emit('uye_kayit',data, (res) => {
    console.log(res);         
    dispatch(uye_kayit_end(res)); 
  });  
}