import { combineReducers } from "redux";

import {
  loginReducer,
  appReducer,
  clientsReducer,
  dashboardReducer,
  stationDataReducer,
  idfReducer,
} from "./containers/reducers";

export default combineReducers({
  app: appReducer,
  login: loginReducer,
  clients: clientsReducer,
  dashboard: dashboardReducer,
  stationData: stationDataReducer,
  idf: idfReducer,
});
