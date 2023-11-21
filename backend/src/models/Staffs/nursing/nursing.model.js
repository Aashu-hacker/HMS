const mongoose = require('mongoose');

const nursingSchema = new mongoose.Schema({
    basicDetails: {
        firstName: String,
        middleName: String,
        lastName: String,
        gender: String,
        fatherName: String,
        mobile: String,
        alternateMobile: String,
        email: String,
        alternateEmail: String,
        aadhar: String,
        staffType: String,
        dateOfJoining: Date,
    },
    addressDetails: {
        address: String,
        pincode: String,
        state: String,
        city: String,
        district: String,
        country: String,
        permanentAddress: String,
        permanentPincode: String,
        permanentState: String,
        permanentCity: String,
        permanentDistrict: String,
        permanentCountry: String,
    },
    educationalDetails: {
        SSC: {
            degree: String,
            institute: String,
            year: String,
            CGPA: String,
        },
        HSC: {
            degree: String,
            college: String,
            university: String,
            year: String,
        },
        graduation: {
            degree: String,
            college: String,
            university: String,
            year: String,
        },
        postGraduation: {
            degree: String,
            college: String,
            university: String,
            year: String,
        },
        other: {
            degree: String,
            college: String,
            university: String,
            year: String,
        },
    },
    bankingDetails: {
        accountNumber: String,
        bankName: String,
        branchName: String,
        ifscCode: String,
        panNumber: String,
        accountHolderName: String,
    },
    documents: {
        addharCard: String,
        panCard: String,
        passport: String,
        bank: String,
        photo: String,
        joining: String,
        revealing: String,
        SSC: String,
        HSC: String,
        graduation: String,
        postGraduation: String,
        other: String,
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
    versionKey: false,
    timestamps: true,
});

const NursingModel = mongoose.model('Staff_Nursing', nursingSchema);

module.exports = NursingModel
