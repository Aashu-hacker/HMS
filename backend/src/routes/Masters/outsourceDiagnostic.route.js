const express = require('express');
const outsourceDiagnosticRouter = express.Router();
const { outsourceDiagnosticontroller } = require('../../controllers');
const { validateOutsourceDiagnostics } = require("../../validations/Masters/outsourceDiagnostic.validation")

outsourceDiagnosticRouter.post('/', validateOutsourceDiagnostics, outsourceDiagnosticontroller.createOutsourceDiagnostic);
outsourceDiagnosticRouter.get('/', outsourceDiagnosticontroller.getAllOutsourceDiagnostic);
outsourceDiagnosticRouter.get('/:id', outsourceDiagnosticontroller.getOutsourceDiagnosticById);
outsourceDiagnosticRouter.put('/:id', outsourceDiagnosticontroller.updateOutsourceDiagnosticById);
outsourceDiagnosticRouter.put('/delete/:id', outsourceDiagnosticontroller.deleteOutsourceDiagnosticById);

module.exports = outsourceDiagnosticRouter;