const express = require('express');
const unitMasterRouter = express.Router();
const { unitController } = require('../../../controllers');

unitMasterRouter.post('/', unitController.createUnit);

unitMasterRouter.get('/', unitController.getAllUnits);

unitMasterRouter.get('/:id', unitController.getUnitById);

unitMasterRouter.put('/:id', unitController.updateUnitById);

unitMasterRouter.put('/delete/:id', unitController.deleteUnitById);

module.exports = unitMasterRouter;
