import React from "react";
import { Segment } from "semantic-ui-react";
import ChatBot from "react-simple-chatbot";
import CharteredFlightSteps from "./Components/CharteredFlightSteps";
import "./styles/styles.css";
import Bookflight from "./Components/Bookflight";
import CheapFlights from "./Components/CheapFlights";
import LoginSteps from "./Components/LoginSteps";
import RegisterSteps from "./Components/RegisterSteps";
import Options from "./Components/Options";

const App = () => {
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
    ...Bookflight,
    ...LoginSteps,
    ...RegisterSteps,
    ...Options,
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
