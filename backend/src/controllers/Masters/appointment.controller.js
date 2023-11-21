const { AppointmentSchedulingModel } = require('../../models');
const { validationResult } = require('express-validator');
const DepartmentSetupModel = require('../../models/departmentSetup.model');
const httpStatus = require("http-status")

const createAppointmentScheduling = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
        }
        const { departmentName } = req.body
        const department = await DepartmentSetupModel.findOne({ departmentName });

        if (!department) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Department not found' });
        }

        const newAppointment = new AppointmentSchedulingModel({
            ...req.body,
            departmentId: department._id,
        });

        const savedAppointment = await newAppointment.save();
        return res.status(httpStatus.CREATED).json(savedAppointment);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const getAllAppointmentSchedulings = async (req, res) => {
    try {
        const appointmentSchedulings = await AppointmentSchedulingModel.find({ delete: false });
        res.status(httpStatus.OK).json({ data: appointmentSchedulings });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const getAppointmentSchedulingById = async (req, res) => {
    try {
        const { id } = req.params
        const appointmentScheduling = await AppointmentSchedulingModel.findById({ _id: id });
        if (!appointmentScheduling) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Appointment scheduling not found' });
        }
        res.status(httpStatus.OK).json({ data: appointmentScheduling });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const updateAppointmentScheduling = async (req, res) => {
    try {
        const { id } = req.params
        const updatedAppointmentScheduling = await AppointmentSchedulingModel.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        );
        if (!updatedAppointmentScheduling) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Appointment scheduling not found' });
        }
        res.status(httpStatus.OK).json({ msg: "Updated Successfully!!", data: updatedAppointmentScheduling });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const deleteAppointmentScheduling = async (req, res) => {
    try {
        const { id } = req.params
        const deletedAppointmentScheduling = await AppointmentSchedulingModel.findByIdAndUpdate({ _id: id }, { ...req.body, delete: true, deletedAt: Date.now(), new: true });
        if (!deletedAppointmentScheduling) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Appointment scheduling not found' });
        }
        res.status(httpStatus.OK).json({ msg: "Deleted Successfully!!", });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

module.exports = {
    createAppointmentScheduling,
    getAllAppointmentSchedulings,
    getAppointmentSchedulingById,
    updateAppointmentScheduling,
    deleteAppointmentScheduling,
}

