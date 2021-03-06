/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const Controller = require('./Controller/controller.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// check if property is called extended
app.use(express.urlencoded({ extended: false }));

app.get('/api/*', Controller.get);
app.post('/api/*', Controller.post);
app.put('/api/*', Controller.put);

// --------------------------------------------------------
//                  S Q L    A P I
// --------------------------------------------------------
const sqlApp = require('./Model/sqlModel')
app.get('/sqlapi/related/:id', sqlApp.getRelatedProducts)
app.get('/sqlapi/products/:id', sqlApp.getProductCard)
app.get('/sqlapi/ratings/:id', sqlApp.getProductRating)







app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;
