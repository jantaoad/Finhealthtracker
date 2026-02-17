import { Transaction, FinancialInsight, SpendingPrediction, SavingsGoal, Budget } from '../models/index.js'
import { Op } from 'sequelize'

export async function getDashboard(req, res) {
  try {
    const userId = req.user.id
    const currentDate = new Date()
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

    // Get transactions for the current month
    const transactions = await Transaction.findAll({
      where: {
        userId,
        date: {
          [Op.gte]: currentMonth
        }
      }
    })

    // Calculate totals
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0)

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0)

    // Group by category
    const spendingByCategory = {}
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        if (!spendingByCategory[t.category]) {
          spendingByCategory[t.category] = 0
        }
        spendingByCategory[t.category] += parseFloat(t.amount)
      })

    const spendingData = Object.entries(spendingByCategory).map(([category, amount]) => ({
      category,
      amount
    }))

    // Calculate savings metrics
    const totalSaved = totalIncome - totalExpenses
    const savingsRate = totalIncome > 0 ? ((totalSaved / totalIncome) * 100).toFixed(2) : 0

    // Get budget alert percentage
    const budgets = await Budget.findAll({ where: { userId } })
    let budgetAlert = 0
    if (budgets.length > 0) {
      const exceedingBudgets = budgets.filter(b => parseFloat(b.spent) > parseFloat(b.limit))
      budgetAlert = ((exceedingBudgets.length / budgets.length) * 100).toFixed(1)
    }

    res.json({
      totalIncome,
      totalExpenses,
      totalSpent: totalExpenses,
      totalSaved,
      savingsRate,
      budgetAlert,
      spendingByCategory: spendingData,
      transactionCount: transactions.length
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch dashboard data' })
  }
}

export async function getInsights(req, res) {
  try {
    const insights = await FinancialInsight.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      limit: 10
    })

    res.json(insights)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch insights' })
  }
}

export async function getPredictions(req, res) {
  try {
    const { days = 30 } = req.query

    const predictions = await SpendingPrediction.findAll({
      where: {
        userId: req.user.id,
        forecastDate: {
          [Op.gte]: new Date()
        }
      },
      order: [['forecastDate', 'ASC']],
      limit: parseInt(days)
    })

    res.json(predictions)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch predictions' })
  }
}

export async function getSpendingTrends(req, res) {
  try {
    const userId = req.user.id
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const transactions = await Transaction.findAll({
      where: {
        userId,
        type: 'expense',
        date: {
          [Op.gte]: sixMonthsAgo
        }
      },
      order: [['date', 'ASC']]
    })

    // Group by month and category
    const trends = {}
    transactions.forEach(t => {
      const month = new Date(t.date).toISOString().substring(0, 7)
      if (!trends[month]) {
        trends[month] = {}
      }
      if (!trends[month][t.category]) {
        trends[month][t.category] = 0
      }
      trends[month][t.category] += parseFloat(t.amount)
    })

    res.json(Object.entries(trends).map(([month, categories]) => ({
      month,
      ...categories
    })))
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch spending trends' })
  }
}
