import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext';
import './OrderPage.css'; // Make sure to create this CSS file

const OrderPage = () => {
    const { currentUser } = useAuth()

    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);
    
    if (isLoading) return <div className="loading-state">Loading...</div>
    if (isError) return <div className="error-state">Error getting orders data</div>
    
    return (
        <div className="orders-container">
            <h2 style={{ marginTop: "10px" }} className="orders-title">Your Orders</h2>
            {
                orders.length === 0 ? (
                    <div className="no-orders">No orders found!</div>
                ) : (
                    <div className="orders-list">
                        {
                            orders.map((order, index) => (
                                <div key={order._id} className="order-item">
                                    <p style={{ marginTop: "20px" }} className="order-number">#{index + 1}</p>
                                    <h2 style={{ marginTop: "20px" }} className="order-id">Order ID: {order._id}</h2>
                                    <p className="order-info">Name: {order.name}</p>
                                    <p className="order-info">Email: {order.email}</p>
                                    <p className="order-info">Phone: {order.phone}</p>
                                    <p className="order-info">Total Price: ${order.totalPrice}</p>
                                    <h3 className="order-section-title">Address:</h3>
                                    <p className="order-address">{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                                    <h3 className="order-section-title">Products Id:</h3>
                                    <ul className="product-list">
                                        {order.productIds.map((productId) => (
                                            <li key={productId} className="product-id">{productId}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default OrderPage