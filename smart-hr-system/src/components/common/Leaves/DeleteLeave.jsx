import React from 'react';

export const DeleteLeave = ({
    onLeaveDelete
}) => {
    
    return ( 
      <div className="modal custom-modal fade" id="delete_approve" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Leave</h3>
                <p>Are you sure want to delete this leave?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <button href="" className="btn btn-primary continue-btn" onClick={onLeaveDelete}>Delete</button>
                  </div>
                  <div className="col-6">
                    <a href="" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
)}