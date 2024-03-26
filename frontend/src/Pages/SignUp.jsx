import React from "react"
import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

const SignUp = (props) => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {signup,error,isLoading}=useSignUp();

    const handlesubmit=async(e)=>{

        e.preventDefault();
        //fire the signup function
        await signup(email,password);
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card p-4 login-card">
                        <h2 className="text-center mb-4 fw-600">Sign Up</h2>
                            <form onSubmit={handlesubmit}>
                                <div className="mb-3">
                                <label for="username" className="form-label">Email</label>
                                <input type="text" id="username" className="form-control" placeholder="Enter your username" required
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value);}}
                                />
                                </div>
                                <div className="mb-3">
                                <label for="password" className="form-label">Password</label>
                                <input type="password" id="password" className="form-control" placeholder="Enter your password" required
                                    value={password}
                                onChange={(e)=>{setPassword(e.target.value);}}
                                />
                                </div>
                                <button type="submit" className="btn login w-100" disabled={isLoading} >Sign Up</button>

                                {error&&(
                                    <div classNameName="alert alert-danger alert-dismissible fade show" role="alert">
                                        {error}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                )}
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignUp;
