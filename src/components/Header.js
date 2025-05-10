import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import {
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineSearch,
  HiMenuAlt3,
  HiX,
} from "react-icons/hi";
import avtarImage from "../assets/avatar.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Order", href: "/orders" },
  { name: "Cart", href: "/mycart" },
  { name: "Setting", href: "/" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/products" },
  { name: "Fiction", href: "/fiction" },
  { name: "Romance", href: "/drama" },
  { name: "Action", href: "/action" },
  { name: "Thriller", href: "/thriller" },
  { name: "Request Book", href: "/RequestForBook" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.cartItems);
  const { currentUser, logout } = useAuth();

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogOut = async () => {
    try {
      setIsLoggingOut(true);
      setIsDropdownOpen(false);
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const goToCart = (e) => {
    e.preventDefault();
    navigate("/mycart");
  };

  const getUserAvatar = () => {
    return currentUser?.photoURL || avtarImage;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const closeAllMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setShowSearch(false);
  };

  return (
    <>
     
      <header className={`main-header py-2 ${scrolled ? 'scrolled' : ''}`}>
       <div className="discount">
        <p>Grab Bestselling Books Up to 50% Off!</p>
      </div>
        <Container fluid className="d-flex flex-wrap justify-content-between align-items-center">
          {/* Logo */}
          <div>
            <Link to="/products" className="header-logo">
              <img src={logo} alt="bookNest Logo" className="img-fluid logo-image" />
              <span className='logo-header'>bookNesT</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="main-nav d-none d-lg-flex">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active-nav-link' : ''}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Icons Section */}
          <div className="header-icons d-flex align-items-center">
            {/* Search Icon */}
            <button className="icon-btn" onClick={toggleSearch}>
              <HiOutlineSearch style={{ fontSize: "1.6rem" }} />
            </button>

            {/* User Account */}
            <div className="position-relative mx-3">
              {currentUser ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="avatar-btn d-flex align-items-center"
                    style={{ border: 'none', background: 'transparent' }}
                    disabled={isLoggingOut}
                  >
                    <img className="avatar-img" src={getUserAvatar()} alt="Avatar" />
                    <span className="ms-2 user-name-display">{username}</span>
                  </button>
                  {isDropdownOpen && !isLoggingOut && (
                    <div className="dropdown-menu-container">
                      <ul className="dropdown-list">
                        {navigation.map((item) => (
                          <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
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
                </>
              ) : (
                <Link to="/login" className="text-decoration-none">
                  <div className="d-flex align-items-center">
                    <HiOutlineUser style={{ fontSize: "1.6rem" }} />
                    <span className="ms-1">Login</span>
                  </div>
                </Link>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/addtowishlist" className="mx-2 icon-btn">
              <HiOutlineHeart style={{ fontSize: "1.6rem" }} />
            </Link>

            {/* Cart */}
            <Link to="/mycart" onClick={goToCart} className="mycart-btn mx-2" style={{ position: 'relative' }}>
              <HiOutlineShoppingCart style={{ fontSize: "1.7rem" }} />
              <span className="cart-count">{cartItems.length || 0}</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-toggle d-lg-none ms-3" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <HiX style={{ fontSize: "1.8rem" }} />
              ) : (
                <HiMenuAlt3 style={{ fontSize: "1.8rem" }} />
              )}
            </button>
          </div>
        </Container>

        {/* Expandable Search Bar */}
        {showSearch && (
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
        )}

       {/* Mobile Navigation Menu */}
{isMobileMenuOpen && (
  <div className="mobile-menu active">
    <Container>
      <nav className="mobile-nav">
        {navLinks.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active-mobile-link' : ''}`
            }
            onClick={toggleMobileMenu}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </Container>
  </div>
)}

      </header>
    </>
  );
};
