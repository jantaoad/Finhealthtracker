import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import * as authController from '../controllers/auth.js'
import * as transactionController from '../controllers/transactions.js'
import * as budgetController from '../controllers/budgets.js'
import * as goalController from '../controllers/goals.js'
import * as insightController from '../controllers/insights.js'

const router = express.Router()

// Auth routes
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.post('/auth/refresh', authMiddleware, authController.refresh)

// Protected routes
router.use(authMiddleware)

// Transaction routes
router.get('/transactions', transactionController.getAll)
router.post('/transactions', transactionController.create)
router.get('/transactions/:id', transactionController.getOne)
router.put('/transactions/:id', transactionController.update)
router.delete('/transactions/:id', transactionController.deleteTransaction)
router.post('/transactions/import', transactionController.importTransactions)

// Budget routes
router.get('/budgets', budgetController.getAll)
router.post('/budgets', budgetController.create)
router.get('/budgets/:id', budgetController.getOne)
router.put('/budgets/:id', budgetController.update)
router.delete('/budgets/:id', budgetController.deleteBudget)

// Goals routes
router.get('/goals', goalController.getAll)
router.post('/goals', goalController.create)
router.get('/goals/:id', goalController.getOne)
router.put('/goals/:id', goalController.update)
router.delete('/goals/:id', goalController.deleteGoal)

// Insight routes
router.get('/insights', insightController.getInsights)
router.get('/predictions', insightController.getPredictions)
router.get('/dashboard', insightController.getDashboard)
router.get('/trends', insightController.getSpendingTrends)

export default router
