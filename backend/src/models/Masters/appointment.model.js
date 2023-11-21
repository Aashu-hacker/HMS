const mongoose = require('mongoose');

const appointmentSchedulingSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true,
    },
    departmentName: {
        type: String,
        required: true,
    },
    departmentId: {
        type: mongoose.Types.ObjectId,
        ref: 'DepartmentSetupModel',
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    timeInterval: {
        type: String,
        required: true,
    },
    scheduling: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    delete: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
    versionKey: false,
});

const AppointmentSchedulingModel = mongoose.model('AppointmentScheduling', appointmentSchedulingSchema);

module.exports = AppointmentSchedulingModel;
