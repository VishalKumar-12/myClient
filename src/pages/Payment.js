import React, { useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles/Payment.css";
import Swal from "sweetalert2";
import visa from "../assets/visa.png";
import master from "../assets/master.jpg";
import rupay from "../assets/rupay.png";
import mestro from "../assets/maestro.png";




export const Payment = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.newPrice || 0), 0);
  const USD_TO_INR_RATE = 83;
  const totalPriceINR = (parseFloat(totalPrice) * USD_TO_INR_RATE).toFixed(2);
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    saveCard: false,
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Months and years for expiry date select options
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  useEffect(() => {
    // Redirect if cart is empty
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [navigate, cartItems.length]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle specific validations during input
    if (name === "cardNumber" && value && !/^\d*$/.test(value)) {
      // Only allow digits for card number
      return;
    }
    
    if (name === "cvv" && value && !/^\d*$/.test(value)) {
      // Only allow digits for CVV
      return;
    }
    
    setPaymentData({
      ...paymentData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(paymentData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    
    // Cardholder name validation
    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }
    
    // CVV validation (3 or 4 digits)
    if (!/^\d{3,4}$/.test(paymentData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }
    
    // Expiry date validation
    if (!paymentData.expiryMonth || !paymentData.expiryYear) {
      newErrors.expiry = "Expiry date is required";
    } else {
      // Check if card is expired
      const currentDate = new Date();
      const expiryDate = new Date(
        parseInt(paymentData.expiryYear, 10),
        parseInt(paymentData.expiryMonth, 10) - 1
      );
      
      if (expiryDate < currentDate) {
        newErrors.expiry = "Card has expired";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Save order details
        const orderDetails = {
          orderId: `ORD-${Date.now()}`,
          items: cartItems,
          totalAmount: totalPrice.toFixed(2),
          orderDate: new Date().toISOString(),
          paymentDetails: {
            cardNumber: `xxxx-xxxx-xxxx-${paymentData.cardNumber.slice(-4)}`,
            cardholderName: paymentData.cardholderName,
          },
        };
        
        // Success notification
        Swal.fire({
          title: "Payment Successful",
          text: "Your order has been placed successfully!",
          icon: "success",
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "View Order"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/order-confirmation", { state: { orderDetails } });
          }
        });
        
      } catch (error) {
        console.error("Payment processing error:", error);
        setErrors({
          form: "Payment processing failed. Please try again later."
        });
        
        Swal.fire({
          title: "Payment Failed",
          text: "There was a problem processing your payment. Please try again.",
          icon: "error",
          confirmButtonColor: "#EF4444"
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="buy-container">
      <h2 style={{ marginTop: "0px" }}>Payment Information</h2>

      <div className="checkout-content">
        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Card Details</h3>
          
          <div className="card-icons">
                  <img 
                    src={master} 
                    alt="Mastercard" 
                    className="card-icon"
                  />
                  
                 
                  <img 
                    src={rupay} 
                    alt="Rupay" 
                    className="card-icon"
                  />
                  <img 
                    src={mestro} 
                    alt="Mestro" 
                    className="card-icon"
                  />
                  <img 
                    src={visa} 
                    alt="Visa" 
                    className="card-icon"
                  />
                </div>

          {errors.form && <p className="error-message form-error">{errors.form}</p>}
          
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            maxLength="16"
            disabled={isSubmitting}
            required
          />
          {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}

          <label>Cardholder Name:</label>
          <input
            type="text"
            name="cardholderName"
            value={paymentData.cardholderName}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={isSubmitting}
            required
          />
          {errors.cardholderName && <p className="error-message">{errors.cardholderName}</p>}

          <div className="expiry-date">
            <label>Expiry Date:</label>
            <div className="expiry-selects">
              <select
                name="expiryMonth"
                value={paymentData.expiryMonth}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              >
                <option value="">Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              
              <select
                name="expiryYear"
                value={paymentData.expiryYear}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              >
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {errors.expiry && <p className="error-message">{errors.expiry}</p>}
          </div>

          <label>CVV:</label>
          <input
            type="password"
            name="cvv"
            value={paymentData.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength="4"
            disabled={isSubmitting}
            required
          />
          {errors.cvv && <p className="error-message">{errors.cvv}</p>}

          <div className="save-card">
            <input
              type="checkbox"
              name="saveCard"
              checked={paymentData.saveCard}
              onChange={handleChange}
              id="saveCard"
              disabled={isSubmitting}
            />
            <label htmlFor="saveCard">Save card for future purchases</label>
          </div>

          <div className="button-group">
            <button 
              type="button" 
              onClick={() => navigate("/checkoutpage")} 
              className="back-btn"
              disabled={isSubmitting}
            >
              Back to Shipping
            </button>
            <Link to="/orders">
            <button 
              type="submit" 
              className="place-order-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
            </Link>
           
          </div>
        </form>
        <div className="order-summary">
  <h3>Order Summary</h3>

  {cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <>
      <div className="order-table">
        <div className="table-header row">
          <div className="col-name">Item Name</div>
          <div className="col-quantity">Quantity</div>
          <div className="col-price">Price</div>
          {/* <div className="col-subtotal">Subtotal</div> */}
        </div>
        
        {cartItems.map((item, index) => {
          const subtotal = item.quantity * parseFloat(item.price);
          return (
            <div key={index} className="table-row row">
              <div className="col-name">{item.title}</div>
              <div className="col-quantity">{item.quantity}</div>
              <div className="col-price">${parseFloat(item.price).toFixed(2)}</div>
              {/* <div className="col-subtotal">${subtotal.toFixed(2)}</div> */}
            </div>
          );
        })}
        
        <div className="total-row row">
          <div className="col-name"></div>
          <div className="col-quantity"></div>
          <div className="col-price"><strong>Total:</strong></div>
          <div className="col-subtotal"><strong>${totalPrice.toFixed(2)}</strong></div>
        </div>
      </div>
    </>
  )}
</div>

      </div>
    </main>
  );
};

export default Payment;