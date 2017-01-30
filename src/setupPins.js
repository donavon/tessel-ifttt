import createSetupPin from './createSetupPin';

const setupPins = (props, ifttt) => {
  const { config: { sensors } } = props;
  const setupPin = createSetupPin(props, ifttt);
  sensors.forEach(setupPin); // Loop for each sensor array item in the config file.
};

export default setupPins;
