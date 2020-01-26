import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import io from "socket.io-client";
import axios from "axios";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import { apiUrl } from "./constants/URLs";

// eslint-disable-next-line
const checkNetworkConnection = store => next => action => {
  if (action.networkAction) {
    axios
      .get("http://ipv4.icanhazip.com/", { timeout: 5000 })
      .then(() => next(action))
      .catch(() => alert("Lütfen Ağ Bağlantınızı Kontrol Ediniz!"));
  } else {
    next(action);
  }
};

export const history = createBrowserHistory();
//export const socket = io(apiUrl);
export const socket = {};

axios.defaults.withCredentials = true;
axios.defaults.baseURL = apiUrl;

function configureStore(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...
    //checkNetworkConnection,
    thunk.withExtraArgument({ axios, socket }),
    reactRouterMiddleware
  ];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== "production") {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  }

  return createStore(
    createRootReducer(history), // root reducer with router state
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}

export default configureStore;

//https://github.com/coryhouse/react-slingshot starter kit ile yapıldı.
