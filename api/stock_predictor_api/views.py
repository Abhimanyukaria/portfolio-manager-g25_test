# Required imports
import os
import pandas as pd
from datetime import datetime, timedelta
import yfinance as yf
from django.http import JsonResponse, HttpResponse
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.optimizers import Adam
from tensorflow.keras import layers

# Data preprocessing utilities
def str_to_datetime(s):
    # Convert date string to datetime object
    split = s.split('-')
    year, month, day = int(split[0]), int(split[1]), int(split[2].split(' ')[0])
    return datetime.datetime(year, month, day)

def df_to_windowed_df(dataframe, n=3):
    # Create sliding window of stock data for LSTM input
    dates, X, Y = [], [], []
    for i in range(n, len(dataframe)):
        x = dataframe['Close'].iloc[i-n:i].to_numpy()
        y = dataframe['Close'].iloc[i]
        dates.append(dataframe.index[i])
        X.append(x)
        Y.append(y)

    ret_df = pd.DataFrame({})
    ret_df['Target Date'] = dates
    X = np.array(X)
    for i in range(0, n):
        ret_df[f'Target-{n-i}'] = X[:, i]
    ret_df['Target'] = Y
    return ret_df

def windowed_df_to_date_X_y(windowed_dataframe):
    # Prepare data for model training
    df_as_np = windowed_dataframe.to_numpy()
    dates = df_as_np[:, 0]
    middle_matrix = df_as_np[:, 1:-1]
    X = middle_matrix.reshape((len(dates), middle_matrix.shape[1], 1))
    Y = df_as_np[:, -1]
    return dates, X.astype(np.float32), Y.astype(np.float32)

# Global variables
predictions_dict = {'MSFT':415.45,'ABNB':400}  # Store predictions
folder_name = "stock_data"  # Data storage location
n = 3  # Window size

# API endpoints
def index(request):
    return HttpResponse("Your are index page")

def prediction(request, symbol):
    return HttpResponse(f"{predictions_dict[symbol]}")

def update(request):
    # Update predictions for all stocks
    for file_name in os.listdir(folder_name):
        symbol = file_name.split(".")[0]
        try:
            # Prepare data
            file_path = os.path.join(folder_name, file_name)
            df = pd.read_csv(file_path)
            df = df[['Date', 'Close']]
            df['Date'] = df['Date'].apply(str_to_datetime)
            df.index = df.pop('Date')
            
            # Create LSTM input
            windowed_df = df_to_windowed_df(df, n=n)
            dates, X, y = windowed_df_to_date_X_y(windowed_df)
            
            # Define and train model
            model = Sequential([
                layers.Input((n, 1)),
                layers.LSTM(64),
                layers.Dense(32, activation='relu'),
                layers.Dense(32, activation='relu'),
                layers.Dense(1)
            ])
            model.compile(loss='mse',
                        optimizer=Adam(learning_rate=0.001),
                        metrics=['mean_absolute_error'])
            model.fit(X, y, epochs=100, verbose=0)

            # Make prediction
            last_n_days = df['Close'].iloc[-n:].to_numpy().reshape(1, n, 1)
            predictions_dict[symbol] = model.predict(last_n_days).flatten()[0]
        except Exception as e:
            print(f"Error processing {symbol}: {e}")
    return HttpResponse("All predictions are updated successfully")

def get_data(request):
    # Download S&P 500 stock data
    wiki_url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    sp500_df = pd.read_html(wiki_url)[0]
    tickers = sp500_df['Symbol'].tolist()
    
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
        
    for ticker in tickers:
        try:
            stock_data = yf.download(ticker, period="max")
            if not stock_data.empty:
                stock_data.to_csv(os.path.join(folder_name, f"{ticker}.csv"))
        except Exception as e:
            print(f"Error fetching data for {ticker}: {e}")
    return HttpResponse("Data fetching completed.")

def process_data(request):
    # Standardize CSV files
    header_row = ["Date", "Adj Close", "Close", "High", "Low", "Open", "Volume"]
    for file_name in os.listdir(folder_name):
        if file_name.endswith(".csv"):
            try:
                file_path = os.path.join(folder_name, file_name)
                df = pd.read_csv(file_path, skiprows=3, header=None)
                df.columns = header_row
                df.to_csv(file_path, index=False)
            except Exception as e:
                print(f"Error processing {file_name}: {e}")
    return HttpResponse("Data processed successfully")