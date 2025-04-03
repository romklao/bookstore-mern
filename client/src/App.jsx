import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/CreateBooks'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'

const App = () => {
  return (
    <div>
      <h1>Welcome to MERN Stack Tutorial</h1>
    </div>
    // <Routes>
    // <Route path="/" element={<Home />} />
    // <Route path="/books/create" element={<CreateBook />} />
    // <Route path="/books/details/:id" element={<ShowBook />} />
    // <Route path="/books/edit/:id" element={<EditBook />} />
    // <Route path="/books/delete/:id" element={<DeleteBook />} />
    // </Routes>
  )
}

export default App
