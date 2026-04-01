import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from '@/configs/swagger.config'

import { envConfig } from '@/configs/env.config'
import DbConnection from '@/configs/db.config'
import { notFoundHandler, errorHandler } from '@/middlewares/error.middleware'
import router from '@/routes'

const app = express()

app.use(helmet())
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(cookieParser())

if (envConfig.NODE_ENV === 'development') {
  console.log(':::Start Docs:::')
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customSiteTitle: 'URL shortern API Docs'
    })
  )
}

app.use(router)

app.use(notFoundHandler)

app.use(errorHandler)

const startServer = async () => {
  try {
    await DbConnection.connect()
    const port = envConfig.PORT || 8000
    app.listen(port, async () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...')
  await DbConnection.disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...')
  await DbConnection.disconnect()
  process.exit(0)
})

startServer()
