import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import ChatBot from "react-simple-chatbot";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState(""); // State to store login message

  const ConfirmDetailsComponent = ({ steps }) => {
    console.log("ConfirmDetailsComponent steps:", steps);

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

  const registerUser = async ({ firstname, lastname, phone, email, password }) => {
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
      setLoginMessage(response.data.message); // Set login message to state
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
      message: "{previousValue}!", // Display login message
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
    {
      id: "BookFlight",
      message: "Sure, let's book a flight. Please provide your travel details.",
      trigger: "AskDepartureAirport",
    },
    {
      id: "AskDepartureAirport",
      message: "What is your departure airport?",
      trigger: "departure-airport-input",
    },
    {
      id: "departure-airport-input",
      user: true,
      trigger: "AskDestinationAirport",
    },
    {
      id: "AskDestinationAirport",
      message: "What is your destination airport?",
      trigger: "destination-airport-input",
    },
    {
      id: "destination-airport-input",
      user: true,
      trigger: "AskJourneyType",
    },
    {
      id: "AskJourneyType",
      message: "What type of journey is this?",
      trigger: "journey-type-options",
    },
    {
      id: "journey-type-options",
      options: [
        { value: "one-way", label: "One-way", trigger: "AskDateOfJourney" },
        { value: "round-trip", label: "Round-trip", trigger: "AskDateOfJourney" },
      ],
    },
    {
      id: "AskDateOfJourney",
      message: "When would you like to travel? Please enter the date.",
      trigger: "date-of-journey-input",
    },
    {
      id: "date-of-journey-input",
      user: true,
      trigger: "AskNumberOfPassengers",
    },
    {
      id: "AskNumberOfPassengers",
      message: "How many passengers are traveling?",
      trigger: "number-of-passengers-input",
    },
    {
      id: "number-of-passengers-input",
      user: true,
      trigger: "ConfirmBookingDetails",
    },
    {
      id: "ConfirmBookingDetails",
      component: <ConfirmDetailsComponent />,
      asMessage: true,
      trigger: "ConfirmBooking",
    },
    {
      id: "ConfirmBooking",
      message: "Please confirm your booking details.",
      trigger: "confirm-booking-options",
    },
    {
      id: "confirm-booking-options",
      options: [
        { value: "yes", label: "Yes", trigger: "BookingConfirmed" },
        { value: "no", label: "No", trigger: "AskDepartureAirport" },
      ],
    },
    {
      id: "BookingConfirmed",
      message: "Your flight booking has been confirmed. Thank you!",
      trigger: "AskServiceAfterLogin",
    },
    {
      id: "AskCheapFlightDetails",
      message: "Sure, let's book a cheap flight. Please provide your departure and arrival destinations separated by a comma (e.g., Bengaluru, Chennai).",
      trigger: "cheap-flight-input",
    },
    {
      id: "cheap-flight-input",
      user: true,
      trigger: "SaveCheapFlightDetails",
    },
    {
      id: "SaveCheapFlightDetails",
      message: "Saving your cheap flight details...",
      trigger: "DisplayCheapFlightDetails",
      delay: 1000,
    },
    {
      id: "DisplayCheapFlightDetails",
      message: "Your cheap flight details have been saved successfully.",
      trigger: "confirm-cheap-flight-booking",
    },
    {
      id: "confirm-cheap-flight-booking",
      options: [
        { value: "yes", label: "Yes", trigger: "AskServiceAfterLogin" },
        { value: "no", label: "No", trigger: "AskServiceAfterLogin" },
      ],
    },
    {
      id: "Chartered",
      message: "Let's book a chartered flight. How did you hear about us?",
      trigger: "hear-about-us",
    },
    {
      id: "hear-about-us",
      options: [
        { value: "social_media", label: "Social Media", trigger: "current-flying-solution" },
        { value: "recommendations", label: "Recommendations", trigger: "current-flying-solution" },
        { value: "events", label: "Events", trigger: "current-flying-solution" },
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
        { value: "private_jet", label: "Private Jet Charter", trigger: "departure-airport" },
        { value: "group_charters", label: "Group Charters", trigger: "departure-airport" },
        { value: "concierge_charters", label: "Concierge Charters", trigger: "departure-airport" },
        { value: "air_ambulance", label: "Air Ambulance", trigger: "departure-airport" },
        { value: "aircraft_sales", label: "Aircraft Sales", trigger: "departure-airport" },
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
        { value: "round_trip", label: "Round Trip", trigger: "date-of-journey" },
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
