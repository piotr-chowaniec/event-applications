import {
  httpPost,
  httpPut,
  httpDelete,
  httpGetAndParse,
  httpPostAndParse,
} from '../utils/fetchService';

export const loginUser = (requestParams = {}) => body => httpPostAndParse({
  ...requestParams,
  route: '/api/login',
  body,
});

export const registerUser = (requestParams = {}) => body => httpPost({
  ...requestParams,
  route: '/api/register',
  body,
});

export const fetchUserData = (requestParams = {}) => () => httpGetAndParse({
  ...requestParams,
  route: '/api/user',
});

export const updateProfile = (requestParams = {}) => body => httpPut({
  ...requestParams,
  route: '/api/user',
  body,
});

export const deleteProfile = (requestParams = {}) => () => httpDelete({
  ...requestParams,
  route: '/api/user',
});

export const updatePassword = (requestParams = {}) => body => httpPut({
  ...requestParams,
  route: '/api/user/password',
  body,
});

export const createApplication = (requestParams = {}) => body => httpPost({
  ...requestParams,
  route: '/api/application',
  body,
});

export const fetchUserApplication = (requestParams = {}) => () => httpGetAndParse({
  ...requestParams,
  route: '/api/application',
});

export const fetchApplication = (requestParams = {}) => ({ id }) => httpGetAndParse({
  ...requestParams,
  route: `/api/application/${id}`,
});

export const fetchAllApplications = (requestParams = {}) => () => httpGetAndParse({
  ...requestParams,
  route: '/api/application/all',
});

export const updateApplication = (requestParams = {}) => body => httpPut({
  ...requestParams,
  route: '/api/application',
  body,
});

export const deleteUserApplication = (requestParams = {}) => () => httpDelete({
  ...requestParams,
  route: '/api/application',
});

export const deleteApplication = (requestParams = {}) => ({ id }) => httpDelete({
  ...requestParams,
  route: `/api/application/${id}`,
});
