const Book = require('../models/bookModel');


const createNewBook = async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
}

const getAllBooks = async (request, response) => {
  try {
    const books = await Book.find();
    return response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
}

const getSpecificBook = async (request, response) => {
    try {
      const { id } = request.params;
      const book = await Book.findById(id);
      if (book) {
        return response.status(200).send(book);
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }

const updateSpecificBook = async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }
      const { id } = request.params;
      const result = await Book.findByIdAndUpdate(id, request.body);
      if (!result) {
        return response.status(404).send({ message: "Book not found" });
      }
      return response.status(200).send({ message: "Book updated successfully" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }

const deleteABook = async (request, response) => {
    try {
      const { id } = request.params;
      const result = await Book.findByIdAndDelete(id);
      if (!result) {
        return response.status(404).json({ message: "Book not found" });
      }
      return response.status(200).send({ message: "Book deleted sucessfully" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  };

module.exports = {createNewBook,getAllBooks,getSpecificBook,updateSpecificBook,deleteABook};