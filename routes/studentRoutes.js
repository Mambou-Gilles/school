const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { isAuthenticated } = require("../../middleware/authenticate");

router.get("/", studentController.getAll);
router.get("/:id", studentController.getSingle);

router.post("/create", isAuthenticated, studentController.createStudent);
router.put("/update/:id", isAuthenticated, studentController.updateStudent);
router.delete("/delete/:id", isAuthenticated, studentController.deleteStudent);


module.exports = router;