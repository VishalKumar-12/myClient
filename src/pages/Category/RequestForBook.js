// src/components/RequestForBook.js
import React, { useState } from "react";
import { useCreateBookRequestMutation } from "../../redux/features/bookrequest/bookRequestApi";
import "./RequestForBook.css"; // Import the CSS file

const RequestForBook = () => {
  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    quantity: 1,
    email: ""
  });

  const [createBookRequest, { isLoading, isSuccess, isError, error }] =
    useCreateBookRequestMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBookRequest(formData).unwrap();
      alert("Book request submitted successfully!");
      setFormData({ isbn: "", title: "", author: "", quantity: 1, email: "" });
    } catch (err) {
      console.error("Error submitting request:", err);
    }
  };

  return (
    <div className="request-form-container">
      <h2 style={{ marginTop: "5px" }}className="form-title">Request a Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="submit-button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Request"}
        </button>
        
        {isError && (
          <p className="error-message">
            Error: {error?.data?.message || "Failed to submit."}
          </p>
        )}
        
        {isSuccess && (
          <p className="success-message">
            Request submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default RequestForBook;