import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

import { app } from '../services/firebase';
import { Applogo } from '../assets/imagepath';
import { getAuth, signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import { useAuthValue } from '../contexts/AuthContext';

export const Login = () => {
   
    console.log('login');
    const auth = getAuth(app)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [error, setError] = useState('')
    const {setTimeActive} = useAuthValue()
    const navigate = useNavigate()
  
    const onsubmit = e => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            if(!auth.currentUser.emailVerified) {
            sendEmailVerification(auth.currentUser)
            .then(() => {
                setTimeActive(true)
                navigate('/verify-email')
            })
            .catch(err => alert(err.message))
        }else{
            navigate('/')
        }
        })
        .catch(err => setError(err.message))
    }

    (
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
                {error && <div className='auth__error'>{error}</div>}
                <p className="account-subtitle">Access to dashboard</p>
                <div>
                <form onSubmit={onsubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input id='email' type='email' className="form-control" name="email" value={email} required onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id='password' type="password"  className="form-control" name="password" value={password} required onChange={e => setPassword(e.target.value)}/>   
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