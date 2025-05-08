import React, {  useState } from "react";
import { Routes, Route } from "react-router-dom";

import {
  Home,
  ProductList,
  ProductDetail,
  Contact,
  PageNotFound,
} from "../pages/index";


import { MyCart } from "../pages/MyCart";
import CheckoutPage from "../pages/CheckoutPage";
import OrderPage from "../pages/books/OrderPage";
import { Payment } from "../pages/Payment";

import  AddToWishlist  from "../pages/AddToWishlist";
import SingleBook from "../pages/books/SingleBook";
import { Fiction } from "../pages/Category/Fiction";
import { Nonfiction } from "../pages/Category/Nonfiction";
import { Action } from "../pages/Category/Action";
import { Thriller } from "../pages/Category/Thriller";
import { Drama } from "../pages/Category/Drama";
import  {AboutPage}  from "../pages/home/AboutPage";
import RequestForBook  from "../pages/Category/RequestForBook";
import RequestGetPage from "../pages/dashboard/RequestGetPage";
import SampleViewer from '../pages/books/SampleViewer';

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { PrivateRoute } from "./PrivateRoute";
// import { GrLogin } from "react-icons/gr";
import {Admin} from "../components/Admin";
import AdminRoute from "./AdminRoute";
import  Dashboard  from "../pages/dashboard/Dashboard";
import  DashboardLayout  from "../pages/dashboard/DashboardLayout";
import CustomerOrderDetail from "../pages/dashboard/CustomerOrderDetail";
import  AddBook  from "../pages/dashboard/addBook/AddBook";
import  UpdateBook  from "../pages/dashboard/EditBook/UpdateBook";
import  ManageBooks  from "../pages/dashboard/manageBooks/ManageBooks";



export const AllRoutes = () => {
  
  const [productsCount, setProductsCount] = useState(0);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home productsCount={productsCount} setProductsCount={setProductsCount} />
          }
        />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/mycart" element={<MyCart />} />

        <Route path="/checkoutpage" element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>} />
        <Route path="/orders" element={
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        } />
        <Route path="/payment" element={<Payment />} />
        <Route path="/addtowishlist" element={
          <PrivateRoute>
              <AddToWishlist />
          </PrivateRoute>
          } />

        <Route path="/contact" element={<Contact />}>
          
        </Route>

        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/fiction" element={<Fiction />} />
        <Route path="/non-fiction" element={<Nonfiction />} />
        <Route path="/action" element={<Action />} />
        <Route path="/thriller" element={<Thriller />} />
        <Route path="/drama" element={<Drama />} />
        <Route path="/aboutpage" element={<AboutPage/>} />
        <Route path="/RequestForBook" element={<RequestForBook />} />
        <Route path="/samples/:id" element={
          <PrivateRoute>
                 <SampleViewer />
          </PrivateRoute>
          } />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/admin" element={<Admin />} />
        
        <Route path="/dashboard" element={
          
          <AdminRoute>
             <DashboardLayout />
          </AdminRoute>
        }>
          <Route index element={
            <AdminRoute>
              <Dashboard />
              
            </AdminRoute>
          } />
          <Route path="requestgetpage" element={
            <AdminRoute>
              <RequestGetPage />
              
            </AdminRoute>
          } />
          <Route path="CustomerOrderDetail" element={
            <AdminRoute>
              <CustomerOrderDetail />
              
            </AdminRoute>
          } />
          <Route path="add-new-book" element={
            <AdminRoute>
              <AddBook />
              
            </AdminRoute>
          } />
          <Route path="edit-book/:id" element={
            <AdminRoute>
              <UpdateBook />
              
            </AdminRoute>
          } />
          <Route path="manage-books" element={
            <AdminRoute>
              <ManageBooks />
              
            </AdminRoute>
          } />
        </Route>
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};