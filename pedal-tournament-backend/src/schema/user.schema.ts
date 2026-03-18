import { z } from 'zod'

export const userRegisterSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'first name is required'),
    lastName: z.string().min(2, 'last name is required'),
    fullName: z.string().optional(),
    email: z.email('email is required'),
    phone: z.string().optional(),
    bio: z.string().optional(),
    profileImage: z.string().optional(),
    role: z.enum(['user', 'admin']).default('user'), // ← was just 'user'
  }),
})

export type UserRegisterInput = z.infer<typeof userRegisterSchema>['body']
