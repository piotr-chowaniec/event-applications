import { httpPost } from '../../services/fetchService';

export const registerUser = (requestParams = {}) => body => httpPost({
  ...requestParams,
  route: '/api/register',
  body,
});
