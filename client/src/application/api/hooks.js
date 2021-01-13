import apiActionFactory from '../../shared/api/apiActionFactory';

import * as api from './api';

export const useFetchUserApplication = () => apiActionFactory({
  apiAction: api.fetchUserApplication,
  errorMessage: 'Fetching current application failed',
});

export const useFetchAllApplications = () => apiActionFactory({
  apiAction: api.fetchAllApplications,
  errorMessage: 'Fetching applications failed',
});

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

export const useUpdateApplication = () => apiActionFactory({
  apiAction: api.updateApplication,
  successMessage: 'Event Application successfully updated',
  errorMessage: 'Updating application failed',
});

export const useDeleteApplication = () => apiActionFactory({
  apiAction: api.deleteApplication,
  successMessage: 'Event Application removed',
  errorMessage: 'Removing Event Application failed',
});
