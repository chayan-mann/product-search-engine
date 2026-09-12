const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/bulk', productController.bulkCreateProducts);
router.get('/search', productController.searchProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
