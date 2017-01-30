const toggleGreenLed = ({ ledGreen }) => {
  setInterval(() => { ledGreen.toggle(); }, 1000); // Blink when running.
};

export default toggleGreenLed;
