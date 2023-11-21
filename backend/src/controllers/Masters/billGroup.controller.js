const { BillGroupModel } = require('../../models');
const { validationResult } = require('express-validator');
const { billGroupValidation } = require('../../validations/Masters/billGroup.validation');
const httpStatus = require("http-status")

const createBillGroup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }
    try {
        const billGroup = new BillGroupModel(req.body);
        await billGroup.save();
        res.status(httpStatus.CREATED).json({ msg: "Bill Group Created", data: billGroup });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const getAllBillGroups = async (req, res) => {
    try {
        const billGroups = await BillGroupModel.find({ delete: false });
        res.status(httpStatus.OK).json({ data: billGroups });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const getBillGroupById = async (req, res) => {
    const { id } = req.params;
    try {
        const billGroup = await BillGroupModel.findById({ _id: id });
        if (!billGroup || billGroup.delete === true) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Bill Group not found' });
        }
        res.status(httpStatus.OK).json({ data: billGroup });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const updateBillGroupById = async (req, res) => {
    const { id } = req.params;
    try {
        const billGroup = await BillGroupModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (!billGroup) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Bill Group not found' });
        }
        res.status(httpStatus.OK).json({ msg: "Bill Group Updated", data: billGroup });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const deleteBillGroupById = async (req, res) => {
    const { id } = req.params;
    try {
        const billGroup = await BillGroupModel.findByIdAndUpdate({ _id: id }, { ...req.body, delete: true, deletedAt: Date.now(), new: true });
        if (!billGroup) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Bill Group not found' });
        }
        res.status(httpStatus.OK).json({ msg: "Bill Group Deleted" });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createBillGroup,
    getAllBillGroups,
    getBillGroupById,
    updateBillGroupById,
    deleteBillGroupById,
};