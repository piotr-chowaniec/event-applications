
import {
  SET_CURRENT_USER,
} from './types';

export const setUserData = (payload = {}) => dispatch =>
  dispatch({ type: SET_CURRENT_USER, payload });
