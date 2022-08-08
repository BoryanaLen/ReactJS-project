import { useState, useEffect } from 'react';
import * as candidatesService from '../../services/candidatesService';

export const ApplyJob = ({
    onJobApply
   }) => {

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [ file, setFile ] = useState();
    const [candidateData, setCandidateData] = useState({
        name: '',
        email: '',
        message: '',
        cv_upload: ''
    });

    // useEffect(() => {
    //     setLoading(true)
       
    //         .finally(() => setLoading(false))
    // }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0]?.files[0]

        const res =candidatesService.uploadDocument(file);
        console.log(res)
    }
    

    const changeFileHandler = (e) => {
        setCandidateData(state => ({
            ...state,
            [e.target.name]: e.target.files[0]
        }));
        console.log(candidateData)
    };

    const changeHandler = (e) => {
        setCandidateData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e)
        console.log(candidateData.cv)
        candidatesService
        .uploadDocument(candidateData.cv)
        .then( data => 
            console.log(data)
        )

        //onJobApply(candidateData); 
    };

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
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-control" defaultValue={""} />
                </div>
                <div className="form-group">
                  <label>Upload your CV</label>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="cv_upload" />
                    <label className="custom-file-label" htmlFor="cv_upload">Choose file</label>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
                </div>
                </div>
            </div>
        </div>
    )
}