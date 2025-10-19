import { z } from "zod";

export const taskSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(8).max(50),
    createdAt: z.string().optional(),
    status: z.enum(["Done", "In Progress", "To Do"]),
    priority: z.enum(["Low","Medium","High"]),
    note:z.string().max(200).optional(),
})
export type TaskType = z.infer<typeof taskSchema>;