module.exports.AdminModel = require("./admin.model");
module.exports.CompanySetupModel = require("./companySetup.model");
module.exports.DepartmentSetupModel = require("./departmentSetup.model");
module.exports.PincodeModel = require("./pincodes.model");
module.exports.SuperAdminModel = require("./superAdmin.model");

//Room Manage
module.exports.RoomTypeModel = require("./Manage Room/roomType.model");

//Masters
module.exports.AppointmentSchedulingModel = require("./Masters/appointment.model");
module.exports.BillGroupModel = require("./Masters/billgroup.model");
module.exports.DesignationModel = require("./Masters/designation.model");
module.exports.OutsourceDiagnosticsModel = require("./Masters/outsourceDiagnostic.model");
module.exports.PartyMasterModel = require("./Masters/partyMaster.model");
module.exports.ProductMasterModel = require("./Masters/productMaster.model");
module.exports.StoreModel = require("./Masters/store.model");

//Pathology
module.exports.MachineMasterModel = require("./Masters/Pathology_Master/machineMaster.model");
module.exports.SpecimenModel = require("./Masters/Pathology_Master/specimenMaster.model");
module.exports.UnitMasterModel = require("./Masters/Pathology_Master/unitMaster.model");

//Radiology
module.exports.MachineRadiologyMasterModel = require("./Masters/Radiology_Master/machineRadiologyMaster.model");
module.exports.SpecimenRadiologyMasterModel = require("./Masters/Radiology_Master/specimenRadiologyMaster.model");
module.exports.UnitRadiologyMasterModel = require("./Masters/Radiology_Master/unitRadiolgyMaster.model");

//Staffs
module.exports.ConsultantModel = require("./Staffs/consultants/consultants.model");
module.exports.NursingModel = require("./Staffs/nursing/nursing.model");