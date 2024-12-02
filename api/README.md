# Stock Prediction & Portfolio Optimization API

A Django-based REST API that provides stock price predictions and portfolio optimization using machine learning and modern portfolio theory.

## Features

- Stock price prediction using LSTM neural networks
- Portfolio optimization using Sharpe Ratio
- S&P 500 stock data collection and processing
- Federal Reserve Economic Data (FRED) integration

## Prerequisites

- Python 3.8+
- pip package manager

## Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd portfolio-manager-g25
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r api/requirements.txt
   ```

## API Endpoints

### Stock Prediction
- `GET /prediction/<symbol>`
  - Returns next-day price prediction for given stock symbol
  - Example: `/prediction/AAPL`

### Portfolio Optimization
- `GET /get_weights/<tickers>`
  - Returns optimal portfolio weights for given comma-separated tickers
  - Example: `/get_weights/AAPL,MSFT,GOOGL`

### Utility Endpoints
- `GET /` - Index page
- `GET /clear_predictions/` - Clears prediction cache
- `GET /get_data/` - Fetches S&P 500 stock data
- `GET /process_data/` - Processes downloaded stock data

## Model Architecture

The stock prediction model uses:
- LSTM (Long Short-Term Memory) neural network
- Multiple dense layers for feature processing


## Development

1. Run migrations:
   ```bash
   python manage.py migrate
   ```

2. Start development server:
   ```bash
   python manage.py runserver
   ```


