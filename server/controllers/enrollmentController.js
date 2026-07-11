const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const enrollCourse = async (req, res) => {
  try {

    const { courseId } = req.body;

    // Check if courseId is provided
    if (!courseId) {
      return res.status(400).json({
        message: "Course ID is required",
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "Already enrolled in this course",
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      student: req.user.id,
      course: courseId,
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getMyCourses = async (req, res) => {
  try {

    const enrollments = await Enrollment.find({
      student: req.user.id,
    }).populate({
      path: "course",
      populate: {
        path: "instructor",
        select: "name email",
      },
    });

    res.status(200).json(enrollments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  enrollCourse,
  getMyCourses,
};