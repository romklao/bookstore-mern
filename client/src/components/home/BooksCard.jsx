import React from 'react'
import BookSingleCard from './BookSingleCard'

const BooksCard = ({ books }) => {
  if (!books || books.length === 0) {
    return <p>No books available</p> // Show a fallback message if no books are found
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
      {books &&
        books.length &&
        books.map((item) => <BookSingleCard key={item._id} book={item} />)}
    </div>
  )
}

export default BooksCard
