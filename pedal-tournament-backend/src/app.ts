import cookieParser from 'cookie-parser'
import express from 'express'
import { corsConfig, helmetConfig } from './core'
import env from './core/env'
import routerv1 from './routers'

const app = express()

app.use(express.json())
// cors
app.use(corsConfig)
app.use(helmetConfig)
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/', (req, res) => {
  res.json({
    message: 'Server is running',
    data: {
      version: env?.API_VERSION,
      environment: env?.NODE_ENV,
    },
  })
})

app.use('/api/v1', routerv1)
export default app
