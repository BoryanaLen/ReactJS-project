import { Avatar_02 } from "../../../assets/imagepath"
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../../../contexts/AuthContext';

export const Employee = ({
    employee,
    onSetCurrentEmployeeClick
}) =>{
    const { role } = useContext(AuthContext);
    return( role==="admin" &&
        <div  >     
            <div className="profile-widget">
                <div className="profile-img">
                <Link to="/app/profile/employee-profile" className="avatar"><img src={Avatar_02} alt="" /></Link>
                </div>
                <div className="dropdown profile-action">
                <button className="action-icon dropdown-toggle employee-view-more" data-bs-toggle="dropdown" aria-expanded="true" ><i className="material-icons" onClick={() => onSetCurrentEmployeeClick(employee)}>more_vert</i></button>
                <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_employee"><i className="fa fa-pencil m-r-5" /> Edit</button>
                        <button className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_employee"><i className="fa fa-trash-o m-r-5" /> Delete</button>
                </div>
                </div>
                <h4 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/app/profile/employee-profile">{ employee.data.firstName + " " + employee.data.lastName  }</Link></h4>
                <div className="small text-muted">{ employee.data.position }</div>
            </div>
        </div>
    )
}