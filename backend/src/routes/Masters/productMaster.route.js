const express = require("express");
const productMasterRouter = express.Router();
const { productMasterController } = require("../../controllers");
const { validateProductMaster } = require("../../validations/Masters/productMasterValidation")

productMasterRouter.post("/", validateProductMaster, productMasterController.addProduct);
productMasterRouter.put("/:id", productMasterController.editProduct);
productMasterRouter.get("/", productMasterController.getAllProduct);
productMasterRouter.get("/:id", productMasterController.getSingleProduct);
productMasterRouter.put("/delete/:id", productMasterController.deleteProduct);

module.exports = productMasterRouter;