import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';

const renderErrorMessage = (isInvalid, errorMessage) => {
  if (!isInvalid) {
    return null;
  }
  return <div className="invalid-feedback">{errorMessage}</div>;
};

const InputFormik = ({
  label,
  field,
  options,
  form,
}) => {
  const { touched, errors } = form;

  const isValid = Boolean(touched[field.name] && !errors[field.name]);
  const isInvalid = Boolean(touched[field.name] && errors[field.name]);

  return (
    <FormGroup>
      <FormLabel>
        {label}
      </FormLabel>
      <FormControl
        {...field}
        id={field.name}
        as="select"
        custom
        isValid={isValid}
        isInvalid={isInvalid}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </FormControl>
      {renderErrorMessage(isInvalid, errors[field.name])}
    </FormGroup>
  );
};

InputFormik.defaultProps = {
  type: 'text',
};

InputFormik.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    errors: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }),
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputFormik;
