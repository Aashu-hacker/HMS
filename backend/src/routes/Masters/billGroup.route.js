const express = require('express');
const billGroupRouter = express.Router();
const { validateBillGroup } = require('../../validations/Masters/billGroup.validation');
const { billGroupController } = require("../../controllers");

billGroupRouter.post('/', validateBillGroup, billGroupController.createBillGroup);

billGroupRouter.get('/', billGroupController.getAllBillGroups);

billGroupRouter.get('/:id', billGroupController.getBillGroupById);

billGroupRouter.put('/:id', billGroupController.updateBillGroupById);

billGroupRouter.put('/delete/:id', billGroupController.deleteBillGroupById);

module.exports = billGroupRouter;