import React, { useState, useEffect } from "react";
import EmployeeService from "../../../services/EmployeeService";
import { Avatar_02 } from "../../../assets/imagepath"
import { Link, WithRouter } from 'react-router-dom';

const EmployeeList = (props) => {

  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState([]);

    //   const [employees, loading, error] = useList(employeeService.getAll());

    useEffect(() => {
        setLoading(true)
        EmployeeService
            .getAll()
            .then((data) => {
                setEmployees(data)
            })
            .finally(() => setLoading(false))
    }, [])

    console.log(employees)

    const renderedList = () => {
        return (      
            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
        
                { employees &&
                    employees.map((employee, index) => (
                        <div className="profile-widget">
                        <div className="profile-img">
                            <Link to="/app/profile/employee-profile" className="avatar"><img src={Avatar_02} alt="" /></Link>
                        </div>
                        <div className="dropdown profile-action">
                            <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</a>
                                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                            </div>
                        </div>
                        <h4 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/app/profile/employee-profile">{ employee.name }</Link></h4>
                        <div className="small text-muted">{ employee.position }</div>
                    </div>
                ))}
            
            </div>
        )      
    }

    return renderedList()
}

export default EmployeeList