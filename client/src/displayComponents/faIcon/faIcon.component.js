import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const FaIcon = ({ className, prefix, icon, size, ...rest }) => (
  <FontAwesomeIcon
    className={`${className} icon-size-${size}`}
    icon={[prefix, icon]}
    {...rest}
  />
);

FaIcon.defaultProps = {
  className: '',
  prefix: 'fa',
  size: 20,
};

FaIcon.propTypes = {
  className: PropTypes.string,
  prefix: PropTypes.string,
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default FaIcon;
