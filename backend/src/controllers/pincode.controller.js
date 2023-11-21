const { PincodeModel } = require('../models');
require("dotenv").config();
const httpStatus = require("http-status")

const getAllPincodes = async (req, res) => {
  try {
    const codes = await PincodeModel.find();
    if (!codes) {
      return res.status(httpStatus.NOT_FOUND).json({ msg: 'No pincodes found' });
    }
    res.status(httpStatus.OK).json({ codes });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
  }
};

const getPincode = async (req, res) => {
  try {
    const { pincode } = req.params
    const codes = await PincodeModel.find({ Pincode: pincode });
    if (!codes) {
      return res.status(httpStatus.NOT_FOUND).json({ msg: 'No pincodes found' });
    }
    res.status(httpStatus.OK).json({ codes });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
  }
};

module.exports = {
  getAllPincodes,
  getPincode,
}