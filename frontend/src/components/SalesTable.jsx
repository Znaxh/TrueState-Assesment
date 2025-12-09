import React from 'react';
import '../components.css';

const SalesTable = ({ data, sortConfig, onSort }) => {
    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
        }
        return '';
    };

    if (data.length === 0) {
        return <div className="no-results card">No records found.</div>;
    }

    return (
        <div className="table-container">
            <table className="sales-table">
                <thead>
                    <tr>
                        <th onClick={() => onSort('Transaction ID')}>Transaction ID{getSortIndicator('Transaction ID')}</th>
                        <th onClick={() => onSort('Date')}>Date{getSortIndicator('Date')}</th>
                        <th onClick={() => onSort('Customer ID')}>Customer ID{getSortIndicator('Customer ID')}</th>
                        <th onClick={() => onSort('Customer Name')}>Customer name{getSortIndicator('Customer Name')}</th>
                        <th onClick={() => onSort('Phone Number')}>Phone Number{getSortIndicator('Phone Number')}</th>
                        <th onClick={() => onSort('Gender')}>Gender{getSortIndicator('Gender')}</th>
                        <th onClick={() => onSort('Age')}>Age{getSortIndicator('Age')}</th>
                        <th onClick={() => onSort('Product Category')}>Product Category{getSortIndicator('Product Category')}</th>
                        <th onClick={() => onSort('Quantity')}>Quantity{getSortIndicator('Quantity')}</th>
                        <th onClick={() => onSort('Total Amount')}>Total Amount{getSortIndicator('Total Amount')}</th>
                        <th onClick={() => onSort('Customer Region')}>Customer region{getSortIndicator('Customer Region')}</th>
                        <th onClick={() => onSort('Product ID')}>Product ID{getSortIndicator('Product ID')}</th>
                        <th onClick={() => onSort('Employee Name')}>Employee name{getSortIndicator('Employee Name')}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row['Transaction ID']}>
                            <td className="transaction-id">{row['Transaction ID']}</td>
                            <td className="date-cell">{row['Date'].split('T')[0]}</td>
                            <td>{row['Customer ID']}</td>
                            <td className="customer-name">{row['Customer Name']}</td>
                            <td>
                                <div className="phone-cell">
                                    <span>+91 {row['Phone Number']}</span>
                                    <img
                                        src="/copy_button.png"
                                        alt="Copy"
                                        className="copy-icon"
                                        onClick={() => navigator.clipboard.writeText(`+91 ${row['Phone Number']}`)}
                                    />
                                </div>
                            </td>
                            <td>{row['Gender']}</td>
                            <td>{row['Age']}</td>
                            <td className="bold-dark-cell">{row['Product Category']}</td>
                            <td className="bold-dark-cell">{row['Quantity']}</td>
                            <td className="bold-dark-cell">₹{row['Total Amount']}</td>
                            <td className="bold-dark-cell">{row['Customer Region']}</td>
                            <td className="bold-dark-cell">{row['Product ID']}</td>
                            <td className="bold-dark-cell">{row['Employee Name']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
