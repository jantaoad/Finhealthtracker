# FinHealthTracker - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
│                  (React + Tailwind CSS)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Dashboard   │  │ Transactions │  │   Budgets    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                  HTTP/REST API Calls
                            │
┌─────────────────────────────────────────────────────────┐
│                   Backend API Layer                      │
│            (Node.js + Express + JWT Auth)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │Auth Service  │  │  Transaction │  │  Analytics   │  │
│  │              │  │  Service     │  │  Service     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                     (SQL Queries)
                            │
┌─────────────────────────────────────────────────────────┐
│              Data Layer (PostgreSQL)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Users      │  │Transactions  │  │   Budgets    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                   (Async AI Requests)
                            │
┌─────────────────────────────────────────────────────────┐
│              AI/ML Service Layer                         │
│              (Python + Flask + SKlearn)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Categorizer  │  │  Predictor   │  │  Recommender │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Architecture Components

### 1. Frontend Layer (React.js)
- **Technology**: React 18, Tailwind CSS, Vite
- **Key Features**:
  - Authentication (Login/Register)
  - Dashboard with financial overview
  - Transaction management
  - Budget tracking
  - Savings goals
  - Analytics visualization
- **Port**: 3000
- **File Structure**:
  ```
  frontend/
  ├── src/
  │   ├── components/      # React components
  │   ├── pages/          # Page components
  │   ├── services/       # API services
  │   ├── context/        # Auth context
  │   ├── hooks/          # Custom hooks
  │   ├── utils/          # Utilities
  │   └── styles/         # Global styles
  ```

### 2. Backend API Layer (Node.js + Express)
- **Technology**: Node.js 18+, Express 4, Sequelize ORM
- **Key Responsibilities**:
  - User authentication (JWT)
  - Data validation and sanitization
  - Business logic implementation
  - API endpoint routing
  - Database operations
- **Port**: 5000
- **Architecture Pattern**: MVC (Model-View-Controller)
- **File Structure**:
  ```
  backend/
  ├── src/
  │   ├── config/        # Database configuration
  │   ├── models/        # Sequelize models
  │   ├── controllers/   # Request handlers
  │   ├── routes/        # API routes
  │   ├── middleware/    # Auth & error handling
  │   └── utils/         # Helper functions
  ```

### 3. Database Layer (PostgreSQL)
- **Technology**: PostgreSQL 12+
- **ORM**: Sequelize
- **Key Tables**:
  - users
  - transactions
  - budgets
  - savings_goals
  - financial_insights
  - spending_predictions
  - categories
- **Features**:
  - JSONB for flexible data storage
  - UUID for primary keys
  - Foreign key relationships
  - Automatic timestamps

### 4. AI/ML Service Layer (Python + Flask)
- **Technology**: Python 3.9+, Flask, scikit-learn, TensorFlow
- **Key Models**:
  - **Transaction Categorizer**: Random Forest classifier
  - **Spending Predictor**: LSTM neural network
  - **Recommendation Engine**: Ensemble methods
- **Port**: 5001
- **Endpoints**:
  - POST `/api/v1/categorize` - Categorize single transaction
  - POST `/api/v1/bulk-categorize` - Categorize multiple transactions
  - POST `/api/v1/predict-spending` - Predict future spending
  - POST `/api/v1/recommend-budget` - Get budget recommendations
  - POST `/api/v1/generate-insights` - Generate financial insights

## Data Flow

### User Registration/Login
```
Frontend → Backend (POST /auth/register) → Database
                                       ← JWT Token
Frontend ← Backend (JWT Token) ← Stored User
```

### Transaction Processing
```
Frontend → Backend (POST /transactions) → Database
                                     → AI Service (Categorize)
                       ← Category, Confidence, ← ML Model
Frontend (Display) ← Backend (Categorized Transaction) ← Database
```

### Dashboard Data Generation
```
Frontend → Backend (GET /dashboard) → Database (Query Transactions)
                                  → Calculate Aggregates
                                  → AI Service (Generate Insights)
Frontend (Visualize) ← Backend (Dashboard Data + Insights) ← AI Service
```

## Key Technologies

### Frontend Dependencies
- react: UI framework
- react-router-dom: Client-side routing
- axios: HTTP client
- recharts: Data visualization
- tailwind: Styling
- lucide-react: Icons

### Backend Dependencies
- express: Web framework
- sequelize: ORM
- pg: PostgreSQL driver
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- cors: CORS handling
- dotenv: Environment variables

### AI Service Dependencies
- flask: Web framework
- scikit-learn: Machine learning
- tensorflow: Deep learning
- pandas: Data manipulation
- numpy: Numerical computing

## Security Considerations

1. **Authentication**: JWT-based authentication with secure token generation
2. **Password Security**: bcryptjs hashing with salt
3. **Database**: Connection pooling, parameterized queries
4. **CORS**: Configured to prevent unauthorized cross-origin requests
5. **Environment Variables**: Sensitive data stored in .env files
6. **Input Validation**: Request validation and sanitization

## Scalability

1. **Database**: PostgreSQL connection pooling
2. **API**: Stateless backend allows horizontal scaling
3. **AI Service**: Can be deployed separately and scaled
4. **Frontend**: Static files can be served from CDN
5. **Caching**: Can be implemented with Redis

## Deployment

### Development
```bash
npm run dev              # Runs both frontend and backend
```

### Production
```bash
npm run build           # Builds frontend and backend
npm start              # Starts backend only
# Frontend served as static files
```

## Monitoring & Logging

- All services support structured logging
- Health check endpoints for monitoring
- Error tracking and reporting
- Performance metrics collection

## Future Enhancements

1. **Real-time notifications**: WebSocket integration
2. **Advanced analytics**: Time-series analysis
3. **Multi-language support**: i18n integration
4. **Mobile app**: React Native
5. **API documentation**: OpenAPI/Swagger
6. **Advanced ML models**: Deep learning for pattern detection
7. **Cloud integration**: AWS/Azure cloud services
8. **Data export**: CSV/PDF reports
