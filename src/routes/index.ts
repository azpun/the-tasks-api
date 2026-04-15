import type { Application, Router } from 'express'
import { TaskRouter } from './task.routes.js'
import { UserRouter } from './user.routes.js'
import { LandingRouter } from './landing.routes.js'
import { AuthRouter } from './auth.route.js'
import { DocsRouter } from './docs.route.js'

const _routes: Array<[string, Router]> = [
  ['/', LandingRouter],
  ['/api/docs', DocsRouter],
  ['/api/v1/tasks', TaskRouter],
  ['/api/v1/users', UserRouter],
  ['/api/v1/auth', AuthRouter]
]

export const route = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
