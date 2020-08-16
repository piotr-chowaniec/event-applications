import { OK, MULTIPLE_CHOICES, TEMPORARY_REDIRECT, UNAUTHORIZED } from 'http-status-codes';

import ErrorsFactory from './errorsFactory';

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

export const handleErrors = ({ errorMessage }) => response => {
  const responseSuccessful = response.status >= OK && response.status < MULTIPLE_CHOICES;

  if (responseSuccessful || response.status === TEMPORARY_REDIRECT) {
    return response;
  }

  if (response.status === UNAUTHORIZED) {
    throw ErrorsFactory.UnauthorizedError(errorMessage);
  }

  throw ErrorsFactory.FetchingError(errorMessage, response.status);
};
