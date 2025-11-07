# Subscription Tracker Backend

This is the backend for a subscription tracker application. It is built with Node.js and Express.js, and it uses MongoDB as its database. The application provides a RESTful API for managing user subscriptions.

## Key Features

*   User authentication (sign-up, sign-in, sign-out) with JWT.
*   CRUD operations for users and subscriptions.
*   Get upcoming subscription renewals.
*   Cancel subscriptions.
*   Security with Arcjet (bot detection and rate limiting).

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (with Mongoose)
*   **Authentication:** JSON Web Tokens (JWT)
*   **Other Dependencies:**
    *   `@arcjet/node`
    *   `@upstash/workflow`
    *   `bcryptjs`
    *   `cookie-parser`
    *   `dotenv`
    *   `morgan`

## Prerequisites

*   Node.js (v14 or later)
*   MongoDB

## Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2.  **Install dependencies:**

    ```bash
    cd subscription-tracker-backend
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```
    PORT=3000
    MONGO_URL=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

4.  **Run the application:**

    ```bash
    # Start the server
    npm start

    # Or run in development mode with nodemon
    npm run dev
    ```

    The server will start on the port specified in your `.env` file (default is 3000).

## API Endpoints

### Authentication

*   `POST /api/v1/auth/sign-up`: Create a new user.
*   `POST /api/v1/auth/sign-in`: Sign in a user and get a JWT token.
*   `POST /api/v1/auth/sign-out`: Sign out a user.

### Users

*   `GET /api/v1/users`: Get all users.
*   `GET /api/v1/users/:id`: Get a user by ID.
*   `POST /api/v1/users`: Create a new user.
*   `PUT /api/v1/users/:id`: Update a user by ID.
*   `DELETE /api/v1/users/:id`: Delete a user by ID.

### Subscriptions

*   `GET /api/v1/subscriptions`: Get all subscriptions.
*   `GET /api/v1/subscriptions/upcoming-renewals`: Get upcoming subscription renewals.
*   `GET /api/v1/subscriptions/:id`: Get a subscription by ID.
*   `POST /api/v1/subscriptions`: Create a new subscription.
*   `PUT /api/v1/subscriptions/:id`: Update a subscription by ID.
*   `DELETE /api/v1/subscriptions/:id`: Delete a subscription by ID.
*   `GET /api/v1/subscriptions/user/:id`: Get all subscriptions for a user.
*   `PUT /api/v1/subscriptions/:id/cancel`: Cancel a subscription.

## Security

The application uses [Arcjet](https://arcjet.com/) to protect against malicious traffic. This includes:

*   **Bot Detection:** Identifies and blocks automated bots.
*   **Rate Limiting:** Prevents abuse by limiting the number of requests from a single IP address.

## Database Schema

### User Schema

| Field | Type | Description |
|---|---|---|
| name | String | User's name. |
| email | String | User's email address (unique). |
| password | String | User's encrypted password. |

### Subscription Schema

| Field | Type | Description |
|---|---|---|
| name | String | Name of the subscription. |
| price | Number | Price of the subscription. |
| currency | String | Currency of the price (USD, EUR, GBP). |
| frequency | String | Renewal frequency (daily, weekly, monthly, yearly). |
| category | String | Category of the subscription (sports, news, etc.). |
| paymentMethod | String | Payment method used for the subscription. |
| status | String | Status of the subscription (active, cancelled, expired). |
| startDate | Date | Start date of the subscription. |
| renewalDate | Date | Next renewal date of the subscription. |
| user | ObjectId | Reference to the user who owns the subscription. |

## Project Structure

```
.
├── app.js                # Main application file
├── controllers           # Request handlers
│   ├── auth.controller.js
│   ├── subscription.controller.js
│   └── user.controller.js
├── database              # Database connection
│   └── mongoConnect.js
├── middlewares           # Express middlewares
│   ├── arcjet.middleware.js
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models                # Mongoose models
│   ├── subscription.model.js
│   └── user.models.js
├── routes                # API routes
│   ├── auth.routes.js
│   ├── subscription.routes.js
│   ├── user.routes.js
│   └── workflow.routes.js
├── .env                  # Environment variables
├── .gitignore
├── package.json
└── README.md
```
