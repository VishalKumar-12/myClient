import React, { useState } from 'react'
import axios from "axios"
import getBaseUrl from '../utils/baseURL'
import { useNavigate } from 'react-router-dom'

export const Admin = () => {
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    }
    
    try {
      const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const auth = response.data;
      
      if(auth.token) {
        localStorage.setItem('token', auth.token);
        setTimeout(() => {
          localStorage.removeItem('token')
          alert('Token has been expired!, Please login again.');
          navigate("/")
        }, 3600 * 1000)
      }

      alert("Admin Login successful!")
      navigate("/dashboard")

    } catch (error) {
      setMessage("Please provide a valid email and password") 
      console.error(error)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={{ marginTop: "15px" }}>Admin Dashboard Login</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="username">Username</label>
            <input 
              type="text" 
              name="username" 
              id="username" 
              placeholder='username'
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder='Password'
              style={styles.input}
              required
            />
          </div>
          {
            message && <p style={styles.errorMessage}>{message}</p>
          }
          <div style={styles.buttonContainer}>
            <button style={styles.button}>Login</button>
          </div>
        </form>

        <p style={styles.footer}>©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  )
}

// CSS styles
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: '384px',
    margin: '0 auto',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    padding: '2rem 2rem 2rem 2rem',
    marginBottom: '1rem',
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    color: '#4a5568',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  input: {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    appearance: 'none',
    border: '1px solid #e2e8f0',
    borderRadius: '0.25rem',
    width: '100%',
    padding: '0.5rem 0.75rem',
    lineHeight: '1.5',
    outline: 'none',
  },
  errorMessage: {
    color: '#f56565',
    fontSize: '0.75rem',
    fontStyle: 'italic',
    marginBottom: '0.75rem',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#4299e1',
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 2rem',
    borderRadius: '0.25rem',
    outline: 'none',
    cursor: 'pointer',
    border: 'none',
  },
  footer: {
    marginTop: '1.25rem',
    textAlign: 'center',
    color: '#a0aec0',
    fontSize: '0.75rem',
  }
}