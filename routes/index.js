const express = require("express");
const course = require("./courseRoutes");
const student = require("./studentRoutes")
const router = express.Router();
const swagger = require("./swagger");
const passport = require("passport");
// const login = require("./login");
// const logout = require("./logout")


router.use("/", swagger);
router.use("/courses", course);
router.use("/students", student);

router.get('/login', passport.authenticate("github"), (req, res) => {});
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err){
            return next(err);
        }
        res.redirect("/");
    })
});

// router.get("/", (req, res) =>{
//     res.send("This is the index file of our API");
// })

module.exports = router;