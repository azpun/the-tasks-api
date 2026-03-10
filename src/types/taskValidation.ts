interface TaskValidation {
  task: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  isDone: boolean
}

export type { TaskValidation }
