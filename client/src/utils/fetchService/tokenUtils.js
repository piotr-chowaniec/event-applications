const extractToken = ({
  key,
  headers,
  storage = window.localStorage,
}) => {
  if (headers && headers.has(key)) {
    return headers.get(key);
  }

  if (key in storage) {
    return storage.getItem(key);
  }

  return null;
};

const storeToken = ({ key, storage = window.localStorage }) => response => {
  const renewedToken = extractToken({ key, storage, headers: response.headers });

  storage.setItem(key, renewedToken);

  return response;
};

export {
  storeToken,
  extractToken,
};
