import { Budget } from '../models/index.js'

export async function getAll(req, res) {
  try {
    const budgets = await Budget.findAll({
      where: { userId: req.user.id },
      order: [['month', 'DESC']]
    })

    res.json(budgets)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch budgets' })
  }
}

export async function getOne(req, res) {
  try {
    const budget = await Budget.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' })
    }

    res.json(budget)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch budget' })
  }
}

export async function create(req, res) {
  try {
    const { category, limit, month } = req.body

    if (!category || !limit) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const budget = await Budget.create({
      userId: req.user.id,
      category,
      limit,
      month: month ? new Date(month) : new Date()
    })

    res.status(201).json({
      message: 'Budget created successfully',
      data: budget
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create budget' })
  }
}

export async function update(req, res) {
  try {
    const budget = await Budget.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' })
    }

    await budget.update(req.body)

    res.json({
      message: 'Budget updated successfully',
      data: budget
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update budget' })
  }
}

export async function deleteBudget(req, res) {
  try {
    const budget = await Budget.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' })
    }

    await budget.destroy()

    res.json({ message: 'Budget deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete budget' })
  }
}
