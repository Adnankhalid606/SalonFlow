import * as z from "zod";

export const createServiceSchema = z.object({
    name: z.string().min(3).max(20),
    price: z.number().positive(),
});

export const updateServiceSchema = z.object({
    name: z.string().min(3).max(20).optional(),
    price: z.number().positive().optional(),
});

export const serviceQueryScheme = z.object({
    search: z.string().optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
    page: z.coerce.number().int().positive().optional(),
    sort: z.enum(["", "name", "price"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).default("asc").optional(),
});