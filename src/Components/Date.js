import React, { useState, useEffect } from "react";

const Date = ({ triggerNextStep }) => {
  const [date, setDate] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted && date) {
      triggerNextStep({ value: date });
    }
  }, [date, isSubmitted, triggerNextStep]);

  const onChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div>
      <input
        type="date"
        value={date || ""}
        onChange={onChange}
        onBlur={handleSubmit} // Handle submission on blur (when focus leaves the input)
        disabled={isSubmitted}
      />
      <button onClick={handleSubmit}>Submit</button> {/* Optional: Provide a button for explicit submission */}
    </div>
  );
};

export default Date;
