import apiActionFactory from '../../shared/api/apiActionFactory';

import * as api from './api';

export const useUpdatePassword = () => apiActionFactory({
  apiAction: api.updatePassword,
  successMessage: 'Password updated',
  errorMessage: 'Updating password failed',
});
