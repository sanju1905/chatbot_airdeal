import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import ChatBot from "react-simple-chatbot";
import axios from "axios";



const App = () => {
  const [user, setUser] = useState(null);



  //confirm the details
  const ConfirmDetailsComponent = ({ steps }) => {
    console.log("ConfirmDetailsComponent steps:", steps); // Add logging
  
    const hearAboutUs = steps["hear-about-us"]?.value || "N/A";
    const flyingSolution = steps["flying-solution-options"]?.value || "N/A";
    const departureAirport = steps["departure-airport-input"]?.value || "N/A";
    const destinationAirport = steps["destination-airport-input"]?.value || "N/A";
    const journeyType = steps["journey-type-options"]?.value || "N/A";
    const dateOfJourney = steps["date-of-journey-input"]?.value || "N/A";
    const numberOfPassengers = steps["number-of-passengers-input"]?.value || "N/A";
  
    const details = [
      `How did you hear about us: ${hearAboutUs}`,
      `Current flying solution: ${flyingSolution}`,
      `Departure airport: ${departureAirport}`,
      `Destination airport: ${destinationAirport}`,
      `Journey type: ${journeyType}`,
      `Date of journey: ${dateOfJourney}`,
      `Number of passengers: ${numberOfPassengers}`,
    ];
  
    return (
      <div>
        {details.map((detail, index) => (
          <p key={index}>{detail}</p>
        ))}
      </div>
    );
  };
  

  const registerUser = async ({ name, email, password }) => {
    try {
      const response = await axios.post("http://localhost:5001/register", {
        name,
        email,
        password,
      });
      setUser(response.data.user);
      console.log("Registration successful", response.data);
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
      console.log("Login successful", response.data);
      return "LoginSuccess";
    } catch (error) {
      console.error("Login failed", error);
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

  const StartOverComponent = ({ triggerNextStep }) => {
    const handleStartOver = () => {
      triggerNextStep({ value: true, trigger: "Greet" });
    };

    return <button onClick={handleStartOver}>Start Over</button>;
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
    // Service options start

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
    // Service options end

    // Options after login
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
    // Login end

    // Services start
    {
      id: "ServiceOptionsAfterLogin",
      options: [
        {
          value: "book",
          label: "Book a flight",
          trigger: "BookFlight",
        },
        {
          value: "chartered",
          label: "Book a Chartered Flight",
          trigger: "Chartered",
        },
        {
          value: "cheap flights",
          label: "Book your Cheap Flight",
          trigger: "AskCheapFlightDetails",
        },
      ],
    },
    // Services end

    // Register data start
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
    // Register data end
    {
      id: "AskServiceAfterRegister",
      message: "Hi, what do you need help with?",
      trigger: "ServiceOptionsAfterLogin",
    },

    // Booking flight start
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
      trigger: "ServiceOptionsAfterLogin",
    },

    // Booking flight end

    // Cheap flight start
    {
      id: "AskCheapFlightDetails",
      message:
        "Please enter your departure and arrival destinations separated by a comma (e.g., Bengaluru, Chennai):",
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

    // Cheap flight end

    // Chartered Flights Data start
    {
      id: "Chartered",
      message: "How did you hear about us?",
      trigger: "hear-about-us",
    },
    {
      id: "hear-about-us",
      options: [
        {
          value: "social_media",
          label: "Social Media",
          trigger: "current-flying-solution",
        },
        {
          value: "recommendations",
          label: "Recommendations",
          trigger: "current-flying-solution",
        },
        {
          value: "events",
          label: "Events",
          trigger: "current-flying-solution",
        },
        { value: "quora", label: "Quora", trigger: "current-flying-solution" },
      ],
    },
    {
      id: "current-flying-solution",
      message: "What is your current flying solution?",
      trigger: "flying-solution-options",
    },
    {
      id: "flying-solution-options",
      options: [
        {
          value: "private_jet",
          label: "Private Jet Charter",
          trigger: "departure-airport",
        },
        {
          value: "group_charters",
          label: "Group Charters",
          trigger: "departure-airport",
        },
        {
          value: "concierge_charters",
          label: "Concierge Charters",
          trigger: "departure-airport",
        },
        {
          value: "air_ambulance",
          label: "Air Ambulance",
          trigger: "departure-airport",
        },
        {
          value: "aircraft_sales",
          label: "Aircraft Sales",
          trigger: "departure-airport",
        },
      ],
    },
    {
      id: "departure-airport",
      message: "Please enter the departure airport.",
      trigger: "departure-airport-input",
    },
    {
      id: "departure-airport-input",
      user: true,
      trigger: "destination-airport",
    },
    {
      id: "destination-airport",
      message: "Please enter the destination airport.",
      trigger: "destination-airport-input",
    },
    {
      id: "destination-airport-input",
      user: true,
      trigger: "journey-type",
    },
    {
      id: "journey-type",
      message: "Is this a one-way or round trip?",
      trigger: "journey-type-options",
    },
    {
      id: "journey-type-options",
      options: [
        { value: "one_way", label: "One Way", trigger: "date-of-journey" },
        {
          value: "round_trip",
          label: "Round Trip",
          trigger: "date-of-journey",
        },
      ],
    },
    {
      id: "date-of-journey",
      message: "Please enter the date of the journey.",
      trigger: "date-of-journey-input",
    },
    {
      id: "date-of-journey-input",
      user: true,
      trigger: "number-of-passengers",
    },
    {
      id: "number-of-passengers",
      message: "Please enter the number of passengers.",
      trigger: "number-of-passengers-input",
    },
    {
      id: "number-of-passengers-input",
      user: true,
      trigger: "summary",
    },
    {
      id: "summary",
      message: "Please confirm your details.",
      trigger: "confirm-details",
    },
    {
      id: "confirm-details",
      component: <ConfirmDetailsComponent />,
      asMessage: true,
      trigger: "confirm",
    },
    {
      id: "confirm",
      message: "Is everything correct?",
      trigger: "confirm-options",
    },
    {
      id: "confirm-options",
      options: [
        { value: "yes", label: "Yes", trigger: "final-message" },
        { value: "no", label: "No", trigger: "Chartered" },
      ],
    },
    {
      id: "final-message",
      message:
        "Thank you! One of our Charter Specialists will connect with you shortly.",
      trigger: "ServiceOptionsAfterLogin",
    },
    // Chartered flight data end
  ];

  return (
    <div>
      <Segment float="right">
        <ChatBot
          steps={steps}
          handleEnd={(steps, values) => console.log(steps, values)}
          headerTitle="MyAirDeal"
        />
      </Segment>
    </div>
  );
};

export default React.memo(App);
