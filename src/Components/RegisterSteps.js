import React from "react";
import RegistrationComponent from "./RegistrationComponent";

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const RegisterSteps = [
  {
    id: "AskName",
    message: "Please enter your First Name:",
    trigger: "WaitingForFirstName",
  },
  {
    id: "WaitingForFirstName",
    user: true,
    trigger: "AskLastName",
  },
  {
    id: "AskLastName",
    message: "Please enter your Last Name:",
    trigger: "WaitingForLastName",
  },
  {
    id: "WaitingForLastName",
    user: true,
    trigger: "AskPhone",
  },
  {
    id: "AskPhone",
    message: "Please enter your Phone Number:",
    trigger: "WaitingForPhone",
  },
  {
    id: "WaitingForPhone",
    user: true,
    validator: (value) => {
      if (!/^\d+$/.test(value)) {
        return "Invalid phone number. Please enter digits only.";
      }
      return true;
    },
    trigger: "AskEmail",
  },
  {
    id: "AskEmail",
    message: "Please enter your Email:",
    trigger: "WaitingForEmail",
  },
  {
    id: "WaitingForEmail",
    user: true,
    validator: (value) => {
      if (!isValidEmail(value)) {
        return "Please enter a valid email address.";
      }
      return true;
    },
    trigger: "AskPassword",
  },
  {
    id: "AskPassword",
    message: "Please enter your Password:",
    trigger: "WaitingForPassword",
  },
  {
    id: "WaitingForPassword",
    user: true,
    inputType: "password",
    trigger: "RegisterUser",
  },
  {
    id: "RegisterUser",
    component: <RegistrationComponent />,
    waitAction: true,
    trigger: "RegistrationSuccess",
  },
  {
    id: "RegistrationSuccess",
    message: "Registration successful! You can now log in.",
    trigger: "AskService",
  },
  {
    id: "RegistrationFailed",
    message: "Registration failed. Please try again with different credentials.",
    trigger: "AskService",
  },
];

export default RegisterSteps;
 