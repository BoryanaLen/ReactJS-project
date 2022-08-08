 import React, {useState} from 'react';
 import { Link } from 'react-router-dom';
 import {Applogo} from '../assets/imagepath';
 import { useContext } from "react";

import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../services/firebase';
import {useNavigate} from 'react-router-dom'
import {AuthContext } from '../contexts/AuthContext';
import * as usersService from '../services/usersService'
 
   
 export const  Login = (props) => {
   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [error, setError] = useState('')
    const { userLogin} = useContext(AuthContext);
    const navigate = useNavigate();
    

  const onSubmit = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(authData => {
        usersService.getAllUsers()
        .then( data => {
            const roleData = data.map(x => x.data()).find(x => x.userId===authData.user.uid).role
            userLogin(authData, roleData);
            if (roleData === 'admin'){
                navigate('/admin/dashboard')
            }
            else{
                navigate('employee/dashboard')
            }
        })
    })
    .catch(err => setError(err.message))
  }
    return (
         <div className="account-content">
           <Link to="/applyjob" className="btn btn-primary apply-btn">Apply Job</Link>
           <div className="container">
             {/* Account Logo */}
             <div className="account-logo">
               <Link to="/app/main/dashboard"><img src={Applogo} alt="Dreamguy's Technologies" /></Link>
             </div>
             {/* /Account Logo */}
             <div className="account-box">
               <div className="account-wrapper">
                 <h3 className="account-title">Login</h3>
                 {error && <div className='auth__error'>{error}</div>}
                 <p className="account-subtitle">Access to our dashboard</p>
                 {/* Account Form */}
                 <div>
                 <form onSubmit={onSubmit}>
                   <div className="form-group">
                     <label>Email Address</label>
                     <input   className="form-control" type="email" value={email}  onChange={e => setEmail(e.target.value)} required  />
                   </div>
                   <div className="form-group">
                     <div className="row">
                       <div className="col">
                         <label>Password</label>
                         <input  type="password" className="form-control"  value={password} onChange={e => setPassword(e.target.value)} required /> 
                       </div>
                     </div>             
                   </div>
                   {/* <div className="col-auto">
                         <Link className="text-muted" to="/forgotpassword">
                           Forgot password?
                         </Link>
                       </div> */}
                   <div className="form-group text-center">
                   <button className="btn btn-primary account-btn" type="submit" > Login </button>                    
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
       );
    }
 
 