const Course = require("../models/Course");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

//can only use to post a course if the user is logged in and is an instructor

const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price
    } = req.body;

    let thumbnailUrl = "";

if (req.file) {

  const uploadFromBuffer = () => {
    return new Promise((resolve, reject) => {

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "lms-course-thumbnails",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

    });
  };

  const result = await uploadFromBuffer();

  thumbnailUrl = result.secure_url;
}

    // Check required fields
    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Create course
    const course = await Course.create({
      title,
      description,
      category,
      price,
      thumbnail: thumbnailUrl,
      instructor: req.user.id,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllCourses = async (req, res) => {
  try {

    const courses = await Course.find().populate(
      "instructor",
      "name email"
    );

    res.status(200).json(courses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getCourseById = async (req, res) => {
  try {

    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email role");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json(course);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCourse = async (req, res) => {
  try {

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Ownership Check
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can update only your own courses",
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteCourse = async (req, res) => {
  try {

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Ownership Check
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can delete only your own courses",
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Course deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
