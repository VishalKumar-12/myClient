import { useNavigate } from 'react-router-dom';
import "./Nonfiction.css";

import nf1 from "../../assets/nonfiction/nf1.jpg";
import nf2 from "../../assets/nonfiction/nf2.jpg";
import nf3 from "../../assets/nonfiction/nf3.jpg";
import nf4 from "../../assets/nonfiction/nf4.jpg";
import nf5 from "../../assets/nonfiction/nf5.jpg";
import nf6 from "../../assets/nonfiction/nf6.jpg";
import nf7 from "../../assets/nonfiction/nf7.jpg";
import nf8 from "../../assets/nonfiction/nf8.png";
import nf9 from "../../assets/nonfiction/nf9.jpg";
import nf10 from "../../assets/nonfiction/nf10.jpg";
import nf11 from "../../assets/nonfiction/nf11.png";
import nf12 from "../../assets/nonfiction/nf12.jpg";

export const Nonfiction = () => {
   const navigate = useNavigate();
  
   const books = [
    { id: 1, img: nf1, title: "Book 1",price: '400', description: "Some description about book 1." },
    { id: 2, img: nf2, title: "Book 2",price: '450', description: "Some description about book 2." },
    { id: 3, img: nf3, title: "Book 3",price: '400', description: "Some description about book 3." },
    { id: 4, img: nf4, title: "Book 4",price: '300' ,description: "Some description about book 4." },
    { id: 5, img: nf5, title: "Book 5",price: '800' ,description: "Some description about book 5." },
    { id: 6, img: nf6, title: "Book 6",price: '600', description: "Some description about book 6." },
    { id: 7, img: nf7, title: "Book 7",price: '400' ,description: "Some description about book 7." },
    { id: 8, img: nf8, title: "Book 8",price: '300', description: "Some description about book 8." },
    { id: 9, img: nf9, title: "Book 9",price: '480', description: "Some description about book 9." },
    { id: 10, img: nf10, title: "Book 10",price: '400', description: "Some description about book 10." },
    { id: 11, img: nf11, title: "Book 11",price: '490', description: "Some description about book 11." },
    { id: 12, img: nf12, title: "Book 12",price: '400', description: "Some description about book 12." },


  ];

  const handleSubmit = () => {
    navigate("/");
  };

  const addToCart = (id, book) => {
    navigate(`/products/${id}`, { state: book }); // Pass product details using state
  };


  return(
    <main>
        <button onClick={handleSubmit} className="back-home-btn">Back To Home</button>
      <h1>Non-Fiction Books</h1>
      <div className="non-fiction-books">
  <div className="non-fiction-book-list">
    {books.map((book) => (
      <div key={book.id} className="non-fiction-book-item">
        <img src={book.img} alt={book.title} className="non-fiction-book-image" />
        <div className="non-fiction-book-details">
          <h3 className="non-fiction-book-title">{book.title}</h3>
          <p className="non-fiction-book-description">{book.description}</p>
          <p className="non-fiction-book-price">₹{book.price}</p>
          <button onClick={() => addToCart(book.id, book)} className="non-fiction-add-to-cart">
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      
    </main>
    
  ); 
  
  
};
