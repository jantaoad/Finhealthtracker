import React from 'react'
import { budgetService } from '../services/api'
import { formatCurrency } from '../utils/helpers'

export default function BudgetsPage() {
  const [budgets, setBudgets] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [formData, setFormData] = React.useState({
    category: 'groceries',
    limit: ''
  })

  React.useEffect(() => {
    loadBudgets()
  }, [])

  const loadBudgets = async () => {
    try {
      setLoading(true)
      const res = await budgetService.getAll()
      setBudgets(Array.isArray(res.data) ? res.data : [])
    } catch (error) {
      console.error('Failed to load budgets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await budgetService.create(formData)
      setFormData({ category: 'groceries', limit: '' })
      setShowModal(false)
      loadBudgets()
    } catch (error) {
      console.error('Failed to create budget:', error)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold', color: '#666' }}>Loading budgets...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ backgroundColor: '#3b82f6', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0' }}>💰 Budgets</h1>
        <p style={{ margin: '10px 0 0 0', color: '#e0f2fe' }}>Manage and track your budgets</p>
      </div>

      <button
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        + Create Budget
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
        {budgets.length > 0 ? (
          budgets.map((budget) => {
            const limit = parseFloat(budget.limit) || 0
            const spent = parseFloat(budget.spent) || 0
            const percentage = limit > 0 ? (spent / limit) * 100 : 0

            return (
              <div key={budget.id} style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '15px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: '0 0 10px 0', textTransform: 'capitalize' }}>
                  {budget.category}
                </h3>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '10px'
                }}>
                  <div style={{
                    width: `${Math.min(percentage, 100)}%`,
                    height: '100%',
                    backgroundColor: percentage > 100 ? '#ef4444' : percentage > 80 ? '#f59e0b' : '#10b981'
                  }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                  <span>₹{spent.toFixed(2)} / ₹{limit.toFixed(2)}</span>
                  <span style={{ fontWeight: 'bold' }}>{percentage.toFixed(0)}%</span>
                </div>
              </div>
            )
          })
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>No budgets yet - Click "Create Budget" to get started</p>
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
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Create Budget</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option>groceries</option>
                <option>dining</option>
                <option>entertainment</option>
                <option>transportation</option>
                <option>utilities</option>
              </select>
              <input type="number" placeholder="Limit" value={formData.limit} onChange={(e) => setFormData({...formData, limit: e.target.value})} required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
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
