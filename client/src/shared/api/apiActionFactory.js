import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { addSuccessNotification, addErrorNotification } from '../../store/notifications/actions';

const ApiActionFactory = ({
  apiAction,
  errorMessage,
  successMessage,
  parseResponseErrorMessage,
}) => {
  const dispatch = useDispatch();

  const requestMethod = async body => await apiAction({
    errorMessage,
    parseResponseErrorMessage,
  })(body);

  const options = {
    onSuccess: () => successMessage && dispatch(addSuccessNotification(successMessage)),
    onError: error => dispatch(addErrorNotification(
      parseResponseErrorMessage ? error?.message : errorMessage,
    )),
  };

  const [call, status] = useMutation(requestMethod, options);

  const { isLoading } = status;

  return {
    call,
    isLoading,
    status,
  };
};

export default ApiActionFactory;

