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

app.get('/loaderio-4db0f95d9b1100bfb9123d6bfc5e0458', (req, res) => {
  res.send('loaderio-4db0f95d9b1100bfb9123d6bfc5e0458');
});


// listen on ports
app.listen(process.env.PORT);
console.log(`listening on port ${process.env.PORT}`);
