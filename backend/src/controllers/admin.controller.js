const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AdminModel } = require('../models');
require("dotenv").config();
const httpStatus = require("http-status")

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const domainRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && domainRegex.test(email);
}

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid email format!!' });
    }

    const existingAdmin = await AdminModel.findOne({ email: email });
    if (existingAdmin) {
      return res.status(httpStatus.BAD_REQUEST).json({ msg: 'User already exists!!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new AdminModel({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });
    await newAdmin.save();
    res.status(httpStatus.CREATED).json({ msg: 'Admin registered successfully!!', admin: newAdmin });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    console.log(error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email: email });

    if (!admin) {
      return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid email or password' });
    }

    const blockedAdmin = await AdminModel.findOne({ email: email });
    if (blockedAdmin.isBlocked === true) {
      return res.status(httpStatus.FORBIDDEN).json({ error: 'Your account is blocked' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid email or password' });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.admin_secret_key, { expiresIn: '1d' });
    await admin.save();
    res.status(httpStatus.OK).json({ msg: `Welcome ${admin.name}`, token: token, adminId: admin._id, Email: admin.email, Name: admin.name });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    console.log(error);
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const user = await AdminModel.find({ isBlocked: false });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ msg: 'No user found' });
    }
    res.status(httpStatus.OK).json({ user });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
  }
};

const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await AdminModel.findById({ _id: id });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ msg: 'User not found' });
    }
    res.status(httpStatus.OK).json({ user: user });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await AdminModel.findByIdAndDelete({ _id: id });
    res.status(httpStatus.OK).json({ msg: 'Admin deleted successfully' });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
  }
};

const blockAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await AdminModel.findOneAndUpdate({ email }, { isBlocked: true, updatedAt: Date.now() });
    if (!admin) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Admin not found' });
    }
    res.status(httpStatus.OK).json({ message: 'Admin blocked successfully', admin: admin });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
  }
};

const unblockAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await AdminModel.findOneAndUpdate({ email }, { isBlocked: false, updatedAt: Date.now() });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Admin not found' });
    }
    res.status(httpStatus.OK).json({ message: 'Admin unblocked successfully', admin: user });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
  }
};

const getBlockedAdmin = async (req, res) => {
  try {
    const blockedUsers = await AdminModel.find({ isBlocked: true });
    if (!blockedUsers) {
      return res.status(httpStatus.NOT_FOUND).json({ msg: 'No user found' });
    }
    res.status(httpStatus.OK).json({ user: blockedUsers });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
    console.log(error);
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllAdmin,
  getAdmin,
  deleteAdmin,
  blockAdmin,
  unblockAdmin,
  getBlockedAdmin,
};
