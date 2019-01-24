import { combineReducers } from "redux";

import { clientsReducer, dashboardReducer, stationsReducer } from "./containers/reducers";

export default combineReducers({
  clients: clientsReducer,
  dashboard: dashboardReducer,
  stations: stationsReducer,
});
