import { fork, all } from 'redux-saga/effects';

import dashboardSaga from 'containers/Dashboard/saga';
import clientsSaga from 'containers/Clients/saga';

export default function* rootSaga() {
  yield all([
    fork(dashboardSaga),
    fork(clientsSaga),
  ]);
}