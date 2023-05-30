import { middleware as apiMiddleware } from "redux-api-call";
import { createStore, applyMiddleware, compose } from "redux";
import { useDispatch, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "@stagapp/sagas";
import AppReducer from "@stagapp/reducers";
import requestHeaderMiddleware from "@stagapp/store/middlewares/requestHeaderMiddleware";

const sagaMiddleware = createSagaMiddleware();

const reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  /* other middlewares */
];

// Redux store
const createStoreFromInitialState = (initialState) => {
  const store = createStore(
    AppReducer,
    initialState,
    reduxCompose(
      applyMiddleware(
        requestHeaderMiddleware,
        sagaMiddleware,
        apiMiddleware,
        ...middlewares
      )
    )
  );

  // Middleware: Redux Saga
  sagaMiddleware.run(rootSaga);

  return store;
};

export const useAppDispatch = () => {
  return useDispatch();
};

export const useAppState = () => {
  return useSelector((state) => {
    return state;
  });
};

export { createStoreFromInitialState };
