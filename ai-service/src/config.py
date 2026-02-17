import os
import logging
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Application configuration"""
    PORT = os.getenv('PORT', 5001)
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    BACKEND_URL = os.getenv('BACKEND_URL', 'http://localhost:5000/api')
    MODEL_PATH = os.getenv('MODEL_PATH', './models')
    
    # Set up logging
    logging.basicConfig(
        level=LOG_LEVEL,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
config = Config()
