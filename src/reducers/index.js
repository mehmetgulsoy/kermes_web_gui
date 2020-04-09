import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import item_save from "./item";
import auth_reducers from "./auth";
import responce_reducers from "./responce";
import masa_reducers from "./masa";
import bolge_reducers from "./bolge";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    item: item_save,
    auth: auth_reducers,
    responce: responce_reducers,
    static_data: combineReducers({
      masa: masa_reducers,
      bolge: bolge_reducers,
    }),
  });

export default rootReducer;
