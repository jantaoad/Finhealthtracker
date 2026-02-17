# FinHealthTracker - Development Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 12+
- Python 3.9+
- npm or yarn
- Git

## Initial Setup

### 1. Clone and Navigate to Project
```bash
cd finhealthtracker
```

### 2. Install Root Dependencies
```bash
npm install
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Backend Setup
```bash
cd ../backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your database credentials
```

**PostgreSQL Connection Example:**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finhealthtracker
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key_here
```

### 5. AI Service Setup
```bash
cd ../ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

## Database Setup

### 1. Create PostgreSQL Database
```bash
psql -U postgres
CREATE DATABASE finhealthtracker;
```

### 2. Run Migrations
```bash
cd backend
npm run migrate
```

This will create all necessary tables and relationships.

## Running the Application

### Development Mode (All Services)
```bash
npm run dev
```

This starts:
- Frontend on http://localhost:3000
- Backend on http://localhost:5000
- AI Service on http://localhost:5001 (manually if needed)

### Individual Services

**Frontend Only:**
```bash
npm run dev:frontend
```

**Backend Only:**
```bash
npm run dev:backend
```

**AI Service Only:**
```bash
cd ai-service
python run.py
```

## Project Structure

```
finhealthtracker/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API client
│   │   ├── context/        # State management
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # Global styles
│   ├── vite.config.js      # Vite configuration
│   └── tailwind.config.js  # Tailwind configuration
│
├── backend/                 # Express backend
│   ├── src/
│   │   ├── config/         # Database config
│   │   ├── models/         # Sequelize models
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Middleware
│   │   └── utils/          # Utilities
│   ├── migrations/         # Database migrations
│   └── index.js           # Entry point
│
├── ai-service/             # Python ML service
│   ├── src/
│   │   ├── models.py      # ML models
│   │   ├── app.py         # Flask app
│   │   └── config.py      # Configuration
│   ├── models/            # Saved models
│   ├── requirements.txt    # Python dependencies
│   └── run.py             # Entry point
│
└── docs/                   # Documentation
    ├── API.md
    ├── ARCHITECTURE.md
    └── DATABASE.md
```

## Common Development Tasks

### Adding a New API Endpoint

1. **Create Controller** (`backend/src/controllers/`)
```javascript
export async function getFeature(req, res) {
  try {
    // Your logic here
    res.json({ data: result })
  } catch (error) {
    res.status(500).json({ message: 'Error' })
  }
}
```

2. **Add Route** (`backend/src/routes/api.js`)
```javascript
router.get('/feature', authMiddleware, featureController.getFeature)
```

3. **Create Frontend Service** (`frontend/src/services/api.js`)
```javascript
export const featureService = {
  getAll: () => api.get('/feature'),
  create: (data) => api.post('/feature', data)
}
```

4. **Create React Component** (`frontend/src/components/FeatureComponent.jsx`)
```javascript
import { useEffect, useState } from 'react'
import { featureService } from '../services/api'

export default function FeatureComponent() {
  const [data, setData] = useState([])
  
  useEffect(() => {
    featureService.getAll().then(res => setData(res.data))
  }, [])
  
  return <div>{/* Your component */}</div>
}
```

### Adding a New Database Model

1. **Update Models** (`backend/src/models/index.js`)
```javascript
export const Feature = sequelize.define('Feature', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  // ... fields
}, {
  tableName: 'features'
})
```

2. Restart backend - Sequelize will sync the schema

### Testing an Endpoint

Using curl:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password","name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Get Transactions (with JWT token)
curl -X GET http://localhost:5000/api/transactions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Debugging

### Backend Debugging
```bash
# Set NODE_ENV to development in .env
NODE_ENV=development npm run dev:backend
```

### Frontend Debugging
Use browser DevTools (F12) for React debugging

### AI Service Debugging
```bash
# Enable debug logging
LOG_LEVEL=DEBUG python run.py
```

## Code Style

### JavaScript/React
- Use ES6+ syntax
- Prefer functional components
- Use meaningful variable names
- Add JSDoc comments for functions

### Python
- Follow PEP 8 style guide
- Use type hints where possible
- Write docstrings for functions

## Git Workflow

1. Create feature branch:
```bash
git checkout -b feature/feature-name
```

2. Make changes and commit:
```bash
git add .
git commit -m "Add feature description"
```

3. Push and create pull request:
```bash
git push origin feature/feature-name
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3000  # Frontend
lsof -i :5000  # Backend
lsof -i :5001  # AI Service

# Kill process
kill -9 <PID>
```

### Database Connection Error
- Check PostgreSQL is running
- Verify credentials in .env
- Ensure database exists: `createdb finhealthtracker`

### Python Virtual Environment Issues
```bash
# Recreate venv
rm -rf ai-service/venv
python -m venv ai-service/venv
source ai-service/venv/bin/activate
pip install -r requirements.txt
```

### Dependencies Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Clear pip cache
pip cache purge

# Reinstall
npm install
pip install -r requirements.txt
```

## Performance Tips

1. **Database Queries**: Use indexes on frequently queried columns
2. **API Caching**: Implement Redis for caching
3. **Frontend**: Use React.memo for expensive components
4. **ML Models**: Cache predictions for similar queries

## Documentation

- Update documentation when adding features
- Keep API docs in sync with implementation
- Document complex algorithms and logic
- Add inline comments for non-obvious code

## Resources

- [Express.js Docs](https://expressjs.com/)
- [Sequelize Docs](https://sequelize.org/)
- [React Docs](https://react.dev/)
- [Flask Docs](https://flask.palletsprojects.com/)
- [scikit-learn Docs](https://scikit-learn.org/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
