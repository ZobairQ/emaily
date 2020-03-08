const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accesToken, refreshToken, profile, done) => {
      //Check if GoogleID already exists in database
      User.findOne({ googleId: profile.id }).then(existingUser => {
        //if so skip the creation
        if (existingUser) {
          done(null, existingUser);
        } else {
          //if not create the user inside the db.
          new User({ googleId: profile.id }).save().then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);
