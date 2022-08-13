import { useState,useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Deletejob } from "../jobs/Deletejob"
import { Table } from 'antd';
import { AuthContext } from '../../contexts/AuthContext';
import { Header } from '../common/Header';
import { SidebarAdmin } from '../admin/SidebarAdmin';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../assets/paginationfunction"
import * as candidatesService  from "../../services/candidatesService";
import "../../assets/css/antdstyle.css"


export const CandidateList = () => {

    const [ loading, setLoading] = useState(false);
    const [ candidates, setCandidates] = useState([])
    const { role } = useContext(AuthContext);

    useEffect( ()=>{

        setLoading(true)

        candidatesService
        .getAllCandidates()
        .then((data) => {
            const list = data.map(c => {
                return {...c.data(), id: c.id };
            })
            setCandidates(list);
            console.log(list)
        })
        .finally(() => setLoading(false))
    },[]);  


    const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) => (            
            <h2 className="table-avatar">
            <Link to="/app/profile/employee-profile" className="avatar"><img alt="" src={record.image} /></Link>
            <Link to="/app/profile/employee-profile">{text}</Link>
            </h2>
        ), 
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
    },
    {
        title: 'Created Date',
        dataIndex: 'createddate',
        sorter: (a, b) => a.createddate.length - b.createddate.length,
    },
    {
        title: 'cv',
        dataIndex: 'cvUrl',
        render: (text, record) => (
            <div className="action-label">
              <a href={text} target="blank">cv</a>
            </div> 
            ),
        sorter: (a, b) => a.createddate.length - b.createddate.length,
    },
    {
        title: 'Action',
        render: (text, record) => (
        <div className="dropdown dropdown-action text-center">
            <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
            <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_job"><i className="fa fa-pencil m-r-5" /> Edit</a>
            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_job"><i className="fa fa-trash-o m-r-5" /> Delete</a>
            </div>
        </div>
        ), 
    },    
    ]
      
       return ( loading===false && role==="admin" &&
       <div>
            <Header />
            <SidebarAdmin /> 
       
         <div className="page-wrapper">
           <div className="content container-fluid">
             {/* Page Header */}
             <div className="page-header">
               <div className="row align-items-center">
                 <div className="col">
                   <h3 className="page-title">Candidates List</h3>
                   <ul className="breadcrumb">
                     <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                     <li className="breadcrumb-item">Jobs</li>
                     <li className="breadcrumb-item active">Candidates List</li>
                   </ul>
                 </div>
                 <div className="col-auto float-end ml-auto">
                   <a href="#" data-bs-toggle="modal" data-bs-target="#add_employee" className="btn add-btn"> Add Candidates</a>
                 </div>
               </div>
             </div>
             {/* /Page Header */}
             <div className="row">
               <div className="col-md-12">
                 <div className="table-responsive">
                 <Table className="table-striped"
                     pagination= { {total : candidates.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                     style = {{overflowX : 'auto'}}
                     columns={columns}                 
                     // bordered
                     dataSource={candidates}
                     rowKey={record => record.id}
                    //  onChange={this.handleTableChange}
                     />
                 </div>
               </div>
             </div>
           </div>
           {/* /Page Content */}
           {/* Add Employee Modal */}
           <div id="add_employee" className="modal custom-modal fade" role="dialog">
             <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
               <div className="modal-content">
                 <div className="modal-header">
                   <h5 className="modal-title">Add Candidates</h5>
                   <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">×</span>
                   </button>
                 </div>
                 <div className="modal-body">
                   <form>
                     <div className="row">
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label className="col-form-label">First Name <span className="text-danger">*</span></label>
                           <input className="form-control" type="text" />
                         </div>
                       </div>
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label className="col-form-label">Last Name</label>
                           <input className="form-control" type="text" />
                         </div>
                       </div>
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label className="col-form-label">Email <span className="text-danger">*</span></label>
                           <input className="form-control" type="email" />
                         </div>
                       </div>
                       <div className="col-sm-6">  
                         <div className="form-group">
                           <label className="col-form-label">Employee ID <span className="text-danger">*</span></label>
                           <input type="text" className="form-control" />
                         </div>
                       </div>
                       <div className="col-sm-6">  
                         <div className="form-group">
                           <label className="col-form-label">Created Date <span className="text-danger">*</span></label>
                           <div><input className="form-control datetimepicker" type="date" /></div>
                         </div>
                       </div>
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label className="col-form-label">Phone </label>
                           <input className="form-control" type="text" />
                         </div>
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
           {/* /Add Employee Modal */}
           {/* Edit Job Modal */}
           <div id="edit_job" className="modal custom-modal fade" role="dialog">
             <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
               <div className="modal-content">
                 <div className="modal-header">
                   <h5 className="modal-title">Edit Candidates</h5>
                   <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">×</span>
                   </button>
                 </div>
                 <div className="modal-body">
                   <form>
                     <div className="row">
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label className="col-form-label">First Name <span className="text-danger">*</span></label>
                           <input className="form-control" type="text" />
                         </div>
                       </div>
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label className="col-form-label">Last Name</label>
                           <input className="form-control" type="text" />
                         </div>
                       </div>
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label className="col-form-label">Email <span className="text-danger">*</span></label>
                           <input className="form-control" type="email" />
                         </div>
                       </div>
                       <div className="col-sm-6">  
                         <div className="form-group">
                           <label className="col-form-label">Employee ID <span className="text-danger">*</span></label>
                           <input type="text" className="form-control" />
                         </div>
                       </div>
                       <div className="col-sm-6">  
                         <div className="form-group">
                           <label className="col-form-label">Created Date <span className="text-danger">*</span></label>
                           <div><input className="form-control datetimepicker" type="date" /></div>
                         </div>
                       </div>
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label className="col-form-label">Phone </label>
                           <input className="form-control" type="text" />
                         </div>
                       </div>
                     </div>
                     <div className="submit-section">
                       <button className="btn btn-primary submit-btn">Save</button>
                     </div>
                   </form>
                 </div>
               </div>
             </div>
           </div>
           {/* /Edit Job Modal */}
           {/* Delete Job Modal */}
          <Deletejob/>
           {/* /Delete Job Modal */}
         </div>
         </div>
       );
}