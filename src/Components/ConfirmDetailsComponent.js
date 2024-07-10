const ConfirmDetailsComponent = ({ steps }) => {
  // console.log("ConfirmDetailsComponent steps:", steps);

  const hearAboutUs = steps["hear-about-us-options"]?.value || "N/A";
  const flyingSolution = steps["flying-solution-options"]?.value || "N/A";
  const departureAirport = steps["departure-airport-inputs"]?.value || "N/A";
  const destinationAirport = steps["destination-airport-inputs"]?.value || "N/A";
  const journeyType = steps["journey-type-option"]?.value || "N/A";
  const dateOfJourney = steps["date-of-journey-inputs"]?.value || "N/A";
  const numberOfPassengers = steps["number-of-passengers-inputs"]?.value || "N/A";

  const details = [
    `Current flying solution: ${flyingSolution}`,
    `Departure airport: ${departureAirport}`,
    `Destination airport: ${destinationAirport}`,
    `Journey type: ${journeyType}`,
    `Date of journey: ${dateOfJourney}`,
    `Number of passengers: ${numberOfPassengers}`,
    `How did you hear about us: ${hearAboutUs}`,
  ];

  return (
    <div>
      {details.map((detail, index) => (
        <p key={index}>{detail}</p>
      ))}
    </div>
  );
};
export default ConfirmDetailsComponent;