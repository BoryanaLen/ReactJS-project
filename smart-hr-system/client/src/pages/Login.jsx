import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";

import {Applogo} from '../assets/imagepath';
import * as authService  from "../services/authService";
import { AuthContext } from '../contexts/AuthContext';

export const Loginpage = (props) => {
   
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const {
            email,
            password,
        } = Object.fromEntries(new FormData(e.target));

        authService.login(email, password)
            .then(authData => {
                userLogin(authData);
                navigate('/admin/dashboard');
            })
            .catch((e) => {
                console.log(e);
                // navigate('/404');
                navigate('/admin/employees');
            });
    };

    return (
        <>
        <div className="account-content">
          <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</Link>
          <div className="container">
            <div className="account-logo">
                <img src={Applogo} alt="Dreamguy's Technologies" />
            </div>
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Login</h3>
                <p className="account-subtitle">Access to dashboard</p>
                <div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input id='email' type='email' className="form-control" name="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id='password' type="password"  className="form-control" name="password"/>   
                        <Link className="text-muted" to="/forgotpassword">
                          Forgot password?
                        </Link>                          
                    </div>                   
                    <div className="form-group text-center">
                        <button className="btn btn-primary account-btn" type="submit" > Login  </button>                 
                    </div>
                </form>
                <div className="account-footer">
                    <p>Don't have an account yet? <Link to="/register">Register</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}