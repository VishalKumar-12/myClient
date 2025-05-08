import React, { useState } from "react";
import { useGetAllBookRequestsQuery } from "../../redux/features/bookrequest/bookRequestApi";
import "./RequestGetPage.css";

const RequestGetPage = () => {
  const { data: requests, isLoading, isError, error } = useGetAllBookRequestsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter requests based on search term
  const filteredRequests = requests?.filter((req) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      req.title.toLowerCase().includes(searchLower) ||
      req.author.toLowerCase().includes(searchLower) ||
      req.isbn.toLowerCase().includes(searchLower) ||
      req.email.toLowerCase().includes(searchLower)
    );
  });
  
  // Calculate total number of requests
  const totalRequests = requests?.length || 0;

  if (isLoading) return <div className="loading-spinner">Loading book requests...</div>;
  
  if (isError) return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <p>Error: {error?.data?.message || "Something went wrong."}</p>
    </div>
  );

  return (
    <div className="request-list-container">
      <div className="request-header">
        <h2>All Book Requests</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title, author, ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>
      
      {/* Total requests stats display */}
      <div className="stats-container">
        <div className="stat-card">
          <span className="stat-label">Total Requests:</span>
          <span className="stat-value">{totalRequests}</span>
        </div>
      </div>

      {filteredRequests?.length === 0 ? (
        <div className="no-data">
          <div className="no-data-icon">📚</div>
          <p>No book requests found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="request-table">
            <thead>
              <tr>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Quantity</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req._id}>
                  <td>{req.isbn}</td>
                  <td>{req.title}</td>
                  <td>{req.author}</td>
                  <td>{req.quantity}</td>
                  <td>{req.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestGetPage;