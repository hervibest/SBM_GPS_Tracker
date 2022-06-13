const express = require('express');
const { getStores, addStore, updateStores } = require('../controllers/stores');

const router = express.Router();

router
  .route('/')
  .get(getStores)
  .post(addStore)
  .put(updateStores)


module.exports = router;
