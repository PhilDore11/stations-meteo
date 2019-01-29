import { combineReducers } from "redux";

import { clientsReducer, dashboardReducer } from "./containers/reducers";

export default combineReducers({
  clients: clientsReducer,
  dashboard: dashboardReducer,
});
