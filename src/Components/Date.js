import React from "react";
import { useState,useEffect} from "react";


const Date = ({triggerNextStep}) => {
  const [date, setDate] = useState(null);
  const [isSubmitted,setIsSubmitted]=useState(false);
   useEffect(() => {
    if(isSubmitted){
        triggerNextStep({value:date})
    }
  }, [date,isSubmitted,triggerNextStep])
  
  const onChange = (e) => {
    setDate(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsSubmitted(true)
    }
  };
  return (
    <div>
      <input
        type="date"
        value={date}
        on
        onChange={onChange}
        onKeyPress={handleKeyPress}
        disabled={isSubmitted}
      />
    </div>
  );
};

export default Date;
