import { combineReducers } from "redux";

import { dashboardReducer, clientsReducer } from "./containers/reducers";

export default combineReducers({
  dashboard: dashboardReducer,
  clients: clientsReducer
});
