import React from 'react';

const Input = ({name, label, value, onChange, error}) => {
  return (
    <div className='mb-3'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        autoFocus
        name={name}
        type='text'
        className='form-control'
        id={name}
      />
      {error && (
        <div className='text-danger text-sm-start'>{error}</div>
      )}
    </div>
  );
};

export default Input;
