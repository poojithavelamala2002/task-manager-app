require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Use MongoDB Atlas connection string from .env file
mongoose.connect(process.env.DATABASE_URL);

const app = express();
const db = mongoose.connection;

// Middleware setup
app.use(cors());
app.use(express.json());

// Handle database connection events
db.on("error", (err) => console.log(err));
db.on("open", () => console.log("DATABASE CONNECTED"));

// Set up routes for tasks
const tasRouter = require("./routes/tasks");
app.use("/api/tasks", tasRouter);

// Start the server
app.listen(process.env.PORT, () => console.log(`Server is listening at port ${process.env.PORT}`));
