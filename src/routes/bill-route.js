const express = require('express');
const router = express.Router();
const billController = require('../app/controllers/BillController');

// call to product controller get method getProduct render view
router.get('/', billController.getBill);

module.exports = router;
