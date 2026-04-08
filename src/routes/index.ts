import type { Application, Router } from 'express'
import { TaskRouter } from './task.routes.js'
import { UserRouter } from './user.routes.js'
import { LandingRouter } from './landing.routes.js'

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
