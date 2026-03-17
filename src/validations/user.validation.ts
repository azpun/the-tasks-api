import * as zod from 'zod'

export const userSchema = zod.object({
  user_id: zod.string().min(1, 'User ID is required'),
  email: zod.string().min(1, 'Email is required'),
  name: zod.string().min(1, 'Name is required'),
  password: zod.string().min(1, 'Password is required'),
  role: zod.enum(['user', 'admin'], { message: 'Role is required' }).default('user')
})

export const userSchemaPartial = userSchema.partial()

export const createUserValidation = (payload: UserValidation) => {
  return userSchema.safeParseAsync(payload)
}

export const updateUserValidation = (payload: UserValidationPartial) => {
  return userSchemaPartial.safeParseAsync(payload)
}

// Dari pada membuat typescript interface, sekarang bisa menggunakan zod.infer sebagai typescript interface/type
export type UserValidation = zod.infer<typeof userSchema>
export type UserValidationPartial = zod.infer<typeof userSchemaPartial>
