import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SampleViewer = () => {
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      fetch(`https://backend-alpha-pied.vercel.app/api/books/${id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch book sample');
          }
          return res.json();
        })
        .then(data => {
          setLoading(false);
          if (data?.url) {
            setUrl(data.url);
          } else {
            setError('Sample not available for this book.');
          }
        })
        .catch(err => {
          setLoading(false);
          setError(err.message || 'Error fetching book information');
          console.error(err);
        });
    }
  }, [id, currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh',
      width: '100%',
    },
    loadingSpinner: {
      width: '50px',
      height: '50px',
      border: '5px solid rgba(0, 0, 0, 0.1)',
      borderLeft: '5px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    iframeContainer: {
      width: '100%',
      height: '80vh',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: '#fff',
    },
    iframe: {
      width: '100%',
      height: '100%',
      border: 'none',
    },
    errorContainer: {
      textAlign: 'center',
      padding: '50px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    errorMessage: {
      color: '#e74c3c',
      fontSize: '18px',
      marginBottom: '20px',
    },
    title: {
      borderBottom: '2px solid #3498db',
      paddingBottom: '10px',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: '600',
      color: '#2c3e50',
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Book Sample Viewer</h2>
      
      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingSpinner}></div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}

      {!loading && error && (
        <div style={styles.errorContainer}>
          <p style={styles.errorMessage}>{error}</p>
          <button 
            onClick={() => window.history.back()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.2s',
            }}
          >
            Go Back
          </button>
        </div>
      )}

      {!loading && !error && url && (
        <div style={styles.iframeContainer}>
          <iframe
            src={url}
            title="Book Sample"
            style={styles.iframe}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </div>
  );
};

// PrivateRoute component with improved loading state
export const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  const loadingStyles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid rgba(0, 0, 0, 0.1)',
      borderLeft: '4px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  };

  if (loading) {
    return (
      <div style={loadingStyles.container}>
        <div style={loadingStyles.spinner}></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (currentUser) {
    return children;
  }
  
  return <Navigate to="/login" replace />;
};

export default SampleViewer;
