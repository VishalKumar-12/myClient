import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import './styles/CheckoutPage.css';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import { useCreateOrderMutation } from '../redux/features/orders/ordersApi';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    
    // Combine cart and wishlist items for checkout
    const allItems = [...cartItems, ...wishlistItems];
    
    // Remove duplicates (items that might be in both cart and wishlist)
    const uniqueItems = allItems.filter((item, index, self) => 
        index === self.findIndex((t) => t._id === item._id)
    );
   
    // Updated total price calculation to consider quantity
    const totalPrice = uniqueItems.reduce((acc, item) => 
        acc + Number(item.newPrice || 0) * (item.quantity || 1), 0);

    const {currentUser} = useAuth();  
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [createOrder, {isLoading, error}] = useCreateOrderMutation();
    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(false)
    
    const onSubmit = async (data) => {
        // Log the form data to the console
        console.log("Form data submitted:", data);
        
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                street: data.address,
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: uniqueItems.map(item => item?._id),
            products: uniqueItems.map(item => ({
                productId: item?._id,
                quantity: item.quantity || 1,
                price: item.newPrice
            })),
            totalPrice: totalPrice,
        }
        
        // Log the complete order object
        console.log("Order object:", newOrder);
        
        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Confirmed Order",
                text: "Your order placed successfully!",
                icon: "success",  // Changed from "warning" to "success"
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
              });
              navigate("/orders")
        } catch (error) {
            console.error("Error place an order", error);
            alert("Failed to place an order")
        }
    }
    
    if(isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    <p className="mt-4 text-lg font-medium text-gray-600">Processing your order...</p>
                </div>
            </div>
        );
    }
    
    // Calculate total items considering quantities
    const totalItems = uniqueItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
    
    // Separate items by source (cart or wishlist)
    const cartOnlyItems = cartItems.filter(cartItem => 
        !wishlistItems.some(wishItem => wishItem._id === cartItem._id)
    );
    
    const wishlistOnlyItems = wishlistItems.filter(wishItem => 
        !cartItems.some(cartItem => cartItem._id === wishItem._id)
    );
    
    const itemsInBoth = cartItems.filter(cartItem => 
        wishlistItems.some(wishItem => wishItem._id === cartItem._id)
    );
    
    return (
        <section>
            <div className="checkout-container">
                <div className="checkout-header">
                    <h2 style={{ marginTop: "120px" }}>Complete Your Purchase</h2>
                    <p>Please review your order and fill in your details</p>
                </div>
                
                <div className="order-summary">
                    <div className="order-summary-item">
                        <span>Total:</span> ${totalPrice.toFixed(2)}
                    </div>
                    <div className="order-summary-item">
                        {/* <span>Total (INR):</span> ₹{totalPriceINR} */}
                    </div>
                    <div className="order-summary-item">
                        <span>Items:</span> {totalItems} ({uniqueItems.length} products)
                    </div>
                </div>
                
                {uniqueItems.length > 0 && (
                    <div className="book-details">
                        <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                        
                        {cartOnlyItems.length > 0 && (
                            <>
                                {/* <h4 className="text-md font-medium mb-2">From Your Cart</h4> */}
                                {cartOnlyItems.map((item, index) => (
                                    <div key={`cart-${index}`} className="book-item">
                                        <div>
                                            <h4 className="font-medium">{item.title || "Product"}</h4>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                                        </div>
                                        <div className="font-semibold">${((item.newPrice || 0) * (item.quantity || 1)).toFixed(2)}</div>
                                    </div>
                                ))}
                            </>
                        )}
                        
                        {wishlistOnlyItems.length > 0 && (
                            <>
                                {/* <h4 className="text-md font-medium mb-2 mt-4">From Your Wishlist</h4> */}
                                {wishlistOnlyItems.map((item, index) => (
                                    <div key={`wishlist-${index}`} className="book-item">
                                        <div>
                                            <h4 className="font-medium">{item.title || "Product"}</h4>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                                        </div>
                                        <div className="font-semibold">${((item.newPrice || 0) * (item.quantity || 1)).toFixed(2)}</div>
                                    </div>
                                ))}
                            </>
                        )}
                        
                        {itemsInBoth.length > 0 && (
                            <>
                                <h4 className="text-md font-medium mb-2 mt-4">Items in Both Cart & Wishlist</h4>
                                {itemsInBoth.map((item, index) => (
                                    <div key={`both-${index}`} className="book-item">
                                        <div>
                                            <h4 className="font-medium">{item.title || "Product"}</h4>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                                        </div>
                                        <div className="font-semibold">${((item.newPrice || 0) * (item.quantity || 1)).toFixed(2)}</div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}
                
                <div className="checkout-form">
                    <div className="form-section-info">
                        <h3>Shipping Information</h3>
                        <p>Please provide your shipping details for delivery</p>
                    </div>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-fields">
                            <div className="form-field">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    {...register("name", { required: "Full name is required" })}
                                    type="text" 
                                    id="name" 
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="error-message">{errors.name.message}</p>}
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="text" 
                                    name="email" 
                                    id="email" 
                                    disabled
                                    defaultValue={currentUser?.email}
                                    placeholder="email@domain.com" 
                                />
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    {...register("phone", { 
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9+\s-]+$/,
                                            message: "Please enter a valid phone number"
                                        }
                                    })}
                                    type="tel" 
                                    id="phone"
                                    placeholder="+123 456 7890"
                                />
                                {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="address">Address / Street</label>
                                <input
                                    {...register("address", { required: "Address is required" })}
                                    type="text" 
                                    id="address"
                                    placeholder="123 Main St"
                                />
                                {errors.address && <p className="error-message">{errors.address.message}</p>}
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="city">City</label>
                                <input
                                    {...register("city", { required: "City is required" })}
                                    type="text" 
                                    id="city"
                                    placeholder="New York"
                                />
                                {errors.city && <p className="error-message">{errors.city.message}</p>}
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="state">State / Province</label>
                                <input
                                    {...register("state", { required: "State is required" })}
                                    type="text" 
                                    id="state"
                                    placeholder="NY"
                                />
                                {errors.state && <p className="error-message">{errors.state.message}</p>}
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="country">Country</label>
                                <input
                                    {...register("country", { required: "Country is required" })}
                                    type="text" 
                                    id="country"
                                    placeholder="United States"
                                />
                                {errors.country && <p className="error-message">{errors.country.message}</p>}
                            </div>
                            
                            <div className="form-field">
                                <label htmlFor="zipcode">Zipcode</label>
                                <input
                                    {...register("zipcode", { 
                                        required: "Zipcode is required",
                                        pattern: {
                                            value: /^[0-9]{5,10}$/,
                                            message: "Please enter a valid zipcode"
                                        }
                                    })}
                                    type="text" 
                                    id="zipcode"
                                    placeholder="10001"
                                />
                                {errors.zipcode && <p className="error-message">{errors.zipcode.message}</p>}
                            </div>
                        </div>
                        
                        <div className="terms-checkbox">
                            <input
                                onChange={(e) => setIsChecked(e.target.checked)}
                                type="checkbox" 
                                id="terms" 
                                name="terms"
                            />
                            <label htmlFor="terms">
                                I agree to the <Link to="/terms">Terms & Conditions</Link> and <Link to="/policy">Shopping Policy</Link>
                            </label>
                        </div>
                        
                        <div className="submit-button">
                            <button
                                type="submit"
                                disabled={!isChecked}
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CheckoutPage
