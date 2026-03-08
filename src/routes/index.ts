import type { Application, Router } from 'express'
import { TaskRouter } from './task.routes.ts'
import { UserRouter } from './user.routes.ts'
import { LandingRouter } from './landing.routes.ts'

const _routes: Array<[string, Router]> = [
  ['/', LandingRouter],
  ['/tasks', TaskRouter],
  ['/users', UserRouter]
]

export const route = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
