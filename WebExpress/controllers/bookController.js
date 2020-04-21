const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');
const host = require('../config/dbconfig');

function controller(bookService, navs) {
  function getIndex(req, res) {
    const { query } = req.query;
    // const url = `mongodb://${host}:27017`;
    // const database = 'booksDB';
    (async function mongoClient() {
      // let client;
      try {
        // client = await MongoClient.connect(url);
        // const db = client.db(database);
        // const coll = await db.collection('book');
        // const newBooks = await coll.find().toArray();

        let goodReadBooks = await bookService.searchBooks(query);

        goodReadBooks = goodReadBooks.map((item) => {
          const newBook = {
            id: item.best_book.id._,
            averageRating: item.average_rating,
            author: item.best_book.author.name,
            title: item.best_book.title,
            publicationYear: item.original_publication_year._,
          };
          return newBook;
        });
        res.render('books', {
          title: 'Library',
          navs,
          books: goodReadBooks,
        });
      } catch (error) {
        debug('not connected error thrown', error.stack);
      }
      // client.close();
    }());
  }

  function getById(req, res) {
    const { id } = req.params;
    (async function mongoClient() {
      // let client;
      try {
        // client = await MongoClient.connect(url);
        // const db = client.db(database);
        // const coll = await db.collection('book');
        // const book = await coll.findOne({ _id: new ObjectID(id) });
        // book.detail = await bookService.getById(id);
        let book = await bookService.getById(id);

        console.log(book);
        book = {
          id: book.id,
          title: book.title,
          averageRating: book.average_rating,
          pages: book.num_pages,
          description: book.description,
          imageUrl: book.image_url,
          originalLink: book.link,
          author: book.authors.author.name,
          widget: book.reviews_widget,
        };
        console.log('Mapped boook->>>>>>', book);
        // debug(book);
        res.render('book', {
          title: 'Single Book',
          navs,
          book,
        });
      } catch (error) {
        debug('not connected error thrown', error.stack);
      }
      // client.close();
    }());
  }

  function middleware(req, res, next) {
    // if (req.user) {
    next();
    // } else {
    // res.redirect('/');
    // }
  }

  return {
    getIndex,
    getById,
    middleware,
  };
}

module.exports = controller;
