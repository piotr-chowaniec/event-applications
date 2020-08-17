import { useMutation } from 'react-query';

import { httpPostAndParse } from '../../utils/fetchService';

export const useRegister = () => useMutation(
  async body => await httpPostAndParse({
    route: '/api/register',
    errorMessage: 'Registering new user failed',
    body,
  }),
);
