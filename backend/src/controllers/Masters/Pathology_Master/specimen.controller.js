const { SpecimenModel } = require("../../../models")
const Joi = require('joi');
const httpStatus = require("http-status")

const specimenSchema = Joi.object({
    name: Joi.string().required(),
});

const createSpecimen = async (req, res) => {
    try {
        const { error } = specimenSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({ error: error.details[0].message });
        }
        const { name } = req.body
        const specimen = new SpecimenModel({
            name: name,
        })
        await specimen.save();
        res.status(httpStatus.CREATED).json({ msg: "Specimen Created", data: specimen })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
}

const deleteSpecimen = async (req, res) => {
    try {
        const { id } = req.params
        const speciman = await SpecimenModel.findByIdAndUpdate({ _id: id }, { delete: true, deletedAt: Date.now() }, { new: true });
        if (!speciman) return res.status(httpStatus.NOT_FOUND).json({ msg: "Specimen not found!!" })
        res.status(httpStatus.OK).json({ msg: "Specimen deleted successfully!!" })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
}

const getAllSpecimen = async (req, res) => {
    try {
        const specimen = await SpecimenModel.find({ delete: false })
        if (!specimen) {
            res.status(httpStatus.BAD_REQUEST).json({ msg: "Specimen not found!!" })
        }
        res.status(httpStatus.OK).json({ msg: "Specimen found successfull!!", specimanCount: specimen.length, specimen })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
}

module.exports = { createSpecimen, deleteSpecimen, getAllSpecimen }