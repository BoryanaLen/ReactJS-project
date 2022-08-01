 import React, {useState} from 'react';
 import { Link, useNavigate } from 'react-router-dom';
 import {Applogo} from '../assets/imagepath';

import {auth} from '../services/firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {AuthProvider} from '../contexts/AuthContext'
 
 export const Register = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {setTimeActive} = AuthProvider()

    const validatePassword = () => {
        let isValid = true
        if (password !== '' && confirmPassword !== ''){
        if (password !== confirmPassword) {
            isValid = false
            setError('Passwords does not match')
        }
        }
        return isValid
    }

    const onsubmit = e => {
        e.preventDefault()
        setError('')
        if(validatePassword()) {
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => { 
              setTimeActive(true)
              navigate('/')
            })
            .catch(err => setError(err.message))
        }
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }

       return (
         <div className="account-content">
           <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</Link>
           <div className="container">
             <div className="account-logo">
               <Link to="/app/main/dashboard"><img src={Applogo} alt="Dreamguy's Technologies" /></Link>
             </div>
             <div className="account-box">
               <div className="account-wrapper">
                 <h3 className="account-title">Register</h3>
                 {error && <div className='auth__error'>{error}</div>}
                 <p className="account-subtitle">Access to our dashboard</p>
                 <div>
                 <form onSubmit={onsubmit}>
                     <div className="form-group">
                       <label>Email</label>
                       <input   className="form-control" type="email" value={email}  onChange={e => setEmail(e.target.value)} required  />
                     </div>
                     <div className="form-group">
                       <label>Password</label>
                       <input  type="password" className="form-control"  value={password} onChange={e => setPassword(e.target.value)} required />               
                     </div>
                     <div className="form-group">
                       <label>Repeat Password</label>
                       <input   className= "form-control"  type="password" value={confirmPassword}  onChange={e => setConfirmPassword(e.target.value)} required/>
                     </div>
                     <div className="form-group text-center">                  
                       <button className="btn btn-primary account-btn" type="submit">Register</button>
                     </div>                 
                 </form>                  
                 <div className="account-footer">
                   <p>Already have an account? <Link to="/login">Login</Link></p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
       );
    }
 