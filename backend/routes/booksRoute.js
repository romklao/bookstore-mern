const { createNewBook, deleteABook, getAllBooks, getSpecificBook, updateSpecificBook } = require('../controllers/bookControllers');

const express = require('express');

const router = express.Router();

router.post("/", createNewBook);

router.get("/", getAllBooks);

router.get("/:id", getSpecificBook);

router.put("/:id", updateSpecificBook);

router.delete("/:id", deleteABook);

module.exports = router;
