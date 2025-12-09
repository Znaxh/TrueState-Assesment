import React, { useState, useEffect } from 'react';
import '../components.css';

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(term);
        }, 300);
        return () => clearTimeout(timer);
    }, [term, onSearch]);

    return (
        <div className="search-bar">
            <img src="/search_button.png" alt="Search" className="search-icon" />
            <input
                type="text"
                placeholder="Name, Phone no."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
