import React from 'react'
import BookCard from "../../pages/books/BookCard";
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

export const Drama = () => {
  const { data: books = [] } = useFetchAllBooksQuery();
  
    // Filter books with _id from 27 to 33 (inclusive)
    const filteredBooks = books.filter(book => book._id >= 27 && book._id <= 33);
  
  return (
    <div className="product-list-container">
      {filteredBooks.length > 0 && filteredBooks.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  )
}
