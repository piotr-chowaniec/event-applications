import PropTypes from 'prop-types';

export const userPropTypes = PropTypes.shape({
  id: PropTypes.number,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  role: PropTypes.string,
});
