// ProductDetail.jsx
import { useLocation, useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./styles/ProductDetail.css";
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from "../redux/features/cart/cartSlice";
// import { useFetchBookByIdQuery } from '../redux/features/books/booksApi';


export const ProductDetail = () => {
  const { id } = useParams();
  // const { data: fetchedBooks = [], isLoading, error } = useFetchAllBooksQuery();
    
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const product = location.state || {};
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Handle quantity change
  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  // Add to cart functionality
  const addToCart = () => {
    // Create a cart item with product info and quantity
    const cartItem = {
      ...product,
      quantity
    };
    
    // Dispatch the Redux action
    dispatch(addToCartAction(cartItem));
    
    // Update localStorage for persistence
    updateLocalStorage(cartItem);
    
    // Show success message
    setAddedToCart(true);
  };
  
  // Update localStorage cart data
  const updateLocalStorage = (newItem) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex(item => item.id === newItem.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += newItem.quantity;
    } else {
      // Add new item
      cart.push(newItem);
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Dispatch custom event for other components that might be listening
    const event = new CustomEvent('cartUpdated', { 
      detail: { cartCount: getTotalCartItems(cart) } 
    });
    window.dispatchEvent(event);
  };
  
  // Calculate total items in cart (for cart count)
  const getTotalCartItems = (cart) => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <main>
      <div className="product-detail">
        {/* Left Column - Book Image */}
        <div className="product-image-container">
          {product?.img ? (
            <img src={product.img} alt={product.title} className="product-image" />
          ) : (
            <div className="placeholder-image">Book image not available</div>
          )}
          <div className="book-format">
            <span className="badge">Paperback</span>
            {product.isEbook && <span className="badge ebook">E-Book</span>}
          </div>
        </div>

        {/* Middle Column - Book Details */}
        <div className="product-info">
          <h2 className="book-title">{product.title || "Product Title"}</h2>
          
          <div className="author-info">
            <span className="by-text">By</span> 
            <span className="author-name">{product.author || "Unknown Author"}</span>
          </div>
          
          <div className="book-rating">
            {renderRatingStars(product.rating || 4.5)}
            <span className="review-count">({product.reviews || 42} reviews)</span>
          </div>
          
          <div className="book-categories">
            {(product.categories || ["Fiction", "Novel"]).map((category, index) => (
              <span key={index} className="category-badge">{category}</span>
            ))}
          </div>
          
          <div className="book-description">
            <p>{product.description || "No description available."}</p>
          </div>
          
          <div className="book-details-grid">
            <div className="detail-item">
              <span className="detail-label">Publisher:</span>
              <span className="detail-value">{product.publisher || "Unknown Publisher"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Publication Date:</span>
              <span className="detail-value">{product.publicationDate || "2023"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Pages:</span>
              <span className="detail-value">{product.pages || "320"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Language:</span>
              <span className="detail-value">{product.language || "English"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">ISBN:</span>
              <span className="detail-value">{product.isbn || "978-0123456789"}</span>
            </div>
          </div>
          
          <div className="price-container">
            <p className="price">₹{product.price || "N/A"}</p>
            {product.originalPrice && <p className="original-price">₹{product.originalPrice}</p>}
            {product.discount && <p className="discount-tag">{product.discount}% OFF</p>}
          </div>
          
          {/* Quantity Selector */}
          <div className="quantity-selector">
            <span className="quantity-label">Quantity:</span>
            <button 
              onClick={() => handleQuantityChange(-1)} 
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
            >-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} aria-label="Increase quantity">+</button>
          </div>
          
          {/* Success Message */}
          {addedToCart && <p className="success-message">✅ Successfully added to cart!</p>}
          
        </div>

        {/* Right Column - Buttons and Additional Info */}
        <div className="product-actions">
          <div className="delivery-info">
            <div className="delivery-item">
              <span className="delivery-icon">🚚</span>
              <span>Free delivery on orders over ₹499</span>
            </div>
            <div className="delivery-item">
              <span className="delivery-icon">⏱️</span>
              <span>Delivery within 3-5 business days</span>
            </div>
          </div>
          
          <div className="action-buttons">
            {addedToCart ? (
              <button onClick={() => navigate("/mycart")} className="go-to-cart-btn">
                Go to Cart
              </button>
            ) : (
              <button 
                onClick={addToCart} 
                className="add-to-cart-btn"
                disabled={!product.id}
              >
                Add to Cart
              </button>
            )}
            <button 
              onClick={() => navigate("/buy")} 
              className="buy-now-btn"
              disabled={!product.id}
            >Buy Now</button>
            <button onClick={() => navigate("/wishlist")} className="wishlist-btn">Add to Wishlist</button>
          </div>
          
          <div className="seller-info">
            <span className="seller-label">Sold by:</span>
            <span className="seller-name">{product.seller || "BookStore Official"}</span>
            <div className="seller-rating">
              {renderRatingStars(product.sellerRating || 4.8)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  
  // Rating stars display
  function renderRatingStars(rating) {
    const fullStars = Math.floor(rating || 0);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star full">★</span>);
      } else if (i === fullStars && halfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }

    return (
      <div className="rating-stars">
        {stars}
        <span className="rating-number">({rating || 0})</span>
      </div>
    );
  }
};