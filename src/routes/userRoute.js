module.exports = (server) => {
    const userController = require('../controllers/userController');

    server.post('/users/login', userController.loginAUser);
    server.post('/users/register', userController.registerAUser);
}