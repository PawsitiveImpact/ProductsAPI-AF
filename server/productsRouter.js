// ====== NOT IN  USE ==========//
const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller.js');

// route for product styles. takes product id as param.
router.use('/products/:product_id/styles', controller.styles);

// route for related product ids. takes product id as param.
router.use('/products/:product_id/related', controller.related);

// route for specific product info. takes product id as param.
router.use('/products/:product_id', controller.product);

module.exports = router;
