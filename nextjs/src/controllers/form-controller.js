function validateInvestment(input) {
    const { stockId, quantity, purchasePrice, transactionDate } = input;

    // Check if all fields are provided
    if (!stockId || !quantity || !purchasePrice || !transactionDate) {
        return { success: false, error: "All fields (stockId, quantity, purchasePrice, transactionDate) are required." };
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

// Example Usage
const investment = {
    stockId: "AAPL",
    quantity: 10,
    purchasePrice: 150.5,
    transactionDate: "2024-11-23", // Change to a future date to see the error
};

const result = validateInvestment(investment);
console.log(result);
