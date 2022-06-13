const Store = require('../models/Store');
const { distanceTo, isInsidePolygon, isInsideCircle } = require('geofencer');
// @desc  Get all stores
// @route GET /api/v1/stores
// @access Public
exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();
    

    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateStores = async (req, res, next) => {
  try {
    //BOUNDARY
    const polygon = [
      [35.50223614827076, 139.46798405428683],
    [35.7895857759041, 138.98002490838377],
    [35.879461497233635, 139.07009894945483],
    [35.79145922532963, 139.71216519412445],
    [35.78771228300614, 139.89231328058102],
 
    [35.70130217074246, 139.9139572399457],

    [35.62559858875, 139.57748329222306]

  ];


  ;
  // inside => true
    // const loc = await geocoder.geocode(this.address);
    // this.location = {
    //   type: 'Point',
    //   coordinates: [loc[0].longitude, loc[0].latitude],
    //   formattedAddress: loc[0].formattedAddress
    // };
  
  
  
    
    const { storeId, address, latitude, longitude } = req.body;
    const point = [longitude, latitude]; 
    const inside = isInsidePolygon(polygon, point);
    await Store.findOne({ storeId }, (err, store) => {
      if (err || !store) {
          return res.status(401).json({
              error: 'Dont find the device'
          });
      }
      if (!address) {
          return res.status(400).json({
              error: 'address wajib diisi'
          });
      } else {
        store.address = address;
      }
      if (!latitude) {
          return res.status(400).json({
              error: 'latitude wajib diisi'
          });
      } else {
        store.latitude= latitude;
      }
      if (!longitude) {
        return res.status(400).json({
            error: 'longitude wajib diisi'
        });
    } else {
      store.longitude= longitude;
    }
    store.isInside = inside;
    store.save((err, updatedUser) => {
      if (err) {
          console.log('USER UPDATE ERROR', err);
          return res.status(400).json({
              error: 'Update device gagal'
          });
      }
      res.json(updatedUser);
  });
    })
   


 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};



// @desc  Create a store
// @route POST /api/v1/stores
// @access Public
exports.addStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);


    return res.status(201).json({
      success: true,
      data: store
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This store already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
