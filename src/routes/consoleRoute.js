module.exports = (server) => {
    const consoleController = require('../controllers/consoleController');
    const jwtMiddleware = require('../middelwares/jwtMiddleware');

    server.post('/consoles',jwtMiddleware.verifyToken, consoleController.createAConsole);
}