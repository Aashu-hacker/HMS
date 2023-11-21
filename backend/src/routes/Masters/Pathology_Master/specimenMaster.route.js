const express = require('express');
const specimenMasterRouter = express.Router()
const { specimenController } = require('../../../controllers')

specimenMasterRouter.get('/', specimenController.getAllSpecimen);

specimenMasterRouter.post('/', specimenController.createSpecimen);

specimenMasterRouter.put('/delete/:id', specimenController.deleteSpecimen);

module.exports = specimenMasterRouter