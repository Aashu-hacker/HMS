const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // minlength: 2,
        // maxlength: 50,
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

const UnitMasterModel = mongoose.model('UnitMaster', unitSchema);
module.exports = UnitMasterModel;
