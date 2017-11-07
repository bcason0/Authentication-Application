const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const config = require('../config/db');

module.exports = function(passport) {
  let opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeader(); //Fetches token
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    User.findOne({id: jwt_payload.sub}, (err, user) => {
      if(err) {
        return done( err, false);
      }

      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  }));
}
