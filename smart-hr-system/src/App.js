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
import { AuthProvider} from './contexts/AuthContext'
import { Routes, Route} from 'react-router-dom'
import { auth } from './services/firebase'
import { onAuthStateChanged } from 'firebase/auth'

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AllEmployees } from './components/admin/Employees/AllEmployess';
import { AdminDashboard } from './components/admin/Dashboard';
import { EmployeeDashboard } from './components/employee/Dashboard';
import { Leaves } from './components/employee/Leaves';
import { AttendanceAdmin } from './components/admin/AttendanceAdmin';
import { LeaveAdmin } from './components/admin/LeavesAdmin';
import { Calendar } from './components/common/Calendar';
import { Profile } from './components/common/Profile';
import { JobsList} from './components/jobs/JobsList';
import { ManagedJobs } from './components/jobs/ManagedJobs';
import { JobDetails } from './components/jobs/JobDetails';
import { CandidateList } from './components/admin/CandidateList';

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
                <Route path="/profile" element={ <Profile/> } />
                <Route path="/applyjob" element={< JobsList />} />
                <Route path='/job-details'element={< JobDetails />} />

                <Route path="/admin/allemployees" element={< AllEmployees />} />
                <Route path="/admin/dashboard" element={< AdminDashboard />} />
                <Route path="/admin/employees/leaves" element={< LeaveAdmin />} />
                <Route path="/admin/employees/attendance" element={< AttendanceAdmin />} />
                <Route path="/admin/calendar" element={< Calendar />} />
                <Route path="/admin/jobs" element={< ManagedJobs />} />
                <Route path="/admin/candidates" element={< CandidateList />} />

                <Route path="/employee/dashboard" element={< EmployeeDashboard />} />
                <Route path="/employee/leaves" element={< Leaves />} />
                <Route path="/employee/calendar" element={< Calendar />} />
               
            </Routes>  
        </div>
    </AuthProvider>
  );
}

export default App;
