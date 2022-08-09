import { useState } from 'react';
import { storage } from '../../services/firebase'
import { getDownloadURL, uploadBytes, ref } from "firebase/storage"

export const ApplyJob = ({
    onJobApply
   }) => {
    const [ file, setFile ] = useState();
    const [ url, setUrl ] = useState();

    const submitHandler = (e) => {
        e.preventDefault();

        const candidateData = Object.fromEntries(new FormData(e.target));

        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `files/${file.name}`)
        uploadBytes(storageRef, file)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then(downloadURL => {
                    setUrl(downloadURL)
                })    
        })
        onJobApply(candidateData, url); 
    };

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    return ( 
        <div className="modal custom-modal fade" id="apply_job" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add Your Details</h5>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">x</span>
                    </button>
                </div>
                <div className="modal-body">
                <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label>Name</label>
                  <input className="form-control" type="text" name='name'/>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input className="form-control" type="text" name='email'/>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-control" defaultValue={""} name='message'/>
                </div>
                <div className="form-group">
                  <label>Upload your CV</label>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="cv_upload" onChange={handleChange} />
                    <label className="custom-file-label" htmlFor="cv_upload">Choose file</label>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" data-bs-dismiss="modal" >Submit</button>
                </div>
              </form>
                </div>
                </div>
            </div>
        </div>
    )
}