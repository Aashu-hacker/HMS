const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
    designationName: {
        type: String,
        required: true,
    },
    designationCode: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default:"active"
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

const DesignationModel = mongoose.model('Designation', designationSchema);
module.exports = DesignationModel;