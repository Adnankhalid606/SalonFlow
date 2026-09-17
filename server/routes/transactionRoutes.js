import express from "express";
const router = express.Router();
import * as transactionController from "../controllers/transactionController.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import {
  createTransactionSchema,
  transactionQuerySchema,
} from "../Validation/transactionValidation.js";

router.get(
  "/",
  protect,
  validate(transactionQuerySchema, "query"),
  transactionController.getAllTransactions,
);

router.post(
  "/create",
  protect,
  allowRoles("admin"),
  validate(createTransactionSchema, "body"),
  transactionController.createTransaction,
);

export default router;
