import React from 'react';
import "./Thriller.css";
import BookCard from "../../pages/books/BookCard";
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

export const Thriller = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  
  const filteredBooks = books.filter(book => book._id >= 32 && book._id <= 40);

  return (
    <div className="product-list-container">
      {filteredBooks.length > 0 && filteredBooks.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};