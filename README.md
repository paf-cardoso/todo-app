# Task Manager

A full-stack task management application built with Node.js, Express, MongoDB, and React.

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed
- Real-time task statistics
- Responsive design
- RESTful API

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- CORS

### Frontend
- React 18
- Vite
- Axios
- CSS3

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

For MongoDB Atlas, your connection string should look like:
```
mongodb+srv://username:password@cluster.mongodb.net/todo-app
```

Start the backend server:

```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The application will run on `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update task status |
| DELETE | `/tasks/:id` | Delete a task |

### Example Requests

**Create a task:**
```bash
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete project documentation"}'
```

**Get all tasks:**
```bash
curl http://localhost:5000/tasks
```

**Update task:**
```bash
curl -X PATCH http://localhost:5000/tasks/<task_id> \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Delete task:**
```bash
curl -X DELETE http://localhost:5000/tasks/<task_id>
```

## Project Structure

```
todo-app/
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Environment Variables

### Backend

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string

## Troubleshooting

### MongoDB Connection Issues

If you encounter connection errors:
1. Verify your MongoDB connection string in `.env`
2. Check that MongoDB is running (if using local installation)
3. For MongoDB Atlas, ensure your IP address is whitelisted

### Port Already in Use

If port 5000 or 3000 is already in use:

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

## License

MIT

## Author

Developed as a full-stack development project.
