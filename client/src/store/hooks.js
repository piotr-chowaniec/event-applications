import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { extractToken } from '../utils/fetchService/tokenUtils';
import { setUserData } from '../store/user/actions';

import apiActionFactory from './apiActionFactory';
import * as api from './api';

export const useRegister = () => apiActionFactory({
  apiAction: api.registerUser,
  successMessage: 'Successfully registered',
  parseResponseErrorMessage: true,
});

export const useLogin = () => apiActionFactory({
  apiAction: api.loginUser,
  successMessage: 'Successfully logged in',
  parseResponseErrorMessage: true,
});

export const useFetchUserData = () => apiActionFactory({
  apiAction: api.fetchUserData,
  errorMessage: 'Fetching user data failed',
});

export const useUpdateProfile = () => apiActionFactory({
  apiAction: api.updateProfile,
  successMessage: 'Profile updated',
  errorMessage: 'Updating profile data failed',
  parseResponseErrorMessage: true,
});

export const FetchUserData = async () => {
  const dispatch = useDispatch();
  const { call: fetchUserData } = useFetchUserData();

  const getUserData = useCallback(async () => {
    const token = extractToken();
    if (token) {
      const userData = await fetchUserData();
      dispatch(setUserData(userData));
    }
  }, [dispatch, fetchUserData]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);
};
