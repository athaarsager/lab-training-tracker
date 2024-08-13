import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './redux/reducers/_root.reducer';
import rootSaga from './redux/sagas/_root.saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware().concat(sagaMiddleware);

    // Conditionally add another middleware in dev
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production') {
      middleware.push(logger);
    }
    return middleware;
  },
});

// tells the saga middleware to use the rootSaga
sagaMiddleware.run(rootSaga);

export default store;
