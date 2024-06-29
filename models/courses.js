module.exports = (mongoose) => {
    const Course = mongoose.model(
      'courses',
      mongoose.Schema({
        course_id: {
          type: String,
          required: [true, 'Course code is required'],
          unique: true
        },
        name: {
          type: String,
          required: [true, 'Course name is required']
        },
        description: {
          type: String
        },
        credit_hours: {
          type: Number,
          required: true
        }
      })
    );

    return Course;
};