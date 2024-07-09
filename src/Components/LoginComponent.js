import React from 'react';
import axios from 'axios';
import { useState } from 'react';
const LoginComponent = ({ steps, triggerNextStep }) => {
    const [user, setUser] = useState(null);

    const { WaitingForEmailForLogin, WaitingForPasswordForLogin } = steps;
  
    const [loginMessage, setLoginMessage] = useState(""); // State to store login message
  
    const handleLogin = async () => {
      try {
        const response = await axios.post("http://localhost:5001/login", {
          email: WaitingForEmailForLogin.value,
          password: WaitingForPasswordForLogin.value,
        });
        setUser(response.data.user);
        setLoginMessage(response.data.message); // Set login message to state
        console.log("Login successful", response.data.message);
  
        triggerNextStep({ trigger: "LoginSuccess", value: response.data.message });
      } catch (error) {
        console.error("Login failed", error);
        triggerNextStep({ trigger: "LoginFailed" });
      }
    };
  
    React.useEffect(() => {
      handleLogin();
    }, []);
  
    return (
      <div>
        Logging in...
        {/* {loginMessage} Display login message */}
      </div>
    );
  };

  export default LoginComponent;