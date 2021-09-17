const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');


// call to product controller get method getProduct render view
router.get('/stored/products', meController.storedProducts);
router.get('/storage/products', meController.storageProducts);
router.get('/:id/edit', meController.edit);

module.exports = router;
