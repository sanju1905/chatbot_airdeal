import ConfirmCheaps from "./ConfirmCheaps";
import ProceedWithBooking from "./ProceedWithBooking";
import Date from "./Date";
const CheapFlights = [
  {
    id: "AskCheapFlightDetails",
    message: "Sure, let's book a cheap flight.",
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
    message: "When would you like to travel?",
    trigger: "date-of-journey-input",
  },
  {
    id: "date-of-journey-input",
    component: <Date />,
    waitAction: true,
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
    component: <ConfirmCheaps />,
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
      { value: "yes", label: "Yes", trigger: "ProceedWithBooking" },
      { value: "no", label: "No", trigger: "AskDepartureAirport" },
    ],
  },
  {
    id: "ProceedWithBooking",
    component: <ProceedWithBooking />,
    waitAction: true,
    trigger: "BookingConfirmed",
  },
  {
    id: "BookingConfirmed",
    message: "Thank you for Booking! Our team will connect with you shortly.",
    end: true,
  },
];

export default CheapFlights;

