// src/components/LoginComponent.js

import React from 'react';
import axios from 'axios';

const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post('http://localhost:5001/login', {
      email,
      password,
    });
    console.log('Login successful', response.data);
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

const LoginComponent = ({ steps, triggerNextStep }) => {
  const { WaitingForEmailForLogin, WaitingForPasswordForLogin } = steps;

  React.useEffect(() => {
    const handleLogin = async () => {
      try {
        const result = await loginUser({
          email: WaitingForEmailForLogin.value,
          password: WaitingForPasswordForLogin.value,
        });
        triggerNextStep({ trigger: "LoginSuccess" });
      } catch (error) {
        console.error('Error during login', error);
        triggerNextStep({ trigger: "LoginFailed" });
      }
    };

    handleLogin();
  }, []);

  return <div>Logging in...</div>;
};

export default LoginComponent;
