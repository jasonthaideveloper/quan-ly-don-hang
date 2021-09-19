const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductsController');

router.get('/stored/products', productController.storeProduct);


// call to product controller get method getProduct render view
router.get('/create', productController.createProduct);
router.post('/handle-form-action', productController.handleFormAction);
router.get('/:id/edit', productController.edit);
router.get('/storage', productController.storageProducts);
router.get('/:slug', productController.getProductDetail);
router.get('/:slug/deleted', productController.getDeletedProductDetail);
router.post('/store', productController.storeProduct);
router.put('/:id', productController.update);
router.patch('/:id/restore', productController.restore);
router.delete('/:id', productController.delete);
router.delete('/:id/force', productController.forceDestroy);
router.get('/', productController.getProduct);

module.exports = router;
