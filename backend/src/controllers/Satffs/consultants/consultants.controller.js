const { ConsultantModel } = require('../../../models');
const consultantValidation = require('../../../validations/Staffs/consultants/consultants.validations');
const httpStatus = require('http-status');
const axios = require('axios');

const uploadToFlickr = async (file) => {
    const apiKey = '16047461f25233b4e6f3fa092f0fbb9d';

    const formData = new FormData();
    formData.append('photo', file.buffer);

    try {
        const response = await axios.post('https://up.flickr.com/services/upload/', formData, {
            params: {
                api_key: apiKey,
                format: 'json',
                nojsoncallback: 1,
            },
        });

        const flickrImageUrl = response.data.photo.url;

        return { url: flickrImageUrl };
    } catch (error) {
        console.error('Error uploading to Flickr:', error);
        return { error: 'Error uploading to Flickr' };
    }
};

const createDoctorInSteps = async (req, res) => {
    try {
        const { step, data } = req.body;
        console.log(req.body);
        if (step === 'basicDetails') {
            const { error, value } = consultantValidation.validate(data, { abortEarly: false });
            if (error) {
                return res.status(httpStatus.BAD_REQUEST).json({ errors: error.details });
            }
            const newDoctor = new ConsultantModel(value);
            const savedDoctor = await newDoctor.save();
            return res.status(httpStatus.CREATED).json({ msg: 'Doctor record created successfully!!', doctorId: savedDoctor._id });
        } else if (step === "documents") {
            const { doctorId } = req.body;
            console.log("doctorId", doctorId)
            const documentFields = [
                'aadharCard',
                'panCard',
                'passport',
                'bank',
                'photo',
                'joining',
                'revealing',
                'SSC',
                'HSC',
                'graduation',
                'postGraduation',
                'other',
            ];

            const existingDoctor = await ConsultantModel.findById({ _id: doctorId });
            if (!existingDoctor) {
                return res.status(httpStatus.NOT_FOUND).json({ msg: '1Doctor not found!!' });
            }

            const docUrls = {};

            for (const field of documentFields) {
                if (data.documents && data.documents[field]) {
                    const file = data.documents[field][0];
                    const uploadResult = await uploadToFlickr(file);
                    docUrls[field] = uploadResult.url;
                }
            }

            try {
                existingDoctor.documents = docUrls;
                await existingDoctor.save();
                return res.status(httpStatus.CREATED).json({ msg: 'Documents uploaded and links saved successfully!!' });
            } catch (error) {
                console.error(error);
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal Server Error!!' });
            }
        }
         else {
            const { doctorId } = req.body;
            const existingDoctor = await ConsultantModel.findById({ _id: doctorId });
            if (!existingDoctor) {
                return res.status(httpStatus.NOT_FOUND).json({ msg: '2Doctor not found!!' });
            }

            switch (step) {
                case 'addressDetails':
                    existingDoctor.addressDetails = data.addressDetails;
                    break;
                case 'educationalDetails':
                    existingDoctor.educationalDetails = data.educationalDetails;
                    break;
                case 'bankingDetails':
                    existingDoctor.bankingDetails = data.bankingDetails;
                    break;
                default:
                    return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid step!!' });
            }

            await existingDoctor.save();
            return res.status(httpStatus.OK).json({ msg: `${step} updated successfully!!`, doctorId });
        }
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error!!' });
    }
};

const getAllConsultants = async (req, res) => {
    try {
        const consultants = await ConsultantModel.find({ delete: false })
        res.status(httpStatus.OK).json({ data: consultants });
    } catch (error) {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error!!' });
    }
};

const updateConsultantById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const { error, value } = consultantValidation.validate(data, { abortEarly: false });
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({ errors: error.details });
        }

        const updatedConsultant = await ConsultantModel.findByIdAndUpdate(
            { _id: id },
            { $set: value },
            { new: true }
        );

        if (!updatedConsultant) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: 'Consultant not found!!' });
        }

        res.status(httpStatus.OK).json({ msg: 'Consultant details updated successfully!!', data: updatedConsultant });
    } catch (error) {
        console.error(error); 6
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error!!' });
    }
};

const getConsultantById = async (req, res) => {
    try {
        const { id } = req.params;
        const consultant = await ConsultantModel.findById({ _id: id });
        if (!consultant) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: 'Consultant not found!!' });
        }

        res.status(httpStatus.OK).json({ data: consultant });
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error!!' });
    }
};

const markConsultantAsDeleted = async (req, res) => {
    try {
        const { id } = req.params;
        const consultant = await ConsultantModel.findByIdAndUpdate({ _id: id }, { ...req.body, delete: true, deletedAt: Date.now() });
        if (!consultant) {
            return res.status(httpStatus.NOT_FOUND).json({ msg: 'Consultant not found!!' });
        }

        res.status(httpStatus.OK).json({ msg: 'Consultant marked as deleted!!' });
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error!!' });
    }
};

module.exports = {
    createDoctorInSteps,
    getAllConsultants,
    updateConsultantById,
    getConsultantById,
    markConsultantAsDeleted,
};