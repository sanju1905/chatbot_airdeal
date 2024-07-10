import React from "react";
import LoginComponent from "./LoginComponent";
import PasswordInput from "./PasswordInput";
const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const LoginSteps = [
  {
    id: "AskEmailForLogin",
    message: "Enter your Email:",
    trigger: "WaitingForEmailForLogin",
  },
  {
    id: "WaitingForEmailForLogin",
    user: true,
    validator: (value) => {
      if (!isValidEmail(value)) {
        return "Invalid email format. Please enter a valid email.";
      }
      return true;
    },
    trigger: "AskPasswordForLogin",
  },
  {
    id: "AskPasswordForLogin",
    message: "Enter your Password:",
    trigger: "WaitingForPasswordForLogin",
  },
  {
    id: "WaitingForPasswordForLogin",  
    component: <PasswordInput />,
    waitAction:true,
    trigger: "LoginUser",
  },
  {
    id: "LoginUser",
    component: <LoginComponent />,
    waitAction: true,
    trigger: "LoginSuccess",
  },
  {
    id: "LoginSuccess",
    message: "Login successful!",
    trigger: "AskServiceAfterLogin",
  },
  {
    id: "LoginFailed",
    message: "Login failed. Please check your credentials and try again.",
    trigger: "AskService",
  },
  {
    id: "AskServiceAfterLogin",
    message: "Hi, what do you need help with?",
    trigger: "ServiceOptionsAfterLogin",
  },
];

export default LoginSteps;
