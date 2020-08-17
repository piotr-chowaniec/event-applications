import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { httpPostAndParse } from '../../utils/fetchService';
import { addSuccessNotification, addErrorNotification } from '../../store/notifications/actions';

export const useRegister = () => {
  const dispatch = useDispatch();
  const request = async body => await httpPostAndParse({
    route: '/api/register',
    errorMessage: 'Registering new user failed',
    body,
  });

  const options = {
    onSuccess: () => dispatch(addSuccessNotification('Successfully registered')),
    onError: () => dispatch(addErrorNotification('There was an error when registering')),
    throwOnError: true,
  };

  return useMutation(request, options);
};
