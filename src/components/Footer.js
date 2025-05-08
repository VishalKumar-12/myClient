import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import './Footer.css';
import { Link,useNavigate } from "react-router-dom";
export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Here you would typically send the email to your backend
    console.log('Subscribing email:', email);
    
    // Show success message
    setSubscribed(true);
    
    // Reset form
    setEmail('');
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Left: Newsletter Form */}
        <div className="newsletter">
  <h3>📩 Stay Updated</h3>
  <form onSubmit={handleSubmit} className="newsletter-form">
    <input
      type="email"
      placeholder="Enter your email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <button type="submit">Subscribe</button>
  </form>
  {subscribed && <p className="success-message">🎉 Subscribed successfully!</p>}
</div>

        {/* Center: Contact Details */}
        <div className="contact-details">
          <h3>📞 Contact Us</h3>
          <p>Email: support@booknest.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>📍 123, Book Street,Patna, Bihar, India</p>
        </div>

        {/* Right: Social Media Icons */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={35} className="social-icon fb" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={35} className="social-icon insta" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={35} className="social-icon twitter" />
          </a>
        </div>

      </div>

      {/* Popular Books, Authors, Categories */}
      <div className="footer-links">
        <div className="footer-section">
          <h4>📚 Popular Series</h4>
          <ul>
            <li>Robert Greene Combo</li>
            <li>The Made Series</li>
            <li>Summer I Turned Pretty Trilogy</li>
            <li>Shadow and Bone Trilogy</li>
            <li>Percy Jackson Series</li>
            <li>Harry Potter Box Set</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>📂 Popular Categories</h4>
          <ul>
            <Link to="/fiction">
              <li>Fiction</li>
            </Link>
            <Link to="/products">
              <li>Combos & Box Sets</li>
            </Link>
            <Link to="/non-fiction">
              <li>Non-Fiction</li>
            </Link>
            <Link to="/action">
              <li>Action</li>
            </Link>
            <Link to="/drama">
              <li>Fantasy</li>
            </Link>
            <Link to="/romance">
               <li>Romance</li>
            </Link>
            
           
          </ul>
        </div>

        <div className="footer-section">
          <h4>✍️ Popular Authors</h4>
          <ul>
            <li>John Smith</li>
            <li>Emily Jhonson</li>
            <li>Michael Williams</li>
            <li>Sarah brawn</li>
            <li>David Jhon</li>
            <li>Robert Greene</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>🔥 Our Best Sellers</h4>
          <ul>
          <li>
             <Link to="/books/31">The Hating Game</Link>
          </li>
          <li>
            <Link to="/books/28">It Ends with Us</Link>
          </li>
          <li>Do Epic Shit</li>
          <li>
           <Link to="/books/26">The Song of Achilles</Link>
          </li>
          <li>The 48 Laws of Power</li>
           <li>
          <Link to="/dashboard">Can't Hurt Me</Link>
           </li>
          </ul>
        </div>
      </div>

      <p className="copyright">&copy; 2025 BookNest. All Rights Reserved.</p>
    </footer>
  );
};