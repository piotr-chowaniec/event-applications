import { httpGetAndParse } from '../../services/fetchService';

export const fetchAllUsers = (requestParams = {}) => () => httpGetAndParse({
  ...requestParams,
  route: '/api/user/all',
});

export const fetchUserData = (requestParams = {}) => ({ userId }) => httpGetAndParse({
  ...requestParams,
  route: `/api/user/${userId}`,
});
