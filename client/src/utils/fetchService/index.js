import config from '../../config';

import fetchServiceCreator, { postHeaders } from './fetchServiceCreator';
import { handleErrors, parseAsJson } from './requestHelpers';
import { storeToken, extractToken } from './tokenUtils';

const replacer = (key, value) =>
  typeof value === 'undefined' ? null : value;

export const httpFetch = method => async ({
  route,
  errorMessage,
  parseResponseErrorMessage,
  body,
}) => (
  fetchServiceCreator(
    route,
    {
      method,
      headers: {
        ...method.toUpperCase() === 'GET' ? {} : postHeaders,
        authorization: extractToken({ key: config.AUTH.ACCESS_TOKEN_KEY }),
      },
      ...(body ? { body: JSON.stringify(body, replacer) } : {}),
    },
  )
    .then(handleErrors({ errorMessage, parseResponseErrorMessage }))
    .then(storeToken({ key: config.AUTH.ACCESS_TOKEN_KEY }))
);

export const httpGet = httpFetch('GET');
export const httpPost = httpFetch('POST');
export const httpPut = httpFetch('PUT');
export const httpDelete = httpFetch('DELETE');

export const httpGetAndParse = params => httpGet(params).then(parseAsJson);
export const httpPostAndParse = params => httpPost(params).then(parseAsJson);
export const httpPutAndParse = params => httpPut(params).then(parseAsJson);
export const httpDeleteAndParse = params => httpDelete(params).then(parseAsJson);
