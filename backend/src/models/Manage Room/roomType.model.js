const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  roomType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  accountLedger: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  delete: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
}, {
  timestamps: true,
  versionKey: false,
});

const RoomTypeModel = mongoose.model('RoomType', roomTypeSchema);
module.exports = RoomTypeModel