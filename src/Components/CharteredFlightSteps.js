import React from "react";
import ConfirmDetailsComponent from "./ConfirmDetailsComponent";
import Date from "./Date";

const CharteredFlightSteps = [
  {
    id: "Chartered",
    message: "Let's book a chartered flight.",
    trigger: "current-flying-solution",
  },
  {
    id: "current-flying-solution",
    message: "What is your current flying solution?",
    trigger: "flying-solution-options",
  },
  {
    id: "flying-solution-options",
    options: [
      { value: "private_jet", label: "Private Jet Charter", trigger: "departure-airports" },
      { value: "group_charters", label: "Group Charters", trigger: "departure-airports" },
      { value: "concierge_charters", label: "Concierge Charters", trigger: "departure-airports" },
      { value: "air_ambulance", label: "Air Ambulance", trigger: "departure-airports" },
      { value: "aircraft_sales", label: "Aircraft Sales", trigger: "departure-airports" },
    ],
  },
  {
    id: "departure-airports",
    message: "Please enter the departure airport.",
    trigger: "departure-airport-inputs",
  },
  {
    id: "departure-airport-inputs",
    user: true,
    trigger: "destination-airports",
  },
  {
    id: "destination-airports",
    message: "Please enter the destination airport.",
    trigger: "destination-airport-inputs",
  },
  {
    id: "destination-airport-inputs",
    user: true,
    trigger: "journey-types",
  },
  {
    id: "journey-types",
    message: "Is this a one-way or round trip?",
    trigger: "journey-type-option",
  },
  {
    id: "journey-type-option",
    options: [
      { value: "one_way", label: "One Way", trigger: "date-of-journeys" },
      { value: "round_trip", label: "Round Trip", trigger: "date-of-journeys" },
    ],
  },
  {
    id: "date-of-journeys",
    message: "Please select the date of the journey in format(DD/MM/YYY).",
    trigger: "date-of-journey-inputs",
  },
  {
    id: "date-of-journey-inputs",
    waitAction: true,
    component: <Date/>, // Add inputType property here
    trigger: "number-of-passenger",
  },
  {
    id: "number-of-passenger",
    message: "Please enter the number of passengers.",
    trigger: "number-of-passengers-inputs",
  },
  {
    id: "number-of-passengers-inputs",
    user: true,
    trigger: "hear-about-us",
  },
  {
    id: "hear-about-us",
    message: "How did you hear about us?",
    trigger: "hear-about-us-options",
  },
  {
    id: "hear-about-us-options",
    options: [
      { value: "social_media", label: "Social Media", trigger: "summary" },
      { value: "recommendations", label: "Recommendations", trigger: "summary" },
      { value: "events", label: "Events", trigger: "summary" },
      { value: "quora", label: "Quora", trigger: "summary" },
    ],
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
    message: "Thank you! One of our Charter Specialists will connect with you shortly.",
    end:true,
    // trigger: "ServiceOptionsAfterLogin",
  },
];

export default CharteredFlightSteps;
