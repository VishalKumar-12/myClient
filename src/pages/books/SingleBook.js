import React from 'react'
import { FiShoppingCart, FiHeart } from "react-icons/fi"
import { Link, useParams } from "react-router-dom"
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import './SingleBook.css';
import { addToWishlist } from '../../redux/features/wishlist/wishlistSlice';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error happened while loading book info</div>;

    const discount = book.oldPrice && book.newPrice
        ? Math.round(((book.oldPrice - book.newPrice) / book.oldPrice) * 100)
        : null;

    return (
        <div className="single-book-container max-w-lg shadow-md p-5">
            <h1 className="single-book-title text-2xl font-bold mb-6">{book.title}</h1>

            <div className="single-book-content">
                <div className="single-book-image-container">
                    <img
                        src={getImgUrl(book.coverImage)}
                        alt={book.title}
                        className="single-book-image mb-8"
                    />
                </div>

                <div className="single-book-details mb-5">
                    <p className="single-book-author text-gray-700 mb-2">
                        <strong>Author:</strong> {book.author || 'admin'}
                    </p>
                    <p className="single-book-published text-gray-700 mb-2">
                        <strong>Published:</strong> {new Date(book.createdAt).toLocaleDateString()}
                    </p>
                    <p className="single-book-category text-gray-700 mb-2 capitalize">
                        <strong>Category:</strong> {book.category}
                    </p>
                    <p className="single-book-description text-gray-700 mb-4">
                        <strong>Description:</strong> {book.description}
                    </p>

                    {/* ✅ Price Section */}
                    <div className="single-book-pricing text-gray-800 mb-4">
                        <p><strong>Price:</strong> ₹{book.newPrice}</p>
                        {book.oldPrice && (
                            <p>
                                <strong>Old Price:</strong> <span className="line-through text-red-500">₹{book.oldPrice}</span>
                            </p>
                        )}
                        {discount && (
                            <p><strong>Discount:</strong> <span className="text-green-600">{discount}% off</span></p>
                        )}
                        <p><strong>Total Price:</strong> ₹{book.newPrice}</p>
                    </div>
                </div>

                <div className="single-book-actions">
                    <button
                        onClick={() => handleAddToCart(book)}
                        className="single-book-cart-btn btn-primary px-6 space-x-1 flex items-center gap-1"
                    >
                        <FiShoppingCart className="single-book-cart-icon" />
                        <span>Add to Cart</span>
                    </button>

                    <Link to="/addtowishlist">
                        <button onClick={() => dispatch(addToWishlist(book))} className="ml-3">
                            ❤️ Add to Wishlist
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SingleBook;
