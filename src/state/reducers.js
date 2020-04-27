import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import * as types from "./actionTypes";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    ui,
    entities: combineReducers({
      masa,
      bolge,
      urun,
    }),
  });
export default rootReducer;

const auth_init = {
  isAuthenticated: false,
  userName: "",
  firma: "",
};

function auth(state = auth_init, action) {
  switch (action.type) {
    case types.USER_AUTH_FAIL:
    case types.USER_AUTH_BEGIN:
      return {
        ...auth_init,
      };
    case types.USER_AUTH_SUCCESS:
      return {
        isAuthenticated: action.isAuthenticated,
        userName: action.userName,
        firma: action.firma,
      };
    default:
      return state;
  }
}

const ui_init = {
  is_loading: false,
  error: false,
  msg: "",
};

function ui(state = ui_init, action) {
  switch (action.type) {
    case types.FETCH_BEGIN:
      return {
        ...state,
        is_loading: true,
      };
    case types.FETCH_END:
      return {
        ...state,
        is_loading: false,
      };
    case types.DISPLAY_MSG:
      return {
        ...state,
        error: action.error,
        msg: action.msg,
      };
    case types.CLEAR_MSG:
      return {
        ...state,
        error: false,
        msg: "",
      };
    default:
      return state;
  }
}

const bolge_init = {
  bolge: [],
  son_trh: "",
};

function bolge(state = bolge_init, action) {
  switch (action.type) {
    case types.FETCH_BOLGE_SUCCESS:
      return {
        bolge: action.bolge,
      };
    case types.INS_BOLGE_SUCCESS:
      return {
        bolge: [...state.bolge, action.bolge],
      };
    case types.DEL_BOLGE_SUCCESS:
      return {
        bolge: state.bolge.filter((blg) => blg.bolge !== action.bolge),
      };
    default:
      return state;
  }
}

const masa_initialState = {
  masa: [],
  son_trh: "",
};

function masa(state = masa_initialState, action) {
  switch (action.type) {
    case types.FETCH_MASA_SUCCESS:
      return {
        masa: action.masa,
        son_trh: action.masa.map((masa) => masa.gnc_trh).sort()[0],
      };
    case types.FETCH_MASA_BEGIN:
    case types.FETCH_MASA_FAIL:
    default:
      return state;
  }
}

const urun_initialState = {
  urun: [],
  son_trh: "",
};

function urun(state = urun_initialState, action) {
  switch (action.type) {
    case types.FETCH_URUN_SUCCESS:
      return {
        urun: action.urun,
        son_trh: action.urun.map((urun) => urun.gnc_trh).sort()[0],
      };
    default:
      return state;
  }
}
