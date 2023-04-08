const pgp = require('pg-promise')();
const express = require('express');

console.log('made it to model');

//connect to the db
const connection = {
  port: 5432,
  database: 'products_overview',
};

const db = pgp(connection);

module.exports = {

  getProducts: (count, page, res) => {
    let query = `
    SELECT * FROM products
    ORDER BY id ASC
    OFFSET (${page} - 1) * ${count}
    LIMIT ${count};
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
      ON products.id = features.product_id
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
          'photos', (SELECT
                      jsonb_agg(
                        json_build_object(
                          'url', photos.url,
                          'thumbnail', photos.thumbnail_url
                        )
                      ) AS photos
                    FROM photos
                    WHERE photos.styleid = styles.id
                    ),
          'skus', (SELECT
                    jsonb_object_agg(
                        skus.id,
                        json_build_object(
                          'size', skus.size,
                          'quantity', skus.quantity
                        )
                    ) AS skus
                  FROM skus
                  WHERE skus.styleid = styles.id
                  )
        )
      ) AS results
    FROM styles
    WHERE styles.productid = ${productId}
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
    let query = `
      SELECT jsonb_agg(
        related.related_product_id
      ) AS related_ids
      FROM related
      WHERE related.current_product_id = ${productId}
    `

    db
    .query(query)
    .then((result) => {
      res.status(200).json(result[0].related_ids);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
  },

};
