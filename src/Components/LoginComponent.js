import React, { useEffect, useState } from "react";
import axios from "axios";

const LoginComponent = ({ steps, triggerNextStep }) => {
  const { WaitingForEmailForLogin, WaitingForPasswordForLogin } = steps;
  const [loginMessage, setLoginMessage] = useState(""); // State to store login message

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/login", {
        email: WaitingForEmailForLogin.value,
        password: WaitingForPasswordForLogin.value,
      });
      setLoginMessage(response.data.message); // Set login message to state
      console.log("Login successful", response.data.message);

      triggerNextStep({ trigger: "LoginSuccess", value: response.data.message });
    } catch (error) {
      console.error("Login failed", error);
      setLoginMessage("Login failed. Please check your credentials and try again.");
      triggerNextStep({ trigger: "LoginFailed" });
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div>
      Logging in...
      {loginMessage && <p>{loginMessage}</p>} {/* Display login message */}
    </div>
  );
};

export default LoginComponent;
