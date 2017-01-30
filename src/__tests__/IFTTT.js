import request from '../__mocks__/request';
import IFTTT from '../IFTTT';

const key = 'TESTKEY';
const event = 'TESTEVENT';
const badevent = 'BADEVENT';

describe('IFTTT', () => {
  let ifttt;
  beforeEach(() => {
    ifttt = new IFTTT(request, key);
  });

  it('should expose a `key` property', () => {
    expect(ifttt.key).toBe(key);
  });
  it('should expose an `emit` method', () => {
    expect(typeof ifttt.emit).toBe('function');
  });

  describe('emit', () => {
    it('should return a Promise', () => {
      expect(ifttt.emit(event) instanceof Promise).toBe(true);
    });
    it('should call `request` with a proper URI', done => {
      ifttt.emit(event).then(() => {
        expect(request.props.uri).toBe(`https://maker.ifttt.com/trigger/${event}/with/key/${key}`);
        done();
      });
    });
    it('should resolve the promise on success', done => {
      ifttt.emit(event).then(value => {
        expect(value).toBe('SUCCESS');
        done();
      });
    });
    it('should reject the promise on failure', done => {
      ifttt.emit(badevent).catch(value => {
        expect(value).toBe('ERROR');
        done();
      });
    });
  });
});
