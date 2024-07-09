const ConfirmDetailsComponent = ({ steps }) => {
  console.log("ConfirmDetailsComponent steps:", steps);

  const hearAboutUs = steps["hear-about-us"]?.value || "N/A";
  const flyingSolution = steps["flying-solution-options"]?.value || "N/A";
  const departureAirport = steps["departure-airport-input"]?.value || "N/A";
  const destinationAirport = steps["destination-airport-input"]?.value || "N/A";
  const journeyType = steps["journey-type-options"]?.value || "N/A";
  const dateOfJourney = steps["date-of-journey-input"]?.value || "N/A";
  const numberOfPassengers = steps["number-of-passengers-input"]?.value || "N/A";

  const details = [
    `How did you hear about us: ${hearAboutUs}`,
    `Current flying solution: ${flyingSolution}`,
    `Departure airport: ${departureAirport}`,
    `Destination airport: ${destinationAirport}`,
    `Journey type: ${journeyType}`,
    `Date of journey: ${dateOfJourney}`,
    `Number of passengers: ${numberOfPassengers}`,
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