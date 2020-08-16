import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, FormControl } from 'react-bootstrap';

import FaIcon from '../faIcon/faIcon.component';

const renderErrorMessage = (isInvalid, errorMessage) => {
  if (!isInvalid) {
    return null;
  }
  return <div className="invalid-feedback">{errorMessage}</div>;
};

const InputGroupFormik = ({
  field,
  form,
  type,
  placeholder,
  icon,
}) => {
  const { touched, errors } = form;
  const { prefix, iconName, size } = icon;

  const isValid = Boolean(touched[field.name] && !errors[field.name]);
  const isInvalid = Boolean(touched[field.name] && errors[field.name]);

  return (
    <InputGroup className="mb-3">
      { iconName && (
        <InputGroup.Prepend>
          <InputGroup.Text>
            <FaIcon
              icon={iconName}
              prefix={prefix}
              size={size}
            />
          </InputGroup.Text>
        </InputGroup.Prepend>
      )}
      <FormControl
        {...field}
        id={field.name}
        type={type}
        placeholder={placeholder}
        isValid={isValid}
        isInvalid={isInvalid}
      />
      {renderErrorMessage(isInvalid, errors[field.name])}
    </InputGroup>
  );
};

InputGroupFormik.defaultProps = {
  type: 'text',
  icon: {
    prefix: 'fa',
    iconName: null,
    size: 20,
  },
};

InputGroupFormik.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
  }),
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.shape({
    prefix: PropTypes.string,
    iconName: PropTypes.string,
    size: PropTypes.number,
  }),
};

export default InputGroupFormik;
