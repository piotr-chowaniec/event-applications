import {
  ADD_SUCCESS_NOTIFICATION,
  ADD_ERROR_NOTIFICATION,
  REMOVE_SUCCESS_NOTIFICATION,
  REMOVE_ERROR_NOTIFICATION,
} from './types';

const initialState = {
  success: null,
  successTimer: null,
  error: null,
  errorTimer: null,
};

const notificationReducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ADD_SUCCESS_NOTIFICATION:
      return {
        ...state,
        success: action.payload.message,
        successTimer: action.payload.timer,
        error: null,
        errorTimer: null,
      };
    case ADD_ERROR_NOTIFICATION:
      return {
        ...state,
        error: action.payload.message,
        errorTimer: action.payload.timer,
        success: null,
        successTimer: null,
      };
    case REMOVE_SUCCESS_NOTIFICATION:
      return {
        ...state,
        success: null,
        successTimer: null,
      };
    case REMOVE_ERROR_NOTIFICATION:
      return {
        ...state,
        error: null,
        errorTimer: null,
      };
    default:
      return state;
  }
};

export default notificationReducer;
