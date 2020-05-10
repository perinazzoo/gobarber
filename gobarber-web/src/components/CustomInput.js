import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

export default function CustomInput({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <>
      <input
        onChange={clearError}
        ref={inputRef}
        className={error && 'input-error'}
        defaultValue={defaultValue}
        {...rest}
      />
      <div className={error && 'label-error'}>
        {error ? `${label} *` : label}
      </div>
      {error && <span>{error}</span>}
    </>
  );
}

CustomInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
