import axios from 'axios'
import MockAPI from './mockApi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => Promise.reject(error))

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Use Mock API when backend is unavailable
const USE_MOCK_API = true // Set to false when you have real backend

export const authService = {
  register: async (email, password, name) => {
    if (USE_MOCK_API) {
      const result = await MockAPI.register(email, password, name)
      return { data: result.data, status: result.status }
    }
    return api.post('/auth/register', { email, password, name })
  },
  login: async (email, password) => {
    if (USE_MOCK_API) {
      const result = await MockAPI.login(email, password)
      if (result.status === 200) {
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('user', JSON.stringify(result.data.user))
      }
      return { data: result.data, status: result.status }
    }
    return api.post('/auth/login', { email, password })
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  getProfile: async () => {
    if (USE_MOCK_API) {
      const result = await MockAPI.getProfile()
      return { data: result.data }
    }
    return api.get('/auth/profile')
  }
}


export const transactionService = {
  getAll: async (params) => {
    if (USE_MOCK_API) {
      const result = await MockAPI.getTransactions()
      return { data: result.data, status: result.status }
    }
    return api.get('/transactions', { params })
  },
  getOne: (id) => api.get(`/transactions/${id}`),
  create: async (data) => {
    if (USE_MOCK_API) {
      const result = await MockAPI.addTransaction(data.type, data.amount, data.category, data.description)
      return { data: result.data }
    }
    return api.post('/transactions', data)
  },
  update: (id, data) => api.put(`/transactions/${id}`, data),
  delete: (id) => api.delete(`/transactions/${id}`),
  import: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/transactions/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

export const budgetService = {
  getAll: async () => {
    if (USE_MOCK_API) {
      const result = await MockAPI.getBudgets()
      return { data: result.data }
    }
    return api.get('/budgets')
  },
  getOne: (id) => api.get(`/budgets/${id}`),
  create: (data) => api.post('/budgets', data),
  update: (id, data) => api.put(`/budgets/${id}`, data),
  delete: (id) => api.delete(`/budgets/${id}`)
}

export const goalService = {
  getAll: async () => {
    if (USE_MOCK_API) {
      const result = await MockAPI.getGoals()
      return { data: result.data }
    }
    return api.get('/goals')
  },
  getOne: (id) => api.get(`/goals/${id}`),
  create: async (data) => {
    if (USE_MOCK_API) {
      const result = await MockAPI.addGoal(data.name, data.targetAmount, data.targetDate)
      return { data: result.data }
    }
    return api.post('/goals', data)
  },
  update: (id, data) => api.put(`/goals/${id}`, data),
  delete: (id) => api.delete(`/goals/${id}`)
}

export const insightService = {
  getInsights: async () => {
    if (USE_MOCK_API) {
      const result = await MockAPI.getInsights()
      return { data: result.data }
    }
    return api.get('/insights')
  },
  getPredictions: (days = 30) => api.get(`/predictions?days=${days}`),
  getDashboard: async () => {
    if (USE_MOCK_API) {
      const result = await MockAPI.getInsights()
      return { data: result.data }
    }
    return api.get('/dashboard')
  },
  getSpendingTrends: () => api.get('/trends')
}

export default api
