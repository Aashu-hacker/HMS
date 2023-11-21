const Joi = require('joi');
const httpStatus = require("http-status")

const addDesignationSchema = Joi.object({
    designationName: Joi.string().required(),
    designationCode: Joi.string().required(),
    description: Joi.string().required(),
})

const validateDesignation = (req, res, next) => {
    const { error } = addDesignationSchema.validate(req.body);
    if (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};
module.exports = validateDesignation

