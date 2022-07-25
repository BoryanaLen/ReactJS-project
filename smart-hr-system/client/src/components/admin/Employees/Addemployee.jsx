  import { useState } from 'react';
  import * as EmployeeService  from "../../../services/EmployeeService";

  export const Addemployee = () => {

    const [errors, setErrors] = useState({});
    const [employees, setEmployees] = useState([]);
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        department: '',
        position: '',
        joinDate: '',
        address: ''
    });

    const changeHandler = (e) => {
        setEmployeeData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        EmployeeService
            .addEmployee(employeeData)
            .then(empl => {
                setEmployees(oldEmployees => [...oldEmployees, empl]);
            })
            .catch(err => {
                console.log(err);
            });                 
    };


    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: employeeData[e.target.name].length < bound,
        }));
    }
    
    return ( 
       <div id="add_employee" className="modal custom-modal fade" role="dialog">
           <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title">Add Employee</h5>
                 <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">x</span>
                 </button>
               </div>
               <div className="modal-body">
                 <form onSubmit={submitHandler}>
                   <div className="row">
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="firstName">First Name <span className="text-danger">*</span></label>
                         <input className="form-control" id="firstName" name="firstName" type="text" value={employeeData.firstName} onChange={changeHandler} onBlur={(e) => minLength(e, 3)}/>
                            {errors.firstName &&
                                <p className="form-error">
                                    First name should be at least 3 symbols!
                                </p>
                            }
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="lastName">Last Name <span className="text-danger">*</span></label>
                         <input className="form-control" id="lastName" name='lastName' type="text" value={employeeData.lastName} onChange={changeHandler} onBlur={(e) => minLength(e, 3)}/>
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="email">Email <span className="text-danger">*</span></label>
                         <input className="form-control" id="email" name="email" type="email" value={employeeData.email} onChange={changeHandler} onBlur={(e) => minLength(e, 3)}/>
                       </div>
                     </div>
                     <div className="col-sm-6">  
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="address">Address <span className="text-danger">*</span></label>
                         <input type="text" className="form-control" id="address" name='address' value={employeeData.address} onChange={changeHandler} onBlur={(e) => minLength(e, 3)}/>
                       </div>
                     </div>
                     <div className="col-sm-6">  
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="joinDate">Joining Date <span className="text-danger">*</span></label>
                         <div><input className="form-control datetimepicker" type="date" id='joinDate' name='joinDate' value={employeeData.joinDate} onChange={changeHandler} onBlur={(e) => minLength(e, 3)}/></div>
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="phoneNumber">Phone <span className="text-danger">*</span></label>
                         <input className="form-control" type="text" id='phoneNumber' name='phoneNumber'  value={employeeData.phoneNumber} onChange={changeHandler} onBlur={(e) => minLength(e, 5)}/>
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group">
                         <label>Department <span className="text-danger">*</span></label>
                         <select className="select">
                           <option>Select Department</option>
                           <option>Web Development</option>
                           <option>IT Management</option>
                           <option>Marketing</option>
                         </select>
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group">
                         <label>Position <span className="text-danger">*</span></label>
                         <select className="select">
                           <option>Select Position</option>
                           <option>Web Designer</option>
                           <option>Web Developer</option>
                           <option>Android Developer</option>
                         </select>
                       </div>
                     </div>
                   </div>
                   <div className="submit-section">
                     <button className="btn btn-primary submit-btn" data-bs-dismiss="modal" aria-label="Close">Submit</button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
         </div>
    )
}
