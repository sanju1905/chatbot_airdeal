import React from 'react';

const ConfirmDetailsComponent = ({ steps }) => {
  const { hearAboutUs,
     flyingSolution,
      departureAirport,
       destinationAirport, 
       journeyType,
        dateOfJourney,
         numberOfPassengers } = steps;

  // Prepare the data for display
  const details = [
    `How did you hear about us: ${hearAboutUs.value}`,
    `Current flying solution: ${flyingSolution.value}`,
    `Departure airport: ${departureAirport.value}`,
    `Destination airport: ${destinationAirport.value}`,
    `Journey type: ${journeyType.value}`,
    `Date of journey: ${dateOfJourney.value}`,
    `Number of passengers: ${numberOfPassengers.value}`,
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
