const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    isBlocked: {
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

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;
