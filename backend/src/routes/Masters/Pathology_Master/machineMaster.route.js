const express = require('express');
const machineMasterRouter = express.Router();
const { machineController } = require('../../../controllers');
const { validateMachineMaster } = require('../../../validations/Masters/Pathology_Master/machineMaster.validation');

machineMasterRouter.post('/', validateMachineMaster, machineController.createMachine);

machineMasterRouter.get('/', machineController.getAllMachine);

machineMasterRouter.get('/:id', machineController.getMachineById);

machineMasterRouter.put('/:id', machineController.updateMachineById);

machineMasterRouter.put('/delete/:id', machineController.deleteMachineById);

module.exports = machineMasterRouter;
