import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import sequelize from './config/database.js'
import apiRouter from './routes/api.js'
import { errorHandler } from './middleware/auth.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', apiRouter)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'FinHealthTracker API is running' })
})

// Error handling
app.use(errorHandler)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Database sync and start
async function startServer() {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connection successful')

    await sequelize.sync({ alter: false })
    console.log('✅ Database models synced')

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`)
      console.log(`🚀 API available at http://localhost:${PORT}/api`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
