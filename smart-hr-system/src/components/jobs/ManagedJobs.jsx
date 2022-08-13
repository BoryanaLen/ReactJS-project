import React, { useState,useEffect, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../assets/paginationfunction"
import "../../assets/css/antdstyle.css"

import { Header } from '../common/Header';
import { SidebarAdmin } from '../admin/SidebarAdmin';
import { AddJob } from './AddJob';
import * as jobsService from '../../services/jobsService'
import uuid from 'react-uuid'
import { AuthContext } from '../../contexts/AuthContext';

 
export const ManagedJobs = () => {

    const [menu, setMenu] = useState(false)
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const { role } = useContext(AuthContext);
   
    useEffect(() => {
        setLoading(true)
        jobsService
            .getAllJobs()
            .then((data) => {
                const list = data.map(j => {
                    return { id: j.id, data: j.data() };
                })
                setData(list)
            })
            .finally(() => setLoading(false))
    }, [])

    function jobCreateHandler (jobData) {
        jobsService
        .addJob(jobData)
        .then(doc => {
            setData(oldJobs => [...oldJobs, {id: doc.id, data: jobData}]);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }
 
    const columns = [
    {
        title: 'Job Title',
        dataIndex: 'jobtitle',
        // render: (text, record) => (       
        //     <Link to="/job-details" state={{record}} >{text}</Link>
        // ), 
        sorter: (a, b) => a.jobtitle.length - b.jobtitle.length,
    },
    
    {
        title: 'Department',
        dataIndex: 'department',
        sorter: (a, b) => a.department.length - b.department.length,
    },
    {
        title: 'Start Date',
        dataIndex: 'startdate',
        sorter: (a, b) => a.startdate.length - b.startdate.length,
    },
    
    {
        title: 'Expiry Date',
        dataIndex: 'expirydate',
        sorter: (a, b) => a.expirydate.length - b.expirydate.length,
    },
    {
        title: 'Job Type',
        dataIndex: 'jobtype',
        sorter: (a, b) => a.jobtype.length - b.jobtype.length,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b) => a.status.length - b.status.length,
    },
    {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-end">
            <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
            <div className="dropdown-menu dropdown-menu-right">
                <a href="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#edit_job"><i className="fa fa-pencil m-r-5" /> Edit</a>
                <a href="#" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete_job"><i className="fa fa-trash-o m-r-5" /> Delete</a>
            </div>
            </div>
        ),
    }
    ]

    return ( !loading && role==="admin" && 
        <div className="page-wrapper">
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <SidebarAdmin /> 

        <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
            <div className="row align-items-center">
                <div className="col">
                <h3 className="page-title">Jobs</h3>
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Jobs</li>
                </ul>
                </div>
                <div className="col-auto float-end ml-auto">
                <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_job"><i className="fa fa-plus" /> Add Job</a>
                </div>
            </div>
            </div>
            {/* /Page Header */}
            <div className="row">
            <div className="col-md-12">
                <div className="table-responsive">
                    <Table className="table-striped"
                        pagination= { {total : data.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                        style = {{overflowX : 'auto'}}
                        columns={columns}                 
                        // bordered
                        dataSource={data.map(d => d.data)}
                        rowKey={doc => uuid()}
                        // onChange={this.handleTableChange}
                    />
                </div>
            </div>
            </div>
        </div>

        < AddJob onJobCreate={jobCreateHandler}/>           

        <div id="edit_job" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <button type="button" className="close" data-bs-dismiss="modal">×</button>
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">Edit Job</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Job Title</label>
                        <input className="form-control" type="text" defaultValue="Web Developer" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Department</label>
                        <select className="select">
                            <option>-</option>
                            <option >Web Development</option>
                            <option>Application Development</option>
                            <option>IT Management</option>
                            <option>Accounts Management</option>
                            <option>Support Management</option>
                            <option>Marketing</option>
                        </select>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Job Location</label>
                        <input className="form-control" type="text" defaultValue="California" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>No of Vacancies</label>
                        <input className="form-control" type="text" defaultValue={5} />
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Experience</label>
                        <input className="form-control" type="text" defaultValue="2 Years" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Age</label>
                        <input className="form-control" type="text" defaultValue="-" />
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Salary From</label>
                        <input type="text" className="form-control" defaultValue="32k" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Salary To</label>
                        <input type="text" className="form-control" defaultValue="38k" />
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Job Type</label>
                        <select className="select">
                            <option >Full Time</option>
                            <option>Part Time</option>
                            <option>Internship</option>
                            <option>Temporary</option>
                            <option>Remote</option>
                            <option>Others</option>
                        </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Status</label>
                        <select className="select">
                            <option >Open</option>
                            <option>Closed</option>
                            <option>Cancelled</option>
                        </select>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Start Date</label>
                        <input type="text" className="form-control datetimepicker" defaultValue="3 Mar 2019" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Expired Date</label>
                        <input type="text" className="form-control datetimepicker" defaultValue="31 May 2019" />
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" defaultValue={""} />
                        </div>
                    </div>
                    </div>
                    <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Save</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>

        <div className="modal custom-modal fade" id="delete_job" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-body">
                <div className="form-header">
                    <h3>Delete Job</h3>
                    <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                    <div className="row">
                    <div className="col-6">
                        <a href="" className="btn btn-primary continue-btn">Delete</a>
                    </div>
                    <div className="col-6">
                        <a href="" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
 }

 