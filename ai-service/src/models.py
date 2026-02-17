import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os
from datetime import datetime, timedelta

class CategoryClassifier:
    """Machine learning model for transaction categorization"""
    
    def __init__(self, model_path='models/category_classifier.pkl'):
        self.model_path = model_path
        self.model = None
        self.label_encoders = {}
        self.feature_names = ['amount', 'description_length', 'hour', 'day_of_week']
        self.categories = [
            'groceries', 'dining', 'entertainment', 'transportation',
            'utilities', 'healthcare', 'shopping', 'savings', 'other'
        ]
        self.load_or_train()
    
    def load_or_train(self):
        """Load existing model or train a new one"""
        if os.path.exists(self.model_path):
            try:
                self.model = joblib.load(self.model_path)
                print(f"✅ Loaded model from {self.model_path}")
            except Exception as e:
                print(f"⚠️ Failed to load model: {e}. Training new model...")
                self._train_model()
        else:
            self._train_model()
    
    def _train_model(self):
        """Train a new classification model with sample data"""
        # Generate training data
        np.random.seed(42)
        n_samples = 1000
        
        X_data = []
        y_data = []
        
        descriptions = {
            'groceries': ['whole foods', 'trader joe', 'walmart', 'costco', 'kroger'],
            'dining': ['restaurant', 'chipotle', 'mcdonalds', 'cafe', 'pizza'],
            'entertainment': ['cinema', 'spotify', 'netflix', 'movie', 'game'],
            'transportation': ['uber', 'gas', 'metro', 'parking', 'lyft'],
            'utilities': ['electric', 'water', 'gas bill', 'internet', 'phone'],
            'healthcare': ['pharmacy', 'doctor', 'hospital', 'medical', 'clinic'],
            'shopping': ['amazon', 'mall', 'clothing', 'store', 'shop'],
            'savings': ['transfer', 'savings', 'investment', 'deposit'],
            'other': ['misc', 'subscription', 'other', 'purchase']
        }
        
        for category, words in descriptions.items():
            for _ in range(len(words) * 12):
                amount = np.random.uniform(5, 500)
                desc = np.random.choice(words)
                desc_len = len(desc)
                hour = np.random.randint(0, 24)
                day = np.random.randint(0, 7)
                
                X_data.append([amount, desc_len, hour, day])
                y_data.append(category)
        
        X = np.array(X_data)
        y = np.array(y_data)
        
        # Train random forest
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X, y)
        
        # Save model
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
        joblib.dump(self.model, self.model_path)
        print(f"✅ Model trained and saved to {self.model_path}")
    
    def extract_features(self, amount, description, date=None):
        """Extract features from transaction data"""
        if date is None:
            date = datetime.now()
        
        hour = date.hour if hasattr(date, 'hour') else datetime.now().hour
        day_of_week = date.weekday() if hasattr(date, 'weekday') else datetime.now().weekday()
        
        return [
            amount,
            len(description),
            hour,
            day_of_week
        ]
    
    def predict(self, amount, description, date=None):
        """Predict transaction category"""
        if self.model is None:
            return 'other'
        
        features = self.extract_features(amount, description, date)
        features_array = np.array([features])
        
        prediction = self.model.predict(features_array)[0]
        probabilities = self.model.predict_proba(features_array)[0]
        confidence = float(max(probabilities))
        
        return {
            'category': str(prediction),
            'confidence': confidence,
            'all_predictions': {
                self.model.classes_[i]: float(prob)
                for i, prob in enumerate(probabilities)
            }
        }


class SpendingPredictor:
    """ML model for spending prediction"""
    
    def __init__(self):
        self.model = None
    
    def predict_spending(self, user_spending_history, days=30):
        """Predict future spending for specified number of days"""
        if not user_spending_history:
            return []
        
        predictions = []
        df = pd.DataFrame(user_spending_history)
        
        # Group by category and calculate averages
        category_stats = df.groupby('category').agg({
            'amount': ['mean', 'std', 'sum'],
            'date': 'count'
        }).reset_index()
        
        # Generate predictions
        for idx, (category, group) in enumerate(df.groupby('category')):
            avg_amount = float(group['amount'].mean())
            frequency = len(group) / max((df['date'].max() - df['date'].min()).days, 1)
            
            predicted_amount = avg_amount * frequency * days
            confidence = min(0.95, 0.5 + (len(group) * 0.05))
            
            forecast_date = datetime.now() + timedelta(days=days)
            
            predictions.append({
                'category': category,
                'predicted_amount': round(predicted_amount, 2),
                'confidence': round(confidence, 2),
                'frequency': round(frequency, 3),
                'forecast_date': forecast_date.isoformat()
            })
        
        return predictions
    
    def recommend_budget(self, spending_history, savings_goal_rate=0.20):
        """Recommend budget based on spending history"""
        if not spending_history:
            return {}
        
        df = pd.DataFrame(spending_history)
        recommendations = {}
        
        total_spending = df['amount'].sum()
        
        for category, group in df.groupby('category'):
            category_total = group['amount'].sum()
            percentage = (category_total / total_spending) * 100
            recommended = category_total * 0.95  # Reduce by 5%
            
            recommendations[category] = {
                'current_spending': round(float(category_total), 2),
                'percentage': round(float(percentage), 2),
                'recommended_budget': round(float(recommended), 2)
            }
        
        return recommendations
