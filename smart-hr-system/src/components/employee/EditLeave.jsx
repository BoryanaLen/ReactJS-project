import { useState } from 'react';
import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

export const EditLeave = ({
    leave,
    onCancelAction,
    onLeaveEdit
}) => {

    const [ values, setValues ] = useState({...leave});
    const { role } = useContext(AuthContext);

    console.log(values)

    const submitHandler = (e) => {
        e.preventDefault();
        onLeaveEdit(values ); 
        console.log(values)
    };

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };
 
return (role === 'user' &&
    <div id="edit_leave" className="modal custom-modal fade" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Leave</h5>
          <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={onCancelAction}>
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label>Leave Type <span className="text-danger"  htmlFor="leaveType">*</span></label>
              <select className="select" id='leaveType' name='leaveType'defaultValue={values.leaveType} onChange={changeHandler}>
                    <option>Select Leave Type</option>
                    <option value='Casual Leave 12 Days'>Casual Leave 12 Days</option>
                    <option value='Medical Leave'>Medical Leave</option>
                    <option value='Loss of Pay'>Loss of Pay</option>
                  </select>
            </div>
            <div className="form-group">
              <label htmlFor="from">From <span className="text-danger">*</span></label>
              <div>
                <input className="form-control datetimepicker" id='from' name='from' defaultValue={values.from} onChange={changeHandler} type="date" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="to">To <span className="text-danger">*</span></label>
              <div>
                <input className="form-control datetimepicker" id='to' name='to' defaultValue={values.to} onChange={changeHandler} type="date" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="numberOfDays">Number of days <span className="text-danger">*</span></label>
              <input className="form-control" type="text" id='numberOfDays' name='numberOfDays' defaultValue={values.numberOfDays} onChange={changeHandler} />
            </div>
            <div className="form-group">
              <label htmlFor="leaveReason">Leave Reason <span className="text-danger">*</span></label>
              <textarea rows={4} className="form-control" id='leaveReason' defaultValue={values.leaveReason} onChange={changeHandler} />
            </div>
            <div className="submit-section">
              <button className="btn btn-primary submit-btn" data-bs-dismiss="modal">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}