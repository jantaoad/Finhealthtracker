import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { insightService } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function DashboardPage() {
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await insightService.getDashboard()
        setInsights(response.data)
      } catch (err) {
        console.error('Error fetching insights:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '20px' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>FinHealthTracker Dashboard</h1>
        <div>
          <span style={{ marginRight: '15px', color: '#666' }}>Welcome, {user?.email}</span>
          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            style={{
              padding: '8px 15px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Total Income */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#666', fontSize: '14px', margin: '0 0 10px 0' }}>Total Income</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
            ₹{insights?.totalIncome || 0}
          </p>
        </div>

        {/* Total Expenses */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#666', fontSize: '14px', margin: '0 0 10px 0' }}>Total Expenses</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>
            ₹{insights?.totalExpense || 0}
          </p>
        </div>

        {/* Balance */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#666', fontSize: '14px', margin: '0 0 10px 0' }}>Balance</h3>
          <p style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: insights?.balance >= 0 ? '#3b82f6' : '#ef4444',
            margin: 0
          }}>
            ₹{insights?.balance || 0}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => navigate('/transactions')}
          style={{
            padding: '15px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Transactions
        </button>
        <button
          onClick={() => navigate('/budgets')}
          style={{
            padding: '15px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Budgets
        </button>
        <button
          onClick={() => navigate('/goals')}
          style={{
            padding: '15px',
            backgroundColor: '#ec4899',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Goals
        </button>
        <button
          onClick={() => navigate('/insights')}
          style={{
            padding: '15px',
            backgroundColor: '#06b6d4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Insights
        </button>
      </div>

      {/* Recent Transactions */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', marginTop: 0 }}>Recent Transactions</h2>
        {insights?.transactions && insights.transactions.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ textAlign: 'left', padding: '10px', color: '#666', fontWeight: 'bold' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '10px', color: '#666', fontWeight: 'bold' }}>Amount</th>
                <th style={{ textAlign: 'left', padding: '10px', color: '#666', fontWeight: 'bold' }}>Category</th>
                <th style={{ textAlign: 'left', padding: '10px', color: '#666', fontWeight: 'bold' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {insights.transactions.slice(0, 5).map((transaction, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px', color: '#666' }}>
                    {transaction.type === 'income' ? 'Income' : 'Expense'}
                  </td>
                  <td style={{
                    padding: '10px',
                    fontWeight: 'bold',
                    color: transaction.type === 'income' ? '#10b981' : '#ef4444'
                  }}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                  </td>
                  <td style={{ padding: '10px', color: '#666' }}>{transaction.category}</td>
                  <td style={{ padding: '10px', color: '#666' }}>{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#999' }}>No transactions yet</p>
        )}
      </div>
    </div>
  )
}
