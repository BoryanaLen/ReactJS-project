import { useState } from 'react';
import { useContext } from "react";
import { AuthContext } from '../../../contexts/AuthContext';
import { storage } from '../../../services/firebase'
import { getDownloadURL, uploadBytes, ref } from "firebase/storage"
  
  export const Editemployee = ({
    employeeData,
    onCancelAction,
    onEmployeeEdit
  }) => {

    const [ values, setValues] = useState({...employeeData});
    const { role } = useContext(AuthContext);
    const [ file, setFile ] = useState();
    const [ url, setUrl ] = useState();

    const submitHandler = (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please upload an image first!");
        }

        const metadata = {
            contentType: 'image/jpeg',
        };

        console.log(file)
        const storageRef = ref(storage, `images/${file.name}`)
        uploadBytes(storageRef, file, metadata)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then(downloadURL => {
                    setUrl(downloadURL)
                    onEmployeeEdit(values, downloadURL); 
                })    
        })

        console.log(url)
    };

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));

        console.log(values)
    };

    function handleChange(event) {
        setFile(event.target.files[0]);
    }
    
    return ( role==="admin" &&
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
                         <input className="form-control" id="firstName" name="firstName" type="text"  defaultValue={values.firstName} onChange={changeHandler}/>
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="lastName">Last Name <span className="text-danger">*</span></label>
                         <input className="form-control" id="lastName" name='lastName' type="text" defaultValue={values.lastName} onChange={changeHandler}/>
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="email">Email <span className="text-danger">*</span></label>
                         <input className="form-control" id="email" name="email" type="email" defaultValue={values.email} onChange={changeHandler}/>
                       </div>
                     </div>
                     <div className="col-sm-6">  
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="address">Address <span className="text-danger">*</span></label>
                         <input type="text" className="form-control" id="address" name='address' defaultValue={values.address} onChange={changeHandler}/>
                       </div>
                     </div>
                     <div className="col-sm-6">  
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="joinDate">Joining Date <span className="text-danger">*</span></label>
                         <div><input className="form-control datetimepicker" type="date" id='joinDate' name='joinDate' defaultValue={values.joinDate} onChange={changeHandler}/></div>
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label className="col-form-label" htmlFor="phoneNumber">Phone <span className="text-danger">*</span></label>
                         <input className="form-control" type="text" id='phoneNumber' name='phoneNumber'  defaultValue={values.phoneNumber} onChange={changeHandler} />
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group">
                         <label>Department <span className="text-danger">*</span></label>
                         <select className="select" id='department' name='department' value={values.department} onChange={changeHandler}>
                           <option>Select Department</option>
                           <option value='Web Development'>Web Development</option>
                           <option value='IT Management'> IT Management</option>
                           <option value='Marketing'>Marketing</option>
                         </select>
                       </div>
                     </div>
                     <div className="col-md-6">
                       <div className="form-group">
                        <label>Position <span className="text-danger">*</span></label>
                        <select className="select" id='position' name='position' value={values.position} onChange={changeHandler}>
                            <option>Select Position</option>
                            <option value='Web Designer'>Web Designer</option>
                            <option value='Web Developer'>Web Developer</option>
                            <option value='Android Developer'>Android Developer</option>
                        </select>
                       </div>
                     </div>
                     <div className="form-group">
                         <label>Upload photo</label>
                         <div className="custom-file">
                            <input type="file" className="custom-file-input" id="cv_upload" onChange={handleChange} />
                            <label className="custom-file-label" htmlFor="cv_upload">Choose file</label>
                         </div>
                      </div>
                   </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" data-bs-dismiss="modal" >Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Editemployee