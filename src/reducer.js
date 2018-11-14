import { combineReducers } from 'redux';

import dashboardReducer from 'containers/Dashboard/reducer.js';

export default combineReducers({
  dashboard: dashboardReducer
});