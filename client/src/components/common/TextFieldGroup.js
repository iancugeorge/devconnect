import React from 'react'
import classnames from 'classnames';
import propTypes from 'prop-types';

const TextFieldGroup = ({
  id,
  name,
  placeholder,
  value,
  label,
  valid,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        id={id}
        type={type}
        className={classnames("form-control form-control-lg", {
          'is-invalid': error
        }, {
            'is-valid': valid
          })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={valid}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
}

TextFieldGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  info: propTypes.string,
  error: propTypes.string,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  diabled: propTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;