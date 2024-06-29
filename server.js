const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const routes = require("./routes")
const mongodb = require('./config/db.config');
const cors = require("cors");

const port = process.env.PORT;
const host = process.env.HOST

app.use(express.json())
    .use(cors())
    .use('/', routes);

app.listen(port, () => {
    console.log(`Server is running at ${host}:${port}`)
})