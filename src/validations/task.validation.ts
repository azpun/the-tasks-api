import * as zod from 'zod'

export const taskSchema = zod.object({
  task_id: zod.string().min(1, 'Task ID is required'),
  task: zod.string().min(1, 'Title is required'),
  description: zod.string().default(''),
  priority: zod.enum(['low', 'medium', 'high'], { message: 'Priority is required' }).default('low'),
  isDone: zod.boolean().default(false)
})

export const taskSchemaPartial = taskSchema.partial()

const createTaskValidation = (payload: TaskValidation) => {
  return taskSchema.safeParseAsync(payload)
}

const updateTaskValidation = (payload: TaskValidation) => {
  return taskSchema.partial().safeParseAsync(payload)
}

export { createTaskValidation, updateTaskValidation }

// zod.infer adalah untuk mengambil type dari schema (taskSchema)
export type TaskValidation = zod.infer<typeof taskSchema>
export type TaskValidationPartial = zod.infer<typeof taskSchemaPartial>
// Dari pada membuat typescript interface, sekarang bisa menggunakan zod.infer sebagai typescript interface
