const { RoomTypeModel } = require('../../models');
const { validationResult } = require('express-validator');
const httpStatus = require("http-status");

const createRoomType = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
        }
        const roomType = new RoomTypeModel(req.body);
        await roomType.save();
        res.status(httpStatus.CREATED).json({ msg: "Room Type Added", data: roomType });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

const getAllRoomTypes = async (req, res) => {
    try {
        const roomTypes = await RoomTypeModel.find({ delete: false });
        res.status(httpStatus.OK).json({ data: roomTypes });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

const getRoomTypeById = async (req, res) => {
    try {
        const { id } = req.params
        const roomType = await RoomTypeModel.findById({ _id: id });
        if (!roomType || roomType.delete === true) return res.status(httpStatus.NOT_FOUND).json({ error: 'Room Type not found' });
        res.status(httpStatus.OK).json({ data: roomType });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

const updateRoomTypeById = async (req, res) => {
    try {
        const { id } = req.params
        const roomType = await RoomTypeModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (!roomType || roomType.delete === true) return res.status(httpStatus.NOT_FOUND).json({ error: 'Room Type not found' });
        res.status(httpStatus.OK).json({ msg: "Room Type Updated!!", data: roomType });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

const deleteRoomTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const roomType = await RoomTypeModel.findByIdAndUpdate({ _id: id }, { ...req.body, delete: true, deletedAt: Date.now(), new: true });
        if (!roomType) return res.status(httpStatus.NOT_FOUND).json({ error: 'Room Type not found' });
        res.status(httpStatus.OK).json({ message: 'Room Type deleted successfully' });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

module.exports = {
    createRoomType,
    getAllRoomTypes,
    getRoomTypeById,
    updateRoomTypeById,
    deleteRoomTypeById,
}
