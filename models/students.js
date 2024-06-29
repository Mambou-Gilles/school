module.exports = (mongoose) => {
    const Student = mongoose.model(
      'students',
      mongoose.Schema({
        student_id: {
            type: String,
            required: [true, 'Student ID is required'],
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        enrollmentDate: { 
            type: Date, 
            required: true 
        },
        courses: { 
            type: [String], 
            required: true },
        status: { 
            type: String, 
            required: true
        } 
      })
    );

    return Student;
};