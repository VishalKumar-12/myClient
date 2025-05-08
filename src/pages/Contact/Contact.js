import React from 'react';
import './Contact.css';

export const Contact = () => {
  return (
    <main className="contact-main">
      <div className="contact-container">
        <div className="contact-info">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-description">
            Have questions about our books or services? Get in touch with us using the contact details below.
          </p>

          <div className="contact-details">
            <div className="contact-detail-item">
              <i className="contact-icon address-icon"></i>
              <div>
                <h3>Address</h3>
                <p>123 Library Street, Book City, BC 12345</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <i className="contact-icon phone-icon"></i>
              <div>
                <h3>Phone</h3>
                <p>(123) 456-7890</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <i className="contact-icon email-icon"></i>
              <div>
                <h3>Email</h3>
                <p>info@bookwebsite.com</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <i className="contact-icon hours-icon"></i>
              <div>
                <h3>Hours</h3>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
