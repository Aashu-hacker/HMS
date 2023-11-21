const express = require('express');
const roomTypeRouter = express.Router();
const { roomTypeController } = require('../../controllers');
const { validateRoomType } = require('../../validations/Manage Room/roomType.validation');

roomTypeRouter.post('/', validateRoomType, roomTypeController.createRoomType);

roomTypeRouter.get('/', roomTypeController.getAllRoomTypes);

roomTypeRouter.get('/:id', roomTypeController.getRoomTypeById);

roomTypeRouter.put('/:id', roomTypeController.updateRoomTypeById);

roomTypeRouter.put('/delete/:id', roomTypeController.deleteRoomTypeById);

module.exports = roomTypeRouter;
