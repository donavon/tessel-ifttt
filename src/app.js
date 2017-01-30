import IFTTT from './IFTTT';
import setupPins from './setupPins';
import toggleGreenLed from './toggleGreenLed'; // rename (don't name to the implimentation)
import request from 'request';
import createSetupPin from './createSetupPin';

export const run = props => {
  const { config: { iftttKey, sensors } } = props;
  const ifttt = new IFTTT(request, iftttKey);
  const setupPin = createSetupPin(props, ifttt);
  setupPins(sensors, setupPin);
  toggleGreenLed(props);
};
