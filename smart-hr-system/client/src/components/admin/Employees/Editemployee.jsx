import { useState } from 'react';
  
  export const Editemployee = ({
    employeeData,
    onCancelAction,
    onEmployeeEdit
  }) => {

    const [values, setValues] = useState({
        firstName: employeeData.data().firstName,
        lastName: employeeData.data().lastName,
        email: employeeData.data().email,
        phone: employeeData.data().phone,
        department: employeeData.data().department,
        position: employeeData.data().position,
        joinDate: employeeData.data().joinDate,
        address: employeeData.data().address
    });

    const submitHandler = (e) => {
        e.preventDefault();
        onEmployeeEdit(values);   
    };

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };
    
    return ( 
      <div id="edit_employee" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Employee</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={onCancelAction}>
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitHandler}>
              <div className="row">
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="firstName">First Name <span className="text-danger">*</span></label>
                         <input className="form-control" id="firstName" name="firstName" type="text"  defaultValue={employeeData.data().firstName} onChange={changeHandler}/>
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="lastName">Last Name <span className="text-danger">*</span></label>
                         <input className="form-control" id="lastName" name='lastName' type="text" defaultValue={employeeData.data().lastName} onChange={changeHandler}/>
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="email">Email <span className="text-danger">*</span></label>
                         <input className="form-control" id="email" name="email" type="email" defaultValue={employeeData.data().email} onChange={changeHandler}/>
                       </div>
                     </div>
                     <div className="col-sm-6">  
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="address">Address <span className="text-danger">*</span></label>
                         <input type="text" className="form-control" id="address" name='address' defaultValue={employeeData.data().address} onChange={changeHandler}/>
                       </div>
                     </div>
                     <div className="col-sm-6">  
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="joinDate">Joining Date <span className="text-danger">*</span></label>
                         <div><input className="form-control datetimepicker" type="date" id='joinDate' name='joinDate' defaultValue={employeeData.data().joinDate} onChange={changeHandler}/></div>
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="phoneNumber">Phone <span className="text-danger">*</span></label>
                         <input className="form-control" type="text" id='phoneNumber' name='phoneNumber'  defaultValue={employeeData.data().phoneNumber} onChange={changeHandler} />
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
                  <button className="btn btn-primary submit-btn" >Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Editemployee