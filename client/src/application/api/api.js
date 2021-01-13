import { httpGetAndParse, httpPost, httpPut, httpDelete } from '../../services/fetchService';

export const fetchUserApplication = (requestParams = {}) => () => httpGetAndParse({
  ...requestParams,
  route: '/api/application',
});

export const fetchAllApplications = (requestParams = {}) => () => httpGetAndParse({
  ...requestParams,
  route: '/api/application/all',
});

export const createApplication = (requestParams = {}) => body => httpPost({
  ...requestParams,
  route: '/api/application',
  body,
});

export const fetchApplication = (requestParams = {}) => ({ applicationId }) => httpGetAndParse({
  ...requestParams,
  route: `/api/application/${applicationId}`,
});

export const updateApplication = (requestParams = {}) => ({ applicationId, ...body }) => httpPut({
  ...requestParams,
  route: `/api/application/${applicationId}`,
  body,
});

export const deleteApplication = (requestParams = {}) => ({ applicationId }) => httpDelete({
  ...requestParams,
  route: `/api/application/${applicationId}`,
});
