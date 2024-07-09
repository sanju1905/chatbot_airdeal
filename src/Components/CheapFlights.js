const CheapFlights=[
    // Flight booking steps...
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
]
export default CheapFlights;