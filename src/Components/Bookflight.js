// src/components/BookFlightComponent.js

import React from 'react';

const BookFlightComponent = ({ steps }) => {
  const { WaitingForDestination } = steps;

  return (
    <div>
      <p>Booking a flight to {WaitingForDestination.value}. Please wait...</p>
    </div>
  );
};

export default BookFlightComponent;
