import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import ChatBot from "react-simple-chatbot";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);

  const registerUser = async ({ name, email, password }) => {
    try {
      const response = await axios.post('http://localhost:5001/register', {
        name,
        email,
        password,
      });
      setUser(response.data.user);
      console.log('Registration successful', response.data);
      return "RegistrationSuccess";
    } catch (error) {
      console.error('Registration failed', error);
      return "RegistrationFailed";
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const response = await axios.post('http://localhost:5001/login', {
        email,
        password,
      });
      setUser(response.data.user);
      console.log('Login successful', response.data);
      return "LoginSuccess";
    } catch (error) {
      console.error('Login failed', error);
      return "LoginFailed";
    }
  };

  const RegistrationComponent = ({ steps, triggerNextStep }) => {
    const { WaitingForName, WaitingForEmail, WaitingForPassword } = steps;
    
    const handleRegistration = async () => {
      const result = await registerUser({
        name: WaitingForName.value,
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

    return <div>Logging in...</div>;
  };

  const steps = [
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
    {
      id: "AskEmailForLogin",
      message: "Enter your Email:",
      trigger: "WaitingForEmailForLogin",
    },
    {
      id: "WaitingForEmailForLogin",
      user: true,
      trigger: "AskPasswordForLogin",
    },
    {
      id: "AskPasswordForLogin",
      message: "Enter your Password:",
      trigger: "WaitingForPasswordForLogin",
    },
    {
      id: "WaitingForPasswordForLogin",
      user: true,
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
    {
      id: "ServiceOptionsAfterLogin",
      options: [
        {
          value: "book",
          label: "Book a flight",
          trigger: "BookFlight",
        },
        {
          value: "baggage",
          label: "Baggage allowance",
          trigger: "BaggageAllowance",
        },
        {
          value: "flights",
          label: "Available flights",
          trigger: "AvailableFlights",
        },
        {
          value: "flightDetails",
          label: "Flight details",
          trigger: "FlightDetails",
        },
        {
          value: "cheap flights",
          label: "Cheap flights",
          trigger: "AskCheapFlightDetails",
        },
      ],
    },
    {
      id: "AskName",
      message: "Enter your Name:",
      trigger: "WaitingForName",
    },
    {
      id: "WaitingForName",
      user: true,
      trigger: "AskEmail",
    },
    {
      id: "AskEmail",
      message: "Enter your Email:",
      trigger: "WaitingForEmail",
    },
    {
      id: "WaitingForEmail",
      user: true,
      trigger: "AskPassword",
    },
    {
      id: "AskPassword",
      message: "Enter your Password:",
      trigger: "WaitingForPassword",
    },
    {
      id: "WaitingForPassword",
      user: true,
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
      message: "User registered successfully!",
      trigger: "AskServiceAfterRegister",
    },
    {
      id: "RegistrationFailed",
      message: "Registration failed. Please try again.",
      trigger: "AskService",
    },
    {
      id: "AskServiceAfterRegister",
      message: "Hi, what do you need help with?",
      trigger: "ServiceOptionsAfterLogin",
    },
    {
      id: "BookFlight",
      message: "Enter your destination:",
      trigger: "WaitingForDestination",
    },
    {
      id: "WaitingForDestination",
      user: true,
      trigger: "ConfirmBooking",
    },
    {
      id: "ConfirmBooking",
      message: "Booking a flight to {previousValue}. Please wait...",
      trigger: "BookingResponse",
    },
    {
      id: "BookingResponse",
      message: "Booking confirmed. Thank you!",
      asMessage: true,
      end: true,
    },
    {
      id: "BaggageAllowance",
      message: "Fetching baggage allowance details. Please wait...",
      trigger: "BaggageResponse",
    },
    {
      id: "BaggageResponse",
      message: "Baggage allowance details fetched.",
      asMessage: true,
      end: true,
    },
    {
      id: "AvailableFlights",
      message: "Fetching available flights. Please wait...",
      trigger: "FlightsResponse",
    },
    {
      id: "FlightsResponse",
      message: "Available flights fetched.",
      asMessage: true,
      end: true,
    },
    {
      id: "FlightDetails",
      message: "Fetching flight details. Please wait...",
      trigger: "FlightDetailsResponse",
    },
    {
      id: "FlightDetailsResponse",
      message: "Flight details fetched.",
      asMessage: true,
      end: true,
    },
    {
      id: "AskCheapFlightDetails",
      message: "Please enter your departure and arrival destinations separated by a comma (e.g., Bengaluru, Chennai):",
      trigger: "WaitingForCheapFlightDetails",
    },
    {
      id: "WaitingForCheapFlightDetails",
      user: true,
      trigger: "SaveCheapFlightDetails",
    },
    {
      id: "SaveCheapFlightDetails",
      message: "Saving your cheap flight details...",
      trigger: "DisplayCheapFlightDetails",
      delay: 500, // Simulating a delay for saving data
    },
    {
      id: "DisplayCheapFlightDetails",
      message: ({ previousValue }) => {
        if (!previousValue) {
          return "Sorry, I didn't catch that. Could you please try again?";
        }
        const [departure, arrival] = previousValue.split(",");
        return `Your cheap flight details are: Departure from ${departure.trim()} to ${arrival.trim()}.`;
      },
      trigger: "ConfirmCheapFlightBooking",
    },
    {
      id: "ConfirmCheapFlightBooking",
      options: [
        { value: "yes", label: "Yes", trigger: "BookingResponse" },
        { value: "no", label: "No", trigger: "AskServiceAfterLogin" },
      ],
    },
  ];

  return (
    <div>
      <Segment floated="right">
        <ChatBot steps={steps} />
      </Segment>
    </div>
  );
};

export default React.memo(App);
