import React from "react";
import BookCard from "../pages/books/BookCard";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import "./styles/ProductDetail.css";
import "./styles/ProductList.css";
import { useFetchAllBooksQuery } from '../redux/features/books/booksApi';

// Import images
// import pr1 from "../assets/books/p1.png";
// import pr2 from "../assets/books/p2.png";
// import pr3 from "../assets/books/p3.png";
// import pr4 from "../assets/books/p4.png";
// import pr5 from "../assets/books/p5.png";
// import pr6 from "../assets/books/p6.png";
// import pr7 from "../assets/books/p7.png";
// import pr8 from "../assets/books/p8.png";
// import pr9 from "../assets/books/p9.png";
// import pr10 from "../assets/books/p10.png";
// import pr11 from "../assets/books/p11.png";
// import pr12 from "../assets/books/p12.png";


export const ProductList = () => {
  // const [searchParams] = useSearchParams();
  // const location = useLocation();
  // const navigate = useNavigate();

  // console.log(location);
  const { data: books = [] } = useFetchAllBooksQuery();
  // const books = [
  //   { id: 1, img: pr1, title: "Book 1", price: "400", description: "Some description about book 1." },
  //   { id: 2, img: pr2, title: "Book 2", price: "500", description: "Some description about book 2." },
  //   { id: 3, img: pr3, title: "Book 3", price: "300", description: "Some description about book 3." },
  //   { id: 4, img: pr4, title: "Book 4", price: "400", description: "Some description about book 4." },
  //   { id: 5, img: pr5, title: "Book 5", price: "700", description: "Some description about book 5." },
  //   { id: 6, img: pr6, title: "Book 6", price: "800", description: "Some description about book 6." },
  //   { id: 7, img: pr7, title: "Book 7", price: "400", description: "Some description about book 7." },
  //   { id: 8, img: pr8, title: "Book 8", price: "600", description: "Some description about book 8." },
  //   { id: 9, img: pr9, title: "Book 9", price: "400", description: "Some description about book 9." },
  //   { id: 10, img: pr10, title: "Book 10", price: "400", description: "Some description about book 10." },
  //   { id: 11, img: pr11, title: "Book 11", price: "300", description: "Some description about book 11." },
  //   { id: 12, img: pr12, title: "Book 12", price: "400", description: "Some description about book 12." },
  // ];

  // const handleSubmit = () => {
  //   console.log("Navigating to home...");
  //   navigate("/");
  // };

  // const addToCart = (id, book) => {
  //   console.log("Go to Product details", id);
  //   navigate(`/products/${id}`, { state: book }); // Pass product details using state
  // };

  return (
    <div className="product-list-container">
      {books.length > 0 && books.slice(0,32 ).map((book, index) => (
        <BookCard key={book.id || index} book={book} />
      ))}
    </div>
  );
};