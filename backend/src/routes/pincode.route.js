const express = require('express');
const pincodeRouter = express.Router();
const { pincodeController } = require('../controllers');

pincodeRouter.get('/', pincodeController.getAllPincodes);

pincodeRouter.get('/:pincode', pincodeController.getPincode);

module.exports = pincodeRouter