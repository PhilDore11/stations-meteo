import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

export default function rootStore() {
  const persistedState = sessionStorage.getItem('reduxState') ? JSON.parse(sessionStorage.getItem('reduxState')) : {};

  const store = createStore(rootReducer, persistedState, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);

  store.subscribe(() => {
    sessionStorage.setItem('reduxState', JSON.stringify(store.getState()));
  });

  return store;
}
