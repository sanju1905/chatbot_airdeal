const Options=[
    {
        id: "ServiceOptionsAfterLogin",
        options: [
          {
            value: "book",
            label: "Book a flight",
            trigger: "BookingConfirmed",
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
  
]
export default Options;