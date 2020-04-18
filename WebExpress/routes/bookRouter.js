const express = require('express');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodReadService');

function router(navs) {
  const bookRouter = express.Router();
  const { getIndex, getById, middleware } = bookController(bookService, navs);

  bookRouter.use(middleware);

  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
}

module.exports = router;
