import React from 'react';

const Select = ({name, label, options, error, ...rest}) => {
  return (
    <div className='mb-3'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <select {...rest} name={name} id={name} className='form-select'>
        <option />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>

      {error && <div className='text-danger text-sm-start'>{error}</div>}
    </div>
  );
};

export default Select;
