const express = require("express");
const course = require("./courseRoutes");
const student = require("./studentRoutes")
const router = express.Router();
const swagger = require("./swagger");

router.use("/", swagger);
router.use("/courses", course);
router.use("/students", student);

router.get("/", (req, res) =>{
    res.send("This is the index file of our API");
})

module.exports = router;