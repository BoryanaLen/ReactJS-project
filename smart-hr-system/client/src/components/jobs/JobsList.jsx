import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { headerlogo } from '../../assets/imagepath'
import * as jobsService from '../../services/jobsService'

export const JobsList = () => {

    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [menu, setMenu] = useState(false)
     
    useEffect(() => {
        setLoading(true)
        jobsService
            .getAllJobs()
            .then((data) => {
                const list = data.map(j => {
                    return { id: j.id, data: j.data() };
                })
                setJobs(list)
            })
            .finally(() => setLoading(false))
    }, [])

        return (
          <>
          {/* Header */}
          <div className="header">
            {/* Logo */}
            <div className="header-left">
              <Link to="/app/main/dashboard" className="logo">
                <img src={headerlogo} width={40} height={40} alt="" />
              </Link>
            </div>
            {/* /Logo */}
            {/* Header Title */}
            <div className="page-title-box float-start">
              <h3>Smart Hr System</h3>
            </div>
            {/* /Header Title */}
            {/* Header Menu */}
            <ul className="nav user-menu">
              <li className="nav-item">
                <Link  className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link  className="nav-link" to="/register">Register</Link>
              </li>
            </ul>
            {/* /Header Menu */}
            {/* Mobile Menu */}
            <div className="dropdown mobile-user-menu">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
              <div className="dropdown-menu dropdown-menu-right">
                <Link className="dropdown-item" to="/login">Login</Link>
                <Link className="dropdown-item" to="/register">Register</Link>
              </div>
            </div>
            {/* /Mobile Menu */}
          </div>
          {/* /Header */}

          {/* Page Wrapper */}
          <div className="page-wrapper job-wrapper">
            {/* Page Content */}
            <div className="content container">
              {/* Page Header */}
              <div className="page-header">
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="page-title">Jobs</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                      <li className="breadcrumb-item active">Jobs</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <div className="row">

              { jobs && jobs.map((job, index) => (
                    <div className="col-md-6" key={index}>
                        <Link  className="job-list" to="/job-details" state={{job}}>
                            <div className="job-list-det">
                            <div className="job-list-desc">
                                <h3 className="job-list-title">{job.data.jobtitle}</h3>
                                <h4 className="job-department">{job.data.department}</h4>
                            </div>
                            <div className="job-type-info">
                                <span className="job-types">{job.data.jobtype}</span>
                            </div>
                            </div>
                            <div className="job-list-footer">
                            <ul>
                                <li><i className="fa fa-map-signs" /> {job.data.jobLocation}</li>
                                <li><i className="fa fa-money" /> ${job.data.salaryFrom}-${job.data.salaryTo}</li>
                            </ul>
                            </div>
                        </Link>

                    </div>               
                ))}          

              </div>
            </div>
          </div>
          {/* /Page Wrapper */}
        </>         
    );  
}