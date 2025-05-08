import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../utils/getImgUrl';
import { clearCart, removeFromCart, updateCartItemQuantity } from '../redux/features/cart/cartSlice';

import './styles/MyCart.css';

export const MyCart = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch()
    
    // Calculate total price considering quantity
    const totalPrice = cartItems.reduce((acc, item) => 
        acc + (item.newPrice * item.quantity), 0).toFixed(2);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }
    
    const handleQuantityChange = (product, newQuantity) => {
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({ 
                id: product._id, 
                quantity: newQuantity 
            }));
        }
    }
    
    return (
        <>
             <div className="cart-container">
                <div className="cart-content">
                    <div className="cart-header">
                        <div className="cart-title">Shopping cart</div>
                        <div className="clear-cart-wrapper">
                            <button
                                type="button"
                                onClick={handleClearCart}
                                className="clear-cart-button"
                            >
                                <span>Clear Cart</span>
                            </button>
                        </div>
                    </div>

                    <div className="cart-items-container">
                        <div className="cart-items-wrapper">

                            {
                                cartItems.length > 0 ? (
                                    <ul role="list" className="cart-items-list">
                                        {
                                            cartItems.map((product) => (
                                                <li key={product?._id} className="cart-item">
                                                    <div className="cart-item-image-container">
                                                        <img
                                                            alt=""
                                                            src={`${getImgUrl(product?.coverImage)}`}
                                                            className="cart-item-image"
                                                        />
                                                    </div>

                                                    <div className="cart-item-details">
                                                        <div>
                                                            <div className="cart-item-header">
                                                                <h3>
                                                                    <Link to='/'>{product?.title}</Link>
                                                                </h3>
                                                                <p className="cart-item-price">${product?.newPrice}</p>
                                                            </div>
                                                            <p className="cart-item-category"><strong>Category: </strong>{product?.category}</p>
                                                        </div>
                                                        <div className="cart-item-actions">
                                                            <div className="cart-item-quantity-controls">
                                                                <span><strong>Qty:</strong></span>
                                                                <button 
                                                                    className="quantity-button"
                                                                    onClick={() => handleQuantityChange(product, (product.quantity || 1) - 1)}
                                                                    disabled={(product.quantity || 1) <= 1}
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="quantity-value">{product.quantity || 1}</span>
                                                                <button 
                                                                    className="quantity-button"
                                                                    onClick={() => handleQuantityChange(product, (product.quantity || 1) + 1)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>

                                                            <div className="cart-item-remove-container">
                                                                <button
                                                                onClick={() => handleRemoveFromCart(product)}
                                                                type="button" className="cart-item-remove-button">
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                ) : (<p>No product found!</p>)
                            }
                        </div>
                    </div>
                </div>

                <div className="cart-footer">
                    <div className="cart-subtotal">
                        <p>Subtotal</p>
                        <p>${totalPrice ? totalPrice : 0}</p>
                    </div>
                    <p className="cart-shipping-note">Shipping and taxes calculated at checkout.</p>
                    <div className="cart-checkout-container">
                        <Link
                            to="/checkoutpage"
                            className="cart-checkout-button"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                    <div className="cart-continue-shopping">
                        <Link to="/">
                            or
                            <button
                                type="button"
                                className="cart-continue-button"
                            >
                                 Back to Home
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyCart