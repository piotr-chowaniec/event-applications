import { combineReducers } from 'redux';

import userReducer from './user/reducer';
import notificationsReducer from './notifications/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
