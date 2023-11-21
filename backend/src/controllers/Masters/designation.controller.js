const { DesignationModel } = require('../../models');
const { validationResult } = require('express-validator');
const httpStatus = require("http-status")

const getAllDesignation = async (req, res) => {
    try {
        const designations = await DesignationModel.find({ delete: false });
        if (!designations) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: 'No designations found' });
        }
        res.status(httpStatus.OK).json({ data: designations });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}

const getDesignation = async (req, res) => {
    try {
        const { id } = req.params
        const designation = await DesignationModel.findById({ _id: id });
        if (!designation || designation.delete === true) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: 'No designation found' });
        }
        res.status(httpStatus.OK).json({ data: designation });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}

const addDesignation = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
        }

        const { designationName, designationCode, description } = req.body;
        const newDesignation = new DesignationModel({ designationName, designationCode, description });
        await newDesignation.save();
        res.status(httpStatus.CREATED).json({ msg: 'Designation added successfully!!', designation: newDesignation });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
        console.log(error);
    }
}

const updateDesignation = async (req, res) => {
    try {
        const { designationName, designationCode, description } = req.body;
        const { id } = req.params
        const updateDesignation = await DesignationModel.findByIdAndUpdate(
            { _id: id },
            { designationName, designationCode, description },
            { new: true }
        );
        res.status(httpStatus.OK).json({ msg: "Designation Updated!!", data: updateDesignation });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
        console.log(error);
    }
}

const deleteDesignationById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDesignation = await DesignationModel.findByIdAndUpdate({ _id: id }, { ...req.body, delete: true, deletedAt: Date.now() });
        if (!deletedDesignation) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: 'Designation not found' });
        }
        res.status(httpStatus.OK).json({ msg: "Designation Deleted!!", data: deletedDesignation });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error' });
    }
}

module.exports = {
    getAllDesignation,
    getDesignation,
    addDesignation,
    updateDesignation,
    deleteDesignationById
}