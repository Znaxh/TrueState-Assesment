import React, { useState, useEffect, Suspense } from 'react';
import SearchBar from './components/SearchBar';
import StatsRow from './components/StatsRow';
import Pagination from './components/Pagination';
import Sidebar from './components/Sidebar';
import './App.css';

// Lazy load heavy components
const FilterBar = React.lazy(() => import('./components/FilterBar'));
const SalesTable = React.lazy(() => import('./components/SalesTable'));

function App() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });
    const [filters, setFilters] = useState({
        search: '',
        region: [],
        gender: [],
        age_range: [],
        category: [],
        payment_method: [],
        tags: [],
        date_range: { start: '', end: '' },
        sort_by: '',
        sort_order: 'asc'
    });
    const [filterOptions, setFilterOptions] = useState({
        regions: [],
        genders: [],
        categories: [],
        payment_methods: [],
        tags: []
    });

    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchFilterOptions();
    }, []);

    // Reset to page 1 is handled in event handlers now to avoid useEffect loops

    useEffect(() => {
        console.log("Fetching sales for page:", page);
        fetchSales();
    }, [page, filters.search, filters.sort_by, filters.sort_order, JSON.stringify(filters.region), JSON.stringify(filters.gender), JSON.stringify(filters.age_range), JSON.stringify(filters.category), JSON.stringify(filters.payment_method), JSON.stringify(filters.tags), filters.date_range.start, filters.date_range.end]);

    const fetchFilterOptions = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/filters`);
            const data = await res.json();
            setFilterOptions(data);
        } catch (err) {
            console.error("Failed to fetch filter options", err);
        }
    };

    const fetchSales = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: page,
                limit: 10,
                search: filters.search,
                sort_by: filters.sort_by,
                sort_order: filters.sort_order,
                ...(filters.region.length && { region: filters.region.join(',') }),
                ...(filters.gender.length && { gender: filters.gender.join(',') }),
                ...(filters.category.length && { category: filters.category.join(',') }),
                ...(filters.payment_method.length && { payment_method: filters.payment_method.join(',') }),
                ...(filters.tags.length && { tags: filters.tags.join(',') }),
                ...(filters.date_range.start && { date_start: filters.date_range.start }),
                ...(filters.date_range.end && { date_end: filters.date_range.end }),
            });

            // Handle Age Range
            if (filters.age_range.length > 0) {
                const range = filters.age_range[0];
                if (range === '60+') {
                    queryParams.append('age_min', '60');
                } else {
                    const [min, max] = range.split('-');
                    if (min) queryParams.append('age_min', min);
                    if (max) queryParams.append('age_max', max);
                }
            }

            const res = await fetch(`${API_BASE_URL}/api/sales?${queryParams}`);
            const data = await res.json();

            setSalesData(data.data);
            setPagination(data.pagination);
        } catch (err) {
            console.error("Failed to fetch sales data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (term) => {
        setFilters(prev => ({ ...prev, search: term }));
        setPage(1);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const handleSortChange = (field) => {
        setFilters(prev => ({
            ...prev,
            sort_by: field,
            sort_order: prev.sort_by === field && prev.sort_order === 'asc' ? 'desc' : 'asc'
        }));
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        console.log("handlePageChange called with:", newPage);
        setPage(newPage);
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content-wrapper">
                <div className="container">
                    <div className="header-row">
                        <h1 className="app-title">Sales Management System</h1>
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    <div className="main-content-full">
                        <Suspense fallback={<div className="loading-bar">Loading Filters...</div>}>
                            <FilterBar
                                options={filterOptions}
                                selectedFilters={filters}
                                onFilterChange={handleFilterChange}
                                onSortChange={handleSortChange}
                                sortConfig={{ sort_by: filters.sort_by, sort_order: filters.sort_order }}
                                onRefresh={fetchSales}
                            />
                        </Suspense>

                        <StatsRow data={salesData} />

                        {loading ? (
                            <div className="loading">Loading Data...</div>
                        ) : (
                            <>
                                <Suspense fallback={<div className="loading">Loading Table...</div>}>
                                    <SalesTable
                                        data={salesData}
                                        sortConfig={{ key: filters.sort_by, direction: filters.sort_order }}
                                        onSort={handleSortChange}
                                    />
                                </Suspense>
                                <Pagination
                                    currentPage={page}
                                    totalPages={pagination.totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
