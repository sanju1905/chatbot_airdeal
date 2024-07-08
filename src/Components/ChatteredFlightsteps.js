const CharteredFlightSteps = [
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
    message:
      "Please confirm your details: \nHow did you hear about us: {previousValue}",
    trigger: "hear-about-us-summary",
  },
  {
    id: "hear-about-us-summary",
    user: true,
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
      { value: "no", label: "No", trigger: "start-over" },
    ],
  },
  {
    id: "final-message",
    message:
      "Thank you! One of our Charter Specialists will connect with you shortly.",
    end: true,
  },
];

export default CharteredFlightSteps;
