# FinHealthTracker - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register
- **POST** `/auth/register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Response** (201):
  ```json
  {
    "message": "User registered successfully",
    "token": "jwt_token_here",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```

### Login
- **POST** `/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```

### Refresh Token
- **POST** `/auth/refresh`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "token": "new_jwt_token"
  }
  ```

---

## Transaction Endpoints

### Get All Transactions
- **GET** `/transactions`
- **Query Parameters**:
  - `category` (optional): Filter by category
  - `startDate` (optional): Filter from date (ISO 8601)
  - `endDate` (optional): Filter to date (ISO 8601)
  - `limit` (optional): Results per page (default: 20)
  - `offset` (optional): Pagination offset (default: 0)
- **Response** (200):
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "userId": "uuid",
        "amount": 50.00,
        "description": "Grocery shopping",
        "category": "groceries",
        "type": "expense",
        "date": "2024-01-15T10:30:00Z",
        "tags": [],
        "notes": null
      }
    ],
    "total": 100,
    "limit": 20,
    "offset": 0
  }
  ```

### Get Single Transaction
- **GET** `/transactions/:id`
- **Response** (200): Transaction object

### Create Transaction
- **POST** `/transactions`
- **Body**:
  ```json
  {
    "amount": 50.00,
    "description": "Grocery shopping",
    "category": "groceries",
    "type": "expense",
    "date": "2024-01-15",
    "tags": ["weekly"],
    "notes": "Weekly groceries"
  }
  ```
- **Response** (201): Created transaction object

### Update Transaction
- **PUT** `/transactions/:id`
- **Body**: Partial transaction object
- **Response** (200): Updated transaction

### Delete Transaction
- **DELETE** `/transactions/:id`
- **Response** (200):
  ```json
  {
    "message": "Transaction deleted successfully"
  }
  ```

### Import Transactions
- **POST** `/transactions/import`
- **Body**:
  ```json
  {
    "transactions": [
      {
        "amount": 50.00,
        "description": "Grocery shopping",
        "category": "groceries",
        "type": "expense",
        "date": "2024-01-15"
      }
    ]
  }
  ```
- **Response** (201): Array of imported transactions

---

## Budget Endpoints

### Get All Budgets
- **GET** `/budgets`
- **Response** (200): Array of budget objects

### Get Single Budget
- **GET** `/budgets/:id`
- **Response** (200): Budget object

### Create Budget
- **POST** `/budgets`
- **Body**:
  ```json
  {
    "category": "groceries",
    "limit": 500.00,
    "month": "2024-01-01"
  }
  ```
- **Response** (201): Created budget

### Update Budget
- **PUT** `/budgets/:id`
- **Body**: Partial budget object
- **Response** (200): Updated budget

### Delete Budget
- **DELETE** `/budgets/:id`
- **Response** (200): Success message

---

## Savings Goals Endpoints

### Get All Goals
- **GET** `/goals`
- **Response** (200): Array of goal objects

### Get Single Goal
- **GET** `/goals/:id`
- **Response** (200): Goal object

### Create Goal
- **POST** `/goals`
- **Body**:
  ```json
  {
    "name": "Vacation Fund",
    "description": "Summer vacation",
    "targetAmount": 5000.00,
    "deadline": "2024-06-01",
    "priority": "high"
  }
  ```
- **Response** (201): Created goal

### Update Goal
- **PUT** `/goals/:id`
- **Body**: Partial goal object
- **Response** (200): Updated goal

### Delete Goal
- **DELETE** `/goals/:id`
- **Response** (200): Success message

---

## Insights & Analytics Endpoints

### Get Dashboard
- **GET** `/dashboard`
- **Response** (200):
  ```json
  {
    "totalIncome": 5000.00,
    "totalExpenses": 3000.00,
    "totalSpent": 3000.00,
    "totalSaved": 2000.00,
    "savingsRate": 40,
    "budgetAlert": 25,
    "spendingByCategory": [
      {
        "category": "groceries",
        "amount": 500.00
      }
    ],
    "transactionCount": 25
  }
  ```

### Get Insights
- **GET** `/insights`
- **Response** (200): Array of insight objects

### Get Predictions
- **GET** `/predictions?days=30`
- **Query Parameters**:
  - `days` (optional): Number of days to predict (default: 30)
- **Response** (200): Array of prediction objects

### Get Spending Trends
- **GET** `/trends`
- **Response** (200): Array of trend data by month and category

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid token"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "message": "Email already registered"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. In production, implement rate limiting to prevent abuse.

## Pagination

Use `limit` and `offset` query parameters for pagination:
- Default limit: 20
- Maximum limit: 100

## Timestamps

All timestamps are in ISO 8601 format (UTC):
```
2024-01-15T10:30:00Z
```
