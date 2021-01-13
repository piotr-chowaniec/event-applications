import { httpPut, httpDelete, httpGetAndParse } from '../../services/fetchService';

export const fetchProfileData = (requestParams = {}) => () => httpGetAndParse({
  ...requestParams,
  route: '/api/user',
});

export const updateUser = (requestParams = {}) => ({ userId, ...body }) => httpPut({
  ...requestParams,
  route: `/api/user/${userId}`,
  body,
});

export const deleteUser = (requestParams = {}) => ({ userId }) => httpDelete({
  ...requestParams,
  route: `/api/user/${userId}`,
});
