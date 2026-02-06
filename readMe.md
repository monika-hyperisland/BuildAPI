# Bill Splitting API Documentation

## Overview
A comprehensive REST API for managing shared expenses in groups. Enables users to register, create groups, track expenses, delete expenses and automatically split costs among members.

## Key Features
- **JWT Authentication**: Secure registration and login with token-based access control
- **Group Management**: Create groups and manage members with owner-based permissions
- **Expense Tracking**: Add, view, and delete expenses with automatic splitting
- **Rate Limiting**: 30 requests per minute per IP to prevent abuse
- **Error Handling**: Standard HTTP status codes with descriptive messages
- **MongoDB Integration**: Uses MongoDB Atlas for data persistence

## Technology Stack
- Runtime: Node.js (v18+ recommended)
- Framework: Express.js
- Database: MongoDB Atlas
- Authentication: JWT (JSON Web Tokens)

## Core Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login (returns JWT) |
| POST | `/api/groups/` | Create a new group |
| POST | `/api/groups/add-member` | Add member to group |
| POST | `/api/expenses/` | Add expense to group |
| GET | `/api/expenses/:groupId` | Retrieve group expenses |
| DELETE | `/api/expenses/:expenseId` | Delete an expense |

## Environment Configuration
Required `.env` variables:
- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for token signing
- `PORT`: Server port (default: 5000)

## Installation & Setup
1. Clone repository and install dependencies using `npm install`
2. Configure `.env` file with MongoDB and JWT credentials
3. Run `node index.js` to start the server
4. Test via VSCode HTTP client or Postman.

