import { combineReducers } from "redux";

import { loginReducer, clientsReducer, dashboardReducer } from "./containers/reducers";

export default combineReducers({
  login: loginReducer,
  clients: clientsReducer,
  dashboard: dashboardReducer,
});
