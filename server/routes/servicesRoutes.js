import express from "express";
import * as serviceController from "../controllers/servicesControllers.js";
import { allowRoles, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { createServiceSchema, serviceQueryScheme, updateServiceSchema } from "../Validation/serviceValidator.js";

const router = express.Router();

router.get("/", protect, allowRoles("admin"),validate(serviceQueryScheme, "query"), serviceController.getAllServices);
router.get('/:id', protect, allowRoles("admin"), serviceController.getServiceById);
router.post(
  "/create",
  protect,
  allowRoles("admin"),
  validate(createServiceSchema, "body"),
  serviceController.createService,
);
router.put('/update/:id', protect, allowRoles("admin"), validate(updateServiceSchema, "body"), serviceController.updateService);
router.delete('/delete/:id', protect, allowRoles("admin"), serviceController.deleteService);

export default router;
