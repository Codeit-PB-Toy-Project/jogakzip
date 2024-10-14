const express = require('express');
const imageController = require('./image-controller');
const router = express.Router();

router.post('/', imageController.uploadImage);

module.exports = router;
