import 'bootstrap';
import "./assets/css/select2.min.css";
import './assets/css/font-awesome.min.css';
import './assets/css/line-awesome.min.css';
import "./assets/css/bootstrap.css";
import "./assets/css/bootstrap.min.css.map";
import "./assets/css/bootstrap.min.css";
import "./assets/css/bootstrap.css.map";
import './assets/js/app.js';
import './assets/js/bootstrap.bundle.js.map'
import "./assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
import "./assets/css/bootstrap-datetimepicker.min.css";
import "./assets/css/style.css"

import { useState, useEffect } from 'react'
import {AuthProvider} from './contexts/AuthContext'
import {Navigate, Routes, Route, Router} from 'react-router-dom'
import { auth } from './services/firebase'
import { onAuthStateChanged } from 'firebase/auth'

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AllEmployees } from './components/admin/Employees/AllEmployess';
import { AdminDashboard } from './components/admin/Dashboard';


function App() {
    

    const [currentUser, setCurrentUser] = useState(null)
    const [timeActive, setTimeActive] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          setCurrentUser(user)
        })
      }, [])

  return (
    <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <div className="App">
            <Routes>
                <Route path="/" element={ <Login/> } />
                <Route path="/login" element={ <Login/> } />
                <Route path="/register" element={ <Register/> } />
                <Route path="/adnin/allemployees" element={< AllEmployees />} />
                <Route path="/admin/dashboard" element={< AdminDashboard />} />
            </Routes>  
        </div>
    </AuthProvider>
  );
}

export default App;
