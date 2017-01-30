import IFTTT from './IFTTT';
import setupPins from './setupPins';
import toggleGreenLed from './toggleGreenLed'; // rename (don't name to the implimentation)

export const run = props => {
  const { config: { key } } = props; // Get the IFTTT key.
  const ifttt = new IFTTT(key); // Instantiate a new IFTTT object with the key.
  setupPins(props, ifttt);
  toggleGreenLed(props);
};
