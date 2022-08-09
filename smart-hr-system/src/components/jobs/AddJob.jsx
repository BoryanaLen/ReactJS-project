import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const AddJob= ({
  onJobCreate
 }) => {

  const [errors, setErrors] = useState({});
  const { role } = useContext(AuthContext);
  const [jobData, setJobData] = useState({
      jobtitle: '',
      department: '',
      startdate: '',
      expirydate: '',
      jobtype: '',
      jobLocation: '',
      experience: '',
      salaryFrom: '',
      salaryTo: '',
      description: '',
      status: ''
  });

  //{id:1,jobtitle:"Web Designer",department:"Development",startdate:"1 Jan 2013",expirydate:"31 May 2019",jobtype:"Full Time",status:"Open",applicants:"3 Candidates"},

  const changeHandler = (e) => {
      setJobData(state => ({
          ...state,
          [e.target.name]: e.target.value
      }));
  };

  const submitHandler = (e) => {
      e.preventDefault();
      console.log(jobData);
      onJobCreate(jobData); 
  };


  const minLength = (e, bound) => {
      setErrors(state => ({
          ...state,
          [e.target.name]: jobData[e.target.name].length < bound,
      }));
  }

  return (role==="admin" && 
    <div id="add_job" className="modal custom-modal fade" role="dialog">
         <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
           <div className="modal-content">
             <div className="modal-header">
               <h5 className="modal-title">Add Job</h5>
               <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">x</span>
               </button>
             </div>
             <div className="modal-body">
               <form onSubmit={submitHandler}>
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group">
                       <label  htmlFor="jobtitle">Job Title</label>
                       <input className="form-control" type="text" id='jobtitle' name='jobtitle' value={jobData.jobtitle} onChange={changeHandler} onBlur={(e) => minLength(e, 3)}/>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Department</label>
                       <select className="select" id='department' name='department' value={jobData.department} onChange={changeHandler}>
                         <option>-</option>
                         <option value="Web Development">Web Development</option>
                         <option value="Application Development">Application Development</option>
                         <option value="IT Management">IT Management</option>
                         <option value="Accounts Management">Accounts Management</option>
                         <option value="Support Management">Support Management</option>
                         <option value="Marketing">Marketing</option>
                       </select>
                     </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Job Location</label>
                       <input className="form-control" type="text" id='jobLocation' name='jobLocation' value={jobData.jobLocation} onChange={changeHandler} onBlur={(e) => minLength(e, 3)}/>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Experience</label>
                       <input className="form-control" type="text" id='experience' name='experience' value={jobData.experience} onChange={changeHandler}/>
                     </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Salary From</label>
                       <input type="text" className="form-control" id='salaryFrom' name='salaryFrom' value={jobData.salaryFrom} onChange={changeHandler}/>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Salary To</label>
                       <input type="text" className="form-control" id='salaryTo' name='salaryTo' value={jobData.salaryTo} onChange={changeHandler} />
                     </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Job Type</label>
                       <select className="select" id='jobtype' name='jobtype' value={jobData.jobtype} onChange={changeHandler}>
                         <option value="Full Time">Full Time</option>
                         <option value="Part Time">Part Time</option>
                         <option value="Internship">Internship</option>
                         <option value="Temporary">Temporary</option>
                         <option value="Remote">Remote</option>
                         <option value="Others">Others</option>
                       </select>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Status</label>
                       <select className="select" id='status' name='status' value={jobData.status} onChange={changeHandler}>
                         <option value="Open">Open</option>
                         <option value="Closed">Closed</option>
                         <option value="Cancelled">Cancelled</option>
                       </select>
                     </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Start Date</label>
                       <input type="date" className="form-control datetimepicker" id='startdate' name='startdate' value={jobData.startdate} onChange={changeHandler}/>
                     </div>
                   </div>
                   <div className="col-md-6">
                     <div className="form-group">
                       <label>Expired Date</label>
                       <input type="date" className="form-control datetimepicker" id='expirydate' name='expirydate' value={jobData.expirydate} onChange={changeHandler}/>
                     </div>
                   </div>
                 </div>
                 <div className="row">
                   <div className="col-md-12">
                     <div className="form-group">
                       <label>Description</label>
                       <textarea className="form-control" id='description' name='description' value={jobData.description} onChange={changeHandler} onBlur={(e) => minLength(e, 3)} />
                     </div>
                   </div>
                 </div>
                 <div className="submit-section">
                   <button className="btn btn-primary submit-btn" data-bs-dismiss="modal">Submit</button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </div>
  )

}