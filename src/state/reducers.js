import { connectRouter } from "connected-react-router";
import { combineReducers } from "@reduxjs/toolkit";
import { auth_slice } from "./auth_slice";
import { ui_slice } from "./ui_slice";
import { masa_slice } from "./masa_slice";
import { bolge_slice } from "./bolge_slice";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: auth_slice.reducer,
    ui: ui_slice.reducer,
    entities: combineReducers({
      masa: masa_slice.reducer,
      bolge: bolge_slice.reducer,
    }),
  });
export default rootReducer;
