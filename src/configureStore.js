import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
//import io from "socket.io-client";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./state/reducers";
//import { apiUrl } from "./constants/URLs";

export const history = createBrowserHistory();
//export const socket = io(apiUrl);
export const socket = {};

export default function configureStore(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...
    //checkNetworkConnection,
    thunk.withExtraArgument({ socket }),
    reactRouterMiddleware,
  ];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== "production") {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  }

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./state/reducers", () =>
      store.replaceReducer(createRootReducer(history))
    );
  }
  return store;
}

//https://github.com/coryhouse/react-slingshot starter kit ile yapıldı.
