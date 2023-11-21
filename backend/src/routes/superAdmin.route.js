const express = require('express');
const superAdminRouter = express.Router();
const superAdminController = require('../controllers');

superAdminRouter.get("/", superAdminController.getSuperAdmin); 

superAdminRouter.post('/register', superAdminController.register);

superAdminRouter.post('/login', superAdminController.login); 

superAdminRouter.put("/:id", superAdminController.updateSuperAdmin); 

superAdminRouter.delete("/:id", superAdminController.deleteSuperAdmin); 

module.exports = superAdminRouter;

// optional  

// adminRouter.post(
//   '/notification',
//   [body('message').notEmpty().withMessage('Notification message is required')],
//   adminController.createOrUpdateLoginNotification
// );
// adminRouter.get('/notification', adminController.getLoginNotificationMessage);

// adminRouter.post(
//   '/subscription-notification',
//   [body('message').notEmpty().withMessage('Notification message is required')],
//   adminController.createSubscriptionNotification
// );
// adminRouter.get('/subscription-notification', adminController.getSubsNotificationMessage);


