const mongoose = require("mongoose");
const User = require("./models/user"); // Adjust the path to your User model
const Portfolio = require("./models/portfolio"); // Adjust the path to your Portfolio model
const Transaction = require("./models/transaction"); // Adjust the path to your Transaction model

const fs = require("fs");
const path = require("path");

// Path to your data file
const dataFilePath = path.join(__dirname, "data.json");

const mydata = [
    {
      "_id": "673e806c5279c53ba1ae03bc",
      "name": "Alice Smith",
      "email": "alice.smith@example.com",
      "createdAt": "2024-11-21T00:35:56.620Z",
      "portfolio": {
        "_id": "673e806c5279c53ba1ae03bd",
        "userId": "673e806c5279c53ba1ae03bc",
        "name": "My Portfolio",
        "createdAt": "2024-11-21T00:35:56.621Z",
        "updatedAt": "2024-11-21T00:35:56.621Z",
        "transactions": [
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "GOOGL",
            "type": "buy",
            "quantity": 100,
            "purchasePrice": 293.82,
            "totalValue": 29382,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "UNH",
            "type": "buy",
            "quantity": 94,
            "purchasePrice": 215.85,
            "totalValue": 20289.9,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "AAPL",
            "type": "buy",
            "quantity": 93,
            "purchasePrice": 337.49,
            "totalValue": 31386.57,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "AMZN",
            "type": "buy",
            "quantity": 81,
            "purchasePrice": 531.4,
            "totalValue": 43043.4,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "VZ",
            "type": "buy",
            "quantity": 84,
            "purchasePrice": 49.72,
            "totalValue": 4176.48,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "NFLX",
            "type": "buy",
            "quantity": 67,
            "purchasePrice": 525.67,
            "totalValue": 35219.89,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "V",
            "type": "buy",
            "quantity": 68,
            "purchasePrice": 803.32,
            "totalValue": 54625.76,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "BRK.B",
            "type": "buy",
            "quantity": 49,
            "purchasePrice": 819.96,
            "totalValue": 40178.04,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "NFLX",
            "type": "buy",
            "quantity": 64,
            "purchasePrice": 145.68,
            "totalValue": 9323.52,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "AAPL",
            "type": "buy",
            "quantity": 38,
            "purchasePrice": 908.25,
            "totalValue": 34513.5,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "MA",
            "type": "buy",
            "quantity": 42,
            "purchasePrice": 4.75,
            "totalValue": 199.5,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "V",
            "type": "buy",
            "quantity": 38,
            "purchasePrice": 176.57,
            "totalValue": 6709.66,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "META",
            "type": "buy",
            "quantity": 77,
            "purchasePrice": 61.85,
            "totalValue": 4762.45,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "JPM",
            "type": "buy",
            "quantity": 28,
            "purchasePrice": 706.42,
            "totalValue": 19779.76,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bd",
            "stockId": "BRK.B",
            "type": "buy",
            "quantity": 56,
            "purchasePrice": 258.32,
            "totalValue": 14465.92,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          }
        ]
      }
    },
    {
      "_id": "673e806c5279c53ba1ae03be",
      "name": "Bob Johnson",
      "email": "bob.johnson@example.com",
      "createdAt": "2024-11-21T00:35:56.621Z",
      "portfolio": {
        "_id": "673e806c5279c53ba1ae03bf",
        "userId": "673e806c5279c53ba1ae03be",
        "name": "My Portfolio",
        "createdAt": "2024-11-21T00:35:56.621Z",
        "updatedAt": "2024-11-21T00:35:56.621Z",
        "transactions": [
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "BRK.B",
            "type": "buy",
            "quantity": 22,
            "purchasePrice": 688.42,
            "totalValue": 15145.24,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "GOOGL",
            "type": "buy",
            "quantity": 7,
            "purchasePrice": 627.77,
            "totalValue": 4394.39,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "BRK.B",
            "type": "buy",
            "quantity": 60,
            "purchasePrice": 38.14,
            "totalValue": 2288.4,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "META",
            "type": "buy",
            "quantity": 10,
            "purchasePrice": 454.38,
            "totalValue": 4543.8,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "NFLX",
            "type": "buy",
            "quantity": 33,
            "purchasePrice": 439.28,
            "totalValue": 14496.24,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "KO",
            "type": "buy",
            "quantity": 31,
            "purchasePrice": 120.2,
            "totalValue": 3726.2,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "JPM",
            "type": "buy",
            "quantity": 55,
            "purchasePrice": 489.7,
            "totalValue": 26933.5,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "VZ",
            "type": "buy",
            "quantity": 14,
            "purchasePrice": 36.03,
            "totalValue": 504.42,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "META",
            "type": "buy",
            "quantity": 79,
            "purchasePrice": 521.21,
            "totalValue": 41175.59,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "V",
            "type": "buy",
            "quantity": 25,
            "purchasePrice": 958.93,
            "totalValue": 23973.25,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "VZ",
            "type": "buy",
            "quantity": 87,
            "purchasePrice": 293.85,
            "totalValue": 25564.95,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "UNH",
            "type": "buy",
            "quantity": 2,
            "purchasePrice": 906.29,
            "totalValue": 1812.58,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "AMZN",
            "type": "buy",
            "quantity": 23,
            "purchasePrice": 805.96,
            "totalValue": 18537.08,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "NFLX",
            "type": "buy",
            "quantity": 97,
            "purchasePrice": 529.86,
            "totalValue": 51396.42,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03bf",
            "stockId": "META",
            "type": "buy",
            "quantity": 54,
            "purchasePrice": 758.62,
            "totalValue": 40965.48,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          }
        ]
      }
    },
    {
      "_id": "673e806c5279c53ba1ae03c0",
      "name": "Charlie Brown",
      "email": "charlie.brown@example.com",
      "createdAt": "2024-11-21T00:35:56.621Z",
      "portfolio": {
        "_id": "673e806c5279c53ba1ae03c1",
        "userId": "673e806c5279c53ba1ae03c0",
        "name": "My Portfolio",
        "createdAt": "2024-11-21T00:35:56.621Z",
        "updatedAt": "2024-11-21T00:35:56.621Z",
        "transactions": [
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "TSLA",
            "type": "buy",
            "quantity": 65,
            "purchasePrice": 885.44,
            "totalValue": 57553.6,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "META",
            "type": "buy",
            "quantity": 92,
            "purchasePrice": 940.57,
            "totalValue": 86532.44,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "XOM",
            "type": "buy",
            "quantity": 88,
            "purchasePrice": 206.12,
            "totalValue": 18138.56,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "GOOGL",
            "type": "buy",
            "quantity": 59,
            "purchasePrice": 286.38,
            "totalValue": 16896.42,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "VZ",
            "type": "buy",
            "quantity": 68,
            "purchasePrice": 259.17,
            "totalValue": 17623.56,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "MA",
            "type": "buy",
            "quantity": 37,
            "purchasePrice": 782.55,
            "totalValue": 28954.35,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "META",
            "type": "buy",
            "quantity": 68,
            "purchasePrice": 871.85,
            "totalValue": 59285.8,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "JNJ",
            "type": "buy",
            "quantity": 97,
            "purchasePrice": 831.8,
            "totalValue": 80684.6,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "META",
            "type": "buy",
            "quantity": 27,
            "purchasePrice": 535.39,
            "totalValue": 14455.53,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "NVDA",
            "type": "buy",
            "quantity": 46,
            "purchasePrice": 259.62,
            "totalValue": 11942.52,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "DIS",
            "type": "buy",
            "quantity": 95,
            "purchasePrice": 361.55,
            "totalValue": 34347.25,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "HD",
            "type": "buy",
            "quantity": 24,
            "purchasePrice": 699.16,
            "totalValue": 16779.84,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "MA",
            "type": "buy",
            "quantity": 57,
            "purchasePrice": 446.66,
            "totalValue": 25459.62,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "HD",
            "type": "buy",
            "quantity": 15,
            "purchasePrice": 254.64,
            "totalValue": 3819.6,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          },
          {
            "portfolioId": "673e806c5279c53ba1ae03c1",
            "stockId": "JPM",
            "type": "buy",
            "quantity": 65,
            "purchasePrice": 736.88,
            "totalValue": 47897.2,
            "transactionDate": "2024-11-21T00:35:56.621Z",
            "createdAt": "2024-11-21T00:35:56.621Z"
          }
        ]
      }
    }
  ]

// MongoDB connection string
const mongoURI = "mongodb://localhost:27017/your-database-name"; // Replace with your MongoDB URI

const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Read the data file
    const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

    for (const userData of data) {
      // Insert user
      const user = await User.create({
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        createdAt: userData.createdAt,
      });

      console.log(`Inserted user: ${user.name}`);

      // Insert portfolio
      const portfolio = await Portfolio.create({
        _id: userData.portfolio._id,
        userId: user._id,
        name: userData.portfolio.name,
        createdAt: userData.portfolio.createdAt,
        updatedAt: userData.portfolio.updatedAt,
      });

      console.log(`Inserted portfolio for user: ${user.name}`);

      // Insert transactions
      for (const transactionData of userData.portfolio.transactions) {
        await Transaction.create({
          portfolioId: portfolio._id,
          stockId: transactionData.stockId,
          type: transactionData.type,
          quantity: transactionData.quantity,
          purchasePrice: transactionData.purchasePrice,
          totalValue: transactionData.totalValue,
          transactionDate: new Date(transactionData.transactionDate),
          createdAt: new Date(transactionData.createdAt),
        });
      }

      console.log(
        `Inserted ${userData.portfolio.transactions.length} transactions for portfolio: ${portfolio.name}`
      );
    }

    console.log("All data imported successfully!");
    process.exit();
  } catch (err) {
    console.error("Error importing data:", err);
    process.exit(1);
  }
};

importData();
