import { combineReducers } from 'redux';

import notificationsReducer from './notifications/reducer';

const rootReducer = combineReducers({
  notifications: notificationsReducer,
});

export default rootReducer;
