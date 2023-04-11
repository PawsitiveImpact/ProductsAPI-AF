const model = require('../models/model.js');

module.exports = {

  allProducts: (req, res) => {
    let count = req.query.count || 5;
    let page = req.query.page || 1;
    model.getProducts(count, page, res);
  },

  product: (req, res) => {
    model.getProduct(req.params.product_id, res);
  },

  styles: (req, res) => {
    model.getStyles(req.params.product_id, res);
  },

  related: (req, res) => {
    model.getRelatedItems(req.params.product_id, res);
  },

  cart: (req, res) => {
    model.postToCart(req.body, res);
  },
};
