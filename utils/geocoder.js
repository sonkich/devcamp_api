const nodeGeocoder = require('node-geocoder');
const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'v6z2Z66RxM7rGHyGDUriqHdvGSikvsvS',
  formatter: null
};

const geocoder = nodeGeocoder(options);

module.exports = geocoder;
