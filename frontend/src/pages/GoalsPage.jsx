import React from 'react'
import { goalService } from '../services/api'
import { formatCurrency, formatDate } from '../utils/helpers'

export default function GoalsPage() {
  const [goals, setGoals] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: '',
    targetAmount: '',
    deadline: '',
    priority: 'medium'
  })

  React.useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = async () => {
    try {
      setLoading(true)
      const res = await goalService.getAll()
      setGoals(Array.isArray(res.data) ? res.data : [])
    } catch (error) {
      console.error('Failed to load goals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await goalService.create({
        ...formData,
        savedAmount: 0,
        status: 'active'
      })
      setFormData({ name: '', targetAmount: '', deadline: '', priority: 'medium' })
      setShowModal(false)
      loadGoals()
    } catch (error) {
      console.error('Failed to create goal:', error)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#666' }}>Loading goals...</div>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ backgroundColor: '#3b82f6', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0' }}>🎯 Savings Goals</h1>
        <p style={{ margin: '10px 0 0 0', color: '#e0f2fe' }}>Set and track your financial goals</p>
      </div>

      <button onClick={() => setShowModal(true)} style={{
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: '20px'
      }}>
        + New Goal
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {goals.length > 0 ? (
          goals.map((goal) => {
            const progress = (parseFloat(goal.savedAmount) / parseFloat(goal.targetAmount)) * 100
            return (
              <div key={goal.id} style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '15px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: '0' }}>{goal.name}</h3>
                <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 10px 0' }}>
                  Priority: <strong>{goal.priority}</strong> | Deadline: {formatDate(goal.deadline)}
                </p>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '10px'
                }}>
                  <div style={{
                    width: `${Math.min(progress, 100)}%`,
                    height: '100%',
                    backgroundColor: '#3b82f6'
                  }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                  <span>₹{goal.savedAmount} / ₹{goal.targetAmount}</span>
                  <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{progress.toFixed(0)}%</span>
                </div>
              </div>
            )
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666', backgroundColor: 'white', borderRadius: '8px' }}>
            <p>No goals yet - Click "New Goal" to get started</p>
          </div>
        )}
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>New Goal</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" placeholder="Goal Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <input type="number" placeholder="Target Amount" value={formData.targetAmount} onChange={(e) => setFormData({...formData, targetAmount: e.target.value})} required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <input type="date" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Create</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
