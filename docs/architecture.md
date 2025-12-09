# Architecture Document

## Overview
The Retail Sales Management System is a full-stack web application designed to handle large datasets (1 million records) with high performance. It features a Node.js/Express backend and a React/Vite frontend.

## Backend Architecture
- **Runtime**: Node.js
- **Framework**: Express.js
- **Data Storage**: In-Memory (Array of Objects).
    - **Rationale**: For the assignment's 1M row dataset, loading data into memory allows for extremely fast read/filter/sort operations without the overhead of a database connection or disk I/O during queries.
    - **Memory Usage**: Approximately 400MB - 1GB depending on V8 overhead.
- **Data Loading**: `csv-parser` streams the CSV file on server startup.
- **API Design**: RESTful API.
    - `GET /api/sales`: Handles search, filtering, sorting, and pagination.
    - `GET /api/filters`: Returns unique values for filter dropdowns.

## Frontend Architecture
- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (Modular components).
- **State Management**: React `useState` and `useEffect`.
- **Components**:
    - `App`: Main container, manages global state (filters, pagination).
    - `SearchBar`: Debounced input for text search.
    - `FilterPanel`: Multi-select checkboxes for various fields.
    - `SalesTable`: Displays data in a grid.
    - `Pagination`: Controls page navigation.

## Data Flow
1.  **Server Start**: Backend reads `truestate_assignment_dataset.csv` into `salesData` array.
2.  **Client Load**: Frontend fetches filter options from `/api/filters`.
3.  **User Interaction**:
    - User types in SearchBar -> Updates `filters.search` state -> Triggers `fetchSales`.
    - User selects Filter -> Updates `filters` state -> Triggers `fetchSales`.
    - User changes Page -> Updates `pagination.page` -> Triggers `fetchSales`.
4.  **API Request**: Frontend sends GET request with query parameters (e.g., `?page=1&search=Neha&region=North`).
5.  **Processing**: Backend filters the `salesData` array based on query params, sorts it, slices it for pagination, and returns JSON.
6.  **Render**: Frontend receives JSON and updates the UI.

## Folder Structure
```
root/
├── backend/
│   ├── src/
│   │   ├── index.js       # Entry point & Logic
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # UI Components
│   │   ├── App.jsx        # Main Logic
│   │   ├── main.jsx       # Entry Point
│   └── package.json
├── docs/
│   └── architecture.md
└── README.md
```
