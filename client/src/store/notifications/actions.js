import {
  ADD_SUCCESS_NOTIFICATION,
  ADD_ERROR_NOTIFICATION,
  REMOVE_SUCCESS_NOTIFICATION,
  REMOVE_ERROR_NOTIFICATION,
} from './types';

const delay = (dispatch, action, milliseconds = 5000) =>
  setTimeout(() => {
    dispatch(action());
  }, milliseconds);

export const addSuccessNotification = message => dispatch => {
  const timer = delay(dispatch, removeSuccessNotification);
  dispatch({ type: ADD_SUCCESS_NOTIFICATION, payload: { message, timer } });
};

export const removeSuccessNotification = () => (dispatch, getState) => {
  const timer = getState().notifications.successTimer;
  if (timer) {
    clearTimeout(timer);
  }
  dispatch({ type: REMOVE_SUCCESS_NOTIFICATION });
};

export const addErrorNotification = message => dispatch => {
  const timer = delay(dispatch, removeErrorNotification);
  dispatch({ type: ADD_ERROR_NOTIFICATION, payload: { message, timer } });
};

export const removeErrorNotification = () => (dispatch, getState) => {
  const timer = getState().notifications.errorTimer;
  if (timer) {
    clearTimeout(timer);
  }
  dispatch({ type: REMOVE_ERROR_NOTIFICATION });
};
