const { validationResult } = require('express-validator');
const { StoreModel } = require('../../models');
const mongoose = require('mongoose');
const httpStatus = require("http-status")

const createStore = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
        }
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            const store = new StoreModel(req.body);
            await store.save();
            res.json({ msg: "Store Created", data: store });
        });
        session.endSession()
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

const getAllStores = async (req, res) => {
    try {
        const stores = await StoreModel.find({ delete: false });
        res.json({ data: stores });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

const getStoreById = async (req, res) => {
    try {
        const { id } = req.params
        const store = await StoreModel.findById({ _id: id });
        if (!store || store.delete === true) return res.status(httpStatus.NOT_FOUND).json({ error: 'Store not found' });
        res.json({ data: store });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

const updateStoreById = async (req, res) => {
    try {
        const { id } = req.params

        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            const store = await StoreModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
            if (!store) return res.status(httpStatus.NOT_FOUND).json({ error: 'Store not found' });
            res.json({ msg: "Store Updated", data: store });
        });
        session.endSession()
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

const deleteStoreById = async (req, res) => {
    try {
        const { id } = req.params
        const store = await StoreModel.findByIdAndUpdate({ _id: id }, { ...req.body, delete: true, deletedAt: Date.now(), new: true });
        if (!store) return res.status(httpStatus.NOT_FOUND).json({ error: 'Store not found' });
        res.json({ msg: 'Store deleted successfully', data: store });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

module.exports = {
    createStore,
    getAllStores,
    getStoreById,
    updateStoreById,
    deleteStoreById,
}