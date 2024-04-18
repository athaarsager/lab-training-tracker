import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootReducer from "./reducers/_root.reducer";
import rootSaga from "./reducers/sagas/_rooot.saga";

const sagaMiddleware = createSagaMiddleware();

// this line creates an array of all of redux middleware
// ensures logger is only added to project in development mode

const middlewareList = process.env.NODE_ENV === "development" ?
    [sagaMiddleware, logger] : [sagaMiddleware];

const store = createStore(
    // tells the saga middleware to use the rootReducer to create the store

    rootReducer,

    // add all middleware to project including saga and logger
    applyMiddleware(...middlewareList),
);

// tells the saga middleware to use the rootSaga

sagaMiddleware.run(rootSaga);

export default store;