# GEMINI.md

## Project Overview

This project is a backend for a subscription tracker application. It is built with Node.js and Express.js, and it uses MongoDB as its database. The application provides a RESTful API for managing user subscriptions.

**Key Technologies:**

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (with Mongoose)
*   **Authentication:** JSON Web Tokens (JWT)
*   **Other Dependencies:** `@arcjet/node`, `@upstash/workflow`, `bcryptjs`, `cookie-parser`, `dotenv`, `morgan`

**Architecture:**

The project follows a standard Model-View-Controller (MVC) architecture:

*   **`models/`:** Contains the Mongoose schemas for the database models (e.g., `User`, `Subscription`).
*   **`controllers/`:** Contains the business logic for handling API requests.
*   **`routes/`:** Defines the API endpoints and maps them to the corresponding controller functions.
*   **`middlewares/`:** Contains middleware for authentication, error handling, etc.
*   **`app.js`:** The main entry point of the application.

## Building and Running

**1. Install Dependencies:**

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

**2. Set up Environment Variables:**

Create a `.env` file in the `Backend` directory and add the following variables:

```
PORT=3000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

**3. Run the Application:**

```bash
# Start the server
npm start

# Or run in development mode with nodemon
npm run dev
```

The server will start on the port specified in your `.env` file (default is 3000).

## Development Conventions

*   **Code Style:** The project uses ES modules (`import`/`export`) and follows a consistent code style.
*   **Asynchronous Operations:** Asynchronous operations are handled using `async`/`await`.
*   **Error Handling:** A centralized error handling middleware is used to catch and process errors.
*   **Authentication:** API routes are protected using a JWT-based authentication middleware.
*   **Database:** Mongoose is used for all interactions with the MongoDB database.
