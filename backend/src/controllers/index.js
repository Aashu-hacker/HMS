module.exports.adminController = require("./admin.controller");
module.exports.companyController = require("./companySetup.controller");
module.exports.departmentController = require("./departmentSetup.controller");
module.exports.pincodeController = require("./pincode.controller");
module.exports.superAdminController = require("./superAdmin.controller");

//Manage Room
module.exports.roomTypeController = require("./Manage Room/roomType.controller");

//Masters
module.exports.appointmentSchedulingController = require("./Masters/appointment.controller");
module.exports.billGroupController = require("./Masters/billGroup.controller");
module.exports.designationController = require("./Masters/designation.controller");
module.exports.outsourceDiagnosticontroller = require("./Masters/outsourceDiagnostic.controller");
module.exports.partyMasterController = require("./Masters/partyMaster.controller");
module.exports.productMasterController = require("./Masters/productMaster.controller");
module.exports.storeController = require("./Masters/store.controller");

//Pathology
module.exports.machineController = require("./Masters/Pathology_Master/machineMaster.controller");
module.exports.specimenController = require("./Masters/Pathology_Master/specimen.controller");
module.exports.unitController = require("./Masters/Pathology_Master/unitMaster.controller");

//Radiology
module.exports.machineRadiologyMasterController = require("./Masters/Radiology_Master/machineRadiologyMaster.controller");
module.exports.specimenRadiologyMasterController = require("./Masters/Radiology_Master/specimenRadiologyMaster.controller");
module.exports.unitRadiologyController = require("./Masters/Radiology_Master/unitRadiologyMaster.controller");

//Staffs
module.exports.consultantController = require("./Satffs/consultants/consultants.controller");