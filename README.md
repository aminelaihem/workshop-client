# Workshop Client API

This is a simple CRUD API application for managing products and accessories. Built using **Express.js**, it also integrates with an external WooCommerce API to post new products. The API is documented using **Swagger**.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environnment)
- [Docker Setup](#docker)
- [Testing](#testing)
- [License](#license)

## Features

- Manage products and accessories
- Validate product attributes
- Post products to WooCommerce via external API
- JWT Authentication for protected routes
- Error handling and validation
- Swagger API documentation

## Technologies

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT (for Authentication)
- WooCommerce API integration
- Swagger (for API Documentation)
- Jest & Supertest (for testing)

## Installation

### Prerequisites
- Docker installed on your machine

### Step

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/workshop-client-api.git
    cd workshop-client-api
    ```

2. Create a .env file in the root directory and configure the required environment variables:
    ```bash
    DB_NAME=workshop
    DB_USER=your-db-username
    DB_PASSWORD=your-db-password
    DB_PORT=27017
    JWT_SECRET=your-secret-key
    API_KEY=your-woocommerce-api-key
    API_SECRET=your-woocommerce-api-secret
    ```
3. Build and run the application using Docker Compose:
    ```bash
        docker-compose up --build
    ```
4. Install the dependencies in the node container :
    ```bash 
        docker-compose exec node npm install
    ```

The API will now be running at http://localhost:3030.

### Access Mongo Express 
You can view the MongoDB database through Mongo Express at http://localhost:8081.

### Swagger API Documentation
You can view the Swagger API documentation at http://localhost:3030/api-docs.

## Environment Variables
Ensure the following variables are set in your .env file:
- `DB_NAME`: The name of the MongoDB database.
- `DB_USER`: The username for the MongoDB database.
- `DB_PASSWORD`: The password for the MongoDB database.
- `DB_PORT`: The port number for the MongoDB database.
- `JWT_SECRET`: A secret key for JWT authentication.
- `API_KEY`: The API key for WooCommerce integration.
- `API_SECRET`: The API secret for WooCommerce integration.
- `DB_NAME_TEST`: The name of the MongoDB database for tests.

## Docker Setup
The Docker setup uses Docker Compose to manage the containers for the application and MongoDB. The `docker
-compose.yml` file defines the services and their configurations.

- `node`: The main application running the Node.js API.
- `db`: MongoDB service to store data.
- `mongo-express`: A web-based interface to view and manage MongoDB data.

### Starting the services
    ```bash
        docker-compose up --build
    ```

### Stopping the services
    ```bash
        docker-compose down
    ```

## Testing 
To run the tests you have to stop the node container first
    ```bash
        docker stop node
        docker compose run node npm test
    ```

## License
    This project is licensed under the MIT License.


