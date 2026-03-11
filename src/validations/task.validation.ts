import * as zod from 'zod'
// import type { TaskValidation } from '../types/task.types.ts'

export const taskSchema = zod.object({
  task_id: zod.string().min(1, 'Task ID is required'),
  task: zod.string().min(1, 'Title is required'),
  description: zod.string().default(''),
  priority: zod.enum(['Low', 'Medium', 'High'], { message: 'Priority is required' }).default('Low'),
  isDone: zod.boolean().default(false)
})

const createTaskValidation = (payload: TaskValidation) => {
  return taskSchema.safeParse(payload)
}

export { createTaskValidation }

// zod.infer adalah untuk mengambil type dari schema (taskSchema)
export type TaskValidation = zod.infer<typeof taskSchema>
// Dari pada membuat typescript interface, sekarang bisa menggunakan zod.infer sebagai typescript interface
