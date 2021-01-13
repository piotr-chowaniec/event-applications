import apiActionFactory from './apiActionFactory';
import * as api from './api';

export const useFetchProfileData = () => apiActionFactory({
  apiAction: api.fetchProfileData,
  errorMessage: 'Fetching user data failed',
});

export const useUpdateUser = () => apiActionFactory({
  apiAction: api.updateUser,
  successMessage: 'User updated',
  errorMessage: 'Updating user data failed',
  parseResponseErrorMessage: true,
});

export const useDeleteUser = () => apiActionFactory({
  apiAction: api.deleteUser,
  successMessage: 'User removed',
  errorMessage: 'Removing user failed',
});
