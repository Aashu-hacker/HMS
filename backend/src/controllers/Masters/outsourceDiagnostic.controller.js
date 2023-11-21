const { OutsourceDiagnosticsModel } = require('../../models');
const { validationResult } = require('express-validator');
const httpStatus = require("http-status");

const createOutsourceDiagnostic = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
        }
        const outsourceDiagnostic = new OutsourceDiagnosticsModel(req.body);
        const savedData = await outsourceDiagnostic.save();
        res.status(httpStatus.CREATED).json({ msg: "Outsource Diiagnostics added!!", data: savedData });
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
        console.log(error);
    }
}

const getAllOutsourceDiagnostic = async (req, res) => {
    try {
        const outsourceDiagnostics = await OutsourceDiagnosticsModel.find({ delete: false });
        res.status(httpStatus.OK).json({ data: outsourceDiagnostics });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

const getOutsourceDiagnosticById = async (req, res) => {
    try {
        const { id } = req.params;
        const outsourceDiagnostic = await OutsourceDiagnosticsModel.findById({ _id: id });
        if (!outsourceDiagnostic) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Outsource Diagnostic not found' });
        }
        res.status(httpStatus.OK).json({ data: outsourceDiagnostic });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

const updateOutsourceDiagnosticById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOutsourceDiagnostic = await OutsourceDiagnosticsModel.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        );
        if (!updatedOutsourceDiagnostic) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Outsource Diagnostic not found' });
        }
        res.status(httpStatus.OK).json({ msg: "Outsource Diagnostic updated!!", data: updatedOutsourceDiagnostic });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

const deleteOutsourceDiagnosticById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOutsourceDiagnostic = await OutsourceDiagnosticsModel.findByIdAndUpdate({ _id: id }, { ...req.body, delete: true, deletedAt: Date.now() });
        if (!deletedOutsourceDiagnostic) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Outsource Diagnostic not found' });
        }
        res.status(httpStatus.OK).json({ msg: "Outsource Diagnostic Deleted!!" });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createOutsourceDiagnostic,
    getAllOutsourceDiagnostic,
    getOutsourceDiagnosticById,
    updateOutsourceDiagnosticById,
    deleteOutsourceDiagnosticById,
}