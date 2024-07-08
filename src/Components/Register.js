// src/components/RegistrationComponent.js

import React from 'react';
import axios from 'axios';

const registerUser = async ({ name, email, password }) => {
  try {
    const response = await axios.post('http://localhost:5001/register', {
      name,
      email,
      password,
    });
    console.log('Registration successful', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration failed', error);
    throw error;
  }
};

const RegistrationComponent = ({ steps, triggerNextStep }) => {
  const { WaitingForName, WaitingForEmail, WaitingForPassword } = steps;

  React.useEffect(() => {
    const handleRegistration = async () => {
      try {
        const result = await registerUser({
          name: WaitingForName.value,
          email: WaitingForEmail.value,
          password: WaitingForPassword.value,
        });
        triggerNextStep({ trigger: "RegistrationSuccess" });
      } catch (error) {
        console.error('Error during registration', error);
        triggerNextStep({ trigger: "RegistrationFailed" });
      }
    };

    handleRegistration();
  }, []);

  return <div>Registering user...</div>;
};

export default RegistrationComponent;
