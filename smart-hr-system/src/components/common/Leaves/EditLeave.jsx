import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

export const EditLeave = ({
    leaveData,
    onLeaveEdit
}) =>{
    const [values, setValues] = useState({...leaveData});
    const { role } = useContext(AuthContext);

    const submitHandler = (e) => {
        e.preventDefault();
        onLeaveEdit(values); 
    };

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return(role==='user' &&
        <div id="edit_leave" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document" >
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">Edit Leave</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">x</span>
                </button>
                </div>
                <div className="modal-body">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                    <label>Leave Type <span className="text-danger">*</span></label>
                    <select className="select" id='leaveType' name='leaveType' value={leaveData.data.leaveType} onChange={changeHandler}>
                        <option>Select Leave Type</option>
                        <option value='Casual Leave 12 Days'>Casual Leave 12 Days</option>
                        <option value='Medical Leave'>Medical Leave</option>
                        <option value='Loss of Pay'>Loss of Pay</option>
                    </select>
                    </div>
                    <div className="form-group">
                    <label>From <span className="text-danger">*</span></label>
                    <div>
                        <input className="form-control datetimepicker" type="date" value={leaveData.from} onChange={changeHandler}/>
                    </div>
                    </div>
                    <div className="form-group">
                    <label>To <span className="text-danger">*</span></label>
                    <div>
                        <input className="form-control datetimepicker" type="date" value={leaveData.to} onChange={changeHandler} />
                    </div>
                    </div>
                    <div className="form-group">
                    <label>Number of days <span className="text-danger">*</span></label>
                    <input className="form-control" type="text" value={leaveData.numberOfDays} onChange={changeHandler} />
                    </div>
                    <div className="form-group">
                    <label>Leave Reason <span className="text-danger">*</span></label>
                    <textarea rows={4} className="form-control" value={leaveData.leaveReason} onChange={changeHandler}/>
                    </div>
                    <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Save</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
      </div>
    )
}