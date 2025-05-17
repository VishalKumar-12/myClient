import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SampleViewer = () => {
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth(); // Get current user from AuthContext

  useEffect(() => {
    // Only fetch if user is authenticated
    if (currentUser) {
      // Fetch book info
      fetch(`https://backend-alpha-pied.vercel.app/api/books/${id}`) // Your actual backend URL
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          if (data?.url) {
            setUrl(data.url);

            // Optionally open directly in new tab:
            // window.open(data.url, "_blank");
          } else {
            alert("Sample not available.");
          }
        })
        .catch(err => {
          setLoading(false);
          console.error(err);
          alert("Error fetching book info.");
        });
    }
  }, [id, currentUser]);

  // If loading or not authenticated, show appropriate content
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ marginTop: "5px" }}>
      {url ? (
        <iframe
          src={url}
          title="Book Sample"
          width="100%"
          height="600px"
          frameBorder="0"
        />
      ) : (
        <p>No sample available for this book.</p>
      )}
    </div>
  );
};

// PrivateRoute component to wrap around components that need authentication
export const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading..</div>;
  }
  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

// Export the main component
export default SampleViewer;
