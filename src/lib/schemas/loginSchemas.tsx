import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6,{
        message:'Password must be above 6 characterss'
    })
})

export type LoginSchema = z.infer<typeof loginSchema>