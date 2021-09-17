const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

// router.use('/bill', siteController.bill);
router.get('/statistic', siteController.statistic);
router.get('/', siteController.general);

module.exports = router;