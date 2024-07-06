const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { isAuthenticated } = require("../../middleware/authenticate");

router.get("/", courseController.getAll);
router.get("/:id", courseController.getSingle);

router.post("/create", isAuthenticated, courseController.createCourse);
router.put("/update/:id", isAuthenticated, courseController.updateCourse);
router.delete("/delete/:id", isAuthenticated,courseController.deleteCourse);


module.exports = router;