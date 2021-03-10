import apiActionFactory from '../../shared/api/apiActionFactory';

import * as api from './api';

export const useRegister = () => apiActionFactory({
  apiAction: api.registerUser,
  successMessage: 'Successfully registered',
  parseResponseErrorMessage: true,
});
