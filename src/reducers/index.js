import { combineReducers } from 'redux'; 
import { connectRouter } from 'connected-react-router';
import item_save from "./item";
import auth_reducers from "./auth";
import responce_reducers from "./responce";

const rootReducer = history => combineReducers({
  router: connectRouter(history),  
  item : item_save,
  auth: auth_reducers,
  responce: responce_reducers,
});

export default rootReducer;