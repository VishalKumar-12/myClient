import React from 'react';
import "./Action.css";
import BookCard from "../../pages/books/BookCard";
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

export const Action = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  // Filter books with _id from 21 to 26 (inclusive)
  const filteredBooks = books.filter(book => book._id >= 35 && book._id <= 41);

  return (
    <div className="product-list-container">
      {filteredBooks.length > 0 && filteredBooks.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};