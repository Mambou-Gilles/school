const router = require("express").Router();
const passport = require("passport");

router.get('/auth/github/callback', 
    passport.authenticate('github', {
        failureRedirect: "api-docs", 
        session: false 
    }), 
    // Successful authentication, redirect home.
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
});


module.exports = router;