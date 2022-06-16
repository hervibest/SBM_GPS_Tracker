const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');
const { distanceTo, isInsidePolygon, isInsideCircle } = require('geofencer');
const StoreSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, 'Please add a device name'],
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  isInside: {
    type:String
  },
  latitude: {
    type:String, default:'false'
  },
  longitude: {
    type:String, default:'false'
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  isInside: {
    type:String, default:'false'
  },
  
});

// Geocode & create location
StoreSchema.pre('save', async function (next) {
  const polygon = [
    [-7.764518945570386, 110.371469199526473],
    [-7.764981370796013, 110.371335089075728],
    [-7.764896327114549, 110.371115147936507],
    [-7.765156773334677, 110.370734274256392],
    [-7.765417219393360, 110.370272934305831],
    [-7.765667034848973, 110.370058357584639],
    [-7.765948741461157, 110.370058357584639],
    [-7.766156034885346, 110.370192468035384],
    [-7.766437741169628, 110.370777189600616],
    [-7.766474947645888, 110.371141970026642],
    [-7.766347382570713, 110.371689140665694],
    [-7.766257023952372, 110.372027099001556],
    [-7.765571360862242, 110.372188031542450],
    [-7.765443795512725, 110.371909081804915],
    [-7.765225871284355, 110.371892988550826],
    [-7.764992001254990, 110.372123658526107],
    [-7.764689033068868, 110.372155845034285]

  ];
  ;
// inside => true
  // const loc = await geocoder.geocode(this.address);
  // this.location = {
  //   type: 'Point',
  //   coordinates: [loc[0].longitude, loc[0].latitude],
  //   formattedAddress: loc[0].formattedAddress
  // };



  const point = [ this.latitude, this.longitude]; // Tokyo tower
  const inside = isInsidePolygon(polygon, point);;
this.isInside = inside;
  // Do not save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Store', StoreSchema);
