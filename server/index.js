// const path = require('path');
const express = require('express'); // npm installed
const cors = require('cors');
const router = require('./productsRouter.js');
const controller = require('./controllers/controller.js');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// serve files
// app.use(express.static(path.join(__dirname, '/dist')));

// route requests
app.use('/products', controller.allProducts);

app.use('/products/:product_id', router);

// listen on ports
app.listen(process.env.PORT);
console.log(`listening on port ${process.env.PORT}`);
