export default class IFTTT {
  constructor(request, key) {
    this.request = request;
    this.key = key;
  }

  emit(event, { method = 'POST', body } = {}) {
    const uri = `https://maker.ifttt.com/trigger/${event}/with/key/${this.key}`;
    return new Promise((resolve, reject) => {
      this.request({ uri, method, body, json: true }, (error, response) => {
        if (error) {
          reject(error);
        } else if (Math.floor(response.statusCode / 100) !== 2) {
          reject(new Error(`${response.statusCode} ${response.body}`));
        } else {
          resolve(response);
        }
      });
    });
  }
}
