const express = require("express");
const partyMasterRouter = express.Router();
const { partyMasterController } = require("../../controllers");
const { validatePartyMaster } = require("../../validations/Masters/partyMaster.validation")

partyMasterRouter.get("/", partyMasterController.getAllParty);
partyMasterRouter.post("/", validatePartyMaster, partyMasterController.addParty);
partyMasterRouter.put("/:id", partyMasterController.editParty);
partyMasterRouter.get("/:id", partyMasterController.getSingleParty);
partyMasterRouter.put("/delete/:id", partyMasterController.deleteParty);

module.exports = partyMasterRouter;