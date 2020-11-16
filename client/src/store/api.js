import {
  httpPost,
  httpPut,
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
