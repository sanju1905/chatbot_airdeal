import React, { useState, useEffect } from "react";
import axios from "axios";

const RegistrationComponent = ({ steps, triggerNextStep }) => {
  const {
    WaitingForFirstName,
    WaitingForLastName,
    WaitingForPhone,
    WaitingForEmail,
    WaitingForPassword,
  } = steps;

  const handleRegistration = async () => {
    try {
      const result = await registerUser({
        firstname: WaitingForFirstName.value,
        lastname: WaitingForLastName.value,
        phone: WaitingForPhone.value,
        email: WaitingForEmail.value,
        password: WaitingForPassword.value,
      });
      triggerNextStep({ trigger: result });
    } catch (error) {
      console.error("Error during registration:", error);
      triggerNextStep({ trigger: "RegistrationFailed" });
    }
  };

  useEffect(() => {
    handleRegistration();
  }, []);

  return <div>Registering user...</div>;
};

const registerUser = async ({ firstname, lastname, phone, email, password }) => {
  try {
    const response = await axios.post("http://localhost:5001/register", {
      firstname,
      lastname,
      phone,
      email,
      password,
    });
    console.log("Registration successful", response.data.message);
    return "RegistrationSuccess";
  } catch (error) {
    console.error("Registration failed", error);
    throw error; // Re-throw error to handle in calling component
  }
};

export default RegistrationComponent;
