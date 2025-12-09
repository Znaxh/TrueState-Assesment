# Retail Sales Management System

## Overview
A high-performance full-stack application to manage and analyze retail sales data. Capable of handling 1 million records with instant search, filtering, and sorting.

## Tech Stack
- **Frontend**: React, Vite, Vanilla CSS
- **Backend**: Node.js, Express, csv-parser
- **Data**: In-Memory Storage (loaded from CSV)

## Search Implementation Summary
- **Type**: Full-text search (case-insensitive).
- **Fields**: Customer Name, Phone Number.
- **Logic**: Iterates through the in-memory dataset and filters records where Name or Phone contains the search term.

## Filter Implementation Summary
- **Type**: Multi-select and Range-based.
- **Fields**: Region, Gender, Category, Payment Method, Tags, Age, Date.
- **Logic**: Applied sequentially on the dataset. Supports multiple values per field (OR logic within field, AND logic between fields).

## Sorting Implementation Summary
- **Fields**: Date, Quantity, Customer Name, Total Amount, etc.
- **Logic**: Standard JavaScript `Array.sort` with custom comparators for Dates and Numbers.

## Pagination Implementation Summary
- **Size**: 10 items per page.
- **Logic**: `Array.slice` based on current page and limit after filtering and sorting.

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
1.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    # Ensure truestate_assignment_dataset.csv is in the root Assessment folder
    ```

2.  **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    ```

### Running the Application
1.  **Start Backend**:
    ```bash
    cd backend
    node --max-old-space-size=4096 src/index.js
    ```
    *Note: Increased memory limit is required for 1M rows.*

2.  **Start Frontend**:
    ```bash
    cd frontend
    npm run dev
    ```

3.  **Access**: Open `http://localhost:5173` in your browser.
# TrueState-Assesment
