import { Router } from 'express'
import { swaggerSpec } from '../index.js'

export const DocsRouter = Router()

DocsRouter.get('/', (req, res) => {
  res.status(200).send(swaggerSpec)
})
