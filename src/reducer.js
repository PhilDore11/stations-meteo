import { combineReducers } from 'redux';

import {
  loginReducer,
  appReducer,
  clientsReducer,
  dashboardReducer,
  stationDataReducer,
  idfReducer,
  coefficientsReducer,
} from './containers/reducers';

export default combineReducers({
  app: appReducer,
  login: loginReducer,
  clients: clientsReducer,
  dashboard: dashboardReducer,
  stationData: stationDataReducer,
  idf: idfReducer,
  coefficients: coefficientsReducer,
});
