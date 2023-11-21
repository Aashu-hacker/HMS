const Joi = require('joi');
const httpStatus = require("http-status")

const companySetupValidation = Joi.object({
    hospitalName: Joi.string().required(),
    hospitalAddress: Joi.string().required(),
    Pincode: Joi.string().required().max(6).min(6),
    City: Joi.string().required(),
    District: Joi.string().required(),
    State: Joi.string().required(),
    email: Joi.string().required().email(),
    mobileNumber: Joi.string().required().max(10).min(10),
    landlineNumber: Joi.string().required(),
    website: Joi.string().required(),
});

const validateCompanySetup = (req, res, next) => {
    const { error } = companySetupValidation.validate(req.body);
    if (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    validateCompanySetup
};
