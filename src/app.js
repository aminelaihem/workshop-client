const express = require('express');
const app = express();
const port = 3030;

// Load environment variables
require('dotenv').config();

// Import and connect to the database
const connectDB = require('./services/connectDB.js');
connectDB();

// Configure routes and middleware
const configureServices = require('./services/service.js');
configureServices(app);

// Start the server
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = { app, server };