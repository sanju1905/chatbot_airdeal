import React, { useState, useEffect } from 'react';

const PasswordInput = ({ triggerNextStep, steps }) => {
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      triggerNextStep({ value: password });
    }
  }, [isSubmitted, password, triggerNextStep]);

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setIsSubmitted(true);
    }
  };

  return (
    <input
      type="password"
      value={password}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      placeholder="Enter your password"
      disabled={isSubmitted}
    />
  );
};

export default PasswordInput;
