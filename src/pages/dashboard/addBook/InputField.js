import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeholder }) => {
  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '0.25rem'
  };

  const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #e2e8f0',
    width: '100%',
    borderRadius: '0.375rem',
    outline: 'none'
  };

  const containerStyle = {
    marginBottom: '1rem'
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        {...register(name, { required: true })}
        style={inputStyle}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;