import logging
from flask import Flask, request, jsonify
from datetime import datetime
from src.config import config
from src.models import CategoryClassifier, SpendingPredictor

logger = logging.getLogger(__name__)

app = Flask(__name__)

# Initialize models
category_classifier = CategoryClassifier()
spending_predictor = SpendingPredictor()


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'service': 'FinHealthTracker AI Service',
        'version': '1.0.0',
        'timestamp': datetime.now().isoformat()
    })


@app.route('/api/v1/categorize', methods=['POST'])
def categorize_transaction():
    """Categorize a transaction"""
    try:
        data = request.json
        
        if not data or 'amount' not in data or 'description' not in data:
            return jsonify({'error': 'Missing required fields: amount, description'}), 400
        
        amount = float(data['amount'])
        description = str(data['description']).lower()
        date = data.get('date')
        
        result = category_classifier.predict(amount, description, date)
        
        return jsonify({
            'success': True,
            'data': result
        })
    except Exception as e:
        logger.error(f"Categorization error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/v1/bulk-categorize', methods=['POST'])
def bulk_categorize():
    """Categorize multiple transactions"""
    try:
        data = request.json
        
        if not data or 'transactions' not in data:
            return jsonify({'error': 'Missing transactions array'}), 400
        
        transactions = data['transactions']
        results = []
        
        for transaction in transactions:
            try:
                result = category_classifier.predict(
                    float(transaction['amount']),
                    str(transaction['description']).lower(),
                    transaction.get('date')
                )
                results.append({
                    'transaction_id': transaction.get('id'),
                    'category': result['category'],
                    'confidence': result['confidence']
                })
            except Exception as e:
                logger.warning(f"Error categorizing transaction: {str(e)}")
                results.append({
                    'transaction_id': transaction.get('id'),
                    'error': str(e)
                })
        
        return jsonify({
            'success': True,
            'categorized': len(results),
            'data': results
        })
    except Exception as e:
        logger.error(f"Bulk categorization error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/v1/predict-spending', methods=['POST'])
def predict_spending():
    """Predict future spending"""
    try:
        data = request.json
        
        if not data or 'transactions' not in data:
            return jsonify({'error': 'Missing transactions array'}), 400
        
        transactions = data['transactions']
        days = data.get('days', 30)
        
        predictions = spending_predictor.predict_spending(transactions, days)
        
        return jsonify({
            'success': True,
            'days': days,
            'predictions': predictions
        })
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/v1/recommend-budget', methods=['POST'])
def recommend_budget():
    """Get budget recommendations"""
    try:
        data = request.json
        
        if not data or 'transactions' not in data:
            return jsonify({'error': 'Missing transactions array'}), 400
        
        transactions = data['transactions']
        savings_goal = data.get('savings_goal_rate', 0.20)
        
        recommendations = spending_predictor.recommend_budget(transactions, savings_goal)
        
        return jsonify({
            'success': True,
            'savings_goal_rate': savings_goal,
            'recommendations': recommendations
        })
    except Exception as e:
        logger.error(f"Budget recommendation error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/v1/generate-insights', methods=['POST'])
def generate_insights():
    """Generate financial insights"""
    try:
        data = request.json
        
        if not data or 'transactions' not in data:
            return jsonify({'error': 'Missing transactions array'}), 400
        
        transactions = data['transactions']
        budgets = data.get('budgets', {})
        goals = data.get('goals', [])
        
        insights = []
        
        # Analyze spending patterns
        if transactions:
            total_expense = sum(t['amount'] for t in transactions if t['type'] == 'expense')
            total_income = sum(t['amount'] for t in transactions if t['type'] == 'income')
            
            if total_income > 0:
                expense_ratio = (total_expense / total_income) * 100
                
                if expense_ratio > 80:
                    insights.append({
                        'type': 'warning',
                        'title': 'High Spending Alert',
                        'description': f'You are spending {expense_ratio:.1f}% of your income. Consider reducing expenses to maintain financial health.',
                        'priority': 'high'
                    })
                elif expense_ratio < 60:
                    insights.append({
                        'type': 'achievement',
                        'title': 'Great Savings Rate!',
                        'description': f'Only {expense_ratio:.1f}% of your income is being spent. You are on track for financial success!',
                        'priority': 'low'
                    })
            
            # Category-wise analysis
            categories = {}
            for t in transactions:
                if t['type'] == 'expense':
                    cat = t.get('category', 'other')
                    categories[cat] = categories.get(cat, 0) + t['amount']
            
            # Find highest spending category
            if categories:
                top_category = max(categories, key=categories.get)
                insights.append({
                    'type': 'tip',
                    'title': f'Review {top_category.capitalize()} Spending',
                    'description': f'Your highest spending category is {top_category} at ${categories[top_category]:.2f}. Look for opportunities to optimize.',
                    'priority': 'medium'
                })
        
        return jsonify({
            'success': True,
            'insights': insights
        })
    except Exception as e:
        logger.error(f"Insight generation error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=int(config.PORT),
        debug=(config.FLASK_ENV == 'development')
    )
