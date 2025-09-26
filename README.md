# Task Management API 

A simple Task Management API built with Node.js, Express, and MySQL/PostgreSQL using raw SQL queries.

## Features
- Create, update, delete users
- Create, update, delete tasks
- List all tasks with assigned user details
- Optional filtering by status/deadline
- Pagination support
- Error handling

## Setup Instructions
1. Clone repository
2. Install dependencies: npm install
3. Configure .env with database credentials
4. Create database & tables using SQL:
```sql
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    deadline DATE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
```
5. Run server: npm run dev

## API Endpoints

### Users
- POST /api/users → Create user
- GET /api/users → List all users

### Tasks
- POST /api/tasks → Create task
- GET /api/tasks → List tasks
- PUT /api/tasks/:id → Update task
- DELETE /api/tasks/:id → Delete task
