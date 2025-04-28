# RecSpicy - Recipe Sharing Application

RecSpicy is a recipe sharing and meal planning application that allows users to create, share, and discover recipes. The application includes features such as user authentication, recipe creation, meal planning, and more.

## Features

- User authentication (local and Google OAuth)
- Recipe creation and management
- Meal planning
- Recipe search and filtering
- User profiles
- Admin dashboard

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT, Passport.js, Google OAuth

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- MongoDB Compass (for database management)

### Installation

1. Make sure MongoDB is running on your local machine (default: mongodb://localhost:27017)

2. Install dependencies and start the server:

   ```
   node setup.js
   ```

   Or manually:

   ```
   npm install
   npm run dev
   ```

3. The server will start on http://localhost:5000

### Authentication

The application supports two authentication methods:

1. Local authentication (username/email and password)
2. Google OAuth

### API Endpoints

- `/api/users` - User management
- `/api/recipes` - Recipe management
- `/api/mealplans` - Meal plan management
- `/api/support` - Support tickets
- `/auth/google` - Google OAuth authentication

## Development

To start the server in development mode:

```
npm run dev
```

This will start the server with nodemon, which will automatically restart the server when changes are detected.

## Production

To start the server in production mode:

```
npm start
```

## Database

The application uses MongoDB as the database. You can use MongoDB Compass to view and manage the database.

Default connection string: `mongodb://localhost:27017/recspicy`

## License

MIT