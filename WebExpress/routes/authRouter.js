const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const host = require('../config/dbconfig');
function router(navs) {
    const authRouter = express.Router();
    authRouter.route('/signup')
        .post((req, res) => {

            const { username, password } = req.body;
            let url = `mongodb://${host}:27017`;
            let database = 'booksDB';

            (async function addUser() {
                let client
                try {
                    client = await MongoClient.connect(url);
                    const db = await client.db(database);
                    const col = db.collection('users');
                    const user = { username, password };
                    const result = await col.insertOne(user);
                    debug('Resut users', result);
                    req.login(result.ops[0], () => {
                        res.redirect('/auth/profile');
                    });
                } catch (error) {
                    debug('Error inside database connection', error.stack);
                }

            }());
        });

    authRouter.route('/signin')
        .get((req, res) => {
            if (req.user) {
                res.send('You are signed in');
            } else {
                res.render('signin', {
                    title: 'Sign in',
                    navs
                });
            }
        }).post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));

    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            debug('insdied profile');
            res.json(req.user);
        });

    return authRouter;
}

module.exports = router;