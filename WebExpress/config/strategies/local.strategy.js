const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:localStrategy');
const host = require('../dbconfig');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      let url = `mongodb://${host}:27017`;
      let database = 'booksDB';

      (async function addUser() {
        let client
        try {
          client = await MongoClient.connect(url);
          const db = await client.db(database);
          const col = db.collection('users');
          const user = await col.findOne({ username });

          debug('Local Strategy user ', user);
          if (user && user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (error) {
          debug('Error local Strategy', error.stack);
        }
        client.close();
      }());
    }
  ));
}
