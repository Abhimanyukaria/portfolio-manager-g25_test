import { expect } from "chai";
import { validateInvestment } from "../controllers/form-controller.js";

describe("validateInvestment Function", () => {
    it("should return success when all inputs are valid", () => {
        const input = {
            stockId: "AAPL",
            quantity: 10,
            purchasePrice: 150.5,
            transactionDate: "2024-11-23",
        };
        const result = validateInvestment(input);
        expect(result).to.deep.equal({ success: true, message: "Input is valid." });
    });

    it("should fail if stockId is missing", () => {
        const input = {
            quantity: 10,
            purchasePrice: 150.5,
            transactionDate: "2024-11-23",
        };
        const result = validateInvestment(input);
        expect(result).to.deep.equal({ success: false, error: "All fields (stockId, quantity, purchasePrice, transactionDate) are required." });
    });

    it("should fail if quantity is missing", () => {
        const input = {
            stockId: "AAPL",
            purchasePrice: 150.5,
            transactionDate: "2024-11-23",
        };
        const result = validateInvestment(input);
        expect(result).to.deep.equal({ success: false, error: "All fields (stockId, quantity, purchasePrice, transactionDate) are required." });
    });

    it("should fail if purchasePrice is missing", () => {
        const input = {
            stockId: "AAPL",
            quantity: 10,
            transactionDate: "2024-11-23",
        };
        const result = validateInvestment(input);
        expect(result).to.deep.equal({ success: false, error: "All fields (stockId, quantity, purchasePrice, transactionDate) are required." });
    });

    it("should fail if transactionDate is missing", () => {
        const input = {
            stockId: "AAPL",
            quantity: 10,
            purchasePrice: 150.5,
        };
        const result = validateInvestment(input);
        expect(result).to.deep.equal({ success: false, error: "All fields (stockId, quantity, purchasePrice, transactionDate) are required." });
    });

    it("should fail if requestedStock is not in our database",() =>{
        const input = {
            stockId: "TSX",
            quantity: 10,
            purchasePrice: 150.5,
            transactionDate: "2024-02-16"
        };
        const result = validateInvestment(input);
        expect(result).to.deep.equal({ success: false, error: "Requested Stock does not exist in the database." });
    })
    it("should fail if quantity is non-positive", () => {
        const input = {
            stockId: "ACN",
            quantity: 0,
            purchasePrice: 150.5,
            transactionDate: "2024-11-23",
        };
        const result = validateInvestment(input);
        expect(result).to.deep.equal({ success: false, error: "Quantity must be a positive number." });
    });

    it("should fail if purchasePrice is non-positive", () => {
        const input = {
            stockId: "ACN",
            quantity: 10,
            purchasePrice: -5,
            transactionDate: "2024-11-23",
        };
        const result = validateInvestment(input);
        expect(result).to.deep.equal({ success: false, error: "Purchase price must be a positive number." });
    });

    it("should fail if transactionDate is invalid", () => {
        const input = {
            stockId: "ADBE",
            quantity: 10,
            purchasePrice: 150.5,
            transactionDate: "invalid-date",
        };
        const result = validateInvestment(input);
        expect(result).to.deep.equal({ success: false, error: "Invalid transaction date." });
    });

    it("should fail if transactionDate is in the future", () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1); // Set to a future date
        const input = {
            stockId: "AMD",
            quantity: 10,
            purchasePrice: 150.5,
            transactionDate: futureDate.toISOString().split("T")[0],
        };
        const result = validateInvestment(input);
        expect(result).to.deep.equal({ success: false, error: "Transaction date cannot be in the future." });
    });
});
