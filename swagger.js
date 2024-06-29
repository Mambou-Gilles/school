const swaggerAutogen = require("swagger-autogen")();

const doc = {
    swagger: "2.0",
    info: {
        "description": "Swagger file that generates a visual UI and live documentation from the swagger.json.",
        "version": "1.0.0",
        "title": "Documentation of my school API"
    },
    host: "project2-spl2.onrender.com",
    // host: "localhost:5000",
    schemes: ["https", "http"],
    };
const outputFile = "./models/swagger.json";
const endpointsFiles = ["./routes/index.js"]; 
//generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);