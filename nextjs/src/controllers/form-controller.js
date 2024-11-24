import fs from 'fs'

export function validateInvestment(input) {
    const { stockId, quantity, purchasePrice, transactionDate } = input;

    const stockData = JSON.parse(fs.readFileSync('./public/allstocks.json', 'utf8'));
    // Check if all fields are provided
    if (
        stockId === undefined || 
        quantity === undefined || 
        purchasePrice === undefined || 
        transactionDate === undefined
    ) {
        return { success: false, error: "All fields (stockId, quantity, purchasePrice, transactionDate) are required." };
    }

    const stockExists = stockData.companies.some(company => company.symbol === stockId);
    if (!stockExists) {
        return { success: false, error: "Requested Stock does not exist in the database." };
    }

    // Validate quantity
    if (quantity <= 0 || isNaN(quantity)) {
        return { success: false, error: "Quantity must be a positive number." };
    }

    // Validate purchase price
    if (purchasePrice <= 0 || isNaN(purchasePrice)) {
        return { success: false, error: "Purchase price must be a positive number." };
    }

    // Validate transaction date
    const date = new Date(transactionDate);
    const today = new Date();
    if (isNaN(date.getTime())) {
        return { success: false, error: "Invalid transaction date." };
    }

    if (date > today) {
        return { success: false, error: "Transaction date cannot be in the future." };
    }

    // If all validations pass
    return { success: true, message: "Input is valid." };
}
