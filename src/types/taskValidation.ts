interface TaskValidation {
    title: string
    priority: 'Low' | 'Medium' | 'High'
    isDone: boolean
}

export type { TaskValidation }