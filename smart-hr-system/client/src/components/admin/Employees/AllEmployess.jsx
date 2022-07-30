import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Addemployee } from "./Addemployee"
import { Editemployee } from "./Editemployee"
import { Employee } from './Employee'
import * as employeeService  from "../../../services/employeeService";

import {useAuthValue} from '../../../contexts/AuthContext';
import { DeleteEmployee } from './DeleteEmployee';

export const AllEmployees = () => {

    const {currentUser} = useAuthValue();
    console.log(currentUser);

    const [loading, setLoading] = useState(false)
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        setLoading(true)
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


    const closeHandler = () => {
        setSelectedEmployee( null );
        console.log('clear set employee')
    };

    function employeeSeteHandler(employee){
       setSelectedEmployee(employee);
       console.log('set employee current')
    }

    function employeeCreateHandler (employeeData) {
        employeeService
        .addEmployee(employeeData)
        .then(doc => {
            setEmployees(oldEmployees => [...oldEmployees, {id: doc.id, data: employeeData}]);
        })
        .catch(err => {
            console.log(err);
        });
    }

    function employeeDeleteHandler(){
        employeeService
        .deleteEmployee(selectedEmployee.id)
        .then(employee => {
            setEmployees((oldEmployees) => oldEmployees.filter((item) => item.id !== selectedEmployee.id));
            closeHandler();
        })
        .catch(err => {
            console.log(err);
        });
    }

    function employeeUpdateHandler(updatedData){
        employeeService
        .updateEmployee(selectedEmployee.id, updatedData)
        .then(employee => {
            updateState(updatedData);
            closeHandler();
        })
        .catch(err => {
            console.log(err);
        });
    }

    
    const updateState = (newData) => {
        const newState = employees.map(obj => {
          if (obj.id === selectedEmployee.id) {
            return {...obj, data: newData};
          }
          return obj;
        });
    
        setEmployees(newState);
      };


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

           {selectedEmployee != null &&
                <div> 
                    <Editemployee 
                        employeeData={selectedEmployee.data}
                        onCancelAction={closeHandler}
                        onEmployeeEdit={employeeUpdateHandler}
                    />

                    <DeleteEmployee
                        onEmployeeDelete={employeeDeleteHandler}
                        onCancelAction={closeHandler}
                    />
                </div>
           }
        </div>
    );
}