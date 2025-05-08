import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import avtarImage from "../assets/avatar.png";

const navigation = [
    {name: "Dashboard", href: "/dashboard"},
    {name: "Order", href: "/orders"},
    {name: "Cart", href: "/mycart"},
    {name: "setting", href: "/"},
];

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.cartItems);
  const {currentUser, logout} = useAuth();

  useEffect(() => {
    if (currentUser) {
      const userDisplayName = currentUser.displayName || 
                              currentUser.username || 
                              (currentUser.email ? currentUser.email.split('@')[0] : '');
      setUsername(userDisplayName);
    } else {
      setUsername('');
    }
  }, [currentUser]);

  const handleLogOut = async () => {
    try {
      setIsLoggingOut(true);
      setIsDropdownOpen(false);
      await new Promise(resolve => setTimeout(resolve, 800));
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  const handleLogin = () => navigate("/login");
  const goToCart = (e) => {
    e.preventDefault();
    navigate("/mycart");
  };

  const getUserAvatar = () => {
    return currentUser?.photoURL || avtarImage;
  };

  return (
    <>
      <div className="discount">
        <p>Grab Bestselling Books Up to 50% Off!</p>
      </div> 
      <header className="py-0">
        <Container fluid className="d-flex flex-wrap justify-content-between align-items-center">
          {/* Logo */}
          <Link to="/products" className="header-logo">
            <img
              src={logo}
              alt="bookNest Logo"
              className="img-fluid"
              style={{ maxWidth: "60px", marginRight: "10px" }}
            />
            <span className='logo-header'>bookNesT</span>
          </Link>

          {/* Search Bar */}
          <div className="search-container">
            <form className="search-form d-flex">
              <input 
                type="search" 
                placeholder="Search here..." 
                className="search-input" 
              />
              <select 
                aria-label="Select book genre" 
                className="search-select"
                onChange={(e) => e.target.value && navigate(`/${e.target.value}`)}
              >
                <option value="" disabled>Select category</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-fiction</option>
                <option value="action">Action</option>
                <option value="thriller">Thriller</option>
                <option value="drama">Romance</option>
                <option value="comics">Comics</option>
              </select>
              <button type="submit" className="search-btn">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          {/* Account & Cart Icons */}
          <div className="header-icons d-flex align-items-center">
            <div className="position-relative">
              {currentUser ? (
                <>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className={`avatar-btn d-flex align-items-center ${currentUser ? "current-user" : ""}`}
                    style={{ border: 'none', background: 'transparent' }}
                    disabled={isLoggingOut}
                  >
                    <img 
                      className="avatar-img" 
                      src={getUserAvatar()} 
                      alt="Avatar" 
                    />
                    <span className="ms-2 user-name-display">{username}</span>
                  </button>
                  {isDropdownOpen && !isLoggingOut && (
                    <div className="dropdown-menu-container">
                      <ul className="dropdown-list">
                        {navigation.map((item) => (
                          <li key={item.name} className="dropdown-item-wrapper" onClick={()=>setIsDropdownOpen(false)}>
                            <Link to={item.href} className="dropdown-item-link">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        <li className="dropdown-divider"></li>
                        <li>
                          <button onClick={handleLogOut} className="logout-button" disabled={isLoggingOut}>
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                  {isLoggingOut && (
                    <div className="logout-loading-overlay">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Logging out...</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="d-flex align-items-center">
                  <Link to="/login" className="text-decoration-none me-3">
                    <div className="d-flex align-items-center">
                      <HiOutlineUser style={{ fontSize: "1.6rem" }} />
                      <span className="ms-1">Login</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
            <Link to="/addtowishlist">
              <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition" style={{ border: 'none', marginLeft: '15px' }}>
                <HiOutlineHeart className="text-red-500" style={{ fontSize: "1.6rem" }} />
              </button>
            </Link>
            
            <Link to="/mycart" onClick={goToCart} className="mycart-btn" style={{ marginLeft: '15px', position: 'relative' }}>
              <HiOutlineShoppingCart style={{ fontSize: "1.6rem" }} />
              <span className="cart-count">{cartItems.length || 0}</span>
            </Link>

            <Navbar.Toggle
              aria-controls="navbar-nav"
              className="navbar-toggler-custom ms-5"
              onClick={() => setExpanded(!expanded)}
            />
          </div>
        </Container>
      </header>

      {/* Sub Header with Navbar */}
      <div className="py-2">
        <nav className="sub-header">
          <Navbar expand="lg" bg="light" variant="light" className="shadow-sm" expanded={expanded}>
            <Container>
              <Navbar.Collapse id="navbar-nav">
                <Nav className="justify-content-center w-100">
                  <NavLink to="/" className="nav-link mx-3">Home</NavLink>
                  <NavLink to="/products" className="nav-link mx-3">All Books</NavLink>
                  <NavLink to="/fiction" className="nav-link mx-3">Fiction</NavLink>
                  <NavLink to="/drama" className="nav-link mx-3">Romance</NavLink>
                  <NavLink to="/action" className="nav-link mx-3">Action</NavLink>
                  <NavLink to="/thriller" className="nav-link mx-3">Thriller</NavLink>
                  <NavLink to="/RequestForBook" className="nav-link mx-3">RequestForBook</NavLink>
                  <NavLink to="/contact" className="nav-link mx-3">Contact</NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </nav>
      </div>
    </>
  );
};