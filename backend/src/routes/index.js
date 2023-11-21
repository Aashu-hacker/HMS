const express = require("express");

const adminRoute = require("./admin.route");
const pincodeRoute = require('./pincode.route');
const designationRoute = require('./Masters/designation.route');
const companySetupRoute = require('./companySetup.route');
const departmentRoute = require('./departmentSetup.route');
const billGroupRoute = require('./Masters/billGroup.route');
const storeRoute = require('./Masters/store.route');
const roomTypeRoute = require('./Manage Room/roomType.route');
const outsourceDiagnosticRoute = require('./Masters/outsourceDiagnostic.route');
const partyMasterRoute = require("./Masters/partyMaster.route");
const productMasterRoute = require('./Masters/productMaster.route');
const unitMasterRoute = require('./Masters/Pathology_Master/unitMaster.route');
const unitRadiologyMasterRoute = require('./Masters/Radiology_Master/unitRadiology.route');
const specimenMasterRoute = require('./Masters/Pathology_Master/specimenMaster.route');
const specimenRadiologyMasterRoute = require('./Masters/Radiology_Master/specimenRadiologyMaster.route');
const machineMasterRoute = require('./Masters/Pathology_Master/machineMaster.route');
const appointmentSchedulingRoute = require('./Masters/appointment.route');
const machineRadiologyMasterRoute = require("./Masters/Radiology_Master/machineRadiologyMaster.route");
const consultantRoute = require("./Staffs/consultants/consultant.route")

const router = express.Router();

const defaultRoutes = [
    {
        path: "/admin",
        route: adminRoute,
    },
    {
        path: "/company-setup",
        route: companySetupRoute,
    },
    {
        path: '/department-setup',
        route: departmentRoute
    },
    {
        path: '/pincodes',
        route: pincodeRoute
    },
    {
        path: '/designation-master',
        route: designationRoute
    },
    {
        path: '/billgroup-master',
        route: billGroupRoute
    },
    {
        path: '/store-master',
        route: storeRoute
    },
    {
        path: '/outsourceDiagnostic-master',
        route: outsourceDiagnosticRoute
    },
    {
        path: '/party-master',
        route: partyMasterRoute
    },
    {
        path: '/product-master',
        route: productMasterRoute
    },
    {
        path: '/unit-master',
        route: unitMasterRoute
    },
    {
        path: '/unit-radiology-master',
        route: unitRadiologyMasterRoute
    },
    {
        path: '/specimen-master',
        route: specimenMasterRoute
    },
    {
        path: '/specimen-radiology-master',
        route: specimenRadiologyMasterRoute
    },
    {
        path: '/machine-master',
        route: machineMasterRoute
    },
    {
        path: '/machine-radiology-master',
        route: machineRadiologyMasterRoute
    },
    {
        path: '/appointmentSchedule-master',
        route: appointmentSchedulingRoute
    },
    {
        path: '/room-type',
        route: roomTypeRoute
    },
    {
        path: '/consultant',
        route: consultantRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
