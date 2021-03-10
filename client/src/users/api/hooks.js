import apiActionFactory from '../../shared/api/apiActionFactory';

import * as api from './api';

export const useFetchAllUsers = () => apiActionFactory({
  apiAction: api.fetchAllUsers,
  errorMessage: 'Fetching users failed',
});

export const useFetchUserData = () => apiActionFactory({
  apiAction: api.fetchUserData,
  errorMessage: 'Fetching user data failed',
});
