import setupPins from '../setupPins';
import setupPin from '../__mocks__/setupPin';

const sensors = [1, 2, 3];

setupPin.sensors = sensors;

describe('setupPins', () => {
  it('should call setupPin once for each item in teh sensor srray and pass sensor', () => {
    setupPins(sensors, setupPin);
    expect(setupPin.count).toBe(sensors.length);
  });
});
