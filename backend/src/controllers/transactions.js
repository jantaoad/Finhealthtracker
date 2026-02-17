import { Transaction } from '../models/index.js'
import { Op } from 'sequelize'

export async function getAll(req, res) {
  try {
    const { category, startDate, endDate, limit = 20, offset = 0 } = req.query

    const where = { userId: req.user.id }

    if (category) {
      where.category = category
    }

    if (startDate && endDate) {
      where.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      }
    }

    const { rows, count } = await Transaction.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['date', 'DESC']]
    })

    res.json({
      data: rows,
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch transactions' })
  }
}

export async function getOne(req, res) {
  try {
    const transaction = await Transaction.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    res.json(transaction)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transaction' })
  }
}

export async function create(req, res) {
  try {
    const { amount, description, category, type, date, tags, notes } = req.body

    if (!amount || !description || !category) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const transaction = await Transaction.create({
      userId: req.user.id,
      amount,
      description,
      category,
      type: type || 'expense',
      date: date ? new Date(date) : new Date(),
      tags: tags || [],
      notes
    })

    res.status(201).json({
      message: 'Transaction created successfully',
      data: transaction
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create transaction' })
  }
}

export async function update(req, res) {
  try {
    const transaction = await Transaction.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    await transaction.update(req.body)

    res.json({
      message: 'Transaction updated successfully',
      data: transaction
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update transaction' })
  }
}

export async function deleteTransaction(req, res) {
  try {
    const transaction = await Transaction.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    await transaction.destroy()

    res.json({ message: 'Transaction deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete transaction' })
  }
}

export async function importTransactions(req, res) {
  try {
    // Handle CSV/file import
    const { transactions } = req.body

    if (!Array.isArray(transactions)) {
      return res.status(400).json({ message: 'Invalid transactions format' })
    }

    const created = await Transaction.bulkCreate(
      transactions.map(t => ({
        ...t,
        userId: req.user.id
      }))
    )

    res.status(201).json({
      message: `${created.length} transactions imported`,
      data: created
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to import transactions' })
  }
}
