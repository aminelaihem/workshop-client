
module.exports = (server) => {
    const accessoryController = require('../controllers/accessoryController');
    const jwtMiddleware = require('../middelwares/jwtMiddleware');

    server.post('/accessories',jwtMiddleware.verifyToken, accessoryController.createAnAccessory);
    server.get('/accessories', accessoryController.getAllAccessory);
    server.get('/accessories/:name', accessoryController.getAnAccessory);
}