import { FORBIDDEN, UNAUTHORIZED, TEMPORARY_REDIRECT } from 'http-status-codes';

const redirectToAuthorize = response => {
  const currentURL = window.location.href;
  const origin = window.location.origin;
  const apiURL = `/api/authenticate?redirect=${currentURL}&origin=${origin}`;

  return window.location.replace(apiURL) || response;
};

const redirectToAccessDenied = response => {
  const currentURL = window.location.href;
  const accessDeniedPageUrl = `${window.location.origin}/access-denied`;

  if (currentURL !== accessDeniedPageUrl) {
    return window.location.replace(accessDeniedPageUrl);
  }

  return response;
};

const redirectToTargetUrl = async response => {
  const { redirectUrl } = await response.json();

  if (typeof redirectUrl !== 'string') {
    console.error('Cannot perform redirect: redirectUrl not provided in response object.'); // eslint-disable-line no-console
    return;
  }

  if (!redirectUrl.startsWith('/')) {
    console.error('Cannot perform redirect: redirectUrl must be a relative url.'); // eslint-disable-line no-console
    return;
  }

  const currentURL = window.location.href;
  const targetUrl = `${window.location.origin}${redirectUrl}`;

  if (currentURL !== targetUrl) {
    return window.location.replace(targetUrl);
  }

  return response;
};

const fetchServiceCreator = async (url, config = {}) => {
  const params = {
    ...config,
    credentials: 'same-origin',
  };

  try {
    const response = await fetch(`${url}`, params);

    switch (response.status) {
      case UNAUTHORIZED:
        return redirectToAuthorize(response);
      case FORBIDDEN:
        return redirectToAccessDenied(response);
      case TEMPORARY_REDIRECT:
        return redirectToTargetUrl(response);
      default:
        return response;
    }
  } catch (error) {
    if (error instanceof DOMException) {
      // Fallback case for Unauthorized responses using IE.
      // https://github.com/github/fetch/issues/409
      return redirectToAuthorize();
    }

    throw error;
  }
};

export default fetchServiceCreator;

export const postHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
