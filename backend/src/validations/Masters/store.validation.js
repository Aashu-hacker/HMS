const Joi = require('joi');
const httpStatus = require("http-status")
const storeValidation = Joi.object({
  storeName: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  purchasingStatus: Joi.string().valid('Yes', 'No').required(),
  department: Joi.string().required(),
  status: Joi.string().valid('active', 'inactive'),
  departmentId: Joi.string()
});

const validateStore = (req, res, next) => {
    const { error } = storeValidation.validate(req.body);
    if (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {validateStore};
