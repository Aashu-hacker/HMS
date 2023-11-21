const express = require('express');
const specimenRadiologyMaster = express.Router();
const { specimenRadiologyMasterController } = require('../../../controllers');

specimenRadiologyMaster.post('/', specimenRadiologyMasterController.addSpecimen);

specimenRadiologyMaster.get('/', specimenRadiologyMasterController.getAllSpecimen);

specimenRadiologyMaster.get('/:id', specimenRadiologyMasterController.getSingleSpecimen);

specimenRadiologyMaster.put('/:id', specimenRadiologyMasterController.editSpecimen);

specimenRadiologyMaster.put('/delete/:id', specimenRadiologyMasterController.deleteSpecimen);

module.exports = specimenRadiologyMaster