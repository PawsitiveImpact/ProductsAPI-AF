const express = require('express');
const controller = require('./controllers/controller.js');

const router = express.Router();

// route for specific product info. takes product id as param.
router.get('/', controller.product);

// route for product styles. takes product id as param.
router.get('/styles', controller.styles);

// route for related product ids. takes product id as param.
router.get('/related', controller.related);

module.exports = router;
