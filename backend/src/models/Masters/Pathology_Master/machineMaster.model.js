const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    machineName: {
        type: String,
        required: true,
    },
    methodName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    departmentId: {
        type: mongoose.Types.ObjectId,
        ref: 'DepartmentSetupModel'
    },
    delete: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    },
}, {
    versionKey: false,
    timestamps: true,
});

const MachineMasterModel = mongoose.model('MachineMaster', machineSchema);
module.exports = MachineMasterModel;
