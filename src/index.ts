import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import type { Application } from 'express'
import { route } from './routes/index.js'
import { logger } from './utils/logger.js'
import swaggerJSDoc from 'swagger-jsdoc'

// connect DB
import './utils/connectDB.js'

import deserializeToken from './middleware/deserializeToken.middleware.js'

const app: Application = express()

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Finance API',
      version: '1.0.0',
      description: 'API documentation'
    },
    servers: [
      {
        url: 'https://the-tasks-three.vercel.app/api'
      }
    ]
  },
  apis: ['src/routes/*.ts'] // path ke komentar API kamu
})

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

// deserialize token
app.use(deserializeToken)

// routes
route(app)

// Only call app.listen() in local development.
// On Vercel (serverless), we export the app instead.
if (process.env.NODE_ENV !== 'production') {
  const port: number = Number(process.env.PORT) || 3000
  app.listen(port, () => {
    logger.info(`Server Start on http://localhost:${port}`)
  })
}

export default app
