import React from 'react'
import { insightService } from '../services/api'

export default function InsightsPage() {
  const [insights, setInsights] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    loadInsights()
  }, [])

  const loadInsights = async () => {
    try {
      setLoading(true)
      const res = await insightService.getInsights()
      setInsights(Array.isArray(res.data) ? res.data : [])
    } catch (error) {
      console.error('Failed to load insights:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#666' }}>Loading insights...</div>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ backgroundColor: '#3b82f6', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0' }}>💡 AI Insights</h1>
        <p style={{ margin: '10px 0 0 0', color: '#e0f2fe' }}>Smart financial insights and recommendations</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {insights.length > 0 ? (
          insights.map((insight, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '15px',
              border: '1px solid #e5e7eb',
              borderLeftWidth: '4px',
              borderLeftColor: '#3b82f6',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', margin: '0 0 5px 0' }}>
                {insight.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#666', margin: '0' }}>
                {insight.message}
              </p>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666', backgroundColor: 'white', borderRadius: '8px' }}>
            <p>No insights yet - Check back later for AI-generated insights</p>
          </div>
        )}
      </div>
    </div>
  )
}
