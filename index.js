const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./src/middlewares/errorHandler");
const app = express();
const cors = require("cors");
const userRoutes = require("./src/routes/user.routes");
const podcastRoutes = require("./src/routes/podcast.routes");
const episodeRoutes = require("./src/routes/episode.routes");

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Connection
connectDB();

// Routes

app.use("/api/users", userRoutes);
app.use("/api/podcast", podcastRoutes);
app.use("/api/episode", episodeRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {});
