import { combineReducers } from 'redux';

import dashboardReducer from 'containers/Dashboard/reducer.js';
import clientsReducer from 'containers/Clients/reducer.js';

export default combineReducers({
  dashboard: dashboardReducer,
  clients: clientsReducer,
});