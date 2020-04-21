const passport = require('passport');
const debug = require('debug')('app:passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        debug('inside serialize passport', user);
        done(null, { ...user, date: new Date() });
    });

    passport.deserializeUser((user, done) => {
        debug('inside DEserialize passport', user);
        done(null, user);
    });

}