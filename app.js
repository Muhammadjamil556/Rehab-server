const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { UserRouter } = require("./routes/user-routes");
const { MedicineRoute } = require("./routes/medicine-routes");
const { ExerciseRoute } = require("./routes/exercise-routes");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1", UserRouter, MedicineRoute, ExerciseRoute);

// Default route
app.get("/", (req, res) => {
  return res.status(200).send({ message: "Great API working" });
});

// Catch-all route for 404 errors
app.all("*", (req, res) => {
  return res
    .status(404)
    .send({ message: req.originalUrl + " route not found" });
});

module.exports = { app, server };
