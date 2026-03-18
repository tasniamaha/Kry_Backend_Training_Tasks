import mongoose from 'mongoose'
import env from '../../core/env'
import { Logger } from '../../utils/logger'

mongoose.set('strictQuery', true)
mongoose.connection.on('connected', () => {
  Logger.info('MongoDB connected successfully')
})
mongoose.connection.on('reconnected', () => {
  Logger.info('MongoDB reconnected successfully')
})
mongoose.connection.on('disconnected', () => {
  Logger.info('MongoDB disconnected')
})
mongoose.connection.on('close', () => {
  Logger.info('MongoDB connection closed')
})
mongoose.connection.on('error', (error) => {
  Logger.error('MongoDB connection error', error)
})

export async function connectToMongoDB() {
  try {
    if (!env || !env.MONGO_URI) {
      throw new Error('MongoDB URI is not defined in environment variables')
    }

    await mongoose.connect(env.MONGO_URI)
    Logger.info('Successfully connected to MongoDB')
  }
  catch (error: unknown) {
    Logger.error('Failed to connect to MongoDB', error)
    throw error
  }
}
