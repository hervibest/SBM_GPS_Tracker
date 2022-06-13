const NodeGeocoder = require('node-geocoder');

const options = {
  provider: "mapquest",
  httpAdapter: 'https',
  apiKey: "UlcxeLs6J3qlvaeZpQTJ8LSf33sdEt2C",
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
