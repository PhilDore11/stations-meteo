import { combineReducers } from "redux";

import { 
  loginReducer,
  appReducer,
  clientsReducer,
  dashboardReducer,
} from "./containers/reducers";

export default combineReducers({
  app: appReducer,
  login: loginReducer,
  clients: clientsReducer,
  dashboard: dashboardReducer,
});
