const db = require("../models/index");
const dbModel = db.courses;
const ObjectId = require("mongodb").ObjectId;

//@desk Get all contacts
//@route GET /contact
const getAll = async (req, res) => {
    try {
        const courses = await dbModel.find();
        res.json(courses);
      } catch (err) {
        res.status(500).json({ message: err.message });
      };
    };

//@desk Get single contacts
//@route GET /contacts/:id
const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id to find the course.');
    }
    const courseId = new ObjectId(req.params.id);
    try {
        
        const course = await dbModel.findOne({_id: courseId});
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }

//@desk Create new contacts
//@route POST /create
const createCourse = async (req, res) => {
    const course = new dbModel({
        course_id: req.body.course_id,
        name: req.body.name,
        description: req.body.description,
        credit_hours: req.body.credit_hours,
    });
    try {
        const newCourse = await course.save(course);
        res.status(201).json(newCourse);
    } catch (err) {
        console.log("We could not create a course", err)
    }
}
        
//@desk Update contacts
//@route PUT /update/:id
const updateCourse = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Use a valid course id to update the course.');
    }
    const courseId = new ObjectId(req.params.id);
    try{
        const newCourse = {}
        if(req.body.course_id !== undefined)  newCourse.course_id = req.body.course_id;
        if(req.body.name !== undefined)  newCourse.name = req.body.name;
        if(req.body.description !== undefined)  newCourse.description = req.body.description;
        if(req.body.credit_hours !== undefined)  newCourse.credit_hours = req.body.credit_hours;

        const course = await dbModel.updateOne({_id: courseId}, {$set: newCourse});
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }

//@desk Delete contacts
//@route DELETE delete/:id
const deleteCourse = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Use a valid course id to delete a course.');
    }
    const courseId = new ObjectId(req.params.id);
    try{
        const course = await dbModel.deleteOne({_id: courseId});
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

module.exports = {
    getAll,
    getSingle,
    createCourse,
    updateCourse,
    deleteCourse
}