const model = require('../models/model.js');

module.exports = {

  allProducts: (req, res) => {
    let count = req.query.count || null;
    let pages = req.query.page || null;
    model.getProducts(req.query, res);
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
};
