import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Addemployee } from "./Addemployee"
import { Editemployee } from "./Editemployee"
import { Employee } from './Employee'
import * as employeeService  from "../../../services/employeeService";

import { DeleteEmployee } from './DeleteEmployee';
import { Header } from '../../common/Header';
import { SidebarAdmin } from '../SidebarAdmin';
import { useContext } from "react";
import { AuthContext } from '../../../contexts/AuthContext';

export const AllEmployees = () => {

    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [menu, setMenu] = useState(false);
    const { role } = useContext(AuthContext);

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

    function employeeSetHandler(employee){
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
            console.log(employees);
            return {...obj, data: newData};
          }
          return obj;
        });
    
        setEmployees(newState);
      };

      const toggleMobileMenu = () => {
		setMenu(!menu)
	  }


    return ( !loading &&  role==="admin" &&
        <div className={`main-wrapper ${menu ? 'slide-nav': ''}`}>      
        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <SidebarAdmin /> 
        <div className="page-wrapper">
            <div className="content container-fluid">
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
                            <button className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_employee"><i className="fa fa-plus" /> Add Employee</button>
                        </div>
                    </div>
                </div>

                <div className="row staff-grid-row">
                    { employees &&
                        employees.map((employee, index) => (
                            <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3" key={index}>    
                                <Employee
                                    employee={employee}
                                    onSetCurrentEmployeeClick={employeeSetHandler}
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
            </div>
        </div>
    );
}