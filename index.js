const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./src/middlewares/errorHandler");
const app = express();
const cors = require("cors");
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const podcastRoutes = require("./src/routes/podcast.routes");
const episodeRoutes = require("./src/routes/episode.routes");
const { authenticateToken } = require("./src/middlewares/auth.middleware");
const { rateLimiting } = require("./src/middlewares/rateLimiting.middleware");

dotenv.config();

// app.use(cors());

// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: ["http://localhost:5173", "https://react-figma-omega.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Connection
connectDB();

// Routes

app.use("/auth", authRoutes);
app.use(rateLimiting); // middleware
app.use("/api", authenticateToken); // middleware
app.use("/api/users", userRoutes);
app.use("/api/podcast", podcastRoutes);
app.use("/api/episode", episodeRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {});
