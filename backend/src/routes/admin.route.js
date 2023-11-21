const express = require('express');
const adminRouter = express.Router();
const { adminController } = require("../controllers")
const { validateAdminRegister, validateAdminLogin } = require('../validations/admin.validation');

adminRouter.get('/', adminController.getAllAdmin);

adminRouter.post('/register', validateAdminRegister, adminController.registerAdmin);

adminRouter.post('/login', validateAdminLogin, adminController.loginAdmin);

adminRouter.get('/blocked', adminController.getBlockedAdmin);

adminRouter.put('/block', adminController.blockAdmin);

adminRouter.put('/unblock', adminController.unblockAdmin);

adminRouter.get('/:id', adminController.getAdmin);

adminRouter.delete('/:id', adminController.deleteAdmin);

module.exports = adminRouter;