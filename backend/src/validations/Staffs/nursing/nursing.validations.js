const Joi = require('joi');

const nursingValidation = Joi.object({
    basicDetails: {
        firstName: Joi.string().allow(''),
        middleName: Joi.string().allow(''),
        lastName: Joi.string().allow(''),
        gender: Joi.string().valid('male', 'female', 'other').allow(''),
        fatherName: Joi.string().allow(''),
        mobile: Joi.string().pattern(/^[0-9]{10}$/).allow(''),
        alternateMobile: Joi.string().pattern(/^[0-9]{10}$/).allow(''),
        email: Joi.string().email().allow(''),
        alternateEmail: Joi.string().email().allow(''),
        aadhar: Joi.string().pattern(/^[0-9]{12}$/).allow(''),
        staffType: Joi.string().allow(''),
        dateOfJoining: Joi.date().iso().allow(''),
    },
    addressDetails: {
        address: Joi.string().allow(''),
        pincode: Joi.string().pattern(/^[0-9]{6}$/).allow(''),
        state: Joi.string().allow(''),
        city: Joi.string().allow(''),
        district: Joi.string().allow(''),
        country: Joi.string().allow(''),
        permanentAddress: Joi.string().allow(''),
        permanentPincode: Joi.string().pattern(/^[0-9]{6}$/).allow(''),
        permanentState: Joi.string().allow(''),
        permanentCity: Joi.string().allow(''),
        permanentDistrict: Joi.string().allow(''),
        permanentCountry: Joi.string().allow(''),
    },
    educationalDetails: {
        SSC: {
            degree: Joi.string().allow(''),
            institute: Joi.string().allow(''),
            year: Joi.string().allow(''),
            CGPA: Joi.string().allow(''),
        },
        HSC: {
            degree: Joi.string().allow(''),
            college: Joi.string().allow(''),
            university: Joi.string().allow(''),
            year: Joi.string().allow(''),
        },
        graduation: {
            degree: Joi.string().allow(''),
            college: Joi.string().allow(''),
            university: Joi.string().allow(''),
            year: Joi.string().allow(''),
        },
        postGraduation: {
            degree: Joi.string().allow(''),
            college: Joi.string().allow(''),
            university: Joi.string().allow(''),
            year: Joi.string().allow(''),
        },
        other: {
            degree: Joi.string().allow(''),
            college: Joi.string().allow(''),
            university: Joi.string().allow(''),
            year: Joi.string().allow(''),
        },
    },
    bankingDetails: {
        accountNumber: Joi.string().allow(''),
        bankName: Joi.string().allow(''),
        branchName: Joi.string().allow(''),
        ifscCode: Joi.string().allow(''),
        panNumber: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).allow(''),
        accountHolderName: Joi.string().allow(''),
    },
    documents: {
        addharCard: Joi.string().uri().allow(''),
        panCard: Joi.string().uri().allow(''),
        passport: Joi.string().uri().allow(''),
        bank: Joi.string().uri().allow(''),
        photo: Joi.string().uri().allow(''),
        joining: Joi.string().uri().allow(''),
        revealing: Joi.string().uri().allow(''),
        SSC: Joi.string().uri().allow(''),
        HSC: Joi.string().uri().allow(''),
        graduation: Joi.string().uri().allow(''),
        postGraduation: Joi.string().uri().allow(''),
        other: Joi.string().uri().allow(''),
    }
});

module.exports = nursingValidation
