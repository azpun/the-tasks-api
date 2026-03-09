import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import type { Application } from 'express'
import { route } from './routes/index.ts'
import { logger } from './utils/logger.ts'

// connect DB
import './utils/connectDB.ts'

const app: Application = express()
const port: number = 3000

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

route(app)

app.listen(port, () => {
  logger.info(`Server Start on http://localhost:${port}`)
})
