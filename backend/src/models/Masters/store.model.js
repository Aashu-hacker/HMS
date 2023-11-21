const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  purchasingStatus: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  departmentId: {
    type: mongoose.Types.ObjectId,
    ref: 'DepartmentSetupModel'
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
  versionKey: false,
  timestamps: true,
});

const StoreModel = mongoose.model('Store', storeSchema);
module.exports = StoreModel
