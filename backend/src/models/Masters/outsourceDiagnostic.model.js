const mongoose = require('mongoose');

const outsourceDiagnosticSchema = new mongoose.Schema({
  labName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  departmentId:{
    type: String,
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

const OutsourceDiagnosticsModel = mongoose.model('OutsourceDiagnostic', outsourceDiagnosticSchema);
module.exports = OutsourceDiagnosticsModel
