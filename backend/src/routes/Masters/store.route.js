const express = require('express');
const storeRouter = express.Router();
const { validateStore } = require('../../validations/Masters/store.validation');
const { storeController } = require("../../controllers");

storeRouter.post('/', validateStore, storeController.createStore);

storeRouter.get('/', storeController.getAllStores);

storeRouter.get('/:id', storeController.getStoreById);

storeRouter.put('/:id', storeController.updateStoreById);

storeRouter.put('/delete/:id', storeController.deleteStoreById);

module.exports = storeRouter;
