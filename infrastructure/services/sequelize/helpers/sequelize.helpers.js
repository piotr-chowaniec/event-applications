const get = require('lodash.get');

const isValidationError = error => {
  const errorNo = get(error, 'parent.errno', null);
  if (errorNo === 1062) {
    return true;
  }

  return false;
};

module.exports = {
  isValidationError,
};
