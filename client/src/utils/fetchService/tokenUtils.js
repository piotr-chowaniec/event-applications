import config from '../../config';

const extractToken = (
  {
    headers,
    key = config.AUTH.ACCESS_TOKEN_KEY,
    storage = window.localStorage,
  } = {},
) => {
  if (headers && headers.has(key)) {
    return headers.get(key);
  }

  if (key in storage) {
    return storage.getItem(key);
  }

  return null;
};

const storeToken = (
  {
    key = config.AUTH.ACCESS_TOKEN_KEY,
    storage = window.localStorage,
  } = {},
) => response => {
  const renewedToken = extractToken({ key, storage, headers: response?.headers });

  storage.setItem(key, renewedToken);

  return response;
};

const resetToken = (
  {
    key = config.AUTH.ACCESS_TOKEN_KEY,
    storage = window.localStorage,
  } = {},
) => storage.removeItem(key);

export {
  resetToken,
  storeToken,
  extractToken,
};
