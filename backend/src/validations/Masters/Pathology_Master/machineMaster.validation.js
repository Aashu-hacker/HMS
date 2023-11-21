const Joi = require('joi');
const httpStatus = require("http-status")

const machineMasterValidation = Joi.object({
    machineName: Joi.string().required(),
    methodName: Joi.string().required(),
    department: Joi.string().required(),
    departmentId: Joi.string()
});

const validateMachineMaster = (req, res, next) => {
    const { error } = machineMasterValidation.validate(req.body);
    if (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

module.exports = { validateMachineMaster };
