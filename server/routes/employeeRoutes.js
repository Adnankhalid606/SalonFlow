import express from "express";
import * as employeeController from "../controllers/employeeController.js";
import { validate } from "../middleware/validate.js";
import { createEmployeeSchema, employeeQuerySchema } from "../Validation/employeeValidator.js";
import { allowRoles, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", protect, allowRoles("admin", "staff"), validate(employeeQuerySchema, "query"),employeeController.getEmployees);
router.get("/:id", protect, allowRoles("admin", "staff"), employeeController.getEmployeeById)
router.post("/create", protect, allowRoles("admin"), validate(createEmployeeSchema, "body"), employeeController.createEmployee);
router.put("/update/:id", protect, allowRoles("admin"), employeeController.updateEmployee);
router.delete("/delete/:id", protect, allowRoles("admin"), employeeController.deleteEmployee);

export default router;
