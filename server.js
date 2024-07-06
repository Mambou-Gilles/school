const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const routes = require("./routes")
const mongodb = require('./config/db.config');
const passport = require("passport");
const session = require("express-session");
const gitHubStrategy =require("passport-github2").Strategy;
const cors = require("cors");

const port = process.env.PORT;
const host = process.env.HOST

app.use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(session(
        {
            secret: "secret",
            resave: false,
            saveUninitialized: true,
        }
    ))
    .use(passport.initialize())
    .use(passport.session())
    .use(cors())
    .use('/', routes);

passport.use(new gitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    },
    function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(null, profile);
        // });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
    });

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) =>{
    res.send( req.session.user !== undefined ? `Logged in as ${req.session.user.displayName} ` : "You are logged Out")});

app.get('/github/callback', 
    passport.authenticate('github', {
        failureRedirect: "api-docs", 
        session: false 
    }), 
    // Successful authentication, redirect home.
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
});

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

app.listen(port, () => {
    console.log(`Server is running at ${host}:${port}`)
})