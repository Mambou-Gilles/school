const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController")

router.get("/", courseController.getAll);
router.get("/:id", courseController.getSingle);

router.post("/create", courseController.createCourse);
router.put("/update/:id", courseController.updateCourse);
router.delete("/delete/:id", courseController.deleteCourse);


module.exports = router;