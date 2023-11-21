const Joi = require('joi');
const httpStatus = require("http-status")

const validationSchema = Joi.object({
  labName: Joi.string().required(),
  address: Joi.string().required(),
  contact: Joi.string().required().min(10).max(10),
  departmentName: Joi.string().required(),
  status: Joi.string().valid('active', 'inactive'),
});

const validateOutsourceDiagnostics = (req, res, next) => {
  const { error } = validationSchema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateOutsourceDiagnostics };