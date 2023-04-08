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
      ) AS features
      FROM products
      JOIN features
      ON products.id = 1
      AND products.id = ${productId}
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

    // let photoQuery = `
    //   SELECT photos.thumbnail_url
    //   FROM photos
    //   WHERE photos.styleid = 1
    // `;

    // db
    // .query(photoQuery)
    // .then((result) => {
    //   console.log(result);
    // })

    let skusQuery = `

    `;

    // jsonb_agg(
    //   json_build_object(
    //     'url', photos.url,
    //     'thumbnail', photos.thumbnail_url
    //   )
    // ) AS photos
    let query = `
    SELECT
      styles.productid,
      jsonb_agg(
        json_build_object(
          'style_id', styles.id,
          'name', styles.name,
          'original price', styles.original_price,
          'sale_price', styles.sale_price,
          'default_style', styles.default_style,
          'photos', (SELECT jsonb_agg(
                      json_build_object(
                        'url', photos.url,
                        'thumbnail', photos.thumbnail_url
                      )
                    ) AS photos
                    FROM photos
                    WHERE photos.styleid = styles.id)
        )
      ) AS results
    FROM styles
    INNER JOIN photos
    ON styles.id = photos.styleid
    AND styles.productid = ${productId}
    GROUP BY styles.productid;
  `;

  db
    .query(query)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
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