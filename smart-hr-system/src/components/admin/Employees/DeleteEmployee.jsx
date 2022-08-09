import { useContext } from "react";
import { AuthContext } from '../../../contexts/AuthContext';

export const DeleteEmployee = ({
    onEmployeeDelete,
    onCancelAction
}) =>{

    const { role } = useContext(AuthContext);

    return(role==="admin" &&
        <div className="modal custom-modal fade" id="delete_employee" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="form-header">
                            <h3>Delete Employee</h3>
                            <p>Are you sure want to delete?</p>
                        </div>
                        <div className="modal-btn delete-action">
                            <div className="row">
                                <div className="col-6">
                                    <button data-bs-dismiss="modal" className="btn btn-primary continue-btn" onClick={onEmployeeDelete}>Delete</button>
                                </div>
                                <div className="col-6">
                                    <button data-bs-dismiss="modal" className="btn btn-primary cancel-btn" onClick={onCancelAction}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}