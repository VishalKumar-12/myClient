import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

import "./styles/SignUp.css";

const Signup = () => {
    const [message, setMessage] = useState("");
    const { registerUser, signInWithGoogle } = useAuth();
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    // Access the current value of password field for confirmation validation
    const password = watch("password", "");

    // register user
    const onSubmit = async(data) => {
        try {
            setLoading(true);
            // Now passing username to registerUser
            await registerUser(data.email, data.password, data.username);
            alert("User registered successfully!")
            navigate("/");
        } catch (error) {
           setMessage("Please provide a valid email and password") 
           console.error(error)
        } finally {
            setLoading(false);
        }
    }

    const handleGoogleSignIn = async() => {
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/")
        } catch (error) {
            alert("Google sign in failed!") 
            console.error(error)
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-form-container">
                <h2 style={{ marginTop: "5px" }} className="signup-title">Please Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* New Username field */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input 
                            {...register("username", { 
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Username cannot exceed 20 characters"
                                }
                            })} 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Enter Username"
                            className="form-input"
                        />
                        {errors.username && <span className="error-message">{errors.username.message}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input 
                        {...register("email", { 
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format"
                            }
                        })} 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Email Address"
                        className="form-input"
                        />
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input 
                        {...register("password", { 
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            },
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d).+$/,
                                message: "Password must contain an uppercase letter and a number"
                            }
                        })} 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password"
                        className="form-input"
                        />
                        {errors.password && <span className="error-message">{errors.password.message}</span>}
                    </div>
                    {
                        message && <p className="error-alert">{message}</p>
                    }
                    <div>
                        <button 
                        className="btn-primary"
                        disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Register"}
                        </button>
                    </div>
                </form>
                <p className="login-text">Have an account? Please <Link to="/login" className="login-link">Login</Link></p>
                {/* google sign in */}
                <div>
                    <button 
                    onClick={handleGoogleSignIn}
                    className="btn-google">
                    <FaGoogle className="google-icon"/>
                    Sign in with Google
                    </button>
                </div>
                <p className="footer-text">©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export { Signup };
export default Signup;