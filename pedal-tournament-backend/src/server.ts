/* eslint-disable unused-imports/no-unused-vars */
import { createServer } from 'node:http'
import app from './app'
import { connectToMongoDB } from './libs/mongodb'
import { Logger } from './utils/logger'

const portNumber: number = 8000

// app.listen(portNumber,()=>{
//     console.log(`Server running at http://localhost:${portNumber}`)
// })
async function server(port: number): Promise<void> {
  // Don't await — let server start even if DB is slow
  connectToMongoDB().catch((error) => {
    Logger.error('Initial MongoDB connection failed, will retry...', error)
  })

  const nodeServer = createServer(app)
  nodeServer.listen(port, () => {
    Logger.info(`Server running at http://localhost:${port}`)
  })
  nodeServer.on('error', (error: NodeJS.ErrnoException) => {
    Logger.error('Server error', error)
    nodeServer.close()
  })
}

;(async () => {
  await server(portNumber)
})()
