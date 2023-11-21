const mongoose = require('mongoose');

const companySetupSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
    },
    hospitalAddress: {
        type: String,
    },
    Pincode: {
        type: String,
    },
    City: {
        type: String,
    },
    District: {
        type: String,
    },
    State: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
    },
    mobileNumber: {
        type: String,
    },
    landlineNumber: {
        type: String,
    },
    website: {
        type: String,
    },
    isPrimary: {
        type: Boolean, default: false
    },
}, {
    versionKey: false,
    timestamps: true,
});

const CompanySetupModel = mongoose.model('companySetup', companySetupSchema);
module.exports = CompanySetupModel;
