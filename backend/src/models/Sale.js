const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    'Transaction ID': { type: String, required: true, unique: true },
    'Date': { type: Date, required: true },
    'Customer ID': String,
    'Customer Name': String,
    'Phone Number': String,
    'Gender': String,
    'Age': Number,
    'Customer Region': String,
    'Customer Type': String,
    'Product ID': String,
    'Product Name': String,
    'Brand': String,
    'Product Category': String,
    'Tags': String, // Keeping as comma-separated string for simplicity in migration, or could be [String]
    'Quantity': Number,
    'Price per Unit': Number,
    'Discount Percentage': Number,
    'Total Amount': Number,
    'Final Amount': Number,
    'Payment Method': String,
    'Order Status': String,
    'Delivery Type': String,
    'Store ID': String,
    'Store Location': String,
    'Salesperson ID': String,
    'Employee Name': String
});

// Indexes for performance
saleSchema.index({ 'Customer Name': 'text', 'Phone Number': 'text' });
saleSchema.index({ 'Customer Region': 1 });
saleSchema.index({ 'Gender': 1 });
saleSchema.index({ 'Product Category': 1 });
saleSchema.index({ 'Payment Method': 1 });
saleSchema.index({ 'Date': -1 });

module.exports = mongoose.model('Sale', saleSchema);
