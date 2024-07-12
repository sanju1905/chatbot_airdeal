const ConfirmDetailsComponent = ({ steps }) => {
  // console.log("ConfirmDetailsComponent steps:", steps);

  const hearAboutUs = steps["hear-about-us-options"]?.value || "N/A";
  const flyingSolution = steps["flying-solution-options"]?.value || "N/A";
  const departureAirport = steps["departure-airport-inputs"]?.value || "N/A";
  const destinationAirport =
    steps["destination-airport-inputs"]?.value || "N/A";
  const journeyType = steps["journey-type-option"]?.value || "N/A";
  const dateOfJourney = steps["date-of-journey-inputs"]?.value || "N/A";
  const numberOfPassengers =
    steps["number-of-passengers-inputs"]?.value || "N/A";
  const StartDate = steps["start-journey-inputs"]?.value || "N/A";
  const EndDate = steps["end-journey-inputs"]?.value || "N/A";
  const details = [
    { label: "Current flying solution", value: flyingSolution },
    { label: "Departure airport", value: departureAirport },
    { label: "Destination airport", value: destinationAirport },
    { label: "Journey type", value: journeyType },
    { label: "Date of journey", value: dateOfJourney },
    { label: "Start Date of journey", value: StartDate },
    { label: "End Date of journey", value: EndDate },
    { label: "Number of passengers", value: numberOfPassengers },
    { label: "How did you hear about us", value: hearAboutUs },
  ];

  return (
    <div>
      {details
        .filter((item) => item.value !== "N/A")
        .map((item, index) => (
          <p key={index}>{`${item.label}:${item.value}`}</p>
        ))}
    </div>
  );
};
export default ConfirmDetailsComponent;
