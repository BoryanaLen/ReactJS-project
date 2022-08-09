import { useState,useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { headerlogo } from '../../assets/imagepath'
import { ApplyJob } from "./ApplyJob";
import * as candidatesService from '../../services/candidatesService'

export const JobDetails = ({
    jobData
}) => {

    const [loading, setLoading] = useState(false);
    const [candidates, setCandidates] = useState(null);
    
    const location = useLocation()
    const jobstate  = location.state;
    const job = jobstate.job;
    console.log(job)

    useEffect(() => {
        setLoading(true)
    }, [])


    // useEffect(() => {
    //     setLoading(true)
    //     candidatesService
    //         .getAllCandidates()
    //         .then((data) => {
    //             const list = data.map(c => {
    //                 return { id: c.id, data: c.data() };
    //             })
    //             setCandidates(list)
    //         })
    //         .finally(() => setLoading(false))
    // }, [])
    function applyJobHandler (candidateData) {
        candidatesService
        .addCandidate(candidateData)
        .then(doc => {
            setCandidates(oldCandidates => [...oldCandidates, {id: doc.id, data: candidateData}]);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
            <div className="header">
            <div className="header-left">
                <Link to="/app/main/dashboard" className="logo">
                <img src={headerlogo} width={40} height={40} alt="" />
                </Link>
            </div>
            <div className="page-title-box float-start">
                <h3>Smart Hr System</h3>
            </div>
            <ul className="nav user-menu">
                <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
            <div className="dropdown mobile-user-menu">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
                <div className="dropdown-menu dropdown-menu-right">
                <Link className="dropdown-item" to="/login">Login</Link>
                <Link className="dropdown-item" to="/register">Register</Link>
                </div>
            </div>
            </div>
            <div className="page-wrapper job-wrapper">
            <div className="content container">
                <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                    <h3 className="page-title">Jobs</h3>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link  to="/app/main/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Jobs</li>
                    </ul>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-8">
                    <div className="job-info job-widget">
                    <h3 className="job-title">{job.data.jobtitle}</h3>
                    <span className="job-dept">{job.data.department}</span>
                    <ul className="job-post-det">
                        <li><i className="fa fa-calendar" /> Post Date: <span className="text-blue">{job.data.startdate}</span></li>
                        <li><i className="fa fa-calendar" /> Last Date: <span className="text-blue">{job.data.expirydate}</span></li>
                    </ul>
                    </div>
                    <div className="job-content job-widget">
                    <div className="job-desc-title"><h4>Job Description</h4></div>
                    <div className="job-description">
                        <p>{job.data.description}</p>
                    </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="job-det-info job-widget">
                    <button className="btn job-btn" data-bs-toggle="modal" data-bs-target="#apply_job" >Apply For This Job</button>
                    <ApplyJob 
                        onJobApply={applyJobHandler}
                    />
                    <div className="info-list">
                        <span><i className="fa fa-bar-chart" /></span>
                        <h5>Job Type</h5>
                        <p> {job.data.jobtype}</p>
                    </div>
                    <div className="info-list">
                        <span><i className="fa fa-money" /></span>
                        <h5>Salary</h5>
                        <p>{job.data.salaryFrom}-{job.data.salaryTo}</p>
                    </div>
                    <div className="info-list">
                        <span><i className="fa fa-suitcase" /></span>
                        <h5>Experience</h5>
                        <p>{job.data.experience} Years</p>
                    </div>
                    <div className="info-list">
                        <span><i className="fa fa-map-signs" /></span>
                        <h5>Location</h5>
                        <p> {job.data.jobLocation} </p>
                    </div>
                        </div>
                    </div>
                    </div>
                </div>   
            </div>
        </div>
    );
}
