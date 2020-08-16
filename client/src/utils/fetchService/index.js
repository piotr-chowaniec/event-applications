import fetchServiceCreator, { postHeaders } from './fetchServiceCreator';
import { handleErrors, parseAsJson } from './requestHelpers';

const replacer = (key, value) =>
  typeof value === 'undefined' ? null : value;

export const httpFetch = method => async ({
  route,
  errorMessage,
  body,
}) => (
  fetchServiceCreator(
    route,
    {
      method,
      headers: method.toUpperCase() === 'GET' ? {} : postHeaders,
      ...(body ? { body: JSON.stringify(body, replacer) } : {}),
    },
  )
    .then(handleErrors({ errorMessage }))
);

export const httpGet = httpFetch('GET');
export const httpPost = httpFetch('POST');
export const httpPut = httpFetch('PUT');
export const httpDelete = httpFetch('DELETE');

export const httpGetAndParse = params => httpGet(params).then(parseAsJson);
export const httpPostAndParse = params => httpPost(params).then(parseAsJson);
export const httpPutAndParse = params => httpPut(params).then(parseAsJson);
export const httpDeleteAndParse = params => httpDelete(params).then(parseAsJson);
