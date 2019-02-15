import { combineReducers } from 'redux';

import {
  loginReducer,
  appReducer,
  clientsReducer,
  dashboardReducer,
  reportsReducer,
  stationDataReducer,
  idfReducer,
} from './containers/reducers';

export default combineReducers({
  app: appReducer,
  login: loginReducer,
  clients: clientsReducer,
  dashboard: dashboardReducer,
  reports: reportsReducer,
  stationData: stationDataReducer,
  idf: idfReducer,
});
