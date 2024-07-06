const db = require("../models/index");
const dbModel = db.students;
const ObjectId = require("mongodb").ObjectId;

//@desk Get all student
//@route GET /student
const getAll = async (req, res) => {
    try {
        const student = await dbModel.find();
        res.json(student);
      } catch (err) {
        res.status(500).json({ message: err.message });
      };
}

//@desk Get single student
//@route GET /student/:id
const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to find the student.');
    }
    const studentId = new ObjectId(req.params.id);
    try {
        
        const student = await dbModel.findOne({_id: studentId});
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }

//@desk Create new student
//@route POST /create
const createStudent = async (req, res) => {
    const student = new dbModel({
        student_id: req.body.student_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        enrollmentDate: req.body.enrollmentDate,
        courses: req.body.courses,
        status: req.body.status
    });
    try {
        const newStudent = await student.save(student);
        res.status(201).json(newStudent);
    } catch (err) {
        console.log("We could not create a student", err)
    }
}
        
//@desk Update student
//@route PUT /update/:id
const updateStudent = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Use a valid student id to update the Student.');
    }
    const studentId = new ObjectId(req.params.id);
    try{
        const newStudent = {}
        if(req.body.student_id !== undefined)  newStudent.student_id = req.body.student_id;
        if(req.body.firstName !== undefined)  newStudent.firstName = req.body.firstName;
        if(req.body.lastName !== undefined)  newStudent.lastName = req.body.lastName;
        if(req.body.email !== undefined)  newStudent.email = req.body.email;
        if(req.body.enrollmentDate !== undefined)  newStudent.enrollmentDate = req.body.enrollmentDate;
        if(req.body.courses !== undefined)  newStudent.courses = req.body.courses;
        if(req.body.status !== undefined)  newStudent.status = req.body.status;

        const student = await dbModel.updateOne({_id: studentId}, {$set: newStudent});
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

//@desk Delete student
//@route DELETE delete/:id
const deleteStudent = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Use a valid course id to delete a course.');
    }
    const studentId = new ObjectId(req.params.id);
    try{
        const student = await dbModel.deleteOne({_id: studentId});
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

module.exports = {
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent
}