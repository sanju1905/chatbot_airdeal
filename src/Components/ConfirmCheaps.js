import React from "react";
import sendMail from "./Mail";

const ConfirmCheaps = ({ steps }) => {
  const Departure = steps["departure-airport-input"]?.value || "Not Given";
  const Destination = steps["destination-airport-input"]?.value || "Not Given";
  const JourneyType = steps["journey-type-options"]?.value || "Not Given";
  const JourneyDate = steps["date-of-journey-input"]?.value || "Not Given";
  const StartDate = steps["start-date-of-journey-input"]?.value || "Not Given";
  const EndDate = steps["end-date-of-journey-input"]?.value || "Not Given";
  const NoPassengers = steps["number-of-passengers-input"]?.value || "Not Given";

  const booking = [
    { label: "Departure", value: Departure },
    { label: "Destination", value: Destination },
    { label: "JourneyType", value: JourneyType },
    { label: "Start Date", value: StartDate },
    { label: "End Date", value: EndDate },
    { label: "Date of Journey", value: JourneyDate },
    { label: "Number of Passengers", value: NoPassengers },
  ];

    // Send email
    sendMail(booking);

  return (
    booking
      .filter(item => item.value !== "Not Given")
      .map((item, index) => (
        <p key={index}>{`${item.label}: ${item.value}`}</p>
      ))
  );
}

export default ConfirmCheaps;
