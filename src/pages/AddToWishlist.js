import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../utils/getImgUrl';
import { clearWishlist, removeFromWishlist, moveToCart } from '../redux/features/wishlist/wishlistSlice';

import './styles/AddToWishlist.css';

const AddToWishlist = () => {
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const dispatch = useDispatch();

    const handleRemoveFromWishlist = (product) => {
        dispatch(removeFromWishlist(product));
    };

    const handleClearWishlist = () => {
        dispatch(clearWishlist());
    };

    const handleMoveToCart = (product) => {
        dispatch(moveToCart(product));
    };

    return (
        <div className="wishlist-container">
            <div className="wishlist-content">
                <div className="wishlist-header">
                    <div className="wishlist-title">My Wishlist</div>
                    <div className="clear-wishlist-wrapper">
                        <button
                            type="button"
                            onClick={handleClearWishlist}
                            className="clear-wishlist-button"
                        >
                            <span>Clear Wishlist</span>
                        </button>
                    </div>
                </div>

                <div className="wishlist-items-container">
                    <div className="wishlist-items-wrapper">
                        {wishlistItems.length > 0 ? (
                            <ul role="list" className="wishlist-items-list">
                                {wishlistItems.map((product) => (
                                    <li key={product?._id} className="wishlist-item">
                                        <div className="wishlist-item-image-container">
                                            <img
                                                alt={product?.title}
                                                src={getImgUrl(product?.coverImage)}
                                                className="wishlist-item-image"
                                            />
                                        </div>

                                        <div className="wishlist-item-details">
                                            <div>
                                                <div className="wishlist-item-header">
                                                    <h3>
                                                        <Link to={`/books/${product._id}`}>{product?.title}</Link>
                                                    </h3>
                                                    <p className="wishlist-item-price">₹{product?.newPrice}</p>
                                                </div>
                                                <p className="wishlist-item-category">
                                                    <strong>Category: </strong>{product?.category}
                                                </p>
                                            </div>
                                            <div className="wishlist-item-actions">
                                                <div className="wishlist-item-move-container">
                                                    <button
                                                        onClick={() => handleMoveToCart(product)}
                                                        type="button"
                                                        className="wishlist-item-move-button"
                                                    >
                                                        Move to Cart
                                                    </button>
                                                </div>
                                                <div className="wishlist-item-remove-container">
                                                    <button
                                                        onClick={() => handleRemoveFromWishlist(product)}
                                                        type="button"
                                                        className="wishlist-item-remove-button"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No books in your wishlist!</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="wishlist-footer">
                <div className="wishlist-checkout-container">
                    <Link to="/checkoutpage" className="wishlist-continue-button">
                        Continue Shopping
                    </Link>
                </div>
                <div className="wishlist-continue-shopping">
                    <Link to="/">
                        or
                        <button type="button" className="wishlist-back-button">
                            Back to Home
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddToWishlist;