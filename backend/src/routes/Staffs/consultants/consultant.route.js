const express = require('express');
const consultantRouter = express.Router();
const { consultantController } = require('../../../controllers');

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './src/uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

consultantRouter.post('/', consultantController.createDoctorInSteps);

consultantRouter.get('/', consultantController.getAllConsultants);

consultantRouter.get('/:id', consultantController.getConsultantById);

consultantRouter.put('/:id', consultantController.updateConsultantById);

consultantRouter.put('/delete/:id', consultantController.markConsultantAsDeleted);

module.exports = consultantRouter;
