import { verifyToken } from '../utils/jwt.js'

export function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' })
  }
}

export function errorHandler(err, req, res, next) {
  console.error(err)
  
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  
  res.status(status).json({
    message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  })
}
