import { z } from "zod";
export const createServiceSchema = z.object({
  name: z.string().trim().min(3, "Name Must be 3 characters long").max(20, "Name must be 20 characters long"),
  price: z.number("Price must be a number").positive("Price must be positive").min(1, "Price must be greater than 0"),
});