import * as z from "zod";

export const employeeQuerySchema = z.object({
    salaryMethod: z.enum(["", "fixed", "percentage", "hybrid"]).optional(),
    isActive: z.enum(["", "true", "false"]).optional(),
    search: z.string().optional(),
    sort: z.enum(["", "name", "phone", "salary", "joinedDate"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
    page: z.coerce.number().int().positive().optional(),
})
export const createEmployeeSchema = z.object({
    name: z.string().min(3).max(20),
    phone: z.string(),
    salary: z.discriminatedUnion("method", [
        z.object({
            method: z.literal("fixed"),
            fixed: z.number().positive(),
            frequency: z.enum(['daily','weekly','monthly'])
        }),
        z.object({
            method: z.literal("percentage"),
            percentage: z.number().positive()
        }),
        z.object({
            method: z.literal("hybrid"),
            fixed: z.number().positive(),
            percentage: z.number().positive(),
            frequency: z.enum(['daily','weekly','monthly'])
        })
    ]),
    isActive: z.boolean().default(true),
})