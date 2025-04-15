const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../doc/swagger-config.js');
const userRoute = require('../routes/userRoute.js');
const accessoryRoute = require('../routes/accessoryRoute.js');
const productRoute = require('../routes/productRoute.js');
const consoleRoute = require('../routes/consoleRoute.js');
const cors = require('cors');

const configureServices = (app) => {
    // Swagger documentation route
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Middleware for parsing requests
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Autoriser uniquement http://localhost:3000
    app.use(cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true // Si tu utilises des cookies pour l'authentification
    }));
    app.options('*', cors());

    // Define application routes
    userRoute(app);
    accessoryRoute(app);
    productRoute(app);
    consoleRoute(app);
};

module.exports = configureServices;
