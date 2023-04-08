require('dotenv').config();
const express = require('express'); // npm installed
const router = require('./productsRouter.js');
const controller = require('./controllers/controller.js');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route requests. products will have the parameters page and count
app.use(router);

app.use('/products', controller.allProducts);


// listen on ports
app.listen(process.env.PORT);
console.log(`listening on port ${process.env.PORT}`);
