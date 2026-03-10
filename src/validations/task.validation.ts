import * as zod from 'zod'
import type { TaskValidation } from '../types/taskValidation.ts'

const createTaskValidation = (payload: TaskValidation) => {
  const schema = zod.object({
    task: zod.string().min(1, 'Title is required'),
    description: zod.string(),
    priority: zod.enum(['Low', 'Medium', 'High'], { message: 'Priority is required' }).default('Low'),
    isDone: zod.boolean().default(false)
  })
  return schema.safeParse(payload)
}

export { createTaskValidation }
