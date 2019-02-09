import { fork, all } from 'redux-saga/effects';

import { loginSaga, clientsSaga, appSaga } from './containers/sagas';

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(clientsSaga), fork(appSaga)]);
}
