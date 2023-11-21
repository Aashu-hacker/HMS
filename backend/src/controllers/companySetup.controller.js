const { CompanySetupModel } = require('../models');
require("dotenv").config();
const httpStatus = require("http-status")

const addCompanyDetails = async (req, res) => {
  try {
    const { hospitalName,
      hospitalAddress,
      Pincode,
      City,
      District,
      State,
      email,
      website, mobileNumber,
      landlineNumber } = req.body;

    const existingSetup = await CompanySetupModel.findOne({ email: email });
    if (existingSetup) {
      return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Email already exists!!' });
    }

    const newCompany = new CompanySetupModel({
      hospitalName,
      hospitalAddress,
      Pincode,
      City,
      District,
      State,
      email,
      website,
      mobileNumber,
      landlineNumber
    });
    await newCompany.save();
    res.status(httpStatus.CREATED).json({ msg: 'Company details saved!!', company_details: newCompany });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error!!' });
    console.log(error);
  }
};

const getCompanySetupDetails = async (req, res) => {
  try {
    const data = await CompanySetupModel.find();
    if (!data) {
      return res.status(httpStatus.NOT_FOUND).json({ msg: 'No Details Found!!' });
    }
    res.status(httpStatus.OK).json({ data });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error!!' });
  }
};

const updateCompanySetupDetails = async (req, res) => {
  try {
    const { hospitalName,
      hospitalAddress,
      Pincode,
      City,
      District,
      State,
      email,
      website,
      mobileNumber,
      landlineNumber, isPrimary } = req.body;

    const { id } = req.params

    const updateDetail = await CompanySetupModel.findByIdAndUpdate(
      { _id: id },
      {
        hospitalName,
        hospitalAddress,
        Pincode,
        City,
        District,
        State,
        email,
        website,
        mobileNumber,
        landlineNumber,
        isPrimary,
        updatedAt: Date.now()
      },
    );

    res.status(httpStatus.OK).json({ msg: "Details Updated!!", updateDetail: updateDetail });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error!!' });
  }
};

module.exports = {
  addCompanyDetails,
  getCompanySetupDetails,
  updateCompanySetupDetails
}
