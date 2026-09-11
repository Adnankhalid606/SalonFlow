import express from "express"
import * as userController from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../Validation/authValidator.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", validate(registerSchema, "body"), userController.registerUser);
router.post("/login", validate(loginSchema, "body"),  userController.loginUser);
router.post("/logout", protect, userController.logoutUser);
router.get("/me", protect , userController.getMe);
export default router;
