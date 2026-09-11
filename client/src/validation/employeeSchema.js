import {z} from 'zod';
export const createEmployeeSchema = z.object({
    name: z.string().min(3,"Name Must be 3 characters long").max(20, "Name must be 20 characters long"),
    phone: z.string().min(11, "Phone Number Must be 11 digits long").max(13, "Phone Number Must be 13 digits long"), 
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
})