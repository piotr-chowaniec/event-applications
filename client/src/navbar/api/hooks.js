import apiActionFactory from '../../shared/api/apiActionFactory';

import * as api from './api';

export const useLogin = () => apiActionFactory({
  apiAction: api.loginUser,
  successMessage: 'Successfully logged in',
  parseResponseErrorMessage: true,
});
