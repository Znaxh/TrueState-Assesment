---
description: How to deploy the application to Vercel
---

This workflow guides you through deploying the full-stack application (Frontend + Backend) to Vercel.

## Prerequisites

1.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
2.  **MongoDB Atlas**: You need a cloud MongoDB database.
    *   Create a cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
    *   Get the connection string (URI). It looks like `mongodb+srv://<user>:<password>@cluster...`.
    *   Allow access from anywhere (0.0.0.0/0) in Network Access (since Vercel IPs are dynamic).

## Steps

1.  **Install Vercel CLI** (if not installed):
    ```bash
    npm install -g vercel
    ```

2.  **Login to Vercel**:
    ```bash
    vercel login
    ```

3.  **Deploy**:
    Run the following command in the project root (`/home/anurag/Documents/Assessment`):
    ```bash
    vercel
    ```

4.  **Configure Project**:
    *   Follow the prompts.
    *   Set up and deploy? **Y**
    *   Which scope? (Select your account)
    *   Link to existing project? **N**
    *   Project name? (Press Enter or type a name)
    *   In which directory is your code located? **./** (Press Enter)
    *   **Auto-detected Project Settings**:
        *   It might detect `vite` or `other`. Since we have a `vercel.json`, it should respect that.
        *   If it asks to override settings, say **N**.

5.  **Set Environment Variables**:
    *   Go to the Vercel Dashboard for your new project.
    *   Go to **Settings** > **Environment Variables**.
    *   Add `MONGODB_URI` with your Atlas connection string.
    *   Redeploy (or the next deployment will pick it up). You can trigger a redeploy via CLI:
        ```bash
        vercel --prod
        ```

## Troubleshooting

*   **Cold Starts**: The first request might be slow as the serverless function wakes up and connects to MongoDB.
*   **Database Connection**: Ensure your MongoDB Atlas Network Access allows connections from `0.0.0.0/0`.
