const pgp = require('pg-promise')();
const express = require('express');

//connect to the db
const connection = {
  port: 5432,
  database: 'products_overview',
};

const db = pgp(connection);

module.exports = {

  getProducts: (req, res) => {
    // use LIMIT to restrict the number of rows returned
    console.log('in model all products', req);
  },

  getProduct: (productId, res) => {
    // execute a query for the product info and features
    let query = `
      SELECT products.*, jsonb_agg(
        jsonb_build_object(
          'feature', features.feature,
          'value', features.value
        )
      )
      AS features
      FROM products
      JOIN features
      ON products.id = ${productId}
      AND products.id = features.product_id
      GROUP BY products.id;
    `
    db
      .query(query)
      .then((result) => {
        res.status(200).json(result[0]);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      })
  },

  getStyles: (productId, res) => {
    // query for the product's photos, styles, and skus
  //   jsonb_agg(

  //   )
  // AS results
    let query = `
    SELECT jsonb_agg(
      json_build_object(
        'style_id', styles.id,
        'name', styles.name,
        'original_price', styles.original_price,
        'sale_price', styles.sale_price,
        'default?', styles.default_style
      )
    )
    AS results
    FROM styles
    WHERE styles.productid = ${productId}
  `
  db
    .query(query)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    })
  },

  getRelatedItems: (productId, res) => {
    // query for the products related item ids

    // use the related item ids to query for each related item's info
    console.log('in model RI', productId);

  },

};

// SELECT styles.productid, (
//   jsonb_agg(
//     json_build_object(
//       'style_id', styles.id,
//       'name', styles.name,
//       'original_price', styles.original_price,
//       'sale_price', styles.sale_price,
//       'default?', styles.default_style,
//       (
//         jsonb_agg(
//           jsonb_build_object(
//             'thumbnail_url', photos.thumbnail_url,
//             'url', photos.url
//           )
//         ) AS photos
//       ),
//     )
//   ) AS results
// ),
// FROM styles
// JOIN photos
// ON styles.productid = ${productId}
// AND styles.productid = photos.styleid
// GROUP BY styles.id;