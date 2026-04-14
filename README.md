# The Tasks API

This is a RESTful API for a task management application built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register and login users with JWT-based authentication.
- **Task Management**: Create, read, update, and delete tasks.
- **Role-Based Access**: Admin users can manage all tasks, while regular users can only manage their own.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd the-tasks
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   DB_URL=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?appName=The-Cluster
   JWT_PRIVATE_KEY=your_private_key_here
   JWT_PUBLIC_KEY=your_public_key_here
   PORT=3000
   ```

## Usage

### Start the server
```bash
npm run dev
```

The server will start on `http://localhost:3000`.

### gunakan Postman atau curl untuk mengakses API endpoints.

### API Endpoints

#### Authentication

**Register a new user**
```http
POST /api/v1/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "[EMAIL_ADDRESS]",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "status": true,
  "statusCode": 201,
  "message": "User created successfully",
  "data": {
    "user_id": "some-uuid",
    "email": "[EMAIL_ADDRESS]",
    "name": "John Doe",
    "role": "user"
  }
}
```

**Login**
```http
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "[EMAIL_ADDRESS]",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Refresh Token**
```http
POST /api/v1/auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "status": true,
  "statusCode": 200,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Tasks

**Get all tasks**
```http
GET /api/v1/tasks
```

**Response:**
```json
{
  "status": true,
  "statusCode": 200,
  "message": "Get all tasks successfully",
  "data": [
    {
      "task_id": "some-uuid",
      "title": "Task 1",
      "description": "Description 1",
      "status": "pending",
      "user_id": "some-uuid",
      "created_at": "2023-10-27T10:00:00.000Z",
      "updated_at": "2023-10-27T10:00:00.000Z"
    }
  ]
}
```

**Get a single task**
```http
GET /api/v1/tasks/:taskId
```

**Response:**
```json
{
  "status": true,
  "statusCode": 200,
  "message": "Get task successfully",
  "data": {
    "task_id": "some-uuid",
    "title": "Task 1",
    "description": "Description 1",
    "status": "pending",
    "user_id": "some-uuid",
    "created_at": "2023-10-27T10:00:00.000Z",
    "updated_at": "2023-10-27T10:00:00.000Z"
  }
}
```

**Create a new task**
```http
POST /api/v1/tasks
```

**Request Body:**
```json
{
  "title": "Task 1",
  "description": "Description 1",
  "status": "pending"
}
```

**Response:**
```json
{
  "status": true,
  "statusCode": 201,
  "message": "Task created successfully",
  "data": {
    "task_id": "some-uuid",
    "title": "Task 1",
    "description": "Description 1",
    "status": "pending",
    "user_id": "some-uuid",
    "created_at": "2023-10-27T10:00:00.000Z",
    "updated_at": "2023-10-27T10:00:00.000Z"
  }
}
```

**Update a task**
```http
PUT /api/v1/tasks/:taskId
```

**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated Description",
  "status": "completed"
}
```

**Response:**
```json
{
  "status": true,
  "statusCode": 200,
  "message": "Task updated successfully",
  "data": {
    "task_id": "some-uuid",
    "title": "Updated Task",
    "description": "Updated Description",
    "status": "completed",
    "user_id": "some-uuid",
    "created_at": "2023-10-27T10:00:00.000Z",
    "updated_at": "2023-10-27T11:00:00.000Z"
  }
}
```

**Delete a task**
```http
DELETE /api/v1/tasks/:taskId
```

**Response:**
```json
{
  "status": true,
  "statusCode": 200,
  "message": "Task deleted successfully",
  "data": null
}
```