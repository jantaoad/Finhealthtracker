# FinHealthTracker - Database Schema

## Database Design

The database uses PostgreSQL with Sequelize ORM. Below is the schema for all tables.

## Tables

### users
- **id**: UUID (Primary Key)
- **name**: String - User's full name
- **email**: String (Unique) - User's email address
- **password**: String - Hashed password
- **avatar**: String (Nullable) - User's avatar URL
- **preferences**: JSONB - User preferences (currency, theme, language)
- **createdAt**: Timestamp
- **updatedAt**: Timestamp

### transactions
- **id**: UUID (Primary Key)
- **userId**: UUID (Foreign Key -> users.id)
- **amount**: Decimal(10,2) - Transaction amount
- **description**: String - Transaction description
- **category**: String - Transaction category
- **type**: Enum (income, expense)
- **date**: Timestamp - Transaction date
- **tags**: JSONB - Associated tags
- **notes**: Text (Nullable) - Additional notes
- **createdAt**: Timestamp

### categories
- **id**: UUID (Primary Key)
- **name**: String (Unique) - Category name
- **color**: String - Hex color code
- **icon**: String - Emoji or icon
- **description**: Text (Nullable)

### budgets
- **id**: UUID (Primary Key)
- **userId**: UUID (Foreign Key -> users.id)
- **category**: String - Budget category
- **limit**: Decimal(10,2) - Budget limit
- **spent**: Decimal(10,2) - Amount spent so far
- **month**: Date - Budget month
- **createdAt**: Timestamp

### savings_goals
- **id**: UUID (Primary Key)
- **userId**: UUID (Foreign Key -> users.id)
- **name**: String - Goal name
- **description**: Text (Nullable)
- **targetAmount**: Decimal(10,2) - Goal target amount
- **savedAmount**: Decimal(10,2) - Current saved amount
- **deadline**: Date - Goal deadline
- **priority**: Enum (low, medium, high)
- **status**: Enum (active, completed, abandoned)
- **createdAt**: Timestamp

### financial_insights
- **id**: UUID (Primary Key)
- **userId**: UUID (Foreign Key -> users.id)
- **title**: String - Insight title
- **description**: Text - Insight description
- **type**: Enum (warning, tip, achievement, goal)
- **priority**: Enum (low, medium, high)
- **read**: Boolean - Whether user has read this
- **actionable**: Boolean - Whether action can be taken
- **metadata**: JSONB - Additional metadata
- **createdAt**: Timestamp

### spending_predictions
- **id**: UUID (Primary Key)
- **userId**: UUID (Foreign Key -> users.id)
- **category**: String - Category for prediction
- **predictedAmount**: Decimal(10,2) - Predicted amount
- **confidence**: Decimal(5,2) - Confidence percentage (0-100)
- **period**: String - Prediction period (e.g., "30days")
- **forecastDate**: Date - Forecast date
- **createdAt**: Timestamp

## Relationships

- User ↔ Transaction (1-to-many)
- User ↔ Budget (1-to-many)
- User ↔ SavingsGoal (1-to-many)
- User ↔ FinancialInsight (1-to-many)
- User ↔ SpendingPrediction (1-to-many)

## Notes

- All monetary values are stored as DECIMAL(10,2) for precision
- Timestamps use UTC
- UUIDs are used for primary keys for better security
- JSONB is used for flexible data storage (preferences, metadata)
