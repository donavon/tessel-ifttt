import tessel from 'tessel'; // Import the interface to Tessel hardware.
import { run } from './lib/app'; // Import the app.
import config from './config';

const noop = () => {};
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;
const log = isProduction ? noop : console.log; // eslint-disable-line no-console
const led = tessel.leds;
const props = {
  tessel,
  config,
  log,
  noop,
  isProduction,
  isDevelopment,
  // ledErr: led[0], // LED helper objects (helps to standardize names)
  // ledWifi: led[1],
  ledGreen: led[2],
  ledBlue: led[3],
};
run(props);

if (process.env.NODE_ENV !== 'production') {
  log('\nYour app is running on the Tessel! (Press CTRL + C to stop)');
}
