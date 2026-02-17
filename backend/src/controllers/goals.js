import { SavingsGoal } from '../models/index.js'

export async function getAll(req, res) {
  try {
    const goals = await SavingsGoal.findAll({
      where: { userId: req.user.id },
      order: [['deadline', 'ASC']]
    })

    res.json(goals)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch goals' })
  }
}

export async function getOne(req, res) {
  try {
    const goal = await SavingsGoal.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' })
    }

    res.json(goal)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch goal' })
  }
}

export async function create(req, res) {
  try {
    const { name, description, targetAmount, deadline, priority } = req.body

    if (!name || !targetAmount || !deadline) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const goal = await SavingsGoal.create({
      userId: req.user.id,
      name,
      description,
      targetAmount,
      deadline: new Date(deadline),
      priority: priority || 'medium'
    })

    res.status(201).json({
      message: 'Savings goal created successfully',
      data: goal
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create goal' })
  }
}

export async function update(req, res) {
  try {
    const goal = await SavingsGoal.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' })
    }

    await goal.update(req.body)

    res.json({
      message: 'Goal updated successfully',
      data: goal
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update goal' })
  }
}

export async function deleteGoal(req, res) {
  try {
    const goal = await SavingsGoal.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' })
    }

    await goal.destroy()

    res.json({ message: 'Goal deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete goal' })
  }
}
