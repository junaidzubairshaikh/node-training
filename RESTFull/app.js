const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

if (process.env.ENV === 'TEST') {
  const db = mongoose.connect('mongodb://localhost/booksAPITest');
} else {
  // for docker build
  const db = mongoose.connect('mongodb://db:27017/bookAPI');
}

const Book = require('./src/models/books');
const bookRouter = require('./src/routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('Server is okay..');
});

app.use('/api', bookRouter);

app.server = app.listen(port, () => {
  console.log('Server is running...');
});

module.exports = app;