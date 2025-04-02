require('dotenv').config();
const express  = require("express");
const mongoose = require('mongoose');
const cors     = require('cors');

//Book Routes
const bRts     = require('./routes/booksRoute.js');
//User Routes
const uRts     = require('./routes/userRoutes.js');

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

const path = require("path");

// Serve frontend in production
// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

app.get("/", (request, response) => {
  response.send("Welcoome to MERN stack tutorial");
});

app.use("/books", bRts);

app.use('/users',uRts);

app.listen(process.env.PORT, () => {
  console.log(`App is listening to port: ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
