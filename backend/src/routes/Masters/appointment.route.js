const express = require('express');
const appointmentSchedulingRouter = express.Router();
const { appointmentSchedulingController } = require('../../controllers');
const { validateApointment } = require('../../validations/Masters/apointment.validations');

appointmentSchedulingRouter.post('/', validateApointment, appointmentSchedulingController.createAppointmentScheduling);

appointmentSchedulingRouter.get('/', appointmentSchedulingController.getAllAppointmentSchedulings);

appointmentSchedulingRouter.get('/:id', appointmentSchedulingController.getAppointmentSchedulingById);

appointmentSchedulingRouter.put('/:id', appointmentSchedulingController.updateAppointmentScheduling);

appointmentSchedulingRouter.put('/delete/:id', appointmentSchedulingController.deleteAppointmentScheduling);

module.exports = appointmentSchedulingRouter;
