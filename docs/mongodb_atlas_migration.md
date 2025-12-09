# MongoDB Atlas Migration Guide

## Overview
This guide explains how to migrate your local data to MongoDB Atlas (Cloud) and configure your application to use it.

## Prerequisites
- A MongoDB Atlas account (free tier is fine).
- The `truestate_assignment_dataset.csv` file present locally (which you already have).

## Steps

### 1. Create a MongoDB Atlas Cluster
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in.
2.  Create a new project and build a **Database**.
3.  Choose the **Shared (Free)** option.
4.  Create a cluster (default settings are usually fine).
5.  **Important**: Create a database user with a username and password. Remember these!
6.  **Network Access**: Allow access from anywhere (`0.0.0.0/0`) for simplicity during development, or add your current IP.

### 2. Get Connection String
1.  Click **Connect** on your cluster dashboard.
2.  Choose **Drivers** (Node.js).
3.  Copy the connection string. It looks like:
    `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

### 3. Update Configuration
1.  Open `backend/.env`.
2.  Replace the local `MONGODB_URI` with your Atlas connection string.
3.  **Replace `<password>`** with your actual database user password.

### 4. Seed the Cloud Database
1.  Stop your running backend server (Ctrl+C).
2.  Start it again:
    ```bash
    cd backend
    node src/index.js
    ```
3.  The application will detect that the cloud database is empty and automatically start seeding the 1 million records from your local CSV file.
4.  **Wait** for the seeding to complete (it might take a few minutes depending on your internet speed).

### 5. Verify
1.  Once seeded, your local frontend (running on `localhost:5173`) will now be showing data fetched from the **Cloud**.
2.  You can now deploy your backend code to any cloud provider (Render, Vercel, Heroku, etc.), set the `MONGODB_URI` environment variable there, and it will work instantly!
