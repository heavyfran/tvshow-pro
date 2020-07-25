import { useState } from 'react';

const CustomInput = ({
  type = 'text',
  name,
  placeholder = '',
  value,
  onChange = () => {},
  onBlur = () => {},
}) => {
  const [error, setError] = useState('');

  const handleBlur = () => {
    const isValid = onBlur && onBlur(value);
    isValid ? setError('') : setError(`Invalid ${name}`);
  };

  return (
    <div className='custom-input'>
      <input
        type={type}
        onChange={onChange}
        onBlur={handleBlur}
        value={value}
        name={name}
        placeholder={placeholder}
      />
      {error && <div className='error'>{error}</div>}
    </div>
  );
};

export default CustomInput;
