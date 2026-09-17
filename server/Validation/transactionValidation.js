import { z } from "zod";

export const createTransactionSchema = z.object({
  performedBy: z.enum(["employee", "owner"]),

  employee_id: z.string().min(1, "Employee is required").optional(),

  service_id: z.string().min(1, "Service is required"),

  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
});

export const transactionQuerySchema = z.object({
  search: z.string().optional(),

  limit: z.coerce.number().int().min(1).max(100).optional(),

  page: z.coerce.number().int().positive().optional(),

  sort: z
    .enum([
      "",
      "createdAt",
      "updatedAt",
      "quantity",
      "unitPrice",
      "totalAmount",
      "employeeEarning",
      "ownerEarning",
    ])
    .optional(),

  sortOrder: z.enum(["asc", "desc"]).default("desc").optional(),

  processed: z.enum(["", "true", "false"]).optional(),

  performedBy: z.enum(["", "employee", "owner"]).optional(),

  employee_id: z.string().optional(),

  service_id: z.string().optional(),
});
