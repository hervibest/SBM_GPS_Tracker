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
StoreSchema.pre('save', async function(next) {
  const polygon = [
    [35.50223614827076, 139.46798405428683],
    [35.7895857759041, 138.98002490838377],
    [35.879461497233635, 139.07009894945483],
    [35.79145922532963, 139.71216519412445],
    [35.78771228300614, 139.89231328058102],
 
    [35.70130217074246, 139.9139572399457],

    [35.541163052894504, 139.73905533838624]

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
