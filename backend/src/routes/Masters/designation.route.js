const express = require('express');
const designationRouter = express.Router();
const { designationController } = require('../../controllers');
const validateDesignation = require("../../validations/Masters/designation.validation")

designationRouter.get('/', designationController.getAllDesignation);

designationRouter.get('/:id', designationController.getDesignation);

designationRouter.post('/', validateDesignation, designationController.addDesignation);

designationRouter.put('/:id', designationController.updateDesignation);

designationRouter.put('/delete/:id', designationController.deleteDesignationById);

module.exports = designationRouter;