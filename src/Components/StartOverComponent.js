const StartOverComponent = ({ triggerNextStep }) => {
    const handleStartOver = () => {
      triggerNextStep({ value: true, trigger: "Greet" });
    };
    return <button onClick={handleStartOver}>Start Over</button>;
  };
  export default StartOverComponent;