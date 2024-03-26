import React from "react"
import {Link} from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = (props) => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {login,error,isLoading}=useLogin();

    const handlesubmit=async(e)=>{
        
        e.preventDefault();
        //fire the login function
        await login(email,password);
    }

    return (
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-md-6">
                    <div class="card p-4 login-card">
                    <h2 class="text-center mb-4 fw-600">Login</h2>
                        <form onSubmit={handlesubmit}>
                            <div class="mb-3">
                            <label for="username" class="form-label">Email</label>
                            <input type="text" id="username" class="form-control" placeholder="Enter your username" required
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value);}}
                            />
                            </div>
                            <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" id="password" class="form-control" placeholder="Enter your password" required
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value);}}
                            />
                            </div>
                            <button type="submit" class="btn login w-100" disabled={isLoading}>Login</button>
                        </form>
                        <p class="text-center mt-3">Don't have an account? <Link to="/signup">Register Here</Link></p>

                        {error&&(
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                {error}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;
