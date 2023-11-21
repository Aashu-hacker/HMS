const express = require('express');
const unitRadiologyMasterRouter = express.Router();
const { unitRadiologyController } = require('../../../controllers');

unitRadiologyMasterRouter.post('/', unitRadiologyController.createUnit);

unitRadiologyMasterRouter.get('/', unitRadiologyController.getAllUnits);

unitRadiologyMasterRouter.get('/:id', unitRadiologyController.getUnitById);

unitRadiologyMasterRouter.put('/:id', unitRadiologyController.updateUnitById);

unitRadiologyMasterRouter.put('/delete/:id', unitRadiologyController.deleteUnitById);

module.exports = unitRadiologyMasterRouter;
