import { combineReducers } from 'redux'; 
import { connectRouter } from 'connected-react-router';
import item_save from "./item";
import socket_reducers from "./socket";
import responce_reducers from "./responce";

const rootReducer = history => combineReducers({
  router: connectRouter(history),  
  item : item_save,
  socket: socket_reducers,
  responce: responce_reducers,
});

export default rootReducer;