import { StatusCodes } from 'http-status-codes';

import ErrorsFactory from './errorsFactory';

const { OK, MULTIPLE_CHOICES, TEMPORARY_REDIRECT, UNAUTHORIZED } = StatusCodes;

export const parseAsJson = response => {
  if (response.status === TEMPORARY_REDIRECT) {
    return null;
  }

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  throw ErrorsFactory.FetchingError('Cannot parse response as JSON', response.status);
};

export const handleErrors = ({
  errorMessage,
  parseResponseErrorMessage = false,
}) => response => {
  const responseSuccessful = response.status >= OK && response.status < MULTIPLE_CHOICES;

  if (responseSuccessful || response.status === TEMPORARY_REDIRECT) {
    return response;
  }

  if (response.status === UNAUTHORIZED) {
    throw ErrorsFactory.UnauthorizedError(errorMessage);
  }

  if (parseResponseErrorMessage) {
    return parseAsJson(response)
      .then(responseError => {
        const message = responseError?.message ? responseError.message : errorMessage;
        throw ErrorsFactory.FetchingError(message, response.status);
      });
  }

  throw ErrorsFactory.FetchingError(errorMessage, response.status);
};
