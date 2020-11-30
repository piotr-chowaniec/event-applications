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

export const useDeleteProfile = () => apiActionFactory({
  apiAction: api.deleteProfile,
  successMessage: 'Profile removed',
  errorMessage: 'Removing profile failed',
});

export const useUpdatePassword = () => apiActionFactory({
  apiAction: api.updatePassword,
  successMessage: 'Password updated',
  errorMessage: 'Updating password failed',
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

export const useCreateApplication = () => apiActionFactory({
  apiAction: api.createApplication,
  successMessage: 'Event Application successfully created',
  errorMessage: 'Submitting application failed',
  parseResponseErrorMessage: true,
});

export const useFetchApplication = () => apiActionFactory({
  apiAction: api.fetchApplication,
  errorMessage: 'Fetching current application failed',
});

export const useDeleteApplication = () => apiActionFactory({
  apiAction: api.deleteApplication,
  successMessage: 'Event Application removed',
  errorMessage: 'Removing Event Application failed',
});


