const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController")

router.get("/", studentController.getAll);
router.get("/:id", studentController.getSingle);

router.post("/create", studentController.createStudent);
router.put("/update/:id", studentController.updateStudent);
router.delete("/delete/:id", studentController.deleteStudent);


module.exports = router;