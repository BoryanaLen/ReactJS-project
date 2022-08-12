import {useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as employeeService  from "../../services/employeeService";
import * as leavesService  from "../../services/leavesService";
import * as jobsService  from "../../services/jobsService";
import * as candidatesService  from "../../services/candidatesService";
 

export const DashboardContent  = () => {

    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [jobs, setJobs] = useState([]);
    const { role } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true)

        leavesService
        .getAllLeaves()
        .then((data) => {
            const list = data.map(leave => {
                return { id: leave.id, data: leave.data() };
            })
            setLeaves(list)
            console.log(list);
        })

        jobsService
        .getAllJobs()
        .then((data) => {
            const list = data.map(leave => {
                return { id: leave.id, data: leave.data() };
            })
            setJobs(list)
            console.log(list);
        })

        candidatesService
        .getAllCandidates()
        .then((data) => {
            const list = data.map(leave => {
                return { id: leave.id, data: leave.data() };
            })
            setCandidates(list)
            console.log(list);
        })

        employeeService
            .getAllEmployees()
            .then((data) => {
                const list = data.map(empl => {
                    return { id: empl.id, data: empl.data() };
                })
                setEmployees(list)
            })
            .finally(() => setLoading(false))
    }, [])

    return (role==="admin" && !loading &&
        <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Welcome Admin!</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item active">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                <div className="card dash-widget">
                <div className="card-body">
                    <span className="dash-widget-icon"><i className="fa fa-user" /></span>
                    <div className="dash-widget-info">
                    <h3>{employees.length}</h3>
                    <span>Employees</span>
                    </div>
                </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon"><i className="fa fa-usd" /></span>
                <div className="dash-widget-info">
                  <h3>{leaves.length}</h3>
                  <span>Leaves</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon"><i className="fa fa-cubes" /></span>
                <div className="dash-widget-info">
                  <h3>{jobs.length}</h3>
                  <span>Jobs</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon"><i className="fa fa-diamond" /></span>
                <div className="dash-widget-info">
                  <h3>{candidates.length}</h3>
                  <span>Candidates</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-md-6 d-flex">
            <div className="card card-table flex-fill">
              <div className="card-header">
                <h3 className="card-title mb-0">Employees</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-nowrap custom-table mb-0">
                    <thead>
                      <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Start date</th>
                      </tr>
                    </thead>
                    <tbody>
                    { employees && employees.slice(0, 5).map((empl, index) => (
                        <tr key={index}>
                            <td>{empl.data.firstName}</td>
                            <td>{empl.data.lastName}</td>
                            <td>{empl.data.department}</td>
                            <td>{empl.data.position}</td>
                            <td>{empl.data.joinDate}</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer">
                <Link to = "/admin/allemployees">View all employees</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex">
            <div className="card card-table flex-fill">
              <div className="card-header">
                <h3 className="card-title mb-0">Leaves</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">	
                  <table className="table custom-table table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Leave type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    { leaves && leaves.slice(0, 5).map((leave, index) => (
                        <tr key={index}>
                            <td>{leave.data.firstName}</td>
                            <td>{leave.data.leaveType}</td>
                            <td>{leave.data.from}</td>
                            <td>{leave.data.to}</td>
                            <td>{leave.data.status}</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer">
                <Link to = "/admin/employees/leaves">View all leaves</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}