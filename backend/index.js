import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: "GET, POST, PUT, DELETE",
//   allowedHeaders: "Content-Type",
// }));
import path from "path";

// Serve frontend in production
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

app.get("/", (request, response) => {
  response.send("Welcoome to MERN stack tutorial");
});

app.use("/books", bookRoute);

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
