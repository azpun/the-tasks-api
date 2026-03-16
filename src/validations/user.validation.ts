import * as zod from 'zod'

export const userSchema = zod.object({
  user_id: zod.string().min(1, 'User ID is required'),
  email: zod.string().min(1, 'Email is required'),
  name: zod.string().min(1, 'Name is required'),
  password: zod.string().min(1, 'Password is required'),
  role: zod.enum(['user', 'admin'], { message: 'Role is required' }).default('user')
})

// Dari pada membuat typescript interface, sekarang bisa menggunakan zod.infer sebagai typescript interface/type
export type UserValidation = zod.infer<typeof userSchema>
