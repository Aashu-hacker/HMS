const express = require('express');
const departmentRouter = express.Router();
const { departmentController } = require('../controllers');

departmentRouter.post('/', departmentController.createDepartment);

departmentRouter.get('/', departmentController.getAllDepartments);

departmentRouter.get('/:id', departmentController.getDepartmentById);

departmentRouter.put('/:id', departmentController.updateDepartment);

departmentRouter.put('/delete/:id', departmentController.deleteDepartment);

module.exports = departmentRouter;
