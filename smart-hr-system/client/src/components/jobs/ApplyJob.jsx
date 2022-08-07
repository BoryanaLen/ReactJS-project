import { useState } from 'react';

export const ApplyJob = ({
    onCandidateCreate
   }) => {

    const [errors, setErrors] = useState({});
    const [candidateData, setCandidateData] = useState({
        name: '',
        email: '',
        message: '',
        cv: ''
    });

    const changeHandler = (e) => {
        setCandidateData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(candidateData)
        onCandidateCreate(candidateData); 
    };


    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: candidateData[e.target.name].length < bound,
        }));
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
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" type="text" id="name" name='name' value={candidateData.name} onChange={changeHandler} onBlur={(e) => minLength(e, 3)} />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input className="form-control" type="email" id="email" name='email' value={candidateData.email} onChange={changeHandler}/>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea className="form-control" id="message" name='message' value={candidateData.message} onChange={changeHandler} />
                        </div>
                        <div className="form-group">
                            <label>Upload your CV</label>
                            <div className="custom-file">
                            <input type="file" className="custom-file-input" id="cv" name='cv' value={candidateData.cv} />
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