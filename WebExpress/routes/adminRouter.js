const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const host = require('../config/dbconfig');

const books = [
  {
    title: 'In dark night of corona', author: 'Junaid', read: false, genre: 'Horror',
  },
  {
    title: 'Rise of Tech', author: 'JZ', read: false, genre: 'SCI-FI',
  },
  {
    title: 'Cooking something ', author: 'MR.JZ', read: false, genre: 'Thriller',
  },
  {
    title: 'What I said when I was Hungry to my wife', author: 'Junaid zubair', read: false, genre: 'Comedy',
  },
];

function router() {
  const adminRouter = express.Router();
  adminRouter.route('/')
    .get((req, res) => {
      const url = `mongodb://${host}:27017`;
      const database = 'booksDB';
      (async function mongoClient() {
        let client;
        try {
          client = await MongoClient.connect(url);
          const db = client.db(database);
          const result = await db.collection('book').insertMany(books);
          res.json(result);
          debug('Connected to database');
        } catch (error) {
          debug('not connected error thrown', error.stack);
        }

        client.close();
      }());

      res.send('Inserting books');
    });

  return adminRouter;
}

module.exports = router;
