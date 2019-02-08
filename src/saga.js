import { fork, all } from 'redux-saga/effects';

import { loginSaga, clientsSaga, dashboardSaga, reportsSaga } from './containers/sagas';

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(clientsSaga), fork(dashboardSaga), fork(reportsSaga)]);
}
