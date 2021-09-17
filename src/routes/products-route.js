const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductsController');

router.get('/stored/products', productController.storeProduct);


// call to product controller get method getProduct render view
router.get('/create', productController.createProduct);
router.post('/store', productController.storeProduct);
router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);
router.patch('/:id/restore', productController.restore);
router.delete('/:id', productController.delete);
router.delete('/:id/force', productController.forceDestroy);
router.get('/:slug', productController.getProductDetail);
router.get('/', productController.getProduct);

module.exports = router;
