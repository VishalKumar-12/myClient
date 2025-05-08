import React from 'react';

const SelectField = ({ label, name, options, register }) => {
  const containerStyle = {
    marginBottom: '1rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '0.25rem'
  };

  const selectStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
    outline: 'none'
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <select
        {...register(name, { required: true })}
        style={selectStyle}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;