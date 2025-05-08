import React from 'react'
import { useGetAllOrdersQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext'
import './CustomerOrderDetail.css' // Reuse styles if the same

const CustomerOrderDetail = () => {
  const { currentUser } = useAuth()
  const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery()

  if (isLoading) return <div className="loading-state">Loading...</div>
  if (isError) return <div className="error-state">Error getting orders data</div>

  const totalOrders = orders.length

  return (
    <div className="customer-orders-container">
      <h2  style={{ marginTop: "10px" }} className="customer-orders-title">Customer Order Details</h2>

      <p><strong>Total Orders:</strong> {totalOrders}</p>

      {orders.length === 0 ? (
        <div className="no-orders">No orders found!</div>
      ) : (
        <div className="customer-orders-list">
          {orders.map((order, index) => (
            <div key={order._id} className="customer-order-item">
              <p className="customer-order-number">#{index + 1}</p>
              <h2 style={{ marginTop: "30px" }} className="customer-order-id">Order ID: {order._id}</h2>
              <p className="customer-order-info">Name: {order.name}</p>
              <p className="customer-order-info">Email: {order.email}</p>
              <p className="customer-order-info">Phone: {order.phone}</p>
              <p className="customer-order-info">Total Price: ${order.totalPrice}</p>
              <h3 className="customer-order-section-title">Address:</h3>
              <p className="customer-order-address">
                {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
              </p>
              <h3 className="customer-order-section-title">Products Id:</h3>
              <ul className="customer-product-list">
                {order.productIds.map((productId) => (
                  <li key={productId} className="customer-product-id">{productId}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomerOrderDetail
