const ConfirmCheaps=({steps})=>{
    const Departure=steps["departure-airport-input"]?.value || "Not Given";
    const Destination=steps["destination-airport-input"]?.value ||"Not Given";
    const JourneyType=steps["journey-type-options"]?.value || "Not Given";
    const JourneyDate=steps["date-of-journey-input"]?.value || "Not Given";
    const NoPassengers=steps["number-of-passengers-input"]?.value || "Not Given";
    
    const booking=[
        `Departure : ${Departure}`,
        `Destination : ${Destination}`,
        `JourneyType : ${JourneyType}`,
        `Date of Journey : ${JourneyDate}`,
        `Number of Passengers : ${NoPassengers}`
    ]
    return(
        booking.map((item,index)=>(
            <p key={index}>{item}</p>
          ))
    )
}


export default ConfirmCheaps;