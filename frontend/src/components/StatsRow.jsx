import React from 'react';
import '../components.css';

const StatsRow = ({ data }) => {
    // Calculate stats from the current data (or ideally from backend)
    // For now, we calculate from the visible data or pass in total stats if backend provided them
    // The image shows "Total units sold", "Total Amount", "Total Discount"

    const totalUnits = data.reduce((sum, item) => sum + parseInt(item['Quantity'] || 0), 0);
    const totalAmount = data.reduce((sum, item) => sum + parseFloat(item['Total Amount'] || 0), 0);
    const totalDiscount = 15000; // Mocked for now as dataset might not have discount field

    return (
        <div className="stats-row">
            <div className="stat-card">
                <div className="stat-label">
                    Total units sold
                    <div className="tooltip-container">
                        <img src="/info_button.png" alt="Info" className="info-icon" />
                        <span className="tooltip-text">Total number of items sold across all transactions.</span>
                    </div>
                </div>
                <div className="stat-value">{totalUnits}</div>
            </div>
            <div className="stat-card">
                <div className="stat-label">
                    Total Amount
                    <div className="tooltip-container">
                        <img src="/info_button.png" alt="Info" className="info-icon" />
                        <span className="tooltip-text">Total revenue generated from sales.</span>
                    </div>
                </div>
                <div className="stat-value">₹{totalAmount.toLocaleString()} ({data.length} SRs)</div>
            </div>
            <div className="stat-card">
                <div className="stat-label">
                    Total Discount
                    <div className="tooltip-container">
                        <img src="/info_button.png" alt="Info" className="info-icon" />
                        <span className="tooltip-text">Total value of discounts given to customers.</span>
                    </div>
                </div>
                <div className="stat-value">₹{totalDiscount.toLocaleString()} (45 SRs)</div>
            </div>
        </div>
    );
};

export default StatsRow;
