const express = require('express');
const companySetupRouter = express.Router();
const { companyController } = require('../controllers');
const { validateCompanySetup } = require('../validations/companySetup.validation');

companySetupRouter.post("/", validateCompanySetup, companyController.addCompanyDetails)

companySetupRouter.get("/", companyController.getCompanySetupDetails)

companySetupRouter.put("/:id", companyController.updateCompanySetupDetails)

module.exports = companySetupRouter