import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import './DashboardLayout.css';
import logo1 from '../../assets/logo1.jpg';
const DashboardLayout = () => {
  
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  }

  return (
    <section className="dashboard-container">
      <aside className="sidebar">
        <a href="/" className="logo-container">
          <img src={logo1} alt="" />
        </a>
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <a href="#" className="nav-item">
              <span className="sr-only">Folders</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </a>
            <Link to="/dashboard" className="nav-item active">
              <span className="sr-only">Dashboard</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </Link>
            <Link to="/dashboard/add-new-book" className="nav-item">
              <span className="sr-only">Add Book</span>
              <HiViewGridAdd className="icon"/>
            </Link>
            <Link to="/dashboard/manage-books" className="nav-item">
              <span className="sr-only">Documents</span>
              <MdOutlineManageHistory className="icon"/>
            </Link>
          </nav>
          <div className="settings-container">
            <button className="settings-button">
              <span className="sr-only">Settings</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
      <div className="main-content">
        <header className="header">
          <button className="mobile-menu-button">
            <span className="sr-only">Menu</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <div className="search-container">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="search-icon">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input type="text" role="search" placeholder="Search..." className="search-input" />
          </div>
          <div className="user-section">
            <button className="user-menu-button">
              <span className="sr-only">User Menu</span>
              <div className="user-info">
                <span className="user-name">Ayush Rana</span>
                <span className="user-role">Admin</span>
              </div>
              <span className="avatar-container">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="user profile photo" className="avatar-image"/>
              </span>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="dropdown-icon">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg> 
            </button>
            <div className="action-buttons">
              <button className="notification-button">
                <span className="sr-only">Notifications</span>
                <span className="notification-badge"></span>
                <span className="notification-badge-ping"></span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button onClick={handleLogout} className="logout-button">
                <span className="sr-only">Log out</span>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main className="main-area">
          <div className="dashboard-header">
            <div className="page-title">
              <h1 className="title">Admin Dashboard</h1>
              <h2 className="subtitle">Book Store Inventory</h2>
            </div>
            <div className="action-panel">
              <Link to="/dashboard/manage-books" className="manage-books-button">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="button-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Manage Books
              </Link>
              <Link to="/dashboard/add-new-book" className="add-book-button">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="button-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Book
              </Link>
            </div>
          </div>
          <Outlet/>
        </main>
      </div>
    </section>
  );
}

export default DashboardLayout;