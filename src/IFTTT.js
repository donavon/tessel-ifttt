import request from 'request';

export default class IFTTT {
  constructor(key) {
    this.key = key;
  }

  emit(event, { method = 'POST', json } = {}) {
    const uri = `https://maker.ifttt.com/trigger/${event}/with/key/${this.key}`;
    return new Promise((resolve, reject) => {
      request({ uri, method, json }, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
}
