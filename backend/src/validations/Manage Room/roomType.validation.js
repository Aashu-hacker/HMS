const Joi = require('joi');
const httpStatus = require("http-status");

const roomTypeValidation = Joi.object({
  roomType: Joi.string().required(),
  description: Joi.string().required(),
  accountLedger: Joi.string().required(),
  status: Joi.string().valid('active', 'inactive'),
});

const validateRoomType = (req, res, next) => {
    const { error } = roomTypeValidation.validate(req.body);
    if (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {validateRoomType};
