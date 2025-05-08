import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import "./styles/Login.css";

const Login = () => {
    const [message, setMessage] = useState("");
    const { loginUser, signInWithGoogle} = useAuth();
    const [loading, setLoading] = useState(false);
   
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password);
            alert("Login successful!");
            navigate("/")
        } catch (error) {
            setMessage("Please provide a valid email and password") 
            console.error(error)
        }
    }

    const handleGoogleSignIn = async () => {
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
        <div className="login-container">
            <div className="login-form-container">
                <h2 style={{ marginTop: "5px" }} className="login-title">Please Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input 
                            {...register("email", { required: true })} 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Email Address"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input 
                            {...register("password", { required: true })} 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password"
                            className="form-input"
                        />
                    </div>
                    {
                        message && <p className="error-message">{message}</p>
                    }
                    <div>
                        <button className="login-button">Login</button>
                    </div>
                </form>
                <p className="register-link">Haven't an account? Please <Link to="/signup" className="blue-link">Register</Link></p>

                {/* google sign in */}
                <div className="google-signin-container">
                    <button 
                        onClick={handleGoogleSignIn}
                        className="google-button"
                    >
                        <FaGoogle className="google-icon" />
                        Sign in with Google
                    </button>
                </div>

                <p className="copyright">©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export { Login };
export default Login;