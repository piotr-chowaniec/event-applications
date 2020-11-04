import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { httpPostAndParse } from '../../utils/fetchService';
import { addSuccessNotification, addErrorNotification } from '../../store/notifications/actions';

export const useLogin = () => {
  const dispatch = useDispatch();
  const request = async body => await httpPostAndParse({
    route: '/api/login',
    errorMessage: 'Login failed',
    parseResponseErrorMessage: true,
    body,
  });

  const options = {
    onSuccess: () => dispatch(addSuccessNotification('Successfully logged in')),
    onError: error => dispatch(addErrorNotification(error.message)),
    throwOnError: true,
  };

  return useMutation(request, options);
};
