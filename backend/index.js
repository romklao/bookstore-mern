import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "*", // Allow any origin (use specific domains for production)
//     methods: "GET, POST, PUT, DELETE",
//     allowedHeaders: "Content-Type, Origin, Referer, Authorization", // Ensure headers like Referer are allowed
//   })
// );

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store"); // Prevent caching
  next();
});

if (process.env.NODE_ENV === "production") {
  // Resolve __dirname in ES modules
  console.log("Connecting to MongoDB with URL:", mongoDBURL);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Serve static files from the frontend build directory
  const clientPath = path.join(__dirname, "../client", "dist");

  app.use(express.static(clientPath));

  // Handle all other routes by sending index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

app.get("/", (request, response) => {
  response.send("Welcoome to MERN stack tutorial");
});

app.use("/books", booksRoute);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none"); // Adjust value as needed
  next();
});

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
