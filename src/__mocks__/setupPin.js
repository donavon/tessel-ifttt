const setupPin = sensor => {
  if (sensor === setupPin.sensors[setupPin.count]) {
    setupPin.count += 1;
  } else {
    throw new Error('bad sensor data');
  }
};

setupPin.count = 0;

export default setupPin;
