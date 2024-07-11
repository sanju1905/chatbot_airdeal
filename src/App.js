import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import ChatBot from "react-simple-chatbot";
import CharteredFlightSteps from "./Components/CharteredFlightSteps";
import "./styles/styles.css";
import CheapFlights from "./Components/CheapFlights";
import LoginSteps from "./Components/LoginSteps";
import RegisterSteps from "./Components/RegisterSteps";
import Options from "./Components/Options";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Booking from "./pages/Booking";

const App = () => {
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");

  const registerUser = async ({
    firstname,
    lastname,
    phone,
    email,
    password,
  }) => {
    try {
      const response = await axios.post("http://localhost:5001/register", {
        firstname,
        lastname,
        phone,
        email,
        password,
      });
      setUser(response.data.user);
      console.log("Registration successful", response.data.message);
      return "RegistrationSuccess";
    } catch (error) {
      console.error("Registration failed", error);
      return "RegistrationFailed";
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });
      setUser(response.data.user);
      setLoginMessage(response.data.message);
      console.log("Login successful", response.data.message);
      return "LoginSuccess";
    } catch (error) {
      console.error("Login failed", error);
      return "LoginFailed";
    }
  };



  const RegistrationComponent = ({ steps, triggerNextStep }) => {
    const {
      WaitingForFirstName,
      WaitingForLastName,
      WaitingForPhone,
      WaitingForEmail,
      WaitingForPassword,
    } = steps;

    const handleRegistration = async () => {
      const result = await registerUser({
        firstname: WaitingForFirstName.value,
        lastname: WaitingForLastName.value,
        phone: WaitingForPhone.value,
        email: WaitingForEmail.value,
        password: WaitingForPassword.value,
      });
      triggerNextStep({ trigger: result });
    };

    React.useEffect(() => {
      handleRegistration();
    }, []);

    return <div>Registering user...</div>;
  };

  const LoginComponent = ({ steps, triggerNextStep }) => {
    const { WaitingForEmailForLogin, WaitingForPasswordForLogin } = steps;

    const handleLogin = async () => {
      const result = await loginUser({
        email: WaitingForEmailForLogin.value,
        password: WaitingForPasswordForLogin.value,
      });
      triggerNextStep({ trigger: result });
    };

    React.useEffect(() => {
      handleLogin();
    }, []);

    return (
      <div>
        Logging in...
        {loginMessage && <p>{loginMessage}</p>}
      </div>
    );
  };

  const mainSteps = [
    {
      id: "Greet",
      message: "Hello, welcome!!",
      trigger: "AskService",
    },
    {
      id: "AskService",
      message: "Do you have an account?",
      trigger: "ServiceOptions",
    },
    {
      id: "ServiceOptions",
      options: [
        {
          value: "login",
          label: "Login",
          trigger: "AskEmailForLogin",
        },
        {
          value: "register",
          label: "Register",
          trigger: "AskName",
        },
      ],
    },
  ];

  const steps = [
    ...mainSteps,
    ...CharteredFlightSteps,
    ...CheapFlights,
    ...LoginSteps,
    ...RegisterSteps,
    ...Options,
  ];

  return (
    <Router>
      <Routes>
        <Route path="/proceed" element={<Booking floating={false} />} />{" "}
        {/* Define the desired booking page route */}
      </Routes>
      <Segment float="right">
        <ChatBot
          steps={steps}
          handleEnd={(steps, values) => console.log(steps, values)}
          speechSynthesis={{ enable: true, lang: "en" }}
          recognitionEnable={true}
          headerTitle="MyAirDeal"
          botAvatar="./airdeal.png"
          floating={true} // Use state to manage floating
        />
      </Segment>
    </Router>
  );
};

export default React.memo(App);
