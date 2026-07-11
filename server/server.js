require("dotenv").config();

const connectDB = require("./config/db");

const express = require("express");

const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const courseRoutes = require("./routes/courseRoutes");

const enrollmentRoutes = require("./routes/enrollmentRoutes");

const lessonRoutes = require("./routes/lessonRoutes");

const progressRoutes = require("./routes/progressRoutes");


const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/course", courseRoutes);

app.use("/api/enrollment", enrollmentRoutes);

app.use("/api/lesson", lessonRoutes);

app.use("/api/progress", progressRoutes);

//API routes
app.get("/", (req, res) => {
    res.send("Learning Management System Backend is Running!");
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_CLOUD_NAME);