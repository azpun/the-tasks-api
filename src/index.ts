import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import type { Application } from 'express'
import { route } from './routes/index.js'
import { logger } from './utils/logger.js'

// connect DB
import './utils/connectDB.js'

import deserializeToken from './middleware/deserializeToken.middleware.js'

const app: Application = express()

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
