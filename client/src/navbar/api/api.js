import { httpPostAndParse } from '../../services/fetchService';

export const loginUser = (requestParams = {}) => body => httpPostAndParse({
  ...requestParams,
  route: '/api/login',
  body,
});
