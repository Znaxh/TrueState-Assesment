import React, { useState, useEffect, useRef } from 'react';
import '../components.css';

const FilterDropdown = ({ label, options, selected, onChange, multiple = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOptionClick = (option) => {
        let newSelected;
        if (multiple) {
            newSelected = selected.includes(option)
                ? selected.filter(item => item !== option)
                : [...selected, option];
        } else {
            newSelected = [option];
            setIsOpen(false);
        }
        onChange(newSelected);
    };

    return (
        <div className="filter-dropdown" ref={dropdownRef}>
            <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
                {label} <img src="/arrow.png" alt="v" className={`arrow-icon ${isOpen ? 'rotated' : ''}`} />
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    {options.map(option => (
                        <label key={option} className="dropdown-item">
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() => handleOptionClick(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

const DateFilterDropdown = ({ selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [startDate, setStartDate] = useState(selected.start || '');
    const [endDate, setEndDate] = useState(selected.end || '');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleApply = () => {
        onChange({ start: startDate, end: endDate });
        setIsOpen(false);
    };

    const handleClear = () => {
        setStartDate('');
        setEndDate('');
        onChange({ start: '', end: '' });
        setIsOpen(false);
    };

    return (
        <div className="filter-dropdown" ref={dropdownRef}>
            <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
                Date <img src="/arrow.png" alt="v" className={`arrow-icon ${isOpen ? 'rotated' : ''}`} />
            </button>
            {isOpen && (
                <div className="dropdown-content" style={{ padding: '1rem', width: '250px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', color: '#64748b' }}>Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #e2e8f0', width: '100%' }}
                        />
                        <label style={{ fontSize: '0.85rem', color: '#64748b' }}>End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #e2e8f0', width: '100%' }}
                        />
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <button
                                onClick={handleApply}
                                style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    backgroundColor: '#1e293b',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Apply
                            </button>
                            <button
                                onClick={handleClear}
                                style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    backgroundColor: '#f1f5f9',
                                    color: '#64748b',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const FilterBar = ({ options, selectedFilters, onFilterChange, onSortChange, sortConfig, onRefresh }) => {
    return (
        <div className="filter-bar">
            <div className="filter-group-horizontal">
                <button className="refresh-btn" onClick={onRefresh}>
                    <img src="/refresh_button.png" alt="Refresh" />
                </button>

                <FilterDropdown
                    label="Customer Region"
                    options={options.regions}
                    selected={selectedFilters.region}
                    onChange={(val) => onFilterChange('region', val)}
                />

                <FilterDropdown
                    label="Gender"
                    options={options.genders}
                    selected={selectedFilters.gender}
                    onChange={(val) => onFilterChange('gender', val)}
                />

                <FilterDropdown
                    label="Age Range"
                    options={['0-18', '19-25', '26-35', '36-45', '46-60', '60+']}
                    selected={selectedFilters.age_range}
                    onChange={(val) => onFilterChange('age_range', val)}
                    multiple={false}
                />

                <FilterDropdown
                    label="Product Category"
                    options={options.categories}
                    selected={selectedFilters.category}
                    onChange={(val) => onFilterChange('category', val)}
                />

                <FilterDropdown
                    label="Tags"
                    options={options.tags}
                    selected={selectedFilters.tags}
                    onChange={(val) => onFilterChange('tags', val)}
                />

                <FilterDropdown
                    label="Payment Method"
                    options={options.payment_methods}
                    selected={selectedFilters.payment_method}
                    onChange={(val) => onFilterChange('payment_method', val)}
                />

                <DateFilterDropdown
                    selected={selectedFilters.date_range}
                    onChange={(val) => onFilterChange('date_range', val)}
                />
            </div>

            <div className="sort-group">
                <div className="sort-select-wrapper">
                    <span className="sort-prefix">Sort by:</span>
                    <select
                        className="sort-select"
                        value={sortConfig.sort_by}
                        onChange={(e) => onSortChange(e.target.value)}
                    >
                        <option value="Date">Date</option>
                        <option value="Customer Name">Customer Name (A-Z)</option>
                        <option value="Total Amount">Total Amount</option>
                        <option value="Quantity">Quantity</option>
                    </select>
                    <img src="/arrow.png" alt="v" className="arrow-icon sort-arrow" />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
