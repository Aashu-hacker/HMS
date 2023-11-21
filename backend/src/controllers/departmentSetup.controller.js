const { DepartmentSetupModel } = require('../models');
const departmentSetupValidations = require('../validations/departmentSetup.validation');
const httpStatus = require("http-status")

const createDepartment = async (req, res) => {
    try {
        const { error } = departmentSetupValidations.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({ error: error.details[0].message });
        }
        const { departmentName } = req.body
        const existingDept = await DepartmentSetupModel.findOne({ departmentName: departmentName });
        if (existingDept) {
            return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Department already exists!!' });
        }
        const department = new DepartmentSetupModel(req.body);
        await department.save();
        res.status(httpStatus.CREATED).json({ msg: "Department Created", data: department });
    } catch (error) {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const getAllDepartments = async (req, res) => {
    try {
        const departments = await DepartmentSetupModel.find({ delete: false });
        res.status(httpStatus.OK).json({ data: departments });
    } catch (error) {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const getDepartmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const department = await DepartmentSetupModel.findById(id);
        if (!department || department.delete === true) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Department not found' });
        }
        res.status(httpStatus.OK).json({ data: department });
    } catch (error) {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const updateDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        const department = await DepartmentSetupModel.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        });

        if (!department) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Department not found!!' });
        }
        res.status(httpStatus.OK).json({ msg: "Department Updated!!", data: department });
    } catch (error) {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        const department = await DepartmentSetupModel.findByIdAndUpdate({ _id: id }, { ...req.body, delete: true, deletedAt: Date.now() });
        if (!department) {
            return res.status(httpStatus.NOT_FOUND).json({ error: 'Department not found' });
        }
        res.status(httpStatus.OK).json({ msg: "Department Deleted!!", data: department });
    } catch (error) {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
}