import { httpPut } from '../../services/fetchService';

export const updatePassword = (requestParams = {}) => ({ userId, ...body }) => httpPut({
  ...requestParams,
  route: `/api/user/${userId}/password`,
  body,
});
