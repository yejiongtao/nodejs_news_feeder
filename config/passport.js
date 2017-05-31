var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var queryClient = require('../db/client');
var digest = require('./digest');

passport.use(new LocalStrategy(function (username, password, done) {
    var d = digest(username + password);
    queryClient.selectViaUsernameAndDigest(username, d, function (rows) {
        if(rows && rows.length !== 0)
            done(null, username);
        else
            done(null, false);
    });
}));

// simply save the username in the cookie
passport.serializeUser(function(user, done) {
    done(null, user);
});

// nothing else I want other than the username from cookie
passport.deserializeUser(function(id, done) {
    done(null, id);
});

