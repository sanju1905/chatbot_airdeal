const CharteredFlightSteps = [
  {
    id: "Chartered",
    message:
      "Welcome to the Chartered Flights service. Please follow the prompts to provide the necessary information.",
    trigger: "hear-about-us",
  },
  {
    id: "hear-about-us",
    message: "How did you hear about us?",
    trigger: "hear-about-us-input",
  },
  {
    id: "hear-about-us-input",
    user: true,
    trigger: "flying-solution-options",
  },
  {
    id: "flying-solution-options",
    message: "What is your current flying solution?",
    trigger: "flying-solution-options-input",
  },
  {
    id: "flying-solution-options-input",
    user: true,
    trigger: "departure-airport",
  },
  {
    id: "departure-airport",
    message: "Please enter the departure airport:",
    trigger: "departure-airport-input",
  },
  {
    id: "departure-airport-input",
    user: true,
    trigger: "destination-airport",
  },
  {
    id: "destination-airport",
    message: "Please enter the destination airport:",
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
      { value: "one-way", label: "One-Way", trigger: "date-of-journey" },
      { value: "round-trip", label: "Round-Trip", trigger: "date-of-journey" },
    ],
  },
  {
    id: "date-of-journey",
    message: "Please enter the date of your journey:",
    trigger: "date-of-journey-input",
  },
  {
    id: "date-of-journey-input",
    user: true,
    trigger: "number-of-passengers",
  },
  {
    id: "number-of-passengers",
    message: "How many passengers will be traveling?",
    trigger: "number-of-passengers-input",
  },
  {
    id: "number-of-passengers-input",
    user: true,
    trigger: "confirm-details",
  },
  {
    id: "confirm-details",
    message: "Please review and confirm your details:",
    trigger: "confirm-details-component",
  },
  {
    id: "confirm-details-component",
    component: <ConfirmDetailsComponent />,
    asMessage: true,
    trigger: "CharteredFlightResponse",
  },
  {
    id: "CharteredFlightResponse",
    message:
      "Thank you for providing the details. Our team will contact you soon to finalize your chartered flight booking.",
    asMessage: true,
    trigger: "AskServiceAfterLogin",
  },
];

export default CharteredFlightSteps;
