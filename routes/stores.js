const express = require('express');
const { getStores, addStore, updateStores, deleteStores, getOneStore } = require('../controllers/stores');

const router = express.Router();

router
  .route('/')
  .get(getStores)
  .post(addStore)
  .put(updateStores)
  .delete(deleteStores)

router.get('/getstore/:id',getOneStore);

module.exports = router;
