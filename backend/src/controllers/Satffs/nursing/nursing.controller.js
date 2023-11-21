const { NursingModel } = require('../../../models');
const nursingValidation = require('../../../validations/Staffs/nursing/nursing.validations');
const httpStatus = require('http-status');

const createNurseInSteps = async (req, res) => {
    try {
        const { step, data } = req.body;

        if (step === 'basicDetails') {
            const { error, value } = nursingValidation.validate(data, { abortEarly: false });
            if (error) {
                return res.status(httpStatus.NOT_FOUND).json({ errors: error.details });
            }
            const newNurse = new NursingModel(value);
            const savedNurse = await newNurse.save();
            return res.status(httpStatus.OK).json({ msg: 'Nursing record created successfully!!', nurseId: savedNurse._id });
        } else {
            const { nurseId } = req.body;
            const existingNurse = await NursingModel.findById({ _id: nurseId });
            if (!existingNurse) {
                return res.status(httpStatus.NOT_FOUND).json({ msg: 'Nurse not found!!' });
            }

            switch (step) {
                case 'addressDetails':
                    existingNurse.addressDetails = data.addressDetails;
                    break;
                case 'educationalDetails':
                    existingNurse.educationalDetails = data.educationalDetails;
                    break;
                case 'bankingDetails':
                    existingNurse.bankingDetails = data.bankingDetails;
                    break;
                case 'documents':
                    existingNurse.documents = data.documents;
                    break;
                default:
                    return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid step!!' });
            }

            const nurse = await existingNurse.save();
            return res.status(httpStatus.OK).json({ msg: `${step} updated successfully`, nurseId, nurse });
        }
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error' });
    }
};

const getAllNurses = async (req, res) => {
    try {
        const nurses = await NursingModel.find({ delete: false })
        res.status(httpStatus.OK).json({ data: nurses });
    } catch (error) {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error!!' });
    }
};

const updateNurseById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const { error, value } = nursingValidation.validate(data, { abortEarly: false });
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({ errors: error.details });
        }

        const updatedNurse = await NursingModel.findByIdAndUpdate(
            { _id: id },
            { $set: value },
            { new: true }
        );

        if (!updatedNurse) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: 'Nurse not found!!' });
        }

        res.status(httpStatus.OK).json({ msg: 'Nurse details updated successfully!!', data: updatedNurse });
    } catch (error) {
        console.error(error); 6
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error!!' });
    }
};

const getNurseById = async (req, res) => {
    try {
        const { id } = req.params;
        const nurse = await NursingModel.findById({ _id: id });
        if (!nurse) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: 'Nurse not found!!' });
        }

        res.status(httpStatus.OK).json({ data: nurse });
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error!!' });
    }
};

const markNurseAsDeleted = async (req, res) => {
    try {
        const { id } = req.params;
        const nurse = await NursingModel.findByIdAndUpdate({ _id: id }, { ...req.body, delete: true, deletedAt: Date.now() });
        if (!nurse) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: 'Nurse not found!!' });
        }
        res.status(httpStatus.OK).json({ msg: 'Nurse marked as deleted!!' });
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error!!' });
    }
};

module.exports = {
    createNurseInSteps,
    getAllNurses,
    updateNurseById,
    getNurseById,
    markNurseAsDeleted,
};