import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Addemployee } from "./Addemployee"
import { Editemployee } from "./Editemployee"
import { Employee } from './Employee'
import * as EmployeeService  from "../../../services/EmployeeService";

import { DeleteEmployee } from './DeleteEmployee';

export const AllEmployees = () => {

    const [loading, setLoading] = useState(false)
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState({});

    useEffect(() => {
        setLoading(true)
        EmployeeService
            .getAllEmployees()
            .then((data) => {
                setEmployees(data)
            })
            .finally(() => setLoading(false))
    }, [])


    function employeeCreateHandler (employeeData) {
            EmployeeService
            .addEmployee(employeeData)
            .then(employee => {
                setEmployees(oldEmployees => [...oldEmployees, employee]);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function employeeSeteHandler(employeeId){
       setSelectedEmployeeId(employeeId);
    }

    function employeeDelete(){
        EmployeeService
        .deleteEmployee(selectedEmployeeId)
        .then(employee => {
            setEmployees((oldEmployees) => oldEmployees.filter((item) => item.id !== selectedEmployeeId));
        })
        .catch(err => {
            console.log(err);
        });
    }


    return (
        <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
                <div className="row align-items-center">
                    <div className="col">
                        <h3 className="page-title">Employee</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item active">Employee</li>
                        </ul>
                    </div>
                    <div className="col-auto float-end ml-auto">
                        <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" /> Add Employee</a>
                        <div className="view-icons">
                            <Link to="/app/employee/allemployees" className="grid-view btn btn-link active"><i className="fa fa-th" /></Link>
                            <Link to="/app/employee/employees-list" className="list-view btn btn-link"><i className="fa fa-bars" /></Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <div className="row filter-row">
                <div className="col-sm-6 col-md-3">
                    <div className="form-group form-focus">
                        <input type="text" className="form-control floating" />
                        <label className="focus-label">Employee ID</label>
                    </div>
                </div>
                <div className="col-sm-6 col-md-3">
                    <div className="form-group form-focus">
                        <input type="text" className="form-control floating" />
                        <label className="focus-label">Employee Name</label>
                    </div>
                </div>
                {/* <div className="col-sm-6 col-md-3">
                    <div className="form-group form-focus select-focus">
                        <select className="select floating" data-select2-id="1"  aria-hidden="true">
                            <option>Select Designation</option>
                            <option>Web Developer</option>
                            <option>Web Designer</option>
                            <option>Android Developer</option>
                            <option>Ios Developer</option>
                        </select>
                        <label className="focus-label">Designation</label>
                    </div>
                </div> */}


                <div className="col-sm-6 col-md-3">
                    <div className="form-group form-focus select-focus">
                        <select className="select floating select2-hidden-accessible" data-select2-id="1"  aria-hidden="true">
                            <option data-select2-id="3">Select Designation</option>
                            <option data-select2-id="25">Web Developer</option>
                            <option data-select2-id="26">Web Designer</option>
                            <option data-select2-id="27">Android Developer</option>
                            <option data-select2-id="28">Ios Developer</option>
                        </select>
                        <span className="select2 select2-container select2-container--default select2-container--focus select2-container--below" dir="ltr" data-select2-id="2">
                        <span className="selection">
                            <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" aria-labelledby="select2-ulk2-container">
                        <span className="select2-selection__rendered" id="select2-ulk2-container" role="textbox" aria-readonly="true" title="Select Designation">Select Designation</span>
                        <span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
                        </span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span><label className="focus-label">Designation</label>
                    </div>
                </div>


                <div className="col-sm-6 col-md-3">
                    <a href="#" className="btn btn-success btn-block w-100"> Search </a>
                </div>
            </div>
            {/* Search Filter */}
            <div className="row staff-grid-row">
                { employees &&
                    employees.map((employee, index) => (
                        <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3" key={index}>    
                             <Employee
                                employee={employee}
                                onSetCurrentEmployeeClick={employeeSeteHandler}
                            /> 
                        </div>                     
                ))}            
            </div>

            <Addemployee 
                onEmployeeCreate={employeeCreateHandler}
            />

            <Editemployee />

            <DeleteEmployee
                onEmployeeDelete={employeeDelete}
            />
        </div>
    );
}