const Joi = require('joi');
const httpStatus = require("http-status")

const billGroupValidation = Joi.object({
  billGroupName: Joi.string().required(),
  billGroupCode: Joi.string().required(),
  accountLedger: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid('active', 'inactive'),
});

const validateBillGroup = (req, res, next) => {
    const { error } = billGroupValidation.validate(req.body);
    if (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {validateBillGroup}

