import pino from 'pino'

const isProduction = process.env.NODE_ENV === 'production'

export const logger = pino(
  {
    base: {
      pid: false
    },
    timestamp: () => `, "time": "${new Date().toISOString()}"`
  },
  // pino-pretty uses worker_threads and is not supported in Vercel serverless.
  // Only enable it in development.
  isProduction
    ? undefined
    : pino.transport({
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard'
        }
      })
)
