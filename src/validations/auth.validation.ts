import * as zod from 'zod'

const schema = zod.object({
  email: zod.string().min(1, 'Email is required'),
  password: zod.string().min(1, 'Password is required')
})
const refreshTokenSchema = zod.object({
  refreshToken: zod.string().min(1, 'Refresh token is required')
})
export const createSessionValidation = (payload: CreateSessionType) => {
  return schema.safeParse(payload)
}

export const refreshTokenValidation = (payload: RefreshTokenType) => {
  return refreshTokenSchema.safeParse(payload)
}

export type CreateSessionType = zod.infer<typeof schema>
export type RefreshTokenType = zod.infer<typeof refreshTokenSchema>
