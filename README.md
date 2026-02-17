# FinHealthTracker - Full Stack App

**Frontend + Backend in Single Repository**

A comprehensive full-stack web application that leverages AI to provide personalized financial insights, budgeting recommendations, and savings goal tracking.

## 📋 Project Overview

**FinHealthTracker** is designed to help individuals (18-50 years old) manage their finances effectively by:
- Automatic transaction analysis and categorization
- Personalized spending recommendations using ML
- Savings goal tracking with alerts
- Predictive spending insights using AI

## 📁 Repository Structure (Monorepo)

```
finhealthtracker/ (GitHub Repository Root)
│
├── frontend/                 # React + Vite Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── README.md
│
├── backend/                  # Node.js + Express Backend
│   ├── src/
│   ├── migrations/
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
│
├── .gitignore               # Root gitignore
├── .github/                 # GitHub Actions CI/CD (optional)
├── docker-compose.yml       # Local development
├── CONTRIBUTING.md          # Contribution guidelines
└── README.md                # This file
```

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication

### AI Service
- **Python** - ML implementation
- **scikit-learn** - Machine learning
- **TensorFlow** - Deep learning
- **Pandas** - Data manipulation
- **Flask** - API server

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Python 3.9+
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Frontend setup**
```bash
cd frontend
npm install
```

3. **Backend setup**
```bash
cd backend
npm install
npm run migrate
```

4. **AI Service setup**
```bash
cd ai-service
python -m pip install -r requirements.txt
```

### Running the Application

**Development mode:**
```bash
npm run dev
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:5000
- AI Service on http://localhost:5001

## 📊 Key Features

### 1. Transaction Analysis & Categorization
- Automatic transaction import
- AI-powered category classification
- Spending pattern analysis

### 2. Personalized Recommendations
- Dynamic budget suggestions
- Spending optimization tips
- Habit-based insights

### 3. Savings Goal Management
- Create and track savings goals
- Real-time progress tracking
- Automated alerts and notifications

### 4. Financial Health Dashboard
- Overview of financial status
- Visual spending insights
- Predictive analytics

## 📈 Success Metrics

- **Daily Active Users (DAU)**: ≥30% of Monthly Active Users (MAU)
- **3-Month Retention Rate**: ≥80%
- **6-Month Savings Improvement**: ≥10% increase in saving rates
- **3-Month Insight Accuracy**: ≥15% improvement in saving percentage

## 🗄️ Database Schema

### Key Tables
- **users** - User profiles and authentication
- **transactions** - Financial transactions
- **categories** - Transaction categories (auto/manual)
- **budgets** - User budget allocations
- **savings_goals** - User savings targets
- **financial_insights** - AI-generated insights
- **spending_predictions** - ML-based predictions

## 🤖 AI Models

### Transaction Categorization
- Random Forest classifier for transaction categorization
- 95%+ accuracy on transaction classification

### Spending Prediction
- LSTM neural network for time-series forecasting
- Predicts next 30-day spending patterns

### Recommendation Engine
- Ensemble model combining multiple ML algorithms
- Personalized recommendations based on user behavior

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- HTTPS in production
- Database encryption
- Input validation and sanitization

## 📝 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user
- POST `/auth/refresh` - Refresh token

### Transactions
- GET `/transactions` - Get user transactions
- POST `/transactions` - Add transaction
- GET `/transactions/:id` - Get transaction details
- PUT `/transactions/:id` - Update transaction
- DELETE `/transactions/:id` - Delete transaction

### Budgets
- GET `/budgets` - Get user budgets
- POST `/budgets` - Create budget
- PUT `/budgets/:id` - Update budget
- DELETE `/budgets/:id` - Delete budget

### Savings Goals
- GET `/goals` - Get user goals
- POST `/goals` - Create goal
- PUT `/goals/:id` - Update goal
- DELETE `/goals/:id` - Delete goal

### Insights & Analytics
- GET `/insights` - Get AI-generated insights
- GET `/predictions` - Get spending predictions
- GET `/dashboard` - Get dashboard data

## 📚 Documentation

See [docs/](./docs/) directory for:
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Development Guide](./docs/DEVELOPMENT.md)

## 🐛 Contributing

1. Create a feature branch
2. Make your changes
3. Write tests
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 👥 Support

For issues and questions, please open an GitHub issue or contact support@finhealthtracker.com
