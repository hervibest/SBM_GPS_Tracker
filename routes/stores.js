const express = require('express');
const { getStores, addStore, updateStores, deleteStores } = require('../controllers/stores');

const router = express.Router();

router
  .route('/')
  .get(getStores)
  .post(addStore)
  .put(updateStores)
  .delete(deleteStores)


module.exports = router;
