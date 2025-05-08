import React from 'react'
import { FiShoppingCart, FiBookOpen } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl';
import './BookCard.css';
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const BookCard = ({book}) => {
    const dispatch = useDispatch();

    // const handleAddToCart = (product) => {
    //     dispatch(addToCart(product))
    // }
    return (
        <div className="book-card">
            <div className="book-container">
                <div className="book-image-container">
                    <Link to={`/books/${book._id}`}>
                        <img
                            src={`${getImgUrl(book?.coverImage)}`}
                            alt=""
                            className="book-image"
                        />
                    </Link>
                </div>

                <div className="book-details">
                    <Link to={`/books/${book._id}`}>
                        <h3 className="book-title">
                            {book?.title}
                        </h3>
                        <h4 className="book-author">
                            {book?.author}
                        </h4>
                    </Link>
                    {/* <p className="book-description">{book?.description.length > 150 ? `${book.description.slice(0, 150)}...` : book?.description}</p> */}
                    <p className="book-price">
                        ${book?.newPrice} <span className="book-old-price">$ {book?.oldPrice}</span>
                    </p>
                    
                    {/* Free Sample Link */}
                    <a 
                        href={`/samples/${book?._id}`} 
                        className="free-sample-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiBookOpen />
                        <span>Read Free Sample</span>
                    </a>
                    
                    {/* <button 
                        onClick={() => handleAddToCart(book)}
                        className="add-to-cart-btn">
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                    </button> */}
                    {/* <button className='add-to-cart-btn'>
                     ❤️ Add to Wishlist
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default BookCard