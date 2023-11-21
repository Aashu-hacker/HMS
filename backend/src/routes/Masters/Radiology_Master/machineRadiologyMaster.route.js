const express = require("express");
const machineRadiologyMasterRoute = express.Router();
const { machineRadiologyMasterController } = require('../../../controllers');
const { validateMachineRadiologyMaster } = require("../../../validations/Masters/Radiology_Master/machineRadiologyMaster.validations");

machineRadiologyMasterRoute.get('/', machineRadiologyMasterController.getAllMachine);

machineRadiologyMasterRoute.post('/', validateMachineRadiologyMaster, machineRadiologyMasterController.addMachine);

machineRadiologyMasterRoute.get('/:id', machineRadiologyMasterController.getSingleMachine);

machineRadiologyMasterRoute.put('/:id', machineRadiologyMasterController.editMachine);

machineRadiologyMasterRoute.put('/delete/:id', machineRadiologyMasterController.deleteMachine);

module.exports = machineRadiologyMasterRoute