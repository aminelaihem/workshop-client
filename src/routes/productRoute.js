
module.exports = (server) => {
    const productController = require('../controllers/productController');

    server.post('/products', productController.createAProduct);
}