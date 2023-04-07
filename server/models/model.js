const pgp = require('pg-promise')();

//connect to the db
const connection = {
  port: 5432,
  database: 'products_overview',
}

const db = pgp(connection);

module.exports = {

  getProducts: () => {

  },

};
