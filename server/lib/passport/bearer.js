const BearerStrategy = require('passport-http-bearer').Strategy;

const bearerStrategy = new BearerStrategy((token, done) => {


    console.log('\x1b[41m');
    console.log(token);
    console.log('\x1b[0m');

    //if (err) { return done(err); }
    //if (!user) { return done(null, false); }
    return done(null, {user: 'allow'}, {scope: 'all'});
});

module.exports = bearerStrategy;