const { validationResult } = require('express-validator');
const { MachineMasterModel } = require('../../../models');
const mongoose = require('mongoose');
const httpStatus = require("http-status")

const createMachine = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            const machine = new MachineMasterModel(req.body);
            await machine.save();
            res.status(httpStatus.CREATED).json({ msg: "Machine Created", data: machine });
        });
        session.endSession()
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllMachine = async (req, res) => {
    try {
        const machines = await MachineMasterModel.find({ delete: false });
        res.json({ data: machines });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMachineById = async (req, res) => {
    try {
        const { id } = req.params
        const machine = await MachineMasterModel.findById({ _id: id });
        if (!machine || machine.delete === true) return res.status(httpStatus.NOT_FOUND).json({ error: 'Store not found' });
        res.json({ data: machine });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateMachineById = async (req, res) => {
    try {
        const { id } = req.params
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            const machine = await MachineMasterModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
            if (!machine) return res.status(httpStatus.NOT_FOUND).json({ error: 'Store not found!!' });
            res.json({ msg: "Machine Updated!!", data: machine });
        });
        session.endSession()
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteMachineById = async (req, res) => {
    try {
        const { id } = req.params
        const machine = await MachineMasterModel.findByIdAndUpdate({ _id: id }, { ...req.body, delete: true, deletedAt: Date.now(), new: true });
        if (!machine) return res.status(httpStatus.NOT_FOUND).json({ error: 'Store not found' });
        res.json({ msg: 'Store deleted successfully', data: machine });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createMachine,
    getAllMachine,
    getMachineById,
    updateMachineById,
    deleteMachineById,
}