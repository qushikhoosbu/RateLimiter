# Express Rate Limiter Project

This project demonstrates an Express server with a rate limiter middleware. The rate limiter ensures that clients can only make a certain number of requests per time window to specific routes.

## Project Setup

### Prerequisites

- Node.js (v18 or later recommended)
- npm (or yarn)

### Installation

1. **Clone the Repository**

on bash
   git clone _URL_

# Create a .env file in the root directory of the project and add the following configuration:

# Install Dependencies :

npm update 
npm install
 
# Create and Configure Environment Variables
DATABASE_URL=mongodb://localhost:27017/your-database-name

    Replace your-database-name with the name of your MongoDB database.

# Running the Server

npm start dev

# API Endpoints : Rate Limiter Check
     
     GET http://localhost:3000/products/rateLimitToSpecificRoute

     This endpoint is used to verify the rate limiting functionality. It will return Request successful if requests are within the allowed rate limits or Too many requests if the rate limit is exceeded.

# Other APIs
     GET /products
    POST /products
    PUT /products/:productId
    DELETE /products/:productId
    GET /products/:productId
    PATCH /products/:productId

# Notes
Rate Limiter: The rate limiter middleware is functional and can be tested as described above.

Database Connection: other APIs are non-functional until the MongoDB connection up and successful.