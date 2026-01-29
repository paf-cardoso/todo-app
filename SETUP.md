# MongoDB Setup Guide

## Important: Database Credentials

This project requires a MongoDB database. You have two options:

### Option 1: Use Your Own MongoDB Atlas Account (Recommended)

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier M0 is sufficient)
3. Create a database user with username and password
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string
6. Create a `.env` file in the `backend` folder with your credentials:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/todo-app?retryWrites=true&w=majority
```

### Option 2: Use Local MongoDB

If you have MongoDB installed locally:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
```

## Security Note

**Never commit the `.env` file to version control.** The `.env` file contains sensitive credentials and should be kept private. The `.gitignore` file is already configured to exclude it.

The `.env.example` file shows the format but doesn't contain real credentials.

## For Evaluators

If you're evaluating this project and need database access:
1. Use your own MongoDB Atlas credentials, or
2. Install MongoDB locally

The application will work with any valid MongoDB connection string.
