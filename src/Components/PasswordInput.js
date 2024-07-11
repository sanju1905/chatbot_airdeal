import React, { useState, useEffect } from 'react';

const PasswordInput = ({ triggerNextStep }) => {
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted && password.trim() !== '') {
      triggerNextStep({ value: password });
    }
  }, [isSubmitted, password, triggerNextStep]);

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if inside a form element
      setIsSubmitted(true);
    }
  };

  const handleSubmit = () => {
    if (password.trim() !== '') {
      setIsSubmitted(true);
    }
  };

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter your password"
        disabled={isSubmitted}
      />
      <button type="button" onClick={handleSubmit} disabled={isSubmitted}>
        Submit
      </button>
    </div>
  );
};

export default PasswordInput;
