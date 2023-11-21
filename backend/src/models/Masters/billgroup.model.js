const mongoose = require('mongoose');

const billGroupSchema = new mongoose.Schema({
    billGroupName: {
        type: String,
        required: true,
    },
    billGroupCode: {
        type: String,
        required: true,
    },
    accountLedger: { type: String },
    description: { type: String },
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

const BillGroupModel = mongoose.model('BillGroup', billGroupSchema);
module.exports = BillGroupModel
