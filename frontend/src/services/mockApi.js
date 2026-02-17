// Mock API Service - Works Offline!
// This provides all backend functionality without needing a server

const mockData = {
  users: {
    'testuser': {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      password: '$2b$10$mockhashedpassword', // Hashed "test123"
      balance: 50000
    }
  },
  transactions: [
    { id: 1, username: 'testuser', type: 'income', amount: 10000, category: 'Salary', date: new Date(), description: 'Monthly Salary' },
    { id: 2, username: 'testuser', type: 'expense', amount: 5000, category: 'Food', date: new Date(Date.now() - 3600000), description: 'Lunch' },
    { id: 3, username: 'testuser', type: 'expense', amount: 2000, category: 'Transport', date: new Date(Date.now() - 7200000), description: 'Uber' }
  ],
  budgets: [
    { id: 1, username: 'testuser', category: 'Food', limit: 8000, spent: 5000 },
    { id: 2, username: 'testuser', category: 'Transport', limit: 5000, spent: 2000 },
    { id: 3, username: 'testuser', category: 'Entertainment', limit: 3000, spent: 500 }
  ],
  goals: [
    { id: 1, username: 'testuser', name: 'Save for Vacation', targetAmount: 100000, currentAmount: 35000, targetDate: new Date(Date.now() + 90*24*60*60*1000) },
    { id: 2, username: 'testuser', name: 'Emergency Fund', targetAmount: 50000, currentAmount: 25000, targetDate: new Date(Date.now() + 180*24*60*60*1000) }
  ]
};

let authToken = null;
let currentUser = null;

class MockAPI {
  // Auth endpoints
  static login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = Object.values(mockData.users).find(u => u.email === email);
        if (user && password === 'test123') {
          authToken = 'mock-token-' + Date.now();
          currentUser = user;
          resolve({
            status: 200,
            data: {
              token: authToken,
              user: { id: user.id, email: user.email, username: user.username }
            }
          });
        } else {
          resolve({
            status: 401,
            data: { message: 'Invalid credentials' }
          });
        }
      }, 500);
    });
  }

  static register(email, password, username) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Object.values(mockData.users).find(u => u.email === email)) {
          resolve({
            status: 409,
            data: { message: 'User already exists' }
          });
        } else {
          const newUser = {
            id: Date.now().toString(),
            email,
            password,
            username,
            balance: 0
          };
          mockData.users[email] = newUser;
          resolve({
            status: 201,
            data: { message: 'User created successfully' }
          });
        }
      }, 500);
    });
  }

  static getProfile() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (authToken && currentUser) {
          resolve({
            status: 200,
            data: currentUser
          });
        } else {
          resolve({
            status: 401,
            data: { message: 'Unauthorized' }
          });
        }
      }, 200);
    });
  }

  // Transactions
  static getTransactions() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (authToken && currentUser) {
          const userTransactions = mockData.transactions.filter(t => t.username === currentUser.username);
          resolve({
            status: 200,
            data: userTransactions
          });
        } else {
          resolve({ status: 401, data: { message: 'Unauthorized' } });
        }
      }, 300);
    });
  }

  static addTransaction(type, amount, category, description) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (authToken && currentUser) {
          const transaction = {
            id: mockData.transactions.length + 1,
            username: currentUser.username,
            type,
            amount,
            category,
            description,
            date: new Date()
          };
          mockData.transactions.push(transaction);
          resolve({
            status: 201,
            data: transaction
          });
        } else {
          resolve({ status: 401, data: { message: 'Unauthorized' } });
        }
      }, 300);
    });
  }

  // Budgets
  static getBudgets() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (authToken && currentUser) {
          const userBudgets = mockData.budgets.filter(b => b.username === currentUser.username);
          resolve({
            status: 200,
            data: userBudgets
          });
        } else {
          resolve({ status: 401, data: { message: 'Unauthorized' } });
        }
      }, 300);
    });
  }

  // Goals
  static getGoals() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (authToken && currentUser) {
          const userGoals = mockData.goals.filter(g => g.username === currentUser.username);
          resolve({
            status: 200,
            data: userGoals
          });
        } else {
          resolve({ status: 401, data: { message: 'Unauthorized' } });
        }
      }, 300);
    });
  }

  static addGoal(name, targetAmount, targetDate) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (authToken && currentUser) {
          const goal = {
            id: mockData.goals.length + 1,
            username: currentUser.username,
            name,
            targetAmount,
            currentAmount: 0,
            targetDate: new Date(targetDate)
          };
          mockData.goals.push(goal);
          resolve({
            status: 201,
            data: goal
          });
        } else {
          resolve({ status: 401, data: { message: 'Unauthorized' } });
        }
      }, 300);
    });
  }

  // Insights
  static getInsights() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (authToken && currentUser) {
          const userTransactions = mockData.transactions.filter(t => t.username === currentUser.username);
          const totalIncome = userTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
          const totalExpense = userTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

          resolve({
            status: 200,
            data: {
              totalIncome,
              totalExpense,
              balance: totalIncome - totalExpense,
              transactions: userTransactions
            }
          });
        } else {
          resolve({ status: 401, data: { message: 'Unauthorized' } });
        }
      }, 300);
    });
  }
}

export default MockAPI;
