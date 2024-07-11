import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const ProceedWithBooking = ({ triggerNextStep }) => {
const navigate=useNavigate()
const [floating, setFloating] = useState(false);
  const handleProceed = () => {
    navigate("/proceed");
    triggerNextStep();
    setFloating(true);
  };

  return (
    <div>
      <button onClick={handleProceed}>Proceed With Booking</button>
    </div>
  );
};

export default ProceedWithBooking;
